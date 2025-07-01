
-- Criar bucket de armazenamento para galeria de imagens
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images', 
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Criar políticas de acesso para o bucket gallery-images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'gallery-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update gallery images" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'gallery-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'gallery-images' AND 
  auth.role() = 'authenticated'
);

-- Também garantir que o bucket fcbb-media existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fcbb-media',
  'fcbb-media', 
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'video/webm']
) ON CONFLICT (id) DO NOTHING;

-- Políticas para fcbb-media
CREATE POLICY "Public read access fcbb-media" ON storage.objects FOR SELECT USING (bucket_id = 'fcbb-media');

CREATE POLICY "Authenticated upload fcbb-media" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'fcbb-media' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated update fcbb-media" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'fcbb-media' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated delete fcbb-media" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'fcbb-media' AND 
  auth.role() = 'authenticated'
);
