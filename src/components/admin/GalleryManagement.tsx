
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, PenLine, Trash2, Calendar, Clock, Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import GalleryImageManagement from './GalleryImageManagement';
import GalleryPublishDialog from './GalleryPublishDialog';
import { ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  event: string;
  created_at: string;
  status: string;
  image_count: number;
  scheduled_publish_at?: string;
  published_at?: string;
  auto_publish?: boolean;
}

const GalleryManagement = () => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event: '',
    status: 'draft'
  });
  const [showImageManager, setShowImageManager] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedGallery = data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        event: item.event || '',
        created_at: new Date(item.created_at).toLocaleDateString('pt-PT'),
        status: item.status,
        image_count: item.image_count || 0,
        scheduled_publish_at: item.scheduled_publish_at,
        published_at: item.published_at,
        auto_publish: item.auto_publish
      })) || [];

      setGalleryList(formattedGallery);
    } catch (error: any) {
      console.error('Erro ao carregar galeria:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar galeria: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', event: '', status: 'draft' });
    setShowDialog(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      event: item.event,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este álbum?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Álbum eliminado com sucesso.",
      });

      await fetchGallery();
    } catch (error: any) {
      console.error('Erro ao eliminar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageImages = (gallery: GalleryItem) => {
    setSelectedGallery(gallery);
    setShowImageManager(true);
  };

  const handlePublish = (gallery: GalleryItem) => {
    setSelectedGallery(gallery);
    setShowPublishDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery')
          .update({
            title: formData.title,
            description: formData.description,
            event: formData.event,
            status: formData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Álbum atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert({
            title: formData.title,
            description: formData.description,
            event: formData.event,
            status: formData.status,
            image_count: 0
          });

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Álbum criado com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ title: '', description: '', event: '', status: 'draft' });
      await fetchGallery();
    } catch (error: any) {
      console.error('Erro ao salvar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (item: GalleryItem) => {
    const statusConfig = {
      'draft': { color: 'bg-gray-100 text-gray-800', label: 'Rascunho' },
      'published': { color: 'bg-green-100 text-green-800', label: 'Publicado' },
      'scheduled': { color: 'bg-blue-100 text-blue-800', label: 'Agendado' },
      'archived': { color: 'bg-red-100 text-red-800', label: 'Arquivado' }
    };

    const config = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <div className="flex flex-col">
        <span className={`px-2 py-1 rounded-full text-xs ${config.color}`}>
          {config.label}
        </span>
        {item.status === 'scheduled' && item.scheduled_publish_at && (
          <span className="text-xs text-gray-500 mt-1">
            {new Date(item.scheduled_publish_at).toLocaleString('pt-PT')}
          </span>
        )}
        {item.status === 'published' && item.published_at && (
          <span className="text-xs text-gray-500 mt-1">
            Publicado: {new Date(item.published_at).toLocaleString('pt-PT')}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Galeria</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <ImagePlus size={18} />
          Adicionar Álbum
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Fotos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : galleryList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum álbum encontrado</TableCell>
              </TableRow>
            ) : (
              galleryList.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell className="max-w-xs truncate">{gallery.title}</TableCell>
                  <TableCell>{gallery.event}</TableCell>
                  <TableCell>{gallery.created_at}</TableCell>
                  <TableCell>{gallery.image_count}</TableCell>
                  <TableCell>{getStatusBadge(gallery)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleManageImages(gallery)}
                        className="text-purple-600 hover:text-purple-800"
                        title="Gerir Imagens"
                      >
                        <ImageIcon size={16} />
                      </button>
                      <button 
                        onClick={() => handlePublish(gallery)}
                        className="text-green-600 hover:text-green-800"
                        title="Publicar/Agendar"
                      >
                        <Calendar size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(gallery)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(gallery.id)}
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

      {/* Dialog para criar/editar álbum */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Álbum' : 'Adicionar Novo Álbum'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'criar'} o álbum.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título do Álbum
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="event" className="text-sm font-medium">
                  Evento
                </label>
                <Input
                  id="event"
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Estado
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                  <option value="scheduled">Agendado</option>
                  <option value="archived">Arquivado</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md h-20"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'} Álbum
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de gestão de imagens */}
      {showImageManager && selectedGallery && (
        <GalleryImageManagement
          galleryId={selectedGallery.id}
          galleryTitle={selectedGallery.title}
          onClose={() => {
            setShowImageManager(false);
            setSelectedGallery(null);
            fetchGallery();
          }}
        />
      )}

      {/* Dialog de publicação/agendamento */}
      {showPublishDialog && selectedGallery && (
        <GalleryPublishDialog
          gallery={selectedGallery}
          onClose={() => {
            setShowPublishDialog(false);
            setSelectedGallery(null);
            fetchGallery();
          }}
        />
      )}
    </div>
  );
};

export default GalleryManagement;
