
-- Fix infinite recursion in profiles table policies
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on email" ON profiles;

-- Create new, non-recursive policies
CREATE POLICY "profiles_select_own" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow admins to view all profiles (non-recursive)
CREATE POLICY "profiles_admin_all" ON profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.email = 'admin@fcbb.cv'
        )
    );

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive backend tables for FCBB
CREATE TABLE IF NOT EXISTS competitions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'liga', 'taca', 'regional', 'juventude'
    season VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'ativo', -- 'ativo', 'concluido', 'suspenso'
    start_date DATE,
    end_date DATE,
    description TEXT,
    regulations_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(10),
    founded_year INTEGER,
    city VARCHAR(100),
    island VARCHAR(50),
    logo_url TEXT,
    website TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    president_name VARCHAR(255),
    coach_name VARCHAR(255),
    home_venue VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES teams(id),
    name VARCHAR(255) NOT NULL,
    jersey_number INTEGER,
    position VARCHAR(50), -- 'Base', 'Escolta', 'Ala', 'Ala-Pivot', 'Pivot'
    height_cm INTEGER,
    weight_kg INTEGER,
    birth_date DATE,
    nationality VARCHAR(100) DEFAULT 'Cabo-verdiana',
    photo_url TEXT,
    license_number VARCHAR(100),
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    competition_id UUID REFERENCES competitions(id),
    home_team_id UUID REFERENCES teams(id),
    away_team_id UUID REFERENCES teams(id),
    game_date TIMESTAMP WITH TIME ZONE,
    venue VARCHAR(255),
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'agendado', -- 'agendado', 'ao_vivo', 'finalizado', 'cancelado'
    quarter_1_home INTEGER DEFAULT 0,
    quarter_1_away INTEGER DEFAULT 0,
    quarter_2_home INTEGER DEFAULT 0,
    quarter_2_away INTEGER DEFAULT 0,
    quarter_3_home INTEGER DEFAULT 0,
    quarter_3_away INTEGER DEFAULT 0,
    quarter_4_home INTEGER DEFAULT 0,
    quarter_4_away INTEGER DEFAULT 0,
    overtime_home INTEGER DEFAULT 0,
    overtime_away INTEGER DEFAULT 0,
    referee_1 VARCHAR(255),
    referee_2 VARCHAR(255),
    referee_3 VARCHAR(255),
    attendance INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS player_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    game_id UUID REFERENCES games(id),
    player_id UUID REFERENCES players(id),
    team_id UUID REFERENCES teams(id),
    minutes_played INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    field_goals_made INTEGER DEFAULT 0,
    field_goals_attempted INTEGER DEFAULT 0,
    three_pointers_made INTEGER DEFAULT 0,
    three_pointers_attempted INTEGER DEFAULT 0,
    free_throws_made INTEGER DEFAULT 0,
    free_throws_attempted INTEGER DEFAULT 0,
    rebounds_offensive INTEGER DEFAULT 0,
    rebounds_defensive INTEGER DEFAULT 0,
    rebounds_total INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    steals INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    turnovers INTEGER DEFAULT 0,
    fouls INTEGER DEFAULT 0,
    plus_minus INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS national_teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- 'Seleção Sénior Masculina', 'Seleção Sénior Feminina', etc.
    category VARCHAR(100) NOT NULL, -- 'senior', 'sub-18', 'sub-16'
    gender VARCHAR(20) NOT NULL, -- 'masculino', 'feminino'
    coach_name VARCHAR(255),
    assistant_coach VARCHAR(255),
    manager VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS national_team_players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    national_team_id UUID REFERENCES national_teams(id),
    player_id UUID REFERENCES players(id),
    call_up_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'ativo', -- 'ativo', 'lesionado', 'suspenso', 'indisponivel'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    author_id UUID REFERENCES profiles(id),
    category VARCHAR(100) DEFAULT 'geral',
    tags TEXT[], -- Array of tags
    status VARCHAR(50) DEFAULT 'publicado', -- 'rascunho', 'publicado', 'arquivado'
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    event_type VARCHAR(100), -- 'jogo', 'treino', 'formacao', 'assembleia', 'outros'
    max_participants INTEGER,
    registration_required BOOLEAN DEFAULT false,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500),
    description TEXT,
    media_type VARCHAR(50) NOT NULL, -- 'image', 'video'
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(100), -- 'jogos', 'treinos', 'eventos', 'selecoes'
    tags TEXT[],
    game_id UUID REFERENCES games(id), -- Link to specific game if applicable
    event_id UUID REFERENCES events(id), -- Link to specific event if applicable
    uploaded_by UUID REFERENCES profiles(id),
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    level VARCHAR(50), -- 'Nacional', 'Regional', 'Local', 'Internacional'
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    birth_date DATE,
    license_expiry DATE,
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coaches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    level VARCHAR(50), -- 'Nível 1', 'Nível 2', 'Nível 3', 'Nível 4'
    email VARCHAR(255),
    phone VARCHAR(50),
    current_team_id UUID REFERENCES teams(id),
    specialization VARCHAR(100), -- 'Formação', 'Sénior', 'Preparação Física'
    experience_years INTEGER,
    license_expiry DATE,
    status VARCHAR(50) DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for all tables
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

