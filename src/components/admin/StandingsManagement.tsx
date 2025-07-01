
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { Trophy, Plus, Edit, Trash2, Target } from 'lucide-react';

const StandingsManagement = () => {
  const { useOptimizedFetch, useOptimizedCreate, useOptimizedUpdate, useOptimizedDelete } = useUnifiedApi();
  
  const { data: standings = [], isLoading } = useOptimizedFetch('standings');
  const { data: championships = [] } = useOptimizedFetch('championships');
  const { data: teams = [] } = useOptimizedFetch('teams');
  
  const createStanding = useOptimizedCreate('standings');
  const updateStanding = useOptimizedUpdate('standings');
  const deleteStanding = useOptimizedDelete('standings');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStanding, setEditingStanding] = useState<any>(null);
  const [formData, setFormData] = useState({
    championship_id: '',
    team_id: '',
    position: 1,
    played: 0,
    wins: 0,
    losses: 0,
    points_for: 0,
    points_against: 0,
    points: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingStanding) {
        await updateStanding.mutateAsync({
          id: editingStanding.id,
          data: {
            ...formData,
            position: parseInt(formData.position.toString()),
            played: parseInt(formData.played.toString()),
            wins: parseInt(formData.wins.toString()),
            losses: parseInt(formData.losses.toString()),
            points_for: parseInt(formData.points_for.toString()),
            points_against: parseInt(formData.points_against.toString()),
            points: parseInt(formData.points.toString())
          }
        });
      } else {
        await createStanding.mutateAsync({
          ...formData,
          position: parseInt(formData.position.toString()),
          played: parseInt(formData.played.toString()),
          wins: parseInt(formData.wins.toString()),
          losses: parseInt(formData.losses.toString()),
          points_for: parseInt(formData.points_for.toString()),
          points_against: parseInt(formData.points_against.toString()),
          points: parseInt(formData.points.toString())
        });
      }
      
      setIsDialogOpen(false);
      setEditingStanding(null);
      setFormData({
        championship_id: '',
        team_id: '',
        position: 1,
        played: 0,
        wins: 0,
        losses: 0,
        points_for: 0,
        points_against: 0,
        points: 0
      });
    } catch (error) {
      console.error('Erro ao salvar classificação:', error);
    }
  };

  const handleEdit = (standing: any) => {
    setEditingStanding(standing);
    setFormData({
      championship_id: standing.championship_id,
      team_id: standing.team_id,
      position: standing.position,
      played: standing.played,
      wins: standing.wins,
      losses: standing.losses,
      points_for: standing.points_for,
      points_against: standing.points_against,
      points: standing.points
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar esta classificação?')) {
      await deleteStanding.mutateAsync(id);
    }
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find((t: any) => t.id === teamId);
    return team?.name || 'Equipa não encontrada';
  };

  const getChampionshipName = (championshipId: string) => {
    const championship = championships.find((c: any) => c.id === championshipId);
    return championship?.name || 'Competição não encontrada';
  };

  if (isLoading) {
    return <div>Carregando classificações...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Gestão de Classificações
          </h2>
          <p className="text-gray-600">Gerir classificações dos campeonatos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
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
                  <Label htmlFor="championship">Competição</Label>
                  <Select 
                    value={formData.championship_id} 
                    onValueChange={(value) => setFormData({...formData, championship_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar competição" />
                    </SelectTrigger>
                    <SelectContent>
                      {championships.map((championship: any) => (
                        <SelectItem key={championship.id} value={championship.id}>
                          {championship.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="team">Equipa</Label>
                  <Select 
                    value={formData.team_id} 
                    onValueChange={(value) => setFormData({...formData, team_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team: any) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="position">Posição</Label>
                  <Input
                    id="position"
                    type="number"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: parseInt(e.target.value) || 0})}
                    min="1"
                  />
                </div>

                <div>
                  <Label htmlFor="played">Jogos</Label>
                  <Input
                    id="played"
                    type="number"
                    value={formData.played}
                    onChange={(e) => setFormData({...formData, played: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="wins">Vitórias</Label>
                  <Input
                    id="wins"
                    type="number"
                    value={formData.wins}
                    onChange={(e) => setFormData({...formData, wins: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="losses">Derrotas</Label>
                  <Input
                    id="losses"
                    type="number"
                    value={formData.losses}
                    onChange={(e) => setFormData({...formData, losses: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="points_for">Pontos Marcados</Label>
                  <Input
                    id="points_for"
                    type="number"
                    value={formData.points_for}
                    onChange={(e) => setFormData({...formData, points_for: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="points_against">Pontos Sofridos</Label>
                  <Input
                    id="points_against"
                    type="number"
                    value={formData.points_against}
                    onChange={(e) => setFormData({...formData, points_against: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="points">Pontos Classificação</Label>
                  <Input
                    id="points"
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingStanding ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Classificações Registadas ({standings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pos</TableHead>
                <TableHead>Equipa</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>J</TableHead>
                <TableHead>V</TableHead>
                <TableHead>D</TableHead>
                <TableHead>PM</TableHead>
                <TableHead>PS</TableHead>
                <TableHead>Pts</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing: any) => (
                <TableRow key={standing.id}>
                  <TableCell>
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {standing.position}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {getTeamName(standing.team_id)}
                  </TableCell>
                  <TableCell>{getChampionshipName(standing.championship_id)}</TableCell>
                  <TableCell>{standing.played}</TableCell>
                  <TableCell className="text-green-600 font-medium">{standing.wins}</TableCell>
                  <TableCell className="text-red-600 font-medium">{standing.losses}</TableCell>
                  <TableCell>{standing.points_for}</TableCell>
                  <TableCell>{standing.points_against}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-cv-blue">
                      {standing.points}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(standing)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(standing.id)}
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

export default StandingsManagement;
