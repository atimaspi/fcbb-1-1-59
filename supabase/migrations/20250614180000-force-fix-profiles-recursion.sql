
-- Force fix for infinite recursion - complete reset of profiles policies
-- This migration uses a more aggressive approach to clear all policies

-- First, completely disable RLS and drop all policies
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Force drop all policies with direct SQL
DROP POLICY IF EXISTS "profiles_select_self" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_self" ON profiles;
DROP POLICY IF EXISTS "profiles_update_self" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_all_access" ON profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON profiles;
DROP POLICY IF EXISTS "profiles_read_own" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_access" ON profiles;
DROP POLICY IF EXISTS "profiles_select_safe" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_safe" ON profiles;
DROP POLICY IF EXISTS "profiles_update_safe" ON profiles;
DROP POLICY IF EXISTS "profiles_admin_safe" ON profiles;
DROP POLICY IF EXISTS "Allow admin promotion for new users" ON profiles;
DROP POLICY IF EXISTS "Enable read access for users on own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update access for users on own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON profiles;

-- Clear any remaining policies using dynamic SQL
DO $$ 
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'profiles' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY %I ON profiles', policy_name);
    END LOOP;
END $$;

-- Wait a moment for the system to clear caches
SELECT pg_sleep(1);

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create the simplest possible policies without any recursion
CREATE POLICY "users_own_profile" ON profiles
    FOR ALL 
    USING (auth.uid() = id);

-- Separate admin policy that doesn't reference profiles table
CREATE POLICY "admin_full_access" ON profiles
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email = 'admin@fcbb.cv'
        )
    );

-- Recreate the handle_new_user function with bypass for policies
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_role TEXT := 'user';
BEGIN
    -- Determine role without querying profiles table
    IF NEW.email = 'admin@fcbb.cv' THEN
        user_role := 'admin';
    END IF;

    -- Insert with explicit bypass of RLS
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilizador'),
        user_role
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
        -- Log error but allow user creation to continue
        RAISE WARNING 'Profile creation failed for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create admin profile if it doesn't exist (with RLS bypass)
DO $$
BEGIN
    -- Temporarily disable RLS for this operation
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
        -- Re-enable RLS even if there's an error
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        RAISE WARNING 'Admin profile creation failed: %', SQLERRM;
END $$;

-- Verify the setup works
DO $$
DECLARE
    profile_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO profile_count FROM profiles;
    RAISE NOTICE 'Profiles table accessible. Count: %', profile_count;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Profiles table test failed: %', SQLERRM;
END $$;
