
-- Fix infinite recursion in profiles table policies
-- This replaces the problematic recursive policies with safe, non-recursive ones

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON profiles;
DROP POLICY IF EXISTS "profiles_read_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_access" ON profiles;

-- Temporarily disable RLS to clear any cached policies
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies using only auth.uid()
-- Users can read their own profile
CREATE POLICY "profiles_select_safe" ON profiles
    FOR SELECT 
    USING (id = auth.uid());

-- Users can insert their own profile (for new user creation)
CREATE POLICY "profiles_insert_safe" ON profiles
    FOR INSERT 
    WITH CHECK (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "profiles_update_safe" ON profiles
    FOR UPDATE 
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Admin users can do everything (using direct email check to avoid recursion)
CREATE POLICY "profiles_admin_safe" ON profiles
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'admin@fcbb.cv'
        )
    );

-- Update the handle_new_user function to be more robust and avoid recursion
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert new profile with default values, avoiding any policy checks
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
    -- Log the error but don't prevent user creation
    RAISE WARNING 'Error in handle_new_user for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Ensure the trigger exists and is properly configured
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a safe function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = user_id
        AND auth.users.email = 'admin@fcbb.cv'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.is_user_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_user_admin(UUID) TO anon;

-- Create or update admin profile if needed
DO $$
BEGIN
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
EXCEPTION
    WHEN OTHERS THEN
        -- Ignore errors during admin profile creation
        NULL;
END $$;
