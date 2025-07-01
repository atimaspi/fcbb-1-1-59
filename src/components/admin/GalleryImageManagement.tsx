
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Eye, Move } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  alt_text: string | null;
  order_index: number;
}

interface GalleryImageManagementProps {
  galleryId: string;
  galleryTitle: string;
  onClose: () => void;
}

const GalleryImageManagement: React.FC<GalleryImageManagementProps> = ({
  galleryId,
  galleryTitle,
  onClose
}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, [galleryId]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('order_index');

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar imagens:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar imagens: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Aviso",
        description: "Selecione pelo menos uma imagem para upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = Array.from(selectedFiles).map(async (file, index) => {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
          throw new Error(`Arquivo ${file.name} não é uma imagem válida`);
        }

        // Validar tamanho (10MB máximo)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`Arquivo ${file.name} é muito grande (máximo 10MB)`);
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${galleryId}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

        console.log('Fazendo upload do arquivo:', fileName);

        // Upload para Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Erro no upload:', uploadError);
          throw uploadError;
        }

        console.log('Upload bem-sucedido:', uploadData);

        // Obter URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(fileName);

        console.log('URL pública gerada:', publicUrl);

        // Salvar na base de dados
        const { data: dbData, error: dbError } = await supabase
          .from('gallery_images')
          .insert({
            gallery_id: galleryId,
            image_url: publicUrl,
            alt_text: file.name.replace(/\.[^/.]+$/, ""), // Remove extensão
            order_index: images.length + index
          })
          .select();

        if (dbError) {
          console.error('Erro na base de dados:', dbError);
          throw dbError;
        }

        console.log('Imagem salva na BD:', dbData);
        return dbData;
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Sucesso",
        description: `${selectedFiles.length} imagem(ns) carregada(s) com sucesso.`,
      });

      setSelectedFiles(null);
      // Resetar input de arquivo
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      await fetchImages();
    } catch (error: any) {
      console.error('Erro completo no upload:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar imagens: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar esta imagem?')) return;

    try {
      // Extrair o caminho do ficheiro da URL
      const urlParts = imageUrl.split('/gallery-images/');
      if (urlParts.length > 1) {
        const fileName = urlParts[1];
        
        // Eliminar do storage
        const { error: storageError } = await supabase.storage
          .from('gallery-images')
          .remove([fileName]);

        if (storageError) {
          console.error('Erro ao eliminar do storage:', storageError);
          // Continuar mesmo com erro no storage
        }
      }

      // Eliminar da base de dados
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Imagem eliminada com sucesso.",
      });

      await fetchImages();
    } catch (error: any) {
      console.error('Erro ao eliminar imagem:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar imagem: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const updateImageOrder = async (imageId: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ order_index: newOrder })
        .eq('id', imageId);

      if (error) throw error;

      await fetchImages();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao reordenar imagem: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const moveImage = (imageId: string, direction: 'up' | 'down') => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    const newOrder = direction === 'up' ? image.order_index - 1 : image.order_index + 1;
    updateImageOrder(imageId, newOrder);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestão de Imagens - {galleryTitle}</DialogTitle>
          <DialogDescription>
            Faça upload e organize as imagens desta galeria.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Selecionar imagens para upload
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                  />
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  JPEG, PNG, GIF, WebP até 10MB cada
                </p>
              </div>
            </div>

            {selectedFiles && selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {selectedFiles.length} ficheiro(s) selecionado(s)
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button 
                    onClick={handleFileUpload}
                    disabled={uploading}
                    className="bg-cv-blue"
                  >
                    {uploading ? 'A carregar...' : 'Fazer Upload'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedFiles(null);
                      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    disabled={uploading}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">Carregando imagens...</div>
            ) : images.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Nenhuma imagem encontrada
              </div>
            ) : (
              images.map((image, index) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || 'Imagem da galeria'}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', image.image_url);
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5FcnJvIGFvIGNhcnJlZ2FyPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                  
                  {/* Overlay with controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(image.image_url, '_blank')}
                        className="bg-white p-2 rounded-full text-gray-700 hover:text-gray-900"
                        title="Ver imagem"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {index > 0 && (
                        <button
                          onClick={() => moveImage(image.id, 'up')}
                          className="bg-white p-2 rounded-full text-gray-700 hover:text-gray-900"
                          title="Mover para cima"
                        >
                          <Move size={16} className="rotate-180" />
                        </button>
                      )}
                      
                      {index < images.length - 1 && (
                        <button
                          onClick={() => moveImage(image.id, 'down')}
                          className="bg-white p-2 rounded-full text-gray-700 hover:text-gray-900"
                          title="Mover para baixo"
                        >
                          <Move size={16} />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteImage(image.id, image.image_url)}
                        className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Order number */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    #{image.order_index + 1}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageManagement;
