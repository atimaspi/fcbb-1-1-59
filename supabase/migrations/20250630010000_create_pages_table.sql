
-- Create pages table for complete page management
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
  category TEXT NOT NULL,
  parent_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create page sections table
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('hero', 'content', 'gallery', 'stats', 'news', 'competitions', 'teams', 'documents')),
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Anyone can view published pages" ON pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can view all pages" ON pages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert pages" ON pages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update pages" ON pages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete pages" ON pages
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for page sections
CREATE POLICY "Anyone can view sections of published pages" ON page_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pages 
      WHERE pages.id = page_sections.page_id 
      AND pages.status = 'published'
    )
  );

CREATE POLICY "Authenticated users can view all sections" ON page_sections
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert sections" ON page_sections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update sections" ON page_sections
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete sections" ON page_sections
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX idx_pages_category ON pages(category);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_page_sections_page_id ON page_sections(page_id);
CREATE INDEX idx_page_sections_type ON page_sections(type);

-- Insert default pages
INSERT INTO pages (id, title, slug, content, status, category, order_index) VALUES
  ('home-page-id', 'Página Inicial', '/', 'Página principal da FCBB', 'published', 'home', 1),
  ('about-main-id', 'Sobre a FCBB', '/sobre', 'Informações sobre a Federação Caboverdiana de Basquetebol', 'published', 'about', 1),
  ('historia-id', 'História', '/sobre/historia', 'História da FCBB', 'published', 'about', 2),
  ('competicoes-main-id', 'Competições', '/competicoes', 'Todas as competições organizadas pela FCBB', 'published', 'competitions', 1),
  ('resultados-main-id', 'Resultados', '/resultados', 'Resultados das competições', 'published', 'results', 1),
  ('selecoes-main-id', 'Seleções Nacionais', '/selecoes', 'Seleções nacionais de basquetebol', 'published', 'teams', 1),
  ('clubes-main-id', 'Clubes & Atletas', '/clubes', 'Clubes e atletas registados', 'published', 'clubs', 1),
  ('noticias-main-id', 'Notícias', '/noticias', 'Últimas notícias do basquetebol caboverdiano', 'published', 'news', 1),
  ('multimedia-main-id', 'Multimédia', '/multimedia', 'Conteúdo multimédia', 'published', 'multimedia', 1),
  ('documentos-main-id', 'Documentos', '/documentos', 'Documentos oficiais e regulamentos', 'published', 'documents', 1)
ON CONFLICT (id) DO NOTHING;
