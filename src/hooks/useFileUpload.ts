
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadOptions {
  bucket?: string;
  folder?: string;
  maxSize?: number;
  allowedTypes?: string[];
}

interface UploadedFile {
  id: string;
  url: string;
  path: string;
  name: string;
  size: number;
  type: string;
}

export const useFileUpload = (options: FileUploadOptions = {}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const {
    bucket = 'fcbb-media',
    folder = '',
    maxSize = 50 * 1024 * 1024, // 50MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4']
  } = options;

  const uploadFile = async (
    file: File, 
    entityType?: string, 
    entityId?: string,
    metadata?: { alt_text?: string; description?: string; is_featured?: boolean }
  ): Promise<UploadedFile | null> => {
    if (!file) return null;

    // Validações
    if (file.size > maxSize) {
      toast({
        title: "Erro",
        description: `Arquivo muito grande. Máximo ${maxSize / 1024 / 1024}MB`,
        variant: "destructive"
      });
      return null;
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erro",
        description: "Tipo de arquivo não permitido",
        variant: "destructive"
      });
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Simular progresso durante o upload
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload para o Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      clearInterval(progressInterval);
      setProgress(100);

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // Registrar na tabela media_files
      const { data: mediaData, error: mediaError } = await supabase
        .from('media_files')
        .insert({
          filename: fileName,
          original_filename: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          entity_type: entityType,
          entity_id: entityId,
          alt_text: metadata?.alt_text,
          description: metadata?.description,
          is_featured: metadata?.is_featured || false,
          category: entityType || 'general'
        })
        .select()
        .single();

      if (mediaError) throw mediaError;

      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso!"
      });

      return {
        id: mediaData.id,
        url: publicUrl,
        path: filePath,
        name: file.name,
        size: file.size,
        type: file.type
      };

    } catch (error: any) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro",
        description: `Erro ao enviar arquivo: ${error.message}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const deleteFile = async (filePath: string, mediaId: string) => {
    try {
      // Deletar do storage
      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (storageError) throw storageError;

      // Deletar registro da tabela
      const { error: dbError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', mediaId);

      if (dbError) throw dbError;

      toast({
        title: "Sucesso",
        description: "Arquivo removido com sucesso!"
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao deletar:', error);
      toast({
        title: "Erro",
        description: `Erro ao remover arquivo: ${error.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    uploading,
    progress
  };
};
