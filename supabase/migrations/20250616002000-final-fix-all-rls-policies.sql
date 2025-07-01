
-- Correção definitiva de todas as políticas RLS para eliminar recursão infinita
-- Esta migração resolve todos os problemas de RLS de forma segura

-- Desabilitar temporariamente RLS em todas as tabelas problemáticas
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE federations DISABLE ROW LEVEL SECURITY;
ALTER TABLE regional_associations DISABLE ROW LEVEL SECURITY;
ALTER TABLE clubs DISABLE ROW LEVEL SECURITY;
ALTER TABLE championships DISABLE ROW LEVEL SECURITY;
ALTER TABLE teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE players DISABLE ROW LEVEL SECURITY;
ALTER TABLE coaches DISABLE ROW LEVEL SECURITY;
ALTER TABLE referees DISABLE ROW LEVEL SECURITY;
ALTER TABLE games DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Dropar todas as políticas existentes de todas as tabelas
DO $$ 
DECLARE
    table_name TEXT;
    policy_name TEXT;
BEGIN
    FOR table_name IN 
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN ('profiles', 'federations', 'regional_associations', 'clubs', 'championships', 'teams', 'players', 'coaches', 'referees', 'games', 'news', 'events')
    LOOP
        FOR policy_name IN 
            SELECT policyname 
            FROM pg_policies 
            WHERE tablename = table_name AND schemaname = 'public'
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I', policy_name, table_name);
        END LOOP;
    END LOOP;
END $$;

-- Re-habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE federations ENABLE ROW LEVEL SECURITY;
ALTER TABLE regional_associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Criar políticas simples e seguras para profiles
CREATE POLICY "profiles_own_access" ON profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "profiles_admin_access" ON profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email = 'admin@fcbb.cv'
        )
    );

-- Criar políticas para todas as outras tabelas (acesso público para leitura, admin para escrita)
DO $$
DECLARE
    table_name TEXT;
BEGIN
    FOR table_name IN 
        SELECT unnest(ARRAY['federations', 'regional_associations', 'clubs', 'championships', 'teams', 'players', 'coaches', 'referees', 'games', 'news', 'events'])
    LOOP
        -- Política de leitura pública
        EXECUTE format('CREATE POLICY "%s_public_read" ON %I FOR SELECT USING (true)', table_name, table_name);
        
        -- Política de escrita para admin
        EXECUTE format('CREATE POLICY "%s_admin_write" ON %I FOR INSERT, UPDATE, DELETE USING (
            EXISTS (
                SELECT 1 FROM auth.users 
                WHERE auth.users.id = auth.uid() 
                AND auth.users.email = ''admin@fcbb.cv''
            )
        )', table_name, table_name);
    END LOOP;
END $$;

-- Garantir que o perfil admin existe
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
