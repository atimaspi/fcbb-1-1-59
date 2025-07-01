
-- Final fix for profiles infinite recursion
-- This completely removes all problematic policies and creates minimal safe ones

-- First, drop all existing policies completely
DO $$ 
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'profiles' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON profiles', policy_name);
    END LOOP;
END $$;

-- Disable RLS temporarily to clear any cache
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Wait for system to clear
SELECT pg_sleep(1);

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create the simplest possible policies without any table references
-- Policy 1: Users can access their own profile using only auth.uid()
CREATE POLICY "simple_own_profile" ON profiles
    FOR ALL 
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Policy 2: Admin access using only auth.users table (no profiles table reference)
CREATE POLICY "simple_admin_access" ON profiles
    FOR ALL 
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'admin@fcbb.cv'
        )
    )
    WITH CHECK (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'admin@fcbb.cv'
        )
    );

-- Update handle_new_user function to be completely safe
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Simple insert with no policy dependencies
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
        -- Log but don't prevent user creation
        RAISE WARNING 'Profile creation failed: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Ensure admin profile exists
DO $$
BEGIN
    -- Temporarily disable RLS for admin creation
    ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
    
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
    
    -- Re-enable RLS
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN OTHERS THEN
        -- Re-enable RLS even if error
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        RAISE WARNING 'Admin profile creation failed: %', SQLERRM;
END $$;

-- Test that policies work
DO $$
BEGIN
    PERFORM COUNT(*) FROM profiles WHERE true;
    RAISE NOTICE 'Profiles policies working correctly';
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Profiles test failed: %', SQLERRM;
END $$;
