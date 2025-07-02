
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  competition_id: string;
  scheduled_date: string;
  status: string;
  home_score: number;
  away_score: number;
  venue: string;
  round: string;
  created_at: string;
}

interface Club {
  id: string;
  name: string;
}

interface Competition {
  id: string;
  name: string;
}

const GamesManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    competition_id: '',
    scheduled_date: '',
    status: 'scheduled',
    home_score: 0,
    away_score: 0,
    venue: '',
    round: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: games = [], isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:clubs!games_home_team_id_fkey(id, name),
          away_team:clubs!games_away_team_id_fkey(id, name),
          competition:championships(id, name)
        `)
        .order('scheduled_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: clubs = [] } = useQuery({
    queryKey: ['clubs-for-games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name')
        .eq('active', true)
        .order('name');
      
      if (error) throw error;
      return data as Club[];
    }
  });

  const { data: competitions = [] } = useQuery({
    queryKey: ['competitions-for-games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('championships')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data as Competition[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('games')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Jogo criado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar jogo', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('games')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Jogo atualizado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar jogo', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({ title: 'Jogo eliminado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar jogo', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      home_team_id: '',
      away_team_id: '',
      competition_id: '',
      scheduled_date: '',
      status: 'scheduled',
      home_score: 0,
      away_score: 0,
      venue: '',
      round: ''
    });
    setEditingGame(null);
  };

  const handleEdit = (game: any) => {
    setEditingGame(game);
    setFormData({
      home_team_id: game.home_team_id,
      away_team_id: game.away_team_id,
      competition_id: game.competition_id,
      scheduled_date: new Date(game.scheduled_date).toISOString().slice(0, 16),
      status: game.status,
      home_score: game.home_score || 0,
      away_score: game.away_score || 0,
      venue: game.venue || '',
      round: game.round || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      updateMutation.mutate({ id: editingGame.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finished': return 'bg-green-500';
      case 'live': return 'bg-red-500';
      case 'scheduled': return 'bg-blue-500';
      case 'postponed': return 'bg-yellow-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'finished': return 'Terminado';
      case 'live': return 'Ao Vivo';
      case 'scheduled': return 'Agendado';
      case 'postponed': return 'Adiado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando jogos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Jogos</h2>
          <p className="text-gray-600">Gerir calendário de jogos e resultados</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Jogo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingGame ? 'Editar Jogo' : 'Novo Jogo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="competition_id">Competição</Label>
                <Select value={formData.competition_id} onValueChange={(value) => setFormData({ ...formData, competition_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar competição" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((competition) => (
                      <SelectItem key={competition.id} value={competition.id}>{competition.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="home_team_id">Equipa da Casa</Label>
                  <Select value={formData.home_team_id} onValueChange={(value) => setFormData({ ...formData, home_team_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="away_team_id">Equipa Visitante</Label>
                  <Select value={formData.away_team_id} onValueChange={(value) => setFormData({ ...formData, away_team_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.id}>{club.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduled_date">Data e Hora</Label>
                  <Input
                    id="scheduled_date"
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                      <SelectItem value="live">Ao Vivo</SelectItem>
                      <SelectItem value="finished">Terminado</SelectItem>
                      <SelectItem value="postponed">Adiado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="venue">Local</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="round">Jornada</Label>
                  <Input
                    id="round"
                    value={formData.round}
                    onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                  />
                </div>
              </div>

              {(formData.status === 'finished' || formData.status === 'live') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="home_score">Resultado Casa</Label>
                    <Input
                      id="home_score"
                      type="number"
                      value={formData.home_score}
                      onChange={(e) => setFormData({ ...formData, home_score: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="away_score">Resultado Visitante</Label>
                    <Input
                      id="away_score"
                      type="number"
                      value={formData.away_score}
                      onChange={(e) => setFormData({ ...formData, away_score: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingGame ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Lista de Jogos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogo</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game: any) => (
                <TableRow key={game.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {game.home_team?.name} vs {game.away_team?.name}
                      </div>
                      {game.venue && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {game.venue}
                        </div>
                      )}
                      {game.round && (
                        <div className="text-sm text-gray-500">{game.round}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{game.competition?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(game.scheduled_date).toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(game.status)}>
                      {getStatusLabel(game.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {game.status === 'finished' || game.status === 'live' ? (
                      <span className="font-medium">
                        {game.home_score} - {game.away_score}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(game)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(game.id)}
                        disabled={deleteMutation.isPending}
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

export default GamesManager;
