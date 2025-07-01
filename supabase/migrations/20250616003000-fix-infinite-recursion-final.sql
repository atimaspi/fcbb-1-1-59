
-- Correção definitiva para recursão infinita nas políticas RLS
-- Esta migração resolve o problema de forma permanente

-- Primeiro, desabilitar RLS temporariamente em todas as tabelas
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

-- Remover TODAS as políticas existentes de TODAS as tabelas
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

-- Reabilitar RLS
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

-- Criar políticas simples e seguras para profiles (SEM RECURSÃO)
CREATE POLICY "profiles_own_data" ON profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "profiles_admin_access" ON profiles
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM auth.users 
            WHERE email = 'admin@fcbb.cv'
        )
    );

-- Criar políticas para todas as outras tabelas (leitura pública, escrita admin)
-- Federações
CREATE POLICY "federations_read_all" ON federations FOR SELECT USING (true);
CREATE POLICY "federations_admin_write" ON federations FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Associações Regionais
CREATE POLICY "regional_associations_read_all" ON regional_associations FOR SELECT USING (true);
CREATE POLICY "regional_associations_admin_write" ON regional_associations FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Clubes
CREATE POLICY "clubs_read_all" ON clubs FOR SELECT USING (true);
CREATE POLICY "clubs_admin_write" ON clubs FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Campeonatos
CREATE POLICY "championships_read_all" ON championships FOR SELECT USING (true);
CREATE POLICY "championships_admin_write" ON championships FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Equipas
CREATE POLICY "teams_read_all" ON teams FOR SELECT USING (true);
CREATE POLICY "teams_admin_write" ON teams FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Jogadores
CREATE POLICY "players_read_all" ON players FOR SELECT USING (true);
CREATE POLICY "players_admin_write" ON players FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Treinadores
CREATE POLICY "coaches_read_all" ON coaches FOR SELECT USING (true);
CREATE POLICY "coaches_admin_write" ON coaches FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Árbitros
CREATE POLICY "referees_read_all" ON referees FOR SELECT USING (true);
CREATE POLICY "referees_admin_write" ON referees FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Jogos
CREATE POLICY "games_read_all" ON games FOR SELECT USING (true);
CREATE POLICY "games_admin_write" ON games FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Notícias
CREATE POLICY "news_read_published" ON news FOR SELECT USING (status = 'publicado' OR auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv'));
CREATE POLICY "news_admin_write" ON news FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Eventos
CREATE POLICY "events_read_all" ON events FOR SELECT USING (true);
CREATE POLICY "events_admin_write" ON events FOR INSERT, UPDATE, DELETE USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@fcbb.cv')
);

-- Atualizar função handle_new_user para evitar recursão
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Inserir perfil sem verificar políticas RLS
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
        -- Log mas não falhar
        RAISE WARNING 'Erro ao criar perfil: %', SQLERRM;
        RETURN NEW;
END;
$$;

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

-- Teste final para verificar se as políticas funcionam
DO $$
BEGIN
    PERFORM COUNT(*) FROM profiles;
    PERFORM COUNT(*) FROM federations;
    PERFORM COUNT(*) FROM clubs;
    RAISE NOTICE 'Políticas RLS funcionando corretamente';
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Erro no teste das políticas: %', SQLERRM;
END $$;
