
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Tag,
  Image as ImageIcon,
  Video,
  FileText
} from 'lucide-react';
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
  excerpt?: string;
  category: string;
  status: string;
  author: string;
  created_at: string;
  published: boolean;
  featured: boolean;
  featured_image_url?: string;
  video_url?: string;
  tags: string[];
}

const NewsContentManager = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'geral',
    status: 'draft',
    featured: false,
    featured_image_url: '',
    video_url: '',
    tags: [] as string[]
  });
  const { toast } = useToast();

  const categories = [
    'geral', 'competições', 'seleções', 'clubes', 'formação', 'arbitragem'
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedNews = data?.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        excerpt: item.excerpt || '',
        category: item.category,
        status: item.status || 'draft',
        author: item.author || 'Admin',
        created_at: new Date(item.created_at).toLocaleDateString('pt-PT'),
        published: item.published || false,
        featured: item.featured || false,
        featured_image_url: item.featured_image_url || '',
        video_url: item.video_url || '',
        tags: item.tags || []
      })) || [];

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
    setEditingItem(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'geral',
      status: 'draft',
      featured: false,
      featured_image_url: '',
      video_url: '',
      tags: []
    });
    setShowDialog(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || '',
      category: item.category,
      status: item.status,
      featured: item.featured,
      featured_image_url: item.featured_image_url || '',
      video_url: item.video_url || '',
      tags: item.tags
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar esta notícia?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

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

  const handlePublish = async (id: string, published: boolean) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('news')
        .update({
          published: !published,
          status: !published ? 'published' : 'draft',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Notícia ${!published ? 'publicada' : 'despublicada'} com sucesso.`,
      });

      await fetchNews();
    } catch (error: any) {
      console.error('Erro ao publicar/despublicar notícia:', error);
      toast({
        title: "Erro",
        description: `Erro ao atualizar status da notícia: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('news')
          .update({
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            category: formData.category,
            status: formData.status,
            featured: formData.featured,
            featured_image_url: formData.featured_image_url,
            video_url: formData.video_url,
            tags: formData.tags,
            published: formData.status === 'published',
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Notícia atualizada com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('news')
          .insert({
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            category: formData.category,
            status: formData.status,
            featured: formData.featured,
            featured_image_url: formData.featured_image_url,
            video_url: formData.video_url,
            tags: formData.tags,
            published: formData.status === 'published',
            author: 'Admin'
          });

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Notícia criada com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: 'geral',
        status: 'draft',
        featured: false,
        featured_image_url: '',
        video_url: '',
        tags: []
      });
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

  const getStatusBadge = (item: NewsItem) => {
    if (item.published) {
      return <Badge className="bg-green-500">Publicado</Badge>;
    } else if (item.status === 'draft') {
      return <Badge variant="secondary">Rascunho</Badge>;
    } else {
      return <Badge variant="outline">{item.status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão Avançada de Notícias</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Nova Notícia
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Multimédia</TableHead>
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
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{news.title}</div>
                      {news.featured && (
                        <Badge className="bg-yellow-500 mt-1">Destaque</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{news.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(news)}</TableCell>
                  <TableCell>{news.created_at}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {news.featured_image_url && <ImageIcon size={16} className="text-blue-500" />}
                      {news.video_url && <Video size={16} className="text-red-500" />}
                      {news.tags.length > 0 && <Tag size={16} className="text-green-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handlePublish(news.id, news.published)}
                        className={`${news.published ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                        title={news.published ? 'Despublicar' : 'Publicar'}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(news)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
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
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Notícia' : 'Nova Notícia'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos para {editingItem ? 'atualizar' : 'criar'} a notícia.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Título *
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
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  Resumo
                </label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Breve resumo da notícia"
                  rows={2}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Conteúdo *
                </label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="featured_image_url" className="text-sm font-medium">
                    URL da Imagem Destacada
                  </label>
                  <Input
                    id="featured_image_url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({...formData, featured_image_url: e.target.value})}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="video_url" className="text-sm font-medium">
                    URL do Vídeo
                  </label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
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
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Notícia em Destaque
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsContentManager;
