
-- Criar tabelas para suportar a estrutura completa do site FCBB

-- Tabela para configurações do site
CREATE TABLE IF NOT EXISTS public.site_config (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para competições/campeonatos mais detalhada
ALTER TABLE public.championships ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE public.championships ADD COLUMN IF NOT EXISTS venue text;
ALTER TABLE public.championships ADD COLUMN IF NOT EXISTS prize_money numeric(10,2);
ALTER TABLE public.championships ADD COLUMN IF NOT EXISTS regulations_url text;
ALTER TABLE public.championships ADD COLUMN IF NOT EXISTS sponsors jsonb DEFAULT '[]'::jsonb;

-- Tabela para classificações
CREATE TABLE IF NOT EXISTS public.standings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  championship_id uuid REFERENCES public.championships(id) ON DELETE CASCADE,
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
  position integer NOT NULL,
  played integer DEFAULT 0,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  points_for integer DEFAULT 0,
  points_against integer DEFAULT 0,
  points integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para estatísticas de jogadores
CREATE TABLE IF NOT EXISTS public.player_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id uuid REFERENCES public.players(id) ON DELETE CASCADE,
  championship_id uuid REFERENCES public.championships(id) ON DELETE CASCADE,
  games_played integer DEFAULT 0,
  points_per_game numeric(5,2) DEFAULT 0,
  rebounds_per_game numeric(5,2) DEFAULT 0,
  assists_per_game numeric(5,2) DEFAULT 0,
  steals_per_game numeric(5,2) DEFAULT 0,
  blocks_per_game numeric(5,2) DEFAULT 0,
  field_goal_percentage numeric(5,2) DEFAULT 0,
  free_throw_percentage numeric(5,2) DEFAULT 0,
  three_point_percentage numeric(5,2) DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para convocações das seleções
CREATE TABLE IF NOT EXISTS public.national_team_callups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id uuid REFERENCES public.players(id) ON DELETE CASCADE,
  competition_name text NOT NULL,
  callup_date date NOT NULL,
  team_category text NOT NULL, -- 'senior_masculino', 'senior_feminino', 'sub18_masculino', etc.
  status text DEFAULT 'convocado', -- 'convocado', 'dispensado', 'lesionado'
  position text,
  jersey_number integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para documentos oficiais
CREATE TABLE IF NOT EXISTS public.official_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  document_type text NOT NULL, -- 'regulamento', 'acta', 'comunicado', 'estatuto'
  file_url text NOT NULL,
  file_size integer,
  file_type text,
  category text DEFAULT 'geral',
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  download_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para calendário de eventos
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  event_type text NOT NULL, -- 'jogo', 'reuniao', 'assembleia', 'formacao'
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone,
  location text,
  organizer text,
  status text DEFAULT 'agendado', -- 'agendado', 'em_curso', 'concluido', 'cancelado'
  related_championship_id uuid REFERENCES public.championships(id),
  related_game_id uuid REFERENCES public.games(id),
  participants jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para transferências de jogadores
CREATE TABLE IF NOT EXISTS public.player_transfers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id uuid REFERENCES public.players(id) ON DELETE CASCADE,
  from_club_id uuid REFERENCES public.clubs(id),
  to_club_id uuid REFERENCES public.clubs(id),
  transfer_date date NOT NULL,
  transfer_type text NOT NULL, -- 'emprestimo', 'transferencia_definitiva', 'renovacao'
  season text NOT NULL,
  transfer_fee numeric(10,2),
  contract_duration text,
  status text DEFAULT 'pendente', -- 'pendente', 'aprovada', 'rejeitada'
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Tabela para arbitragem expandida
ALTER TABLE public.referees ADD COLUMN IF NOT EXISTS experience_years integer;
ALTER TABLE public.referees ADD COLUMN IF NOT EXISTS specialties jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.referees ADD COLUMN IF NOT EXISTS availability jsonb DEFAULT '{}'::jsonb;

-- Tabela para treinadores/técnicos
CREATE TABLE IF NOT EXISTS public.coaches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_date date,
  nationality text DEFAULT 'CV',
  photo_url text,
  current_club_id uuid REFERENCES public.clubs(id),
  coaching_level text, -- 'nivel_1', 'nivel_2', 'nivel_3', 'internacional'
  license_number text,
  license_expiry date,
  specialization text, -- 'formacao', 'senior', 'performance'
  experience_years integer,
  achievements jsonb DEFAULT '[]'::jsonb,
  contact_phone text,
  contact_email text,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Adicionar mais campos às tabelas existentes
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS president_name text;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS vice_president_name text;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS secretary_name text;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS treasurer_name text;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS technical_director_name text;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS home_venue text;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS training_facilities jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS social_media jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.clubs ADD COLUMN IF NOT EXISTS achievements jsonb DEFAULT '[]'::jsonb;

-- Atualizar tabela de jogos
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS referee_id uuid REFERENCES public.referees(id);
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS assistant_referee_1_id uuid REFERENCES public.referees(id);
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS assistant_referee_2_id uuid REFERENCES public.referees(id);
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS attendance integer;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS weather_conditions text;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS live_stream_url text;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS highlights_url text;

-- Tabela para histórico de campeonatos
CREATE TABLE IF NOT EXISTS public.championship_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  year integer NOT NULL,
  championship_name text NOT NULL,
  champion_club_id uuid REFERENCES public.clubs(id),
  runner_up_club_id uuid REFERENCES public.clubs(id),
  third_place_club_id uuid REFERENCES public.clubs(id),
  mvp_player_id uuid REFERENCES public.players(id),
  top_scorer_player_id uuid REFERENCES public.players(id),
  total_games integer,
  total_attendance integer,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Adicionar políticas RLS
ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.national_team_callups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.championship_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para leitura
CREATE POLICY "Public read access" ON public.standings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.player_stats FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.national_team_callups FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.official_documents FOR SELECT USING (published = true);
CREATE POLICY "Public read access" ON public.calendar_events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.player_transfers FOR SELECT USING (status = 'aprovada');
CREATE POLICY "Public read access" ON public.coaches FOR SELECT USING (active = true);
CREATE POLICY "Public read access" ON public.championship_history FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.site_config FOR SELECT USING (true);

-- Políticas de acesso admin para todas as operações
CREATE POLICY "Admin full access" ON public.standings FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.player_stats FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.national_team_callups FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.official_documents FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.calendar_events FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.player_transfers FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.coaches FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.championship_history FOR ALL USING (is_current_user_admin());
CREATE POLICY "Admin full access" ON public.site_config FOR ALL USING (is_current_user_admin());

-- Inserir dados iniciais de configuração
INSERT INTO public.site_config (key, value, description) VALUES 
('site_title', 'Federação Cabo-verdiana de Basquetebol', 'Título principal do site'),
('site_description', 'Órgão máximo do basquetebol em Cabo Verde', 'Descrição do site'),
('contact_email', 'geral@fcbb.cv', 'Email principal de contacto'),
('contact_phone', '+238 260 12 34', 'Telefone principal'),
('address', 'Praia, Santiago, Cabo Verde', 'Morada da sede'),
('fiba_ranking', '64', 'Posição no ranking FIBA'),
('foundation_year', '1986', 'Ano de fundação da FCBB'),
('affiliated_clubs', '50', 'Número de clubes filiados'),
('active_islands', '9', 'Ilhas com competições ativas')
ON CONFLICT (key) DO NOTHING;

-- Inserir dados de exemplo para demonstração
INSERT INTO public.championship_history (year, championship_name, notes) VALUES 
(2024, 'Campeonato Nacional Masculino', 'Edição com maior participação da história'),
(2023, 'Campeonato Nacional Masculino', 'Ano de classificação para o Mundial FIBA'),
(2022, 'Campeonato Nacional Masculino', 'Primeira edição pós-pandemia')
ON CONFLICT DO NOTHING;
