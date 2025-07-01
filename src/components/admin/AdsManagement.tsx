import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, PenLine, Trash2 } from 'lucide-react';
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

interface AdItem {
  id: string;
  title: string;
  link: string;
  position: string;
  status: string;
  start_date: string;
  end_date: string;
  clicks: number;
}

const AdsManagement = () => {
  const [adsList, setAdsList] = useState<AdItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<AdItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    position: 'sidebar',
    status: 'inactive',
    start_date: '',
    end_date: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    try {
      console.log('Fetching ads...');
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Ads fetch result:', { data, error });

      if (error) {
        console.error('Erro ao carregar anúncios:', error);
        throw error;
      }

      const formattedAds = data?.map(item => ({
        id: item.id,
        title: item.title,
        link: item.link || '',
        position: item.position,
        status: item.status === 'active' ? 'Ativo' : 'Inativo',
        start_date: item.start_date || '',
        end_date: item.end_date || '',
        clicks: item.clicks || 0
      })) || [];

      console.log('Formatted ads:', formattedAds);
      setAdsList(formattedAds);
    } catch (error) {
      console.error('Erro ao carregar anúncios:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar anúncios: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', link: '', position: 'sidebar', status: 'inactive', start_date: '', end_date: '' });
    setShowDialog(true);
  };

  const handleEdit = (item: AdItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      link: item.link,
      position: item.position,
      status: item.status === 'Ativo' ? 'active' : 'inactive',
      start_date: item.start_date,
      end_date: item.end_date
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete button clicked for id:', id);
    if (!window.confirm('Tem certeza que deseja eliminar este anúncio?')) {
      console.log('Delete cancelled by user');
      return;
    }

    setLoading(true);
    try {
      console.log('Deleting ad with id:', id);
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Ad deleted successfully');
      toast({
        title: "Sucesso",
        description: "Anúncio eliminado com sucesso.",
      });

      await fetchAds();
    } catch (error: any) {
      console.error('Erro ao eliminar anúncio:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar anúncio: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Ativo' ? 'inactive' : 'active';
    
    try {
      console.log('Toggling status for ad:', id, 'from', currentStatus, 'to', newStatus);
      const { error } = await supabase
        .from('ads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Toggle status error:', error);
        throw error;
      }

      console.log('Ad status updated successfully');
      toast({
        title: "Sucesso",
        description: "Estado do anúncio atualizado com sucesso.",
      });

      await fetchAds();
    } catch (error) {
      console.error('Erro ao atualizar estado:', error);
      toast({
        title: "Erro",
        description: `Erro ao atualizar estado: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting ads form data:', formData);
      
      if (editingItem) {
        console.log('Updating ad with id:', editingItem.id);
        const { data, error } = await supabase
          .from('ads')
          .update({
            title: formData.title,
            link: formData.link,
            position: formData.position,
            status: formData.status,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id)
          .select();

        console.log('Update result:', { data, error });

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Anúncio atualizado com sucesso.",
        });
      } else {
        console.log('Creating new ad');
        const { data, error } = await supabase
          .from('ads')
          .insert({
            title: formData.title,
            link: formData.link,
            position: formData.position,
            status: formData.status,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
            clicks: 0
          })
          .select();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Anúncio criado com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ title: '', link: '', position: 'sidebar', status: 'inactive', start_date: '', end_date: '' });
      await fetchAds();
    } catch (error) {
      console.error('Erro ao salvar anúncio:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar anúncio: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Publicidade</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <LayoutGrid size={18} />
          Adicionar Anúncio
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Cliques</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : adsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum anúncio encontrado</TableCell>
              </TableRow>
            ) : (
              adsList.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="max-w-xs truncate">{ad.title}</TableCell>
                  <TableCell>{ad.position}</TableCell>
                  <TableCell className="text-sm">
                    {ad.start_date && ad.end_date ? `${ad.start_date} - ${ad.end_date}` : 'Não definido'}
                  </TableCell>
                  <TableCell>{ad.clicks}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => toggleStatus(ad.id, ad.status)}
                      className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                        ad.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ad.status}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(ad)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(ad.id)}
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Anúncio' : 'Adicionar Novo Anúncio'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'criar'} o anúncio.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título do Anúncio
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="link" className="text-sm font-medium">
                  Link
                </label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="position" className="text-sm font-medium">
                  Posição
                </label>
                <select
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="header">Cabeçalho</option>
                  <option value="sidebar">Barra Lateral</option>
                  <option value="footer">Rodapé</option>
                  <option value="content">Entre Conteúdo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start_date" className="text-sm font-medium">
                    Data Início
                  </label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="end_date" className="text-sm font-medium">
                    Data Fim
                  </label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
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
                  <option value="inactive">Inativo</option>
                  <option value="active">Ativo</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'} Anúncio
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdsManagement;
