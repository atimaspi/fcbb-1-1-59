
-- Correção definitiva para o problema de recursão infinita nas políticas RLS
-- Esta migração resolve o problema permanentemente

-- Primeiro, desabilitar RLS temporariamente para limpar todas as políticas
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE federations DISABLE ROW LEVEL SECURITY;
ALTER TABLE regional_associations DISABLE ROW LEVEL SECURITY;
ALTER TABLE clubs DISABLE ROW LEVEL SECURITY;
ALTER TABLE championships DISABLE ROW LEVEL SECURITY;
ALTER TABLE teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE players DISABLE ROW LEVEL SECURITY;
ALTER TABLE referees DISABLE ROW LEVEL SECURITY;
ALTER TABLE games DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
ALTER TABLE ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_results DISABLE ROW LEVEL SECURITY;
ALTER TABLE integrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs DISABLE ROW LEVEL SECURITY;

-- Remover TODAS as políticas existentes de TODAS as tabelas
DO $$ 
DECLARE
    table_name TEXT;
    policy_name TEXT;
BEGIN
    FOR table_name IN 
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN ('profiles', 'federations', 'regional_associations', 'clubs', 'championships', 'teams', 'players', 'referees', 'games', 'news', 'events', 'ads', 'gallery', 'gallery_images', 'game_results', 'integrations', 'contact_messages', 'sync_logs')
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

-- Criar função segura para verificar se é admin (SEM RECURSÃO)
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email = 'admin@fcbb.cv'
  );
$$;

-- Reabilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE federations ENABLE ROW LEVEL SECURITY;
ALTER TABLE regional_associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Criar políticas simples e seguras para profiles (SEM RECURSÃO)
CREATE POLICY "profiles_select_own" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON profiles
    FOR ALL USING (public.is_current_user_admin());

-- Criar políticas para todas as outras tabelas (leitura pública, escrita admin)
-- Federações
CREATE POLICY "federations_select_all" ON federations FOR SELECT USING (true);
CREATE POLICY "federations_admin_all" ON federations FOR ALL USING (public.is_current_user_admin());

-- Associações Regionais
CREATE POLICY "regional_associations_select_all" ON regional_associations FOR SELECT USING (true);
CREATE POLICY "regional_associations_admin_all" ON regional_associations FOR ALL USING (public.is_current_user_admin());

-- Clubes
CREATE POLICY "clubs_select_all" ON clubs FOR SELECT USING (true);
CREATE POLICY "clubs_admin_all" ON clubs FOR ALL USING (public.is_current_user_admin());

-- Campeonatos
CREATE POLICY "championships_select_all" ON championships FOR SELECT USING (true);
CREATE POLICY "championships_admin_all" ON championships FOR ALL USING (public.is_current_user_admin());

-- Equipas
CREATE POLICY "teams_select_all" ON teams FOR SELECT USING (true);
CREATE POLICY "teams_admin_all" ON teams FOR ALL USING (public.is_current_user_admin());

-- Jogadores
CREATE POLICY "players_select_all" ON players FOR SELECT USING (true);
CREATE POLICY "players_admin_all" ON players FOR ALL USING (public.is_current_user_admin());

-- Árbitros
CREATE POLICY "referees_select_all" ON referees FOR SELECT USING (true);
CREATE POLICY "referees_admin_all" ON referees FOR ALL USING (public.is_current_user_admin());

-- Jogos
CREATE POLICY "games_select_all" ON games FOR SELECT USING (true);
CREATE POLICY "games_admin_all" ON games FOR ALL USING (public.is_current_user_admin());

-- Resultados de Jogos
CREATE POLICY "game_results_select_all" ON game_results FOR SELECT USING (true);
CREATE POLICY "game_results_admin_all" ON game_results FOR ALL USING (public.is_current_user_admin());

-- Notícias
CREATE POLICY "news_select_published" ON news FOR SELECT USING (status = 'publicado' OR public.is_current_user_admin());
CREATE POLICY "news_admin_all" ON news FOR ALL USING (public.is_current_user_admin());

-- Eventos
CREATE POLICY "events_select_all" ON events FOR SELECT USING (true);
CREATE POLICY "events_admin_all" ON events FOR ALL USING (public.is_current_user_admin());

-- Anúncios
CREATE POLICY "ads_select_all" ON ads FOR SELECT USING (true);
CREATE POLICY "ads_admin_all" ON ads FOR ALL USING (public.is_current_user_admin());

-- Galeria
CREATE POLICY "gallery_select_all" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery_admin_all" ON gallery FOR ALL USING (public.is_current_user_admin());

-- Imagens da Galeria
CREATE POLICY "gallery_images_select_all" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "gallery_images_admin_all" ON gallery_images FOR ALL USING (public.is_current_user_admin());

-- Integrações
CREATE POLICY "integrations_admin_all" ON integrations FOR ALL USING (public.is_current_user_admin());

-- Mensagens de Contacto
CREATE POLICY "contact_messages_select_all" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "contact_messages_admin_all" ON contact_messages FOR ALL USING (public.is_current_user_admin());

-- Logs de Sincronização
CREATE POLICY "sync_logs_admin_all" ON sync_logs FOR ALL USING (public.is_current_user_admin());

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
