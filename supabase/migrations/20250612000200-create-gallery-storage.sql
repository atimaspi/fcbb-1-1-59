
-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images', 
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policies for gallery images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Admin can upload gallery images" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'gallery-images' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin can update gallery images" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'gallery-images' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin can delete gallery images" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'gallery-images' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
