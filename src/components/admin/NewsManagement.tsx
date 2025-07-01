
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Plus, Trash2 } from 'lucide-react';
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

interface NewsItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  category: string;
  status: string;
  author: string;
}

const NewsManagement = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Competições',
    status: 'draft'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      console.log('Fetching news...');
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('News fetch result:', { data, error });

      if (error) {
        console.error('Erro ao carregar notícias:', error);
        throw error;
      }

      const formattedNews = data?.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        created_at: new Date(item.created_at).toLocaleDateString('pt-PT'),
        category: item.category,
        status: item.status === 'published' ? 'Publicado' : 'Rascunho',
        author: item.author || 'Admin'
      })) || [];

      console.log('Formatted news:', formattedNews);
      setNewsList(formattedNews);
    } catch (error: any) {
      console.error('Erro ao carregar notícias:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar notícias: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    console.log('Adding new news item');
    setEditingItem(null);
    setFormData({ title: '', content: '', category: 'Competições', status: 'draft' });
    setShowDialog(true);
  };

  const handleEdit = (item: NewsItem) => {
    console.log('Editing news item:', item);
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      status: item.status === 'Publicado' ? 'published' : 'draft'
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete button clicked for id:', id);
    if (!window.confirm('Tem certeza que deseja eliminar esta notícia?')) {
      console.log('Delete cancelled by user');
      return;
    }

    setLoading(true);
    try {
      console.log('Deleting news with id:', id);
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('News deleted successfully');
      toast({
        title: "Sucesso",
        description: "Notícia eliminada com sucesso.",
      });

      await fetchNews();
    } catch (error: any) {
      console.error('Erro ao eliminar notícia:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar notícia: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setLoading(true);

    try {
      if (editingItem) {
        console.log('Updating news with id:', editingItem.id);
        const { data, error } = await supabase
          .from('news')
          .update({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            status: formData.status,
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
          description: "Notícia atualizada com sucesso.",
        });
      } else {
        console.log('Creating new news');
        const { data, error } = await supabase
          .from('news')
          .insert({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            status: formData.status,
            author: 'Admin',
            published: formData.status === 'published'
          })
          .select();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Notícia criada com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ title: '', content: '', category: 'Competições', status: 'draft' });
      await fetchNews();
    } catch (error: any) {
      console.error('Erro ao salvar notícia:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar notícia: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Notícias</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Adicionar Notícia
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : newsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhuma notícia encontrada</TableCell>
              </TableRow>
            ) : (
              newsList.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="max-w-xs truncate">{news.title}</TableCell>
                  <TableCell>{news.created_at}</TableCell>
                  <TableCell>{news.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      news.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {news.status}
                    </span>
                  </TableCell>
                  <TableCell>{news.author}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(news)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(news.id)}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Notícia' : 'Adicionar Nova Notícia'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'adicionar'} a notícia.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título da Notícia
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Categoria
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Competições">Competições</option>
                  <option value="Seleções">Seleções</option>
                  <option value="Formação">Formação</option>
                  <option value="Arbitragem">Arbitragem</option>
                  <option value="Clubes">Clubes</option>
                </select>
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
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Conteúdo
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md h-32"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'} Notícia
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManagement;
