
-- Criar tabela de roles/permissões
CREATE TYPE user_role AS ENUM ('redator', 'revisor', 'admin');

CREATE TYPE content_status AS ENUM ('rascunho', 'em_analise', 'publicado', 'rejeitado');

-- Atualizar tabela de profiles para incluir roles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'redator';

-- Criar tabela para histórico de edições
CREATE TABLE content_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'created', 'updated', 'approved', 'rejected', 'published'
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para agendamento de publicações
CREATE TABLE scheduled_publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para notificações internas
CREATE TABLE internal_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- 'content_pending', 'content_approved', 'content_rejected'
  read BOOLEAN DEFAULT FALSE,
  content_type TEXT,
  content_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para métricas de desempenho
CREATE TABLE content_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  views INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(content_type, content_id)
);

-- Criar tabela para seleções nacionais
CREATE TABLE national_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'senior_masculino', 'senior_feminino', 'sub21_masculino', etc.
  description TEXT,
  image_url TEXT,
  coach_name TEXT,
  assistant_coach TEXT,
  current_roster JSONB DEFAULT '[]',
  achievements JSONB DEFAULT '[]',
  status content_status DEFAULT 'rascunho',
  author_id UUID REFERENCES auth.users(id),
  reviewer_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_publish_at TIMESTAMP WITH TIME ZONE
);

-- Atualizar tabela de referees existente com campos de workflow
ALTER TABLE referees ADD COLUMN IF NOT EXISTS status content_status DEFAULT 'rascunho';
ALTER TABLE referees ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);
ALTER TABLE referees ADD COLUMN IF NOT EXISTS reviewer_id UUID REFERENCES auth.users(id);

-- Criar tabela para formação
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  program_type TEXT NOT NULL, -- 'coaching', 'referee', 'player_development'
  target_audience TEXT,
  duration_hours INTEGER,
  start_date DATE,
  end_date DATE,
  location TEXT,
  instructor TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  requirements TEXT,
  certification TEXT,
  cost DECIMAL(10,2),
  image_url TEXT,
  additional_media JSONB DEFAULT '[]',
  status content_status DEFAULT 'rascunho',
  author_id UUID REFERENCES auth.users(id),
  reviewer_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Criar tabela para transmissões
CREATE TABLE broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  broadcast_type TEXT NOT NULL, -- 'live', 'replay', 'highlights'
  platform TEXT NOT NULL, -- 'youtube', 'facebook', 'tv', 'website'
  stream_url TEXT,
  game_id UUID REFERENCES games(id),
  scheduled_start TIMESTAMP WITH TIME ZONE,
  actual_start TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  viewers_count INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'live', 'ended', 'cancelled'
  technical_quality TEXT, -- 'HD', '4K', 'SD'
  commentary_language TEXT DEFAULT 'pt',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para membros da direção
CREATE TABLE federation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  phone TEXT,
  start_date DATE,
  end_date DATE,
  active BOOLEAN DEFAULT TRUE,
  order_priority INTEGER DEFAULT 0,
  social_media JSONB DEFAULT '{}',
  qualifications JSONB DEFAULT '[]',
  responsibilities TEXT,
  status content_status DEFAULT 'rascunho',
  author_id UUID REFERENCES auth.users(id),
  reviewer_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Atualizar tabelas existentes com campos de workflow
ALTER TABLE news ADD COLUMN IF NOT EXISTS status content_status DEFAULT 'rascunho';
ALTER TABLE news ADD COLUMN IF NOT EXISTS reviewer_id UUID REFERENCES auth.users(id);
ALTER TABLE news ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE championships ADD COLUMN IF NOT EXISTS status_publicacao content_status DEFAULT 'rascunho';
ALTER TABLE championships ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);
ALTER TABLE championships ADD COLUMN IF NOT EXISTS reviewer_id UUID REFERENCES auth.users(id);

ALTER TABLE clubs ADD COLUMN IF NOT EXISTS status_publicacao content_status DEFAULT 'rascunho';
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS reviewer_id UUID REFERENCES auth.users(id);

