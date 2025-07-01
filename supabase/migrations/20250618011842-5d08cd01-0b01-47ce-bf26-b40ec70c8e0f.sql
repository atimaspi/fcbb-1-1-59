
-- Criar bucket de armazenamento para arquivos da FCBB
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fcbb-media', 
  'fcbb-media', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'video/webm']
);

-- Criar políticas de acesso para o bucket
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'fcbb-media');

CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'fcbb-media' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow admin updates and deletes" ON storage.objects
FOR ALL USING (
  bucket_id = 'fcbb-media' 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Atualizar tabela de notícias para incluir multimedia
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb;

-- Atualizar tabela de clubes para fotos
ALTER TABLE public.clubs 
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb;

-- Atualizar tabela de jogadores para fotos
ALTER TABLE public.players 
ADD COLUMN IF NOT EXISTS photo_url TEXT,
ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]'::jsonb;

-- Atualizar tabela de árbitros para fotos
ALTER TABLE public.referees 
ADD COLUMN IF NOT EXISTS photo_url TEXT,
ADD COLUMN IF NOT EXISTS certificates JSONB DEFAULT '[]'::jsonb;

-- Criar tabela de arquivos de mídia
CREATE TABLE IF NOT EXISTS public.media_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general', -- news, player, club, referee, general
  entity_id UUID, -- ID da entidade relacionada
  entity_type TEXT, -- news, player, club, referee
  uploaded_by UUID REFERENCES auth.users(id),
  alt_text TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS na tabela de arquivos
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Políticas para media_files
CREATE POLICY "Allow public read access to media files" ON public.media_files
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to upload media" ON public.media_files
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin full access to media files" ON public.media_files
FOR ALL USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_media_files_entity ON public.media_files(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_media_files_category ON public.media_files(category);
CREATE INDEX IF NOT EXISTS idx_media_files_created_at ON public.media_files(created_at DESC);

-- Função para limpar arquivos órfãos
CREATE OR REPLACE FUNCTION public.cleanup_orphaned_media()
RETURNS void AS $$
BEGIN
  -- Remover registros de mídia sem arquivos correspondentes no storage
  DELETE FROM public.media_files 
  WHERE NOT EXISTS (
    SELECT 1 FROM storage.objects 
    WHERE storage.objects.name = media_files.file_path
    AND storage.objects.bucket_id = 'fcbb-media'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
