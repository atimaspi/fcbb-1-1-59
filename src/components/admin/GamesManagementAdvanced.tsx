
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const GamesManagementAdvanced = () => {
  const { games, teams, competitions, gamesLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<any>(null);
  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    competition_id: '',
    scheduled_date: '',
    venue: '',
    round: '',
    status: 'scheduled',
    home_score: '',
    away_score: ''
  });

  const statusOptions = [
    { value: 'scheduled', label: 'Agendado' },
    { value: 'live', label: 'Ao Vivo' },
    { value: 'finished', label: 'Finalizado' },
    { value: 'postponed', label: 'Adiado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.home_team_id || !formData.away_team_id || !formData.scheduled_date) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.home_team_id === formData.away_team_id) {
      toast({
        title: "Erro",
        description: "Uma equipa não pode jogar contra si mesma.",
        variant: "destructive"
      });
      return;
    }

    try {
      const gameData = {
        ...formData,
        home_score: formData.home_score ? parseInt(formData.home_score) : null,
        away_score: formData.away_score ? parseInt(formData.away_score) : null
      };

      if (editingGame) {
        await operations.games.update.mutateAsync({ 
          id: editingGame.id, 
          data: gameData 
        });
        toast({
          title: "Sucesso",
          description: "Jogo atualizado com sucesso!"
        });
      } else {
        await operations.games.create.mutateAsync(gameData);
        toast({
          title: "Sucesso", 
          description: "Jogo criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar jogo: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (game: any) => {
    setEditingGame(game);
    setFormData({
      home_team_id: game.home_team_id || '',
      away_team_id: game.away_team_id || '',
      competition_id: game.competition_id || '',
      scheduled_date: game.scheduled_date ? format(new Date(game.scheduled_date), 'yyyy-MM-dd\'T\'HH:mm') : '',
      venue: game.venue || '',
      round: game.round || '',
      status: game.status || 'scheduled',
      home_score: game.home_score?.toString() || '',
      away_score: game.away_score?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (gameId: string) => {
    if (confirm('Tem certeza que deseja eliminar este jogo?')) {
      try {
        await operations.games.delete.mutateAsync(gameId);
        toast({
          title: "Sucesso",
          description: "Jogo eliminado com sucesso!"
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `Erro ao eliminar jogo: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      home_team_id: '',
      away_team_id: '',
      competition_id: '',
      scheduled_date: '',
      venue: '',
      round: '',
      status: 'scheduled',
      home_score: '',
      away_score: ''
    });
    setEditingGame(null);
  };

  const getTeamName = (teamId: string) => {
    return teams.find(t => t.id === teamId)?.name || 'Equipa não encontrada';
  };

  const getCompetitionName = (competitionId: string) => {
    return competitions.find(c => c.id === competitionId)?.name || '—';
  };

  if (gamesLoading) {
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
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Gestão de Jogos
          </h2>
          <p className="text-gray-600">Gerir jogos e resultados</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Jogo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingGame ? 'Editar Jogo' : 'Novo Jogo'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do jogo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="home_team_id">Equipa Casa *</Label>
                  <Select value={formData.home_team_id} onValueChange={(value) => handleInputChange('home_team_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa casa" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="away_team_id">Equipa Visitante *</Label>
                  <Select value={formData.away_team_id} onValueChange={(value) => handleInputChange('away_team_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa visitante" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="competition_id">Competição</Label>
                  <Select value={formData.competition_id} onValueChange={(value) => handleInputChange('competition_id', value)}>
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
                  <Label htmlFor="round">Jornada/Ronda</Label>
                  <Input
                    id="round"
                    value={formData.round}
                    onChange={(e) => handleInputChange('round', e.target.value)}
                    placeholder="Ex: Jornada 1, Quartos de Final"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduled_date">Data e Hora *</Label>
                  <Input
                    id="scheduled_date"
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) => handleInputChange('scheduled_date', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="venue">Local do Jogo</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    placeholder="Ex: Pavilhão Desportivo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="home_score">Resultado Casa</Label>
                  <Input
                    id="home_score"
                    type="number"
                    min="0"
                    value={formData.home_score}
                    onChange={(e) => handleInputChange('home_score', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="away_score">Resultado Visitante</Label>
                  <Input
                    id="away_score"
                    type="number"
                    min="0"
                    value={formData.away_score}
                    onChange={(e) => handleInputChange('away_score', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingGame ? 'Atualizar' : 'Criar'} Jogo
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jogos Registados ({games.length})</CardTitle>
          <CardDescription>
            Lista completa de jogos no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Casa vs Visitante</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game: any) => (
                <TableRow key={game.id}>
                  <TableCell>
                    {game.scheduled_date ? format(new Date(game.scheduled_date), 'dd/MM/yyyy HH:mm') : '—'}
                  </TableCell>
                  <TableCell className="font-medium">
                    {getTeamName(game.home_team_id)} vs {getTeamName(game.away_team_id)}
                  </TableCell>
                  <TableCell>{getCompetitionName(game.competition_id)}</TableCell>
                  <TableCell>
                    {game.home_score !== null && game.away_score !== null 
                      ? `${game.home_score} - ${game.away_score}` 
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={game.status === 'finished' ? 'default' : 'secondary'}>
                      {statusOptions.find(s => s.value === game.status)?.label || game.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(game)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(game.id)}
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

export default GamesManagementAdvanced;
