
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, PenLine, Eye } from 'lucide-react';
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

interface GameResult {
  id: string;
  game_id: string;
  home_team_name: string;
  away_team_name: string;
  home_team_score: number;
  away_team_score: number;
  game_status: string;
  scheduled_date: string;
  venue: string;
  quarter_scores: any;
}

const ResultsManagement = () => {
  const [results, setResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingResult, setEditingResult] = useState<GameResult | null>(null);
  const [formData, setFormData] = useState({
    home_team_score: 0,
    away_team_score: 0,
    quarter_scores: {
      q1_home: 0, q1_away: 0,
      q2_home: 0, q2_away: 0,
      q3_home: 0, q3_away: 0,
      q4_home: 0, q4_away: 0
    },
    game_status: 'finished'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('game_results')
        .select(`
          *,
          game:games!game_results_game_id_fkey(
            scheduled_date,
            venue,
            home_team:teams!games_home_team_id_fkey(name),
            away_team:teams!games_away_team_id_fkey(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedResults = data?.map(result => ({
        id: result.id,
        game_id: result.game_id,
        home_team_name: result.game?.home_team?.name || 'N/A',
        away_team_name: result.game?.away_team?.name || 'N/A',
        home_team_score: result.home_team_score,
        away_team_score: result.away_team_score,
        game_status: result.game_status,
        scheduled_date: new Date(result.game?.scheduled_date).toLocaleDateString('pt-PT'),
        venue: result.game?.venue || '',
        quarter_scores: result.quarter_scores
      })) || [];

      setResults(formattedResults);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao carregar resultados: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (result: GameResult) => {
    setEditingResult(result);
    setFormData({
      home_team_score: result.home_team_score,
      away_team_score: result.away_team_score,
      quarter_scores: result.quarter_scores || {
        q1_home: 0, q1_away: 0,
        q2_home: 0, q2_away: 0,
        q3_home: 0, q3_away: 0,
        q4_home: 0, q4_away: 0
      },
      game_status: result.game_status
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('game_results')
        .update({
          home_team_score: formData.home_team_score,
          away_team_score: formData.away_team_score,
          quarter_scores: formData.quarter_scores,
          game_status: formData.game_status,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingResult.id);

      if (error) throw error;

      // Atualizar também a tabela games
      await supabase
        .from('games')
        .update({
          home_score: formData.home_team_score,
          away_score: formData.away_team_score,
          status: formData.game_status
        })
        .eq('id', editingResult.game_id);

      toast({
        title: "Sucesso",
        description: "Resultado atualizado com sucesso.",
      });

      setShowDialog(false);
      await fetchResults();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao atualizar resultado: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (quarters: any, team: 'home' | 'away') => {
    if (!quarters) return 0;
    const suffix = team === 'home' ? '_home' : '_away';
    return (quarters[`q1${suffix}`] || 0) + 
           (quarters[`q2${suffix}`] || 0) + 
           (quarters[`q3${suffix}`] || 0) + 
           (quarters[`q4${suffix}`] || 0);
  };

  const updateQuarterScore = (quarter: string, value: number) => {
    const newQuarters = { ...formData.quarter_scores, [quarter]: value };
    setFormData({
      ...formData,
      quarter_scores: newQuarters,
      home_team_score: calculateTotal(newQuarters, 'home'),
      away_team_score: calculateTotal(newQuarters, 'away')
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Resultados</h3>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Jogo</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum resultado encontrado</TableCell>
              </TableRow>
            ) : (
              results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.scheduled_date}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {result.home_team_name} vs {result.away_team_name}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    {result.home_team_score} - {result.away_team_score}
                  </TableCell>
                  <TableCell>{result.venue}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      result.game_status === 'finished' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {result.game_status === 'finished' ? 'Terminado' : 'Ao Vivo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(result)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
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
            <DialogTitle>Editar Resultado</DialogTitle>
            <DialogDescription>
              Atualize o resultado e pontuações por quarter.
            </DialogDescription>
          </DialogHeader>
          {editingResult && (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="text-center text-lg font-semibold">
                  {editingResult.home_team_name} vs {editingResult.away_team_name}
                </div>

                <div className="grid grid-cols-5 gap-4 text-center">
                  <div className="font-medium">Quarter</div>
                  <div className="font-medium">{editingResult.home_team_name}</div>
                  <div></div>
                  <div className="font-medium">{editingResult.away_team_name}</div>
                  <div></div>

                  {[1, 2, 3, 4].map(quarter => (
                    <div key={quarter} className="contents">
                      <div className="flex items-center font-medium">Q{quarter}</div>
                      <Input
                        type="number"
                        min="0"
                        value={formData.quarter_scores[`q${quarter}_home`] || 0}
                        onChange={(e) => updateQuarterScore(`q${quarter}_home`, parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                      <div className="flex items-center justify-center">-</div>
                      <Input
                        type="number"
                        min="0"
                        value={formData.quarter_scores[`q${quarter}_away`] || 0}
                        onChange={(e) => updateQuarterScore(`q${quarter}_away`, parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                      <div></div>
                    </div>
                  ))}

                  <div className="contents font-bold text-lg">
                    <div>Total</div>
                    <div className="text-center py-2">{formData.home_team_score}</div>
                    <div className="text-center py-2">-</div>
                    <div className="text-center py-2">{formData.away_team_score}</div>
                    <div></div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Estado do Jogo
                  </label>
                  <select
                    id="status"
                    value={formData.game_status}
                    onChange={(e) => setFormData({...formData, game_status: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="live">Ao Vivo</option>
                    <option value="finished">Terminado</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue" disabled={loading}>
                  {loading ? 'A atualizar...' : 'Atualizar'} Resultado
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultsManagement;
