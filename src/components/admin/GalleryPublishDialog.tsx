
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Check, Eye, Archive } from 'lucide-react';
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

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  event: string;
  status: string;
  scheduled_publish_at?: string;
  published_at?: string;
  auto_publish?: boolean;
}

interface GalleryPublishDialogProps {
  gallery: GalleryItem;
  onClose: () => void;
}

const GalleryPublishDialog: React.FC<GalleryPublishDialogProps> = ({
  gallery,
  onClose
}) => {
  const [loading, setLoading] = useState(false);
  const [publishType, setPublishType] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [autoPublish, setAutoPublish] = useState(true);
  const { toast } = useToast();

  const handlePublishNow = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', gallery.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Álbum publicado com sucesso!",
      });

      onClose();
    } catch (error: any) {
      console.error('Erro ao publicar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao publicar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSchedulePublish = async () => {
    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione data e hora para o agendamento.",
        variant: "destructive",
      });
      return;
    }

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    if (scheduledDateTime <= new Date()) {
      toast({
        title: "Erro",
        description: "A data/hora de agendamento deve ser no futuro.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          status: 'scheduled',
          scheduled_publish_at: scheduledDateTime.toISOString(),
          auto_publish: autoPublish,
          updated_at: new Date().toISOString()
        })
        .eq('id', gallery.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Álbum agendado para publicação em ${scheduledDateTime.toLocaleString('pt-PT')}!`,
      });

      onClose();
    } catch (error: any) {
      console.error('Erro ao agendar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao agendar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          status: 'draft',
          published_at: null,
          scheduled_publish_at: null,
          auto_publish: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', gallery.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Álbum despublicado com sucesso!",
      });

      onClose();
    } catch (error: any) {
      console.error('Erro ao despublicar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao despublicar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          status: 'archived',
          updated_at: new Date().toISOString()
        })
        .eq('id', gallery.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Álbum arquivado com sucesso!",
      });

      onClose();
    } catch (error: any) {
      console.error('Erro ao arquivar álbum:', error);
      toast({
        title: "Erro",
        description: `Erro ao arquivar álbum: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5); // Mínimo 5 minutos no futuro
    return now.toISOString().slice(0, 16);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Gestão de Publicação
          </DialogTitle>
          <DialogDescription>
            Gerir a publicação do álbum "{gallery.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status atual */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Estado Atual</h4>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                gallery.status === 'published' ? 'bg-green-100 text-green-800' :
                gallery.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                gallery.status === 'archived' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {gallery.status === 'published' ? 'Publicado' :
                 gallery.status === 'scheduled' ? 'Agendado' :
                 gallery.status === 'archived' ? 'Arquivado' : 'Rascunho'}
              </span>
              {gallery.published_at && (
                <span className="text-sm text-gray-600">
                  desde {new Date(gallery.published_at).toLocaleString('pt-PT')}
                </span>
              )}
              {gallery.scheduled_publish_at && gallery.status === 'scheduled' && (
                <span className="text-sm text-gray-600">
                  para {new Date(gallery.scheduled_publish_at).toLocaleString('pt-PT')}
                </span>
              )}
            </div>
          </div>

          {/* Opções de publicação */}
          {gallery.status !== 'published' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tipo de Publicação</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="now"
                      checked={publishType === 'now'}
                      onChange={(e) => setPublishType(e.target.value as 'now' | 'schedule')}
                    />
                    <span>Publicar Agora</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="schedule"
                      checked={publishType === 'schedule'}
                      onChange={(e) => setPublishType(e.target.value as 'now' | 'schedule')}
                    />
                    <span>Agendar Publicação</span>
                  </label>
                </div>
              </div>

              {publishType === 'schedule' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="date" className="text-sm font-medium">
                        Data
                      </label>
                      <Input
                        id="date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="text-sm font-medium">
                        Hora
                      </label>
                      <Input
                        id="time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoPublish"
                      checked={autoPublish}
                      onChange={(e) => setAutoPublish(e.target.checked)}
                    />
                    <label htmlFor="autoPublish" className="text-sm">
                      Publicar automaticamente na data/hora agendada
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {gallery.status === 'published' && (
              <Button
                variant="destructive"
                onClick={handleUnpublish}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Despublicar
              </Button>
            )}
            {gallery.status !== 'archived' && (
              <Button
                variant="outline"
                onClick={handleArchive}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Archive className="h-4 w-4" />
                Arquivar
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            
            {gallery.status !== 'published' && (
              <>
                {publishType === 'now' ? (
                  <Button
                    onClick={handlePublishNow}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    {loading ? 'Publicando...' : 'Publicar Agora'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSchedulePublish}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    {loading ? 'Agendando...' : 'Agendar'}
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryPublishDialog;
