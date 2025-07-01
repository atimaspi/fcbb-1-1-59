
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Image, File, Video } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  id: string;
  filename: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  category: string;
  entity_type?: string;
  alt_text?: string;
  description?: string;
  is_featured: boolean;
  created_at: string;
}

const MediaContentManager = () => {
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    'general', 'news', 'gallery', 'players', 'clubs', 'competitions'
  ];

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMediaList(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar ficheiros:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar ficheiros: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este ficheiro?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Ficheiro eliminado com sucesso.",
      });

      await fetchMedia();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar ficheiro: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Image size={16} className="text-blue-500" />;
    } else if (mimeType.startsWith('video/')) {
      return <Video size={16} className="text-red-500" />;
    } else {
      return <File size={16} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Ficheiros Multimédia</h3>
        <Button className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Carregar Ficheiro
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{mediaList.length}</div>
          <div className="text-sm text-gray-600">Total de Ficheiros</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {mediaList.filter(f => f.mime_type.startsWith('image/')).length}
          </div>
          <div className="text-sm text-gray-600">Imagens</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">
            {mediaList.filter(f => f.mime_type.startsWith('video/')).length}
          </div>
          <div className="text-sm text-gray-600">Vídeos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {mediaList.filter(f => f.is_featured).length}
          </div>
          <div className="text-sm text-gray-600">Em Destaque</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ficheiro</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : mediaList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Nenhum ficheiro encontrado</TableCell>
              </TableRow>
            ) : (
              mediaList.map((media) => (
                <TableRow key={media.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFileIcon(media.mime_type)}
                      <div>
                        <div className="font-medium truncate max-w-xs">
                          {media.original_filename}
                        </div>
                        {media.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {media.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{media.mime_type.split('/')[0]}</Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(media.file_size)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{media.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {media.is_featured && (
                        <Badge className="bg-yellow-500">Destaque</Badge>
                      )}
                      {media.entity_type && (
                        <Badge variant="outline">{media.entity_type}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(media.created_at).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(media.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MediaContentManager;
