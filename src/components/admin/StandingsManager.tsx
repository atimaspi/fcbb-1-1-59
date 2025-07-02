
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, BarChart3, Trophy } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Standing {
  id: string;
  team_id: string;
  competition_id: string;
  position: number;
  games_played: number;
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  points: number;
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

const StandingsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStanding, setEditingStanding] = useState<Standing | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');
  const [formData, setFormData] = useState({
    team_id: '',
    competition_id: '',
    position: 1,
    games_played: 0,
    wins: 0,
    losses: 0,
    points_for: 0,
    points_against: 0,
    points: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: standings = [], isLoading } = useQuery({
    queryKey: ['standings', selectedCompetition],
    queryFn: async () => {
      let query = supabase
        .from('standings')
        .select(`
          *,
          team:clubs(id, name),
          competition:championships(id, name)
        `)
        .order('position');

      if (selectedCompetition) {
        query = query.eq('competition_id', selectedCompetition);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const { data: clubs = [] } = useQuery({
    queryKey: ['clubs-for-standings'],
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
    queryKey: ['competitions-for-standings'],
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
        .from('standings')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standings'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Classificação criada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar classificação', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('standings')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standings'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Classificação atualizada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar classificação', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('standings')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['standings'] });
      toast({ title: 'Classificação eliminada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar classificação', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      team_id: '',
      competition_id: selectedCompetition,
      position: 1,
      games_played: 0,
      wins: 0,
      losses: 0,
      points_for: 0,
      points_against: 0,
      points: 0
    });
    setEditingStanding(null);
  };

  const handleEdit = (standing: any) => {
    setEditingStanding(standing);
    setFormData({
      team_id: standing.team_id,
      competition_id: standing.competition_id,
      position: standing.position,
      games_played: standing.games_played,
      wins: standing.wins,
      losses: standing.losses,
      points_for: standing.points_for,
      points_against: standing.points_against,
      points: standing.points
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStanding) {
      updateMutation.mutate({ id: editingStanding.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const calculatePercentage = (wins: number, games: number) => {
    if (games === 0) return 0;
    return ((wins / games) * 100).toFixed(1);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando classificações...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Classificações</h2>
          <p className="text-gray-600">Gerir classificações das competições</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrar por competição" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as competições</SelectItem>
              {competitions.map((competition) => (
                <SelectItem key={competition.id} value={competition.id}>{competition.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Classificação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingStanding ? 'Editar Classificação' : 'Nova Classificação'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="team_id">Equipa</Label>
                    <Select value={formData.team_id} onValueChange={(value) => setFormData({ ...formData, team_id: value })}>
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="position">Posição</Label>
                    <Input
                      id="position"
                      type="number"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) || 1 })}
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="games_played">Jogos</Label>
                    <Input
                      id="games_played"
                      type="number"
                      value={formData.games_played}
                      onChange={(e) => setFormData({ ...formData, games_played: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="points">Pontos</Label>
                    <Input
                      id="points"
                      type="number"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wins">Vitórias</Label>
                    <Input
                      id="wins"
                      type="number"
                      value={formData.wins}
                      onChange={(e) => setFormData({ ...formData, wins: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="losses">Derrotas</Label>
                    <Input
                      id="losses"
                      type="number"
                      value={formData.losses}
                      onChange={(e) => setFormData({ ...formData, losses: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="points_for">Pontos Marcados</Label>
                    <Input
                      id="points_for"
                      type="number"
                      value={formData.points_for}
                      onChange={(e) => setFormData({ ...formData, points_for: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="points_against">Pontos Sofridos</Label>
                    <Input
                      id="points_against"
                      type="number"
                      value={formData.points_against}
                      onChange={(e) => setFormData({ ...formData, points_against: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingStanding ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Classificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pos</TableHead>
                <TableHead>Equipa</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead className="text-center">J</TableHead>
                <TableHead className="text-center">V</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">%</TableHead>
                <TableHead className="text-center">PM</TableHead>
                <TableHead className="text-center">PS</TableHead>
                <TableHead className="text-center">Pts</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing: any) => (
                <TableRow key={standing.id}>
                  <TableCell className="font-bold text-cv-blue">
                    <div className="flex items-center gap-1">
                      {standing.position}
                      {standing.position === 1 && <Trophy className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{standing.team?.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{standing.competition?.name}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{standing.games_played}</TableCell>
                  <TableCell className="text-center text-green-600 font-medium">{standing.wins}</TableCell>
                  <TableCell className="text-center text-red-600 font-medium">{standing.losses}</TableCell>
                  <TableCell className="text-center">{calculatePercentage(standing.wins, standing.games_played)}%</TableCell>
                  <TableCell className="text-center">{standing.points_for}</TableCell>
                  <TableCell className="text-center">{standing.points_against}</TableCell>
                  <TableCell className="text-center font-bold text-cv-blue">{standing.points}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(standing)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(standing.id)}
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

export default StandingsManager;
