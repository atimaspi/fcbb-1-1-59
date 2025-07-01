
-- Tabela para gerenciar slides do banner principal
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT DEFAULT 'Ver Mais',
  cta_link TEXT DEFAULT '/',
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela para estatísticas em tempo real
CREATE TABLE public.basketball_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  stat_name TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  icon_name TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela para parceiros oficiais
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  category TEXT DEFAULT 'sponsor',
  description TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela para configurações gerais do site
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_name TEXT NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type TEXT DEFAULT 'text',
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir algumas estatísticas iniciais
INSERT INTO public.basketball_stats (stat_key, stat_name, stat_value, icon_name, description) VALUES
('total_clubs', 'Clubes Licenciados', '24', 'trophy', 'Número total de clubes licenciados pela FCBB'),
('total_athletes', 'Atletas Federados', '1,250+', 'users', 'Atletas registados em todas as categorias'),
('games_per_season', 'Jogos por Época', '180+', 'calendar', 'Jogos realizados na época atual'),
('islands_covered', 'Ilhas Abrangidas', '9', 'map-pin', 'Ilhas com atividade de basquetebol organizada');

-- Inserir alguns slides iniciais para o banner
INSERT INTO public.hero_slides (title, subtitle, description, image_url, cta_text, cta_link, order_index) VALUES
('Seleção Nacional conquista histórica vitória', 'AfroBasket 2024', 'Cabo Verde marca presença no cenário internacional do basquetebol', 'https://images.unsplash.com/photo-1546519638-68e109498ffc', 'Ver Resultados', '/resultados', 1),
('Liga Nacional 2024/25 em grande', '12 equipas disputam o título', 'A nova época promete ser emocionante com clubes renovados', 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4', 'Classificações', '/classificacoes', 2),
('Desenvolvimento do Basquetebol Feminino', 'Programa especial de formação', 'FCBB investe no crescimento do basquetebol feminino', 'https://images.unsplash.com/photo-1552847661-dddc6d9e71ba', 'Saber Mais', '/selecoes/feminina', 3);

-- Inserir alguns parceiros iniciais
INSERT INTO public.partners (name, logo_url, category, description, order_index) VALUES
('Governo de Cabo Verde', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'institutional', 'Parceiro Institucional', 1),
('Câmara Municipal da Praia', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'institutional', 'Parceiro Municipal', 2),
('FIBA Africa', '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png', 'federation', 'Federação Continental', 3);

-- Inserir configurações gerais do site
INSERT INTO public.site_settings (setting_key, setting_name, setting_value, setting_type, description) VALUES
('site_title', 'Título do Site', 'FCBB - Federação Cabo-verdiana de Basquetebol', 'text', 'Título principal do site'),
('site_description', 'Descrição do Site', 'Site oficial da Federação Cabo-verdiana de Basquetebol', 'text', 'Descrição meta do site'),
('contact_email', 'Email de Contacto', 'geral@fcbb.cv', 'email', 'Email principal de contacto'),
('contact_phone', 'Telefone de Contacto', '+238 261 12 34', 'text', 'Telefone principal de contacto'),
('social_facebook', 'Facebook URL', 'https://facebook.com/fcbb.cv', 'url', 'Link do Facebook'),
('social_instagram', 'Instagram URL', 'https://instagram.com/fcbb.cv', 'url', 'Link do Instagram'),
('social_youtube', 'YouTube URL', 'https://youtube.com/@fcbb.cv', 'url', 'Link do YouTube');

-- Habilitar Row Level Security
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.basketball_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - permitir leitura pública
CREATE POLICY "Public read access for hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Public read access for basketball_stats" ON public.basketball_stats FOR SELECT USING (true);
CREATE POLICY "Public read access for partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public read access for site_settings" ON public.site_settings FOR SELECT USING (true);

-- Políticas RLS - apenas admins podem modificar
CREATE POLICY "Admin full access for hero_slides" ON public.hero_slides FOR ALL USING (is_admin());
CREATE POLICY "Admin full access for basketball_stats" ON public.basketball_stats FOR ALL USING (is_admin());
CREATE POLICY "Admin full access for partners" ON public.partners FOR ALL USING (is_admin());
CREATE POLICY "Admin full access for site_settings" ON public.site_settings FOR ALL USING (is_admin());
