
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Trophy, Calendar } from 'lucide-react';
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
  description?: string;
  season: string;
  type: string;
  status: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
}

const CompetitionsContentManager = () => {
  const [competitionsList, setCompetitionsList] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Competition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    season: new Date().getFullYear().toString(),
    type: 'championship',
    status: 'upcoming',
    start_date: '',
    end_date: ''
  });
  const { toast } = useToast();

  const types = [
    'championship', 'cup', 'tournament', 'friendly', 'playoff'
  ];

  const statuses = [
    'upcoming', 'ongoing', 'completed', 'cancelled', 'postponed'
  ];

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCompetitionsList(data || []);
    } catch (error: any) {
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
    setFormData({
      name: '',
      description: '',
      season: new Date().getFullYear().toString(),
      type: 'championship',
      status: 'upcoming',
      start_date: '',
      end_date: ''
    });
    setShowDialog(true);
  };

  const handleEdit = (item: Competition) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      season: item.season,
      type: item.type,
      status: item.status,
      start_date: item.start_date ? item.start_date.split('T')[0] : '',
      end_date: item.end_date ? item.end_date.split('T')[0] : ''
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar esta competição?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('championships')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Competição eliminada com sucesso.",
      });

      await fetchCompetitions();
    } catch (error: any) {
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
      const competitionData = {
        name: formData.name,
        description: formData.description || null,
        season: formData.season,
        type: formData.type,
        status: formData.status,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null
      };

      if (editingItem) {
        const { error } = await supabase
          .from('championships')
          .update(competitionData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Competição atualizada com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('championships')
          .insert(competitionData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Competição criada com sucesso.",
        });
      }

      setShowDialog(false);
      await fetchCompetitions();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar competição: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'upcoming': { color: 'bg-blue-500', label: 'Por Começar' },
      'ongoing': { color: 'bg-green-500', label: 'Em Curso' },
      'completed': { color: 'bg-gray-500', label: 'Concluída' },
      'cancelled': { color: 'bg-red-500', label: 'Cancelada' },
      'postponed': { color: 'bg-orange-500', label: 'Adiada' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Competições</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Nova Competição
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Época</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : competitionsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhuma competição encontrada</TableCell>
              </TableRow>
            ) : (
              competitionsList.map((competition) => (
                <TableRow key={competition.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Trophy size={16} />
                      <div>
                        <div className="font-medium">{competition.name}</div>
                        {competition.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {competition.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{competition.season}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{competition.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(competition.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar size={14} />
                      <div>
                        {competition.start_date && (
                          <div>{new Date(competition.start_date).toLocaleDateString('pt-PT')}</div>
                        )}
                        {competition.end_date && (
                          <div>até {new Date(competition.end_date).toLocaleDateString('pt-PT')}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(competition)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(competition.id)}
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Competição' : 'Nova Competição'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos para {editingItem ? 'atualizar' : 'criar'} a competição.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome da Competição *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="season" className="text-sm font-medium">
                    Época *
                  </label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    placeholder="2024"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo *
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status *
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start_date" className="text-sm font-medium">
                    Data de Início
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
                    Data de Fim
                  </label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue" disabled={loading}>
                {loading ? 'A processar...' : editingItem ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetitionsContentManager;
