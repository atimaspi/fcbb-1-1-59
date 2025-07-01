
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { Calendar, Plus, Edit, Trash2, Clock, MapPin } from 'lucide-react';

const CalendarManagement = () => {
  const { useOptimizedFetch, useOptimizedCreate, useOptimizedUpdate, useOptimizedDelete } = useUnifiedApi();
  
  const { data: events = [], isLoading } = useOptimizedFetch('calendar_events');
  const { data: championships = [] } = useOptimizedFetch('championships');
  const { data: games = [] } = useOptimizedFetch('games');
  
  const createEvent = useOptimizedCreate('calendar_events');
  const updateEvent = useOptimizedUpdate('calendar_events');
  const deleteEvent = useOptimizedDelete('calendar_events');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: '',
    start_date: '',
    end_date: '',
    location: '',
    organizer: '',
    status: 'agendado',
    related_championship_id: '',
    related_game_id: '',
    participants: []
  });

  const eventTypes = [
    { value: 'jogo', label: 'Jogo' },
    { value: 'reuniao', label: 'Reunião' },
    { value: 'assembleia', label: 'Assembleia' },
    { value: 'formacao', label: 'Formação' },
    { value: 'cerimonia', label: 'Cerimónia' },
    { value: 'evento_social', label: 'Evento Social' }
  ];

  const statusOptions = [
    { value: 'agendado', label: 'Agendado' },
    { value: 'em_curso', label: 'Em Curso' },
    { value: 'concluido', label: 'Concluído' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventData = {
        ...formData,
        related_championship_id: formData.related_championship_id || null,
        related_game_id: formData.related_game_id || null,
        end_date: formData.end_date || null
      };

      if (editingEvent) {
        await updateEvent.mutateAsync({ id: editingEvent.id, data: eventData });
      } else {
        await createEvent.mutateAsync(eventData);
      }
      
      setIsDialogOpen(false);
      setEditingEvent(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: '',
      start_date: '',
      end_date: '',
      location: '',
      organizer: '',
      status: 'agendado',
      related_championship_id: '',
      related_game_id: '',
      participants: []
    });
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      event_type: event.event_type || '',
      start_date: event.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
      end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '',
      location: event.location || '',
      organizer: event.organizer || '',
      status: event.status || 'agendado',
      related_championship_id: event.related_championship_id || '',
      related_game_id: event.related_game_id || '',
      participants: event.participants || []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este evento?')) {
      await deleteEvent.mutateAsync(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'agendado': 'bg-blue-100 text-blue-800 border-blue-200',
      'em_curso': 'bg-green-100 text-green-800 border-green-200',
      'concluido': 'bg-gray-100 text-gray-800 border-gray-200',
      'cancelado': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <Badge variant="outline" className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100'}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </Badge>
    );
  };

  const getEventTypeBadge = (type: string) => {
    const typeColors = {
      'jogo': 'bg-green-100 text-green-800 border-green-200',
      'reuniao': 'bg-blue-100 text-blue-800 border-blue-200',
      'assembleia': 'bg-purple-100 text-purple-800 border-purple-200',
      'formacao': 'bg-orange-100 text-orange-800 border-orange-200',
      'cerimonia': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'evento_social': 'bg-pink-100 text-pink-800 border-pink-200'
    };

    return (
      <Badge variant="outline" className={typeColors[type as keyof typeof typeColors] || 'bg-gray-100'}>
        {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
      </Badge>
    );
  };

  const getChampionshipName = (championshipId: string) => {
    if (!championshipId) return '-';
    const championship = championships.find((c: any) => c.id === championshipId);
    return championship?.name || 'Competição não encontrada';
  };

  if (isLoading) {
    return <div>Carregando eventos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Gestão de Calendário
          </h2>
          <p className="text-gray-600">Gerir eventos e atividades da FCBB</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Editar Evento' : 'Novo Evento'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event_type">Tipo de Evento</Label>
                  <Select 
                    value={formData.event_type} 
                    onValueChange={(value) => setFormData({...formData, event_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Data/Hora de Início</Label>
                  <Input
                    id="start_date"
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">Data/Hora de Fim (opcional)</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Local do evento"
                  />
                </div>

                <div>
                  <Label htmlFor="organizer">Organizador</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                    placeholder="Nome do organizador"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="related_championship">Competição Relacionada (opcional)</Label>
                <Select 
                  value={formData.related_championship_id} 
                  onValueChange={(value) => setFormData({...formData, related_championship_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar competição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhuma</SelectItem>
                    {championships.map((championship: any) => (
                      <SelectItem key={championship.id} value={championship.id}>
                        {championship.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingEvent ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Eventos Registados ({events.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event: any) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{event.title}</div>
                      {event.organizer && (
                        <div className="text-sm text-gray-500">
                          Org: {event.organizer}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getEventTypeBadge(event.event_type)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(event.start_date).toLocaleDateString('pt-PT')}</div>
                      <div className="text-gray-500">
                        {new Date(event.start_date).toLocaleTimeString('pt-PT', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{event.location || '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{getChampionshipName(event.related_championship_id)}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarManagement;
