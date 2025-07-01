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
import { BarChart3, Plus, Edit, Trash2, Star } from 'lucide-react';

const PlayerStatsManagement = () => {
  const { useOptimizedFetch, useOptimizedCreate, useOptimizedUpdate, useOptimizedDelete } = useUnifiedApi();
  
  const { data: playerStats = [], isLoading } = useOptimizedFetch('player_stats');
  const { data: players = [] } = useOptimizedFetch('players');
  const { data: championships = [] } = useOptimizedFetch('championships');
  
  const createStats = useOptimizedCreate('player_stats');
  const updateStats = useOptimizedUpdate('player_stats');
  const deleteStats = useOptimizedDelete('player_stats');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStats, setEditingStats] = useState<any>(null);
  const [formData, setFormData] = useState({
    player_id: '',
    championship_id: '',
    games_played: 0,
    points_per_game: 0,
    rebounds_per_game: 0,
    assists_per_game: 0,
    steals_per_game: 0,
    blocks_per_game: 0,
    field_goal_percentage: 0,
    free_throw_percentage: 0,
    three_point_percentage: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const statsData = {
        ...formData,
        games_played: parseInt(formData.games_played.toString()),
        points_per_game: parseFloat(formData.points_per_game.toString()),
        rebounds_per_game: parseFloat(formData.rebounds_per_game.toString()),
        assists_per_game: parseFloat(formData.assists_per_game.toString()),
        steals_per_game: parseFloat(formData.steals_per_game.toString()),
        blocks_per_game: parseFloat(formData.blocks_per_game.toString()),
        field_goal_percentage: parseFloat(formData.field_goal_percentage.toString()),
        free_throw_percentage: parseFloat(formData.free_throw_percentage.toString()),
        three_point_percentage: parseFloat(formData.three_point_percentage.toString())
      };

      if (editingStats) {
        await updateStats.mutateAsync({ id: editingStats.id, data: statsData });
      } else {
        await createStats.mutateAsync(statsData);
      }
      
      setIsDialogOpen(false);
      setEditingStats(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      player_id: '',
      championship_id: '',
      games_played: 0,
      points_per_game: 0,
      rebounds_per_game: 0,
      assists_per_game: 0,
      steals_per_game: 0,
      blocks_per_game: 0,
      field_goal_percentage: 0,
      free_throw_percentage: 0,
      three_point_percentage: 0
    });
  };

  const handleEdit = (stats: any) => {
    setEditingStats(stats);
    setFormData(stats);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar estas estatísticas?')) {
      await deleteStats.mutateAsync(id);
    }
  };

  const getPlayerName = (playerId: string) => {
    const player = players.find((p: any) => p.id === playerId);
    return player ? `${player.first_name || ''} ${player.last_name || ''}` : 'Jogador não encontrado';
  };

  const getChampionshipName = (championshipId: string) => {
    const championship = championships.find((c: any) => c.id === championshipId);
    return championship?.name || 'Competição não encontrada';
  };

  if (isLoading) {
    return <div>Carregando estatísticas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Gestão de Estatísticas de Jogadores
          </h2>
          <p className="text-gray-600">Gerir estatísticas individuais dos jogadores</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Estatística
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingStats ? 'Editar Estatísticas' : 'Novas Estatísticas'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="player">Jogador</Label>
                  <Select 
                    value={formData.player_id} 
                    onValueChange={(value) => setFormData({...formData, player_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar jogador" />
                    </SelectTrigger>
                    <SelectContent>
                      {players.map((player: any) => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.first_name} {player.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="games_played">Jogos Realizados</Label>
                  <Input
                    id="games_played"
                    type="number"
                    value={formData.games_played}
                    onChange={(e) => setFormData({...formData, games_played: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="points">Pontos/Jogo</Label>
                  <Input
                    id="points"
                    type="number"
                    step="0.1"
                    value={formData.points_per_game}
                    onChange={(e) => setFormData({...formData, points_per_game: parseFloat(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="rebounds">Ressaltos/Jogo</Label>
                  <Input
                    id="rebounds"
                    type="number"
                    step="0.1"
                    value={formData.rebounds_per_game}
                    onChange={(e) => setFormData({...formData, rebounds_per_game: parseFloat(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="assists">Assistências/Jogo</Label>
                  <Input
                    id="assists"
                    type="number"
                    step="0.1"
                    value={formData.assists_per_game}
                    onChange={(e) => setFormData({...formData, assists_per_game: parseFloat(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="steals">Roubos/Jogo</Label>
                  <Input
                    id="steals"
                    type="number"
                    step="0.1"
                    value={formData.steals_per_game}
                    onChange={(e) => setFormData({...formData, steals_per_game: parseFloat(e.target.value) || 0})}
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="blocks">Bloqueios/Jogo</Label>
                  <Input
                    id="blocks"
                    type="number"
                    step="0.1"
                    value={formData.blocks_per_game}
                    onChange={(e) => setFormData({...formData, blocks_per_game: parseFloat(e.target.value) || 0})}
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fg_percentage">% Lançamentos Campo</Label>
                  <Input
                    id="fg_percentage"
                    type="number"
                    step="0.01"
                    value={formData.field_goal_percentage}
                    onChange={(e) => setFormData({...formData, field_goal_percentage: parseFloat(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="ft_percentage">% Lances Livres</Label>
                  <Input
                    id="ft_percentage"
                    type="number"
                    step="0.01"
                    value={formData.free_throw_percentage}
                    onChange={(e) => setFormData({...formData, free_throw_percentage: parseFloat(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="three_percentage">% Triplos</Label>
                  <Input
                    id="three_percentage"
                    type="number"
                    step="0.01"
                    value={formData.three_point_percentage}
                    onChange={(e) => setFormData({...formData, three_point_percentage: parseFloat(e.target.value) || 0})}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingStats ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Estatísticas Registadas ({playerStats.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogador</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>J</TableHead>
                <TableHead>PPJ</TableHead>
                <TableHead>RPJ</TableHead>
                <TableHead>APJ</TableHead>
                <TableHead>%LC</TableHead>
                <TableHead>%LL</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playerStats.map((stats: any) => (
                <TableRow key={stats.id}>
                  <TableCell className="font-medium">
                    {getPlayerName(stats.player_id)}
                  </TableCell>
                  <TableCell>{getChampionshipName(stats.championship_id)}</TableCell>
                  <TableCell>{stats.games_played}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                      {stats.points_per_game}
                    </Badge>
                  </TableCell>
                  <TableCell>{stats.rebounds_per_game}</TableCell>
                  <TableCell>{stats.assists_per_game}</TableCell>
                  <TableCell>{stats.field_goal_percentage}%</TableCell>
                  <TableCell>{stats.free_throw_percentage}%</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(stats)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(stats.id)}
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

export default PlayerStatsManagement;
