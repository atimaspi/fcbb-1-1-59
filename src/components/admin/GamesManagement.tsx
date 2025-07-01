
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, PenLine, Trash2, Play, Square } from 'lucide-react';
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

interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_team_name: string;
  away_team_name: string;
  scheduled_date: string;
  venue: string;
  status: string;
  home_score: number | null;
  away_score: number | null;
  competition_name: string;
}

interface Team {
  id: string;
  name: string;
}

interface Competition {
  id: string;
  name: string;
}

const GamesManagement = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    competition_id: '',
    scheduled_date: '',
    venue: '',
    round: '',
    status: 'scheduled'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGames();
    fetchTeams();
    fetchCompetitions();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(name),
          away_team:teams!games_away_team_id_fkey(name),
          competition:championships(name)
        `)
        .order('scheduled_date', { ascending: false });

      if (error) throw error;

      const formattedGames = data?.map(game => ({
        id: game.id,
        home_team_id: game.home_team_id,
        away_team_id: game.away_team_id,
        home_team_name: game.home_team?.name || 'N/A',
        away_team_name: game.away_team?.name || 'N/A',
        scheduled_date: new Date(game.scheduled_date).toLocaleString('pt-PT'),
        venue: game.venue || '',
        status: game.status || 'scheduled',
        home_score: game.home_score,
        away_score: game.away_score,
        competition_name: game.competition?.name || 'N/A'
      })) || [];

      setGames(formattedGames);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao carregar jogos: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setTeams(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar equipas:', error);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('championships')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCompetitions(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar competições:', error);
    }
  };

  const handleAdd = () => {
    setEditingGame(null);
    setFormData({
      home_team_id: '',
      away_team_id: '',
      competition_id: '',
      scheduled_date: '',
      venue: '',
      round: '',
      status: 'scheduled'
    });
    setShowDialog(true);
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setFormData({
      home_team_id: game.home_team_id,
      away_team_id: game.away_team_id,
      competition_id: '', // Precisaria buscar da base de dados
      scheduled_date: new Date(game.scheduled_date).toISOString().slice(0, 16),
      venue: game.venue,
      round: '',
      status: game.status
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este jogo?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Jogo eliminado com sucesso.",
      });

      await fetchGames();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar jogo: ${error.message}`,
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
      const gameData = {
        home_team_id: formData.home_team_id,
        away_team_id: formData.away_team_id,
        competition_id: formData.competition_id,
        scheduled_date: formData.scheduled_date,
        venue: formData.venue,
        round: formData.round,
        status: formData.status
      };

      if (editingGame) {
        const { error } = await supabase
          .from('games')
          .update(gameData)
          .eq('id', editingGame.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Jogo atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('games')
          .insert(gameData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Jogo criado com sucesso.",
        });
      }

      setShowDialog(false);
      await fetchGames();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar jogo: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      scheduled: { text: 'Agendado', class: 'bg-blue-100 text-blue-800' },
      live: { text: 'Ao Vivo', class: 'bg-green-100 text-green-800' },
      finished: { text: 'Terminado', class: 'bg-gray-100 text-gray-800' },
      postponed: { text: 'Adiado', class: 'bg-yellow-100 text-yellow-800' },
      cancelled: { text: 'Cancelado', class: 'bg-red-100 text-red-800' }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.scheduled;
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Jogos</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Calendar size={18} />
          Adicionar Jogo
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Jogo</TableHead>
              <TableHead>Competição</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : games.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Nenhum jogo encontrado</TableCell>
              </TableRow>
            ) : (
              games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell className="font-medium">{game.scheduled_date}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{game.home_team_name} vs {game.away_team_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{game.competition_name}</TableCell>
                  <TableCell>{game.venue}</TableCell>
                  <TableCell>
                    {game.home_score !== null && game.away_score !== null 
                      ? `${game.home_score} - ${game.away_score}`
                      : '-'
                    }
                  </TableCell>
                  <TableCell>{getStatusBadge(game.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(game)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(game.id)}
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
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingGame ? 'Editar Jogo' : 'Adicionar Novo Jogo'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingGame ? 'atualizar' : 'criar'} o jogo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="home_team" className="text-sm font-medium">
                    Equipa Casa
                  </label>
                  <select
                    id="home_team"
                    value={formData.home_team_id}
                    onChange={(e) => setFormData({...formData, home_team_id: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Selecionar equipa</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="away_team" className="text-sm font-medium">
                    Equipa Visitante
                  </label>
                  <select
                    id="away_team"
                    value={formData.away_team_id}
                    onChange={(e) => setFormData({...formData, away_team_id: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Selecionar equipa</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="competition" className="text-sm font-medium">
                  Competição
                </label>
                <select
                  id="competition"
                  value={formData.competition_id}
                  onChange={(e) => setFormData({...formData, competition_id: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecionar competição</option>
                  {competitions.map(comp => (
                    <option key={comp.id} value={comp.id}>{comp.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="scheduled_date" className="text-sm font-medium">
                    Data e Hora
                  </label>
                  <Input
                    id="scheduled_date"
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({...formData, scheduled_date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="venue" className="text-sm font-medium">
                    Local
                  </label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="round" className="text-sm font-medium">
                    Jornada/Round
                  </label>
                  <Input
                    id="round"
                    value={formData.round}
                    onChange={(e) => setFormData({...formData, round: e.target.value})}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Estado
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="scheduled">Agendado</option>
                    <option value="live">Ao Vivo</option>
                    <option value="finished">Terminado</option>
                    <option value="postponed">Adiado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingGame ? 'Atualizar' : 'Criar'} Jogo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamesManagement;
