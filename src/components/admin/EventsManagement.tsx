
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/useApi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface EventForm {
  title: string;
  description: string;
  event_date: string;
  end_date?: string;
  location: string;
  organizer: string;
  type: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  end_date?: string;
  location?: string;
  organizer?: string;
  type: string;
}

// Type guard function to check if an item is a valid Event
const isValidEvent = (item: any): item is Event => {
  return item != null && 
    typeof item === 'object' && 
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.event_date === 'string' &&
    typeof item.type === 'string';
};

const EventsManagement = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();
  
  const { data: events, isLoading } = useFetch('events');
  const createEvent = useCreate('events');
  const updateEvent = useUpdate('events');
  const deleteEvent = useDelete('events');

  const { register, handleSubmit, reset, setValue } = useForm<EventForm>();

  const eventTypes = [
    'Competição',
    'Formação',
    'Reunião',
    'Cerimónia',
    'Workshop',
    'Conferência',
    'Torneio',
    'Outro'
  ];

  // Verificação mais segura dos dados com type assertion
  const eventsList = React.useMemo(() => {
    if (!events || !Array.isArray(events)) {
      return [] as Event[];
    }
    
    return events.filter(isValidEvent);
  }, [events]);

  const handleCreateEvent = async (data: EventForm) => {
    await createEvent.mutateAsync(data);
    setIsCreating(false);
    reset();
  };

  const handleEditEvent = async (data: EventForm) => {
    if (!editingId) return;
    await updateEvent.mutateAsync({
      id: editingId,
      data
    });
    setEditingId(null);
    reset();
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este evento?')) {
      await deleteEvent.mutateAsync(id);
    }
  };

  const startEdit = (event: Event) => {
    if (!event) return;
    setEditingId(event.id);
    setValue('title', event.title || '');
    setValue('description', event.description || '');
    setValue('event_date', event.event_date || '');
    setValue('end_date', event.end_date || '');
    setValue('location', event.location || '');
    setValue('organizer', event.organizer || '');
    setValue('type', event.type || '');
    setIsCreating(true);
  };

  const getEventStatus = (eventDate: string, endDate?: string) => {
    const now = new Date();
    const start = new Date(eventDate);
    const end = endDate ? new Date(endDate) : start;
    
    if (now < start) return { status: 'Próximo', variant: 'default' as const };
    if (now >= start && now <= end) return { status: 'Em Curso', variant: 'destructive' as const };
    return { status: 'Concluído', variant: 'secondary' as const };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Eventos</h2>
          <p className="text-gray-600">Organizar e gerir eventos da FCBB</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-cv-blue hover:bg-cv-blue/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Formulário de criação/edição */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Editar Evento' : 'Novo Evento'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(editingId ? handleEditEvent : handleCreateEvent)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    {...register('title', { required: true })}
                    placeholder="Nome do evento"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo *</Label>
                  <Select onValueChange={(value) => setValue('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Descrição do evento"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_date">Data de Início *</Label>
                  <Input
                    id="event_date"
                    type="datetime-local"
                    {...register('event_date', { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">Data de Fim</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    {...register('end_date')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="Local do evento"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer">Organizador</Label>
                <Input
                  id="organizer"
                  {...register('organizer')}
                  placeholder="Entidade organizadora"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingId ? 'Atualizar' : 'Criar'} Evento
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    reset();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de eventos */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos ({eventsList.length})</CardTitle>
          <CardDescription>
            Todos os eventos organizados pela FCBB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsList.map((event) => {
                const { status, variant } = getEventStatus(event.event_date, event.end_date);
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        {event.organizer && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.organizer}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.event_date).toLocaleDateString('pt-PT')}
                        <Clock className="h-3 w-3 ml-2" />
                        {new Date(event.event_date).toLocaleTimeString('pt-PT', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.location && (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={variant}>{status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(event)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManagement;