ALTER TABLE gallery ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id);
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS reviewer_id UUID REFERENCES auth.users(id);

-- Criar função para atualizar métricas
CREATE OR REPLACE FUNCTION update_content_metrics(
  p_content_type TEXT,
  p_content_id UUID,
  p_metric_type TEXT,
  p_increment INTEGER DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO content_metrics (content_type, content_id, views, shares, likes, comments)
  VALUES (p_content_type, p_content_id, 
    CASE WHEN p_metric_type = 'views' THEN p_increment ELSE 0 END,
    CASE WHEN p_metric_type = 'shares' THEN p_increment ELSE 0 END,
    CASE WHEN p_metric_type = 'likes' THEN p_increment ELSE 0 END,
    CASE WHEN p_metric_type = 'comments' THEN p_increment ELSE 0 END
  )
  ON CONFLICT (content_type, content_id) 
  DO UPDATE SET
    views = content_metrics.views + CASE WHEN p_metric_type = 'views' THEN p_increment ELSE 0 END,
    shares = content_metrics.shares + CASE WHEN p_metric_type = 'shares' THEN p_increment ELSE 0 END,
    likes = content_metrics.likes + CASE WHEN p_metric_type = 'likes' THEN p_increment ELSE 0 END,
    comments = content_metrics.comments + CASE WHEN p_metric_type = 'comments' THEN p_increment ELSE 0 END,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Criar função para criar notificações
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT,
  p_content_type TEXT DEFAULT NULL,
  p_content_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO internal_notifications (user_id, title, message, type, content_type, content_id)
  VALUES (p_user_id, p_title, p_message, p_type, p_content_type, p_content_id);
END;
$$ LANGUAGE plpgsql;

-- Criar políticas RLS
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE national_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE federation_members ENABLE ROW LEVEL SECURITY;

-- Políticas para content_history
CREATE POLICY "Users can view content history" ON content_history
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create content history" ON content_history
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para notificações
CREATE POLICY "Users can view their notifications" ON internal_notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" ON internal_notifications
FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para métricas (públicas para leitura)
CREATE POLICY "Public can view content metrics" ON content_metrics
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update metrics" ON content_metrics
FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para seleções nacionais
CREATE POLICY "Public can view published national teams" ON national_teams
FOR SELECT USING (status = 'publicado');

CREATE POLICY "Authors can manage their national teams" ON national_teams
FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Reviewers can review national teams" ON national_teams
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('revisor', 'admin')
  )
);

-- Políticas para referees
CREATE POLICY "Public can view published referees" ON referees
FOR SELECT USING (status = 'publicado' OR status IS NULL);

CREATE POLICY "Authors can manage their referees" ON referees
FOR ALL USING (auth.uid() = author_id);

-- Políticas similares para outras tabelas
CREATE POLICY "Public can view published training programs" ON training_programs
FOR SELECT USING (status = 'publicado');

CREATE POLICY "Authors can manage their training programs" ON training_programs
FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Public can view active broadcasts" ON broadcasts
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage broadcasts" ON broadcasts
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view active federation members" ON federation_members
FOR SELECT USING (status = 'publicado' AND active = true);

CREATE POLICY "Authenticated users can manage federation members" ON federation_members
FOR ALL USING (auth.role() = 'authenticated');

-- Criar índices para performance
CREATE INDEX idx_content_history_content ON content_history(content_type, content_id);
CREATE INDEX idx_content_history_user ON content_history(user_id);
CREATE INDEX idx_notifications_user ON internal_notifications(user_id, read);
CREATE INDEX idx_metrics_content ON content_metrics(content_type, content_id);
CREATE INDEX idx_scheduled_publications_date ON scheduled_publications(scheduled_date);
CREATE INDEX idx_national_teams_status ON national_teams(status);
CREATE INDEX idx_training_programs_dates ON training_programs(start_date, end_date);
CREATE INDEX idx_broadcasts_scheduled ON broadcasts(scheduled_start);
CREATE INDEX idx_federation_members_active ON federation_members(active, order_priority);
