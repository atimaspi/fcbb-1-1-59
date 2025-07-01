
import { useState, useEffect } from 'react';
import { Calendar, Clock, Play, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ScheduledItem {
  id: string;
  title: string;
  type: 'gallery';
  scheduled_publish_at: string;
  status: string;
  auto_publish: boolean;
}

const MultimediaScheduler = () => {
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchScheduledItems();
    
    // Verificar a cada minuto por itens para publicar
    const interval = setInterval(checkAndPublishScheduled, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchScheduledItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('status', 'scheduled')
        .order('scheduled_publish_at', { ascending: true });

      if (error) throw error;

      const formattedItems = data?.map(item => ({
        id: item.id,
        title: item.title,
        type: 'gallery' as const,
        scheduled_publish_at: item.scheduled_publish_at,
        status: item.status,
        auto_publish: item.auto_publish || false
      })) || [];

      setScheduledItems(formattedItems);
    } catch (error: any) {
      console.error('Erro ao carregar itens agendados:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndPublishScheduled = async () => {
    try {
      const { data, error } = await supabase.rpc('auto_publish_scheduled_galleries');
      
      if (!error) {
        // Recarregar lista após publicação automática
        fetchScheduledItems();
      }
    } catch (error) {
      console.error('Erro ao verificar publicações agendadas:', error);
    }
  };

  const publishNow = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Item publicado com sucesso!",
      });

      fetchScheduledItems();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao publicar item: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const cancelSchedule = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          status: 'draft',
          scheduled_publish_at: null,
          auto_publish: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Agendamento cancelado com sucesso!",
      });

      fetchScheduledItems();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao cancelar agendamento: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const isOverdue = (scheduledDate: string) => {
    return new Date(scheduledDate) < new Date();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Publicações Agendadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Carregando...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Publicações Agendadas ({scheduledItems.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scheduledItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma publicação agendada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledItems.map((item) => (
              <div
                key={item.id}
                className={`border rounded-lg p-4 ${
                  isOverdue(item.scheduled_publish_at) 
                    ? 'border-red-200 bg-red-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{item.title}</h4>
                      {isOverdue(item.scheduled_publish_at) && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(item.scheduled_publish_at).toLocaleString('pt-PT')}
                        </span>
                        {isOverdue(item.scheduled_publish_at) && (
                          <span className="text-red-600 font-medium">(Atrasado)</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="capitalize">{item.type}</span>
                        {item.auto_publish && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            Auto-publicação
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => publishNow(item.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Publicar Agora
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cancelSchedule(item.id)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MultimediaScheduler;
