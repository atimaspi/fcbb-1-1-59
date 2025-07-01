
-- Expansão da database com tabelas para jogos, resultados e galerias

-- Tabela para armazenar resultados de jogos
CREATE TABLE IF NOT EXISTS public.game_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
  home_team_score INTEGER NOT NULL DEFAULT 0,
  away_team_score INTEGER NOT NULL DEFAULT 0,
  quarter_scores JSONB, -- Pontuações por quarter
  player_stats JSONB, -- Estatísticas dos jogadores
  team_stats JSONB, -- Estatísticas das equipas
  referee_id UUID REFERENCES public.referees(id),
  game_status TEXT DEFAULT 'scheduled' CHECK (game_status IN ('scheduled', 'live', 'finished', 'postponed', 'cancelled')),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para imagens das galerias
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES public.gallery(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  alt_text TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para configurações de integração
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- 'api', 'calendar', 'analytics'
  config JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT false,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para logs de sincronização
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'warning')),
  message TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índices para performance
CREATE INDEX IF NOT EXISTS idx_game_results_game_id ON public.game_results(game_id);
CREATE INDEX IF NOT EXISTS idx_game_results_status ON public.game_results(game_status);
CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery_id ON public.gallery_images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON public.gallery_images(gallery_id, order_index);
CREATE INDEX IF NOT EXISTS idx_integrations_type ON public.integrations(type);
CREATE INDEX IF NOT EXISTS idx_integrations_active ON public.integrations(is_active);

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.game_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para game_results
CREATE POLICY "Allow public read access to game results" ON public.game_results
  FOR SELECT USING (true);

CREATE POLICY "Allow admin insert/update game results" ON public.game_results
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Allow admin update game results" ON public.game_results
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas RLS para gallery_images
CREATE POLICY "Allow public read access to published gallery images" ON public.gallery_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.gallery 
      WHERE id = gallery_images.gallery_id AND status = 'published'
    )
  );

CREATE POLICY "Allow admin full access to gallery images" ON public.gallery_images
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas RLS para integrations (apenas admin)
CREATE POLICY "Allow admin full access to integrations" ON public.integrations
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Políticas RLS para sync_logs (apenas admin)
CREATE POLICY "Allow admin read access to sync logs" ON public.sync_logs
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Função para atualizar contador de imagens na galeria
CREATE OR REPLACE FUNCTION update_gallery_image_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.gallery 
    SET image_count = (
      SELECT COUNT(*) FROM public.gallery_images 
      WHERE gallery_id = NEW.gallery_id
    )
    WHERE id = NEW.gallery_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.gallery 
    SET image_count = (
      SELECT COUNT(*) FROM public.gallery_images 
      WHERE gallery_id = OLD.gallery_id
    )
    WHERE id = OLD.gallery_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar contador automaticamente
CREATE TRIGGER trigger_update_gallery_image_count
  AFTER INSERT OR DELETE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_gallery_image_count();

-- Inserir algumas integrações padrão
INSERT INTO public.integrations (name, type, config, is_active) VALUES
  ('FIBA Live Stats', 'api', '{"base_url": "https://api.fiba.basketball", "version": "v1"}', false),
  ('Google Calendar', 'calendar', '{"calendar_id": "", "timezone": "Atlantic/Cape_Verde"}', false),
  ('Google Analytics', 'analytics', '{"tracking_id": "", "property_id": ""}', false)
ON CONFLICT (name) DO NOTHING;