-- Public read policies for most tables
CREATE POLICY "competitions_read" ON competitions FOR SELECT USING (true);
CREATE POLICY "teams_read" ON teams FOR SELECT USING (true);
CREATE POLICY "players_read" ON players FOR SELECT USING (true);
CREATE POLICY "games_read" ON games FOR SELECT USING (true);
CREATE POLICY "player_stats_read" ON player_stats FOR SELECT USING (true);
CREATE POLICY "national_teams_read" ON national_teams FOR SELECT USING (true);
CREATE POLICY "national_team_players_read" ON national_team_players FOR SELECT USING (true);
CREATE POLICY "news_read" ON news FOR SELECT USING (status = 'publicado');
CREATE POLICY "events_read" ON events FOR SELECT USING (true);
CREATE POLICY "media_gallery_read" ON media_gallery FOR SELECT USING (true);
CREATE POLICY "referees_read" ON referees FOR SELECT USING (true);
CREATE POLICY "coaches_read" ON coaches FOR SELECT USING (true);

-- Admin-only write policies
CREATE POLICY "competitions_admin_write" ON competitions 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "teams_admin_write" ON teams 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "players_admin_write" ON players 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "games_admin_write" ON games 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "player_stats_admin_write" ON player_stats 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "news_admin_write" ON news 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'editor')
        )
    );

CREATE POLICY "events_admin_write" ON events 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Insert sample data
INSERT INTO teams (name, abbreviation, city, island, founded_year) VALUES
('Sporting Clube de Cabo Verde', 'SCV', 'Praia', 'Santiago', 1923),
('Clube Desportivo Travadores', 'CDT', 'Cidade Velha', 'Santiago', 1975),
('Académica do Porto Novo', 'APN', 'Porto Novo', 'Santo Antão', 1960),
('Clube Sport Mindelense', 'CSM', 'Mindelo', 'São Vicente', 1922),
('Barreirense Clube', 'BC', 'Santa Cruz', 'Santiago', 1985),
('ABC Basket Clube', 'ABC', 'Espargos', 'Sal', 1990)
ON CONFLICT DO NOTHING;

INSERT INTO competitions (name, type, season, status, start_date, end_date) VALUES
('Liga Nacional Masculina', 'liga', '2024/2025', 'ativo', '2024-10-15', '2025-04-30'),
('Liga Nacional Feminina', 'liga', '2024/2025', 'ativo', '2024-11-01', '2025-05-15'),
('Taça de Cabo Verde', 'taca', '2024/2025', 'ativo', '2024-12-01', '2025-06-15'),
('Super Taça', 'taca', '2024/2025', 'programado', '2025-09-15', '2025-09-15')
ON CONFLICT DO NOTHING;

INSERT INTO national_teams (name, category, gender, coach_name) VALUES
('Seleção Sénior Masculina', 'senior', 'masculino', 'Emanuel Trovoada'),
('Seleção Sénior Feminina', 'senior', 'feminino', 'Ana Silva'),
('Seleção Sub-18 Masculina', 'sub-18', 'masculino', 'Pedro Santos'),
('Seleção Sub-18 Feminina', 'sub-18', 'feminino', 'Maria Tavares'),
('Seleção Sub-16 Masculina', 'sub-16', 'masculino', 'João Fonseca'),
('Seleção Sub-16 Feminina', 'sub-16', 'feminino', 'Isabel Monteiro')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_competition_date ON games(competition_id, game_date);
CREATE INDEX IF NOT EXISTS idx_player_stats_game ON player_stats(game_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_player ON player_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at DESC, status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_media_category ON media_gallery(category);
