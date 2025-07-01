
-- Criar tabelas para Menu e SubMenu
CREATE TABLE public.menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  parent_id UUID REFERENCES public.menus(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de Posts (expandindo news existente)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  post_type TEXT DEFAULT 'article' CHECK (post_type IN ('article', 'news', 'announcement', 'event')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  category_id UUID,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de categorias
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de Documents (expandindo official_documents)
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  document_type TEXT DEFAULT 'general' CHECK (document_type IN ('regulation', 'statute', 'report', 'form', 'general')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de Media otimizada
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'audio', 'document')),
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  duration INTEGER, -- para vídeos/áudio
  alt_text TEXT,
  category_id UUID REFERENCES public.categories(id),
  folder_path TEXT DEFAULT '/',
  tags TEXT[] DEFAULT '{}',
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de Audit Logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete', 'login', 'logout')),
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de Backups
CREATE TABLE public.backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  backup_name TEXT NOT NULL,
  backup_type TEXT DEFAULT 'manual' CHECK (backup_type IN ('manual', 'automatic', 'scheduled')),
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Adicionar foreign key para posts
ALTER TABLE public.posts ADD CONSTRAINT posts_category_id_fkey 
FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;

-- Criar índices para performance
CREATE INDEX idx_menus_parent_id ON public.menus(parent_id);
CREATE INDEX idx_menus_active ON public.menus(active);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_published_at ON public.posts(published_at);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_category_id ON public.posts(category_id);
CREATE INDEX idx_media_file_type ON public.media(file_type);
CREATE INDEX idx_media_folder_path ON public.media(folder_path);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

-- Enable RLS on all new tables
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for menus (public read, admin write)
CREATE POLICY "Public can view active menus" ON public.menus
FOR SELECT USING (active = true);

CREATE POLICY "Admin can manage menus" ON public.menus
FOR ALL USING (is_current_user_admin());

-- Create RLS policies for posts
CREATE POLICY "Public can view published posts" ON public.posts
FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage all posts" ON public.posts
FOR ALL USING (is_current_user_admin());

CREATE POLICY "Authors can manage their posts" ON public.posts
FOR ALL USING (auth.uid() = author_id);

-- Create RLS policies for categories
CREATE POLICY "Public can view active categories" ON public.categories
FOR SELECT USING (active = true);

CREATE POLICY "Admin can manage categories" ON public.categories
FOR ALL USING (is_current_user_admin());

-- Create RLS policies for documents
CREATE POLICY "Public can view published documents" ON public.documents
FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage documents" ON public.documents
FOR ALL USING (is_current_user_admin());

-- Create RLS policies for media
CREATE POLICY "Public can view media" ON public.media
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload media" ON public.media
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage all media" ON public.media
FOR ALL USING (is_current_user_admin());

CREATE POLICY "Users can manage their media" ON public.media
FOR UPDATE USING (auth.uid() = uploaded_by);

-- Create RLS policies for audit logs (admin only)
CREATE POLICY "Admin can view audit logs" ON public.audit_logs
FOR SELECT USING (is_current_user_admin());

-- Create RLS policies for backups (admin only)
CREATE POLICY "Admin can manage backups" ON public.backups
FOR ALL USING (is_current_user_admin());

-- Create trigger function to log changes
CREATE OR REPLACE FUNCTION public.log_audit_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_logs (
      user_id, action, table_name, record_id, old_values, ip_address
    ) VALUES (
      auth.uid(), 'delete', TG_TABLE_NAME, OLD.id, row_to_json(OLD), 
      current_setting('request.headers', true)::json->>'x-forwarded-for'
    );
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_logs (
      user_id, action, table_name, record_id, old_values, new_values, ip_address
    ) VALUES (
      auth.uid(), 'update', TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW),
      current_setting('request.headers', true)::json->>'x-forwarded-for'
    );
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_logs (
      user_id, action, table_name, record_id, new_values, ip_address
    ) VALUES (
      auth.uid(), 'create', TG_TABLE_NAME, NEW.id, row_to_json(NEW),
      current_setting('request.headers', true)::json->>'x-forwarded-for'
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers for important tables
CREATE TRIGGER audit_menus_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.menus
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_changes();

CREATE TRIGGER audit_posts_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_changes();

CREATE TRIGGER audit_documents_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_changes();

-- Function to create automatic backups
CREATE OR REPLACE FUNCTION public.create_automatic_backup()
RETURNS void AS $$
BEGIN
  INSERT INTO public.backups (
    backup_name,
    backup_type,
    file_path,
    file_size,
    status,
    expires_at
  ) VALUES (
    'auto_backup_' || to_char(now(), 'YYYY_MM_DD_HH24_MI_SS'),
    'automatic',
    '/backups/auto_' || to_char(now(), 'YYYY_MM_DD_HH24_MI_SS') || '.sql',
    0, -- This would be updated by the actual backup process
    'pending',
    now() + interval '30 days'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert some default categories
INSERT INTO public.categories (name, slug, description, color) VALUES
('Notícias', 'noticias', 'Notícias gerais da FCBB', '#3B82F6'),
('Competições', 'competicoes', 'Informações sobre competições', '#10B981'),
('Eventos', 'eventos', 'Eventos e atividades', '#F59E0B'),
('Regulamentos', 'regulamentos', 'Documentos regulamentares', '#EF4444'),
('Relatórios', 'relatorios', 'Relatórios técnicos', '#8B5CF6');

-- Insert default menu structure
INSERT INTO public.menus (name, slug, icon, order_index) VALUES
('Início', 'inicio', 'home', 1),
('Sobre', 'sobre', 'info', 2),
('Competições', 'competicoes', 'trophy', 3),
('Equipas', 'equipas', 'users', 4),
('Resultados', 'resultados', 'calendar', 5),
('Notícias', 'noticias', 'newspaper', 6),
('Galeria', 'galeria', 'camera', 7),
('Contacto', 'contacto', 'phone', 8);

-- Insert submenus
INSERT INTO public.menus (name, slug, icon, order_index, parent_id) 
SELECT 'História', 'historia', 'book', 1, id FROM public.menus WHERE slug = 'sobre';

INSERT INTO public.menus (name, slug, icon, order_index, parent_id) 
SELECT 'Estrutura', 'estrutura', 'building', 2, id FROM public.menus WHERE slug = 'sobre';
