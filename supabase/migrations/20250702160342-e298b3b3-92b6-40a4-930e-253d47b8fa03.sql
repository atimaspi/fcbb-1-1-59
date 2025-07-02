
-- Criar tabela de classificações (standings)
CREATE TABLE IF NOT EXISTS public.standings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  championship_id UUID REFERENCES public.championships(id) ON DELETE CASCADE,
  team_id UUID NOT NULL,
  position INTEGER NOT NULL,
  played INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  draws INTEGER DEFAULT 0,
  points_for INTEGER NOT NULL DEFAULT 0,
  points_against INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para a tabela standings
ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;

-- Política para admin gerir classificações
CREATE POLICY "standings_admin_all" 
  ON public.standings 
  FOR ALL 
  USING (is_current_user_admin());

-- Política para leitura pública
CREATE POLICY "standings_select_all" 
  ON public.standings 
  FOR SELECT 
  USING (true);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_standings_championship ON public.standings(championship_id);
CREATE INDEX IF NOT EXISTS idx_standings_position ON public.standings(championship_id, position);
