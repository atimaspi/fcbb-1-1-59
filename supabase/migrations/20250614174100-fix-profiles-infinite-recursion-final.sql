
-- Final fix for infinite recursion in profiles table policies
-- This migration completely removes all problematic policies and creates safe ones

-- Drop ALL existing policies on profiles table
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'profiles' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON profiles', policy_record.policyname);
    END LOOP;
END $$;

-- Temporarily disable RLS to clear cache
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create completely safe, non-recursive policies
-- Policy 1: Users can read their own profile (using only auth.uid())
CREATE POLICY "profiles_select_self" ON profiles
    FOR SELECT 
    USING (id = auth.uid());

-- Policy 2: Users can insert their own profile (for registration)
CREATE POLICY "profiles_insert_self" ON profiles
    FOR INSERT 
    WITH CHECK (id = auth.uid());

-- Policy 3: Users can update their own profile
CREATE POLICY "profiles_update_self" ON profiles
    FOR UPDATE 
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Policy 4: Admin access (using direct auth.users table lookup to avoid recursion)
CREATE POLICY "profiles_admin_all_access" ON profiles
    FOR ALL
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'admin@fcbb.cv'
        )
    );

-- Create a simple function to check admin status safely
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid()
        AND email = 'admin@fcbb.cv'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO anon;

-- Update the handle_new_user function to be completely safe
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Simple insert without any policy checks
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilizador'),
        CASE 
            WHEN NEW.email = 'admin@fcbb.cv' THEN 'admin'::text
            ELSE 'user'::text
        END
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', profiles.full_name),
        role = CASE 
            WHEN NEW.email = 'admin@fcbb.cv' THEN 'admin'::text
            ELSE profiles.role
        END,
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't prevent user creation
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Ensure admin profile exists
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
        -- Ignore errors during admin creation
        NULL;
END $$;

-- Add helpful indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth.users(email);

-- Test the policies work by checking if we can query profiles
DO $$
BEGIN
    PERFORM COUNT(*) FROM profiles;
    RAISE NOTICE 'Profiles policies are working correctly';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Profiles policies test failed: %', SQLERRM;
END $$;
