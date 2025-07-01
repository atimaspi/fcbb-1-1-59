import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, PenLine, Trash2, Plus } from 'lucide-react';
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

interface Competition {
  id: string;
  name: string;
  type: string;
  season: string;
  start_date: string;
  end_date: string;
  teams: number;
  status: string;
}

const CompetitionsManagement = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Competition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'championship',
    season: '2024/2025',
    start_date: '',
    end_date: '',
    teams: 0,
    status: 'upcoming'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      console.log('Fetching competitions...');
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Competitions fetch result:', { data, error });

      if (error) {
        console.error('Erro ao carregar competições:', error);
        throw error;
      }

      const formattedCompetitions = data?.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        season: item.season,
        start_date: item.start_date || '',
        end_date: item.end_date || '',
        teams: 0, // This would need to be calculated from a teams relationship
        status: item.status === 'ongoing' ? 'Em Curso' : item.status === 'upcoming' ? 'Agendado' : 'Concluído'
      })) || [];

      console.log('Formatted competitions:', formattedCompetitions);
      setCompetitions(formattedCompetitions);
    } catch (error) {
      console.error('Erro ao carregar competições:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar competições: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', type: 'championship', season: '2024/2025', start_date: '', end_date: '', teams: 0, status: 'upcoming' });
    setShowDialog(true);
  };

  const handleEdit = (item: Competition) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      season: item.season,
      start_date: item.start_date,
      end_date: item.end_date,
      teams: item.teams,
      status: item.status === 'Em Curso' ? 'ongoing' : item.status === 'Agendado' ? 'upcoming' : 'completed'
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete button clicked for id:', id);
    if (!window.confirm('Tem certeza que deseja eliminar esta competição?')) {
      console.log('Delete cancelled by user');
      return;
    }

    setLoading(true);
    try {
      console.log('Deleting competition with id:', id);
      const { error } = await supabase
        .from('championships')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Competition deleted successfully');
      toast({
        title: "Sucesso",
        description: "Competição eliminada com sucesso.",
      });

      await fetchCompetitions();
    } catch (error: any) {
      console.error('Erro ao eliminar competição:', error);
      toast({
        title: "Erro",
        description: `Erro ao eliminar competição: ${error.message}`,
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
      console.log('Submitting competitions form data:', formData);
      
      if (editingItem) {
        console.log('Updating competition with id:', editingItem.id);
        const { data, error } = await supabase
          .from('championships')
          .update({
            name: formData.name,
            type: formData.type,
            season: formData.season,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
            status: formData.status
          })
          .eq('id', editingItem.id)
          .select();

        console.log('Update result:', { data, error });

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Competição atualizada com sucesso.",
        });
      } else {
        console.log('Creating new competition');
        const { data, error } = await supabase
          .from('championships')
          .insert({
            name: formData.name,
            type: formData.type,
            season: formData.season,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
            status: formData.status
          })
          .select();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        toast({
          title: "Sucesso",
          description: "Competição criada com sucesso.",
        });
      }

      setShowDialog(false);
      setFormData({ name: '', type: 'championship', season: '2024/2025', start_date: '', end_date: '', teams: 0, status: 'upcoming' });
      await fetchCompetitions();
    } catch (error) {
      console.error('Erro ao salvar competição:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar competição: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Competições</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Adicionar Competição
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Época</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : competitions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhuma competição encontrada</TableCell>
              </TableRow>
            ) : (
              competitions.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell className="max-w-xs truncate">{comp.name}</TableCell>
                  <TableCell>{comp.type}</TableCell>
                  <TableCell>{comp.season}</TableCell>
                  <TableCell className="text-sm">
                    {comp.start_date && comp.end_date ? `${comp.start_date} - ${comp.end_date}` : 'Não definido'}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      comp.status === 'Em Curso' ? 'bg-green-100 text-green-800' : 
                      comp.status === 'Agendado' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {comp.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(comp)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <PenLine size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(comp.id)}
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
              {editingItem ? 'Editar Competição' : 'Adicionar Nova Competição'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editingItem ? 'atualizar' : 'criar'} a competição.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome da Competição
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                    <option value="championship">Liga</option>
                    <option value="cup">Taça</option>
                    <option value="super_cup">Super Taça</option>
                    <option value="tournament">Torneio</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="season" className="text-sm font-medium">
                    Época
                  </label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    placeholder="2024/2025"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start_date" className="text-sm font-medium">
                    Data Início
                  </label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="end_date" className="text-sm font-medium">
                    Data Fim
                  </label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
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
                  <option value="upcoming">Agendado</option>
                  <option value="ongoing">Em Curso</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'} Competição
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetitionsManagement;
