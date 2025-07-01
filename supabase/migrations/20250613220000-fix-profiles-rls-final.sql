
-- Final fix for infinite recursion in profiles table policies
-- First, completely drop all existing problematic policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON profiles;
DROP POLICY IF EXISTS "Allow admin promotion for new users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for users on own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update access for users on own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON profiles;

-- Temporarily disable RLS to clear any cached policies
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies using direct auth.uid() checks
-- Users can read their own profile
CREATE POLICY "profiles_read_own" ON profiles
    FOR SELECT 
    USING (id = auth.uid());

-- Users can insert their own profile (for new user creation)
CREATE POLICY "profiles_insert_own" ON profiles
    FOR INSERT 
    WITH CHECK (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE 
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Admin users can do everything (using email check to avoid recursion)
CREATE POLICY "profiles_admin_access" ON profiles
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email = 'admin@fcbb.cv'
        )
    );

-- Create a safe function to check if user is admin without recursion
CREATE OR REPLACE FUNCTION public.is_admin_safe()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.email = 'admin@fcbb.cv'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.is_admin_safe() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_safe() TO anon;

-- Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert new profile with default values
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilizador'),
    CASE 
      WHEN NEW.email = 'admin@fcbb.cv' THEN 'admin'
      ELSE 'user'
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', profiles.full_name),
    role = CASE 
      WHEN NEW.email = 'admin@fcbb.cv' THEN 'admin'
      ELSE profiles.role
    END,
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- If there's an error, still allow user creation but log it
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create or update the admin user profile if it doesn't exist
INSERT INTO public.profiles (id, full_name, role)
SELECT 
  auth.users.id,
  'Administrador FCBB',
  'admin'
FROM auth.users
WHERE auth.users.email = 'admin@fcbb.cv'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  full_name = COALESCE(profiles.full_name, 'Administrador FCBB'),
  updated_at = NOW();

-- Add helpful indexes
CREATE INDEX IF NOT EXISTS idx_profiles_id_role ON profiles(id, role);
CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth.users(email);

