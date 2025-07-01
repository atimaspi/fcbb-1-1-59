
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  Eye, 
  EyeOff,
  FileText,
  Image,
  Trophy,
  Users
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  type: 'news' | 'gallery' | 'event';
  status: string;
  published: boolean;
  scheduled_publish_at?: string;
  created_at: string;
}

const ContentPublisher = () => {
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    setLoading(true);
    try {
      // Buscar notícias
      const { data: newsData } = await supabase
        .from('news')
        .select('id, title, status, published, created_at')
        .order('created_at', { ascending: false });

      // Buscar galeria
      const { data: galleryData } = await supabase
        .from('gallery')
        .select('id, title, status, scheduled_publish_at, created_at')
        .order('created_at', { ascending: false });

      // Buscar eventos
      const { data: eventsData } = await supabase
        .from('events')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      const allContent: ContentItem[] = [
        ...(newsData || []).map(item => ({
          id: item.id,
          title: item.title,
          type: 'news' as const,
          status: item.status || 'draft',
          published: item.published || false,
          created_at: item.created_at
        })),
        ...(galleryData || []).map(item => ({
          id: item.id,
          title: item.title,
          type: 'gallery' as const,
          status: item.status || 'draft',
          published: item.status === 'published',
          scheduled_publish_at: item.scheduled_publish_at,
          created_at: item.created_at
        })),
        ...(eventsData || []).map(item => ({
          id: item.id,
          title: item.title,
          type: 'event' as const,
          status: 'published',
          published: true,
          created_at: item.created_at
        }))
      ];

      setContentList(allContent.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error: any) {
      console.error('Erro ao carregar conteúdo:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar conteúdo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (item: ContentItem) => {
    setLoading(true);
    try {
      const table = item.type === 'news' ? 'news' : 'gallery';
      const updateData = item.type === 'news' 
        ? { published: !item.published, status: !item.published ? 'published' : 'draft' }
        : { status: !item.published ? 'published' : 'draft', published_at: !item.published ? new Date().toISOString() : null };

      const { error } = await supabase
        .from(table)
        .update(updateData)
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `${item.type === 'news' ? 'Notícia' : 'Galeria'} ${!item.published ? 'publicada' : 'despublicada'} com sucesso.`,
      });

      await fetchAllContent();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao atualizar status: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <FileText size={16} className="text-blue-500" />;
      case 'gallery':
        return <Image size={16} className="text-green-500" />;
      case 'event':
        return <Calendar size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} />;
    }
  };

  const getStatusBadge = (item: ContentItem) => {
    if (item.published) {
      return <Badge className="bg-green-500">Publicado</Badge>;
    } else if (item.status === 'scheduled' && item.scheduled_publish_at) {
      return <Badge className="bg-blue-500">Agendado</Badge>;
    } else {
      return <Badge variant="secondary">Rascunho</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Centro de Publicação</h2>
        <Button onClick={fetchAllContent} disabled={loading}>
          Atualizar
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {contentList.filter(c => c.type === 'news').length}
                </div>
                <div className="text-sm text-gray-600">Notícias</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {contentList.filter(c => c.type === 'gallery').length}
                </div>
                <div className="text-sm text-gray-600">Galerias</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {contentList.filter(c => c.published).length}
                </div>
                <div className="text-sm text-gray-600">Publicados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">
                  {contentList.filter(c => c.status === 'scheduled').length}
                </div>
                <div className="text-sm text-gray-600">Agendados</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Conteúdo */}
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Publicações</CardTitle>
          <CardDescription>
            Controle todas as publicações do site num só lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Carregando...</div>
            ) : contentList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum conteúdo encontrado
              </div>
            ) : (
              contentList.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getContentIcon(item.type)}
                      <h4 className="font-medium">{item.title}</h4>
                      {getStatusBadge(item)}
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Tipo: {item.type === 'news' ? 'Notícia' : item.type === 'gallery' ? 'Galeria' : 'Evento'}</div>
                      <div>Criado: {new Date(item.created_at).toLocaleDateString('pt-PT')}</div>
                      {item.scheduled_publish_at && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          Agendado para: {new Date(item.scheduled_publish_at).toLocaleString('pt-PT')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {item.type !== 'event' && (
                      <Button
                        size="sm"
                        variant={item.published ? "outline" : "default"}
                        onClick={() => handlePublish(item)}
                        disabled={loading}
                        className={item.published ? "" : "bg-green-600 hover:bg-green-700"}
                      >
                        {item.published ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Despublicar
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Publicar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentPublisher;
