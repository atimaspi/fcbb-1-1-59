
-- Fix players table RLS to allow proper access
-- Drop existing policies
DROP POLICY IF EXISTS "Players are viewable by authenticated users" ON players;
DROP POLICY IF EXISTS "Users can insert players" ON players;
DROP POLICY IF EXISTS "Users can update players" ON players;
DROP POLICY IF EXISTS "Users can delete players" ON players;

-- Create simple, non-recursive policies for players
CREATE POLICY "players_select" ON players
    FOR SELECT 
    USING (true);

CREATE POLICY "players_insert" ON players
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "players_update" ON players
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "players_delete" ON players
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);

-- Also fix other tables that might have similar issues
-- Fix clubs table
DROP POLICY IF EXISTS "Clubs are viewable by authenticated users" ON clubs;
DROP POLICY IF EXISTS "Users can insert clubs" ON clubs;
DROP POLICY IF EXISTS "Users can update clubs" ON clubs;
DROP POLICY IF EXISTS "Users can delete clubs" ON clubs;

CREATE POLICY "clubs_select" ON clubs
    FOR SELECT 
    USING (true);

CREATE POLICY "clubs_insert" ON clubs
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "clubs_update" ON clubs
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "clubs_delete" ON clubs
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);

-- Fix federations table
DROP POLICY IF EXISTS "Federations are viewable by authenticated users" ON federations;
DROP POLICY IF EXISTS "Users can insert federations" ON federations;
DROP POLICY IF EXISTS "Users can update federations" ON federations;
DROP POLICY IF EXISTS "Users can delete federations" ON federations;

CREATE POLICY "federations_select" ON federations
    FOR SELECT 
    USING (true);

CREATE POLICY "federations_insert" ON federations
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "federations_update" ON federations
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "federations_delete" ON federations
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);

-- Fix regional_associations table
DROP POLICY IF EXISTS "Regional associations are viewable by authenticated users" ON regional_associations;
DROP POLICY IF EXISTS "Users can insert regional associations" ON regional_associations;
DROP POLICY IF EXISTS "Users can update regional associations" ON regional_associations;
DROP POLICY IF EXISTS "Users can delete regional associations" ON regional_associations;

CREATE POLICY "regional_associations_select" ON regional_associations
    FOR SELECT 
    USING (true);

CREATE POLICY "regional_associations_insert" ON regional_associations
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "regional_associations_update" ON regional_associations
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "regional_associations_delete" ON regional_associations
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);

-- Fix championships table
DROP POLICY IF EXISTS "Championships are viewable by authenticated users" ON championships;
DROP POLICY IF EXISTS "Users can insert championships" ON championships;
DROP POLICY IF EXISTS "Users can update championships" ON championships;
DROP POLICY IF EXISTS "Users can delete championships" ON championships;

CREATE POLICY "championships_select" ON championships
    FOR SELECT 
    USING (true);

CREATE POLICY "championships_insert" ON championships
    FOR INSERT 
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "championships_update" ON championships
    FOR UPDATE 
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "championships_delete" ON championships
    FOR DELETE 
    USING (auth.uid() IS NOT NULL);
