
-- Adicionar campos de agendamento à tabela gallery
ALTER TABLE public.gallery 
ADD COLUMN IF NOT EXISTS scheduled_publish_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS published_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS auto_publish boolean DEFAULT false;

-- Atualizar os valores de status para incluir 'scheduled'
ALTER TABLE public.gallery 
DROP CONSTRAINT IF EXISTS gallery_status_check;

ALTER TABLE public.gallery 
ADD CONSTRAINT gallery_status_check 
CHECK (status IN ('draft', 'published', 'scheduled', 'archived'));

-- Criar índice para consultas de agendamento
CREATE INDEX IF NOT EXISTS idx_gallery_scheduled_publish 
ON public.gallery(scheduled_publish_at) 
WHERE status = 'scheduled' AND scheduled_publish_at IS NOT NULL;

-- Função para publicar automaticamente galerias agendadas
CREATE OR REPLACE FUNCTION public.auto_publish_scheduled_galleries()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.gallery 
  SET 
    status = 'published',
    published_at = NOW(),
    updated_at = NOW()
  WHERE 
    status = 'scheduled' 
    AND scheduled_publish_at <= NOW()
    AND auto_publish = true;
END;
$$;

-- Habilitar RLS nas tabelas
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Dropar políticas existentes se existirem
DROP POLICY IF EXISTS "Public can view published galleries" ON public.gallery;
DROP POLICY IF EXISTS "Admins can manage all galleries" ON public.gallery;
DROP POLICY IF EXISTS "Public can view published gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can manage all gallery images" ON public.gallery_images;

-- Criar políticas RLS para galeria
CREATE POLICY "Public can view published galleries" 
ON public.gallery FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can manage all galleries" 
ON public.gallery FOR ALL 
USING (public.is_admin());

-- Criar políticas RLS para imagens da galeria
CREATE POLICY "Public can view published gallery images" 
ON public.gallery_images FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.gallery 
    WHERE id = gallery_images.gallery_id 
    AND status = 'published'
  )
);

CREATE POLICY "Admins can manage all gallery images" 
ON public.gallery_images FOR ALL 
USING (public.is_admin());
