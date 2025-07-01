
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
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

interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  end_date?: string;
  location: string;
  type: string;
  organizer: string;
  created_at: string;
}

const EventsContentManager = () => {
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    end_date: '',
    location: '',
    type: 'meeting',
    organizer: ''
  });
  const { toast } = useToast();

  const eventTypes = [
    'meeting', 'training', 'competition', 'ceremony', 'workshop', 'conference'
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;

      const formattedEvents = data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        event_date: item.event_date,
        end_date: item.end_date,
        location: item.location || '',
        type: item.type,
        organizer: item.organizer || 'FCBB',
        created_at: new Date(item.created_at).toLocaleDateString('pt-PT')
      })) || [];

      setEventsList(formattedEvents);
    } catch (error: any) {
      console.error('Erro ao carregar eventos:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar eventos: ${error.message}`,
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
      description: '',
      event_date: '',
      end_date: '',
      location: '',
      type: 'meeting',
      organizer: 'FCBB'
    });
    setShowDialog(true);
  };

  const handleEdit = (item: EventItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      event_date: item.event_date.split('T')[0],
      end_date: item.end_date ? item.end_date.split('T')[0] : '',
      location: item.location,
      type: item.type,
      organizer: item.organizer
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este evento?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Evento eliminado com sucesso.",
      });

      await fetchEvents();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar evento: ${error.message}`,
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
      const eventData = {
        title: formData.title,
        description: formData.description,
        event_date: new Date(formData.event_date).toISOString(),
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        location: formData.location,
        type: formData.type,
        organizer: formData.organizer
      };

      if (editingItem) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Evento atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('events')
          .insert(eventData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Evento criado com sucesso.",
        });
      }

      setShowDialog(false);
      await fetchEvents();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar evento: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Eventos</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Novo Evento
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Organizador</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : eventsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum evento encontrado</TableCell>
              </TableRow>
            ) : (
              eventsList.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="max-w-xs truncate">{event.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(event.event_date).toLocaleDateString('pt-PT')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.type}</Badge>
                  </TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(event)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
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
              {editingItem ? 'Editar Evento' : 'Novo Evento'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos para {editingItem ? 'atualizar' : 'criar'} o evento.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
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
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="event_date" className="text-sm font-medium">
                    Data do Evento *
                  </label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="end_date" className="text-sm font-medium">
                    Data de Fim
                  </label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Local
                  </label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="organizer" className="text-sm font-medium">
                  Organizador
                </label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                />
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

export default EventsContentManager;
