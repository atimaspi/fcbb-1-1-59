
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, User, Trophy } from 'lucide-react';
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

interface Player {
  id: string;
  first_name: string;
  last_name: string;
  position?: string;
  jersey_number?: number;
  birth_date?: string;
  height_cm?: number;
  weight_kg?: number;
  nationality: string;
  club?: string;
  active: boolean;
  status: string;
  created_at: string;
}

const PlayersContentManager = () => {
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Player | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    jersey_number: '',
    birth_date: '',
    height_cm: '',
    weight_kg: '',
    nationality: 'CV',
    club: '',
    active: true,
    status: 'active'
  });
  const { toast } = useToast();

  const positions = [
    'Base', 'Escolta', 'Extremo', 'Ala-Pivot', 'Pivot'
  ];

  const statuses = [
    'active', 'inactive', 'injured', 'suspended', 'retired'
  ];

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPlayersList(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar jogadores:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar jogadores: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      first_name: '',
      last_name: '',
      position: '',
      jersey_number: '',
      birth_date: '',
      height_cm: '',
      weight_kg: '',
      nationality: 'CV',
      club: '',
      active: true,
      status: 'active'
    });
    setShowDialog(true);
  };

  const handleEdit = (item: Player) => {
    setEditingItem(item);
    setFormData({
      first_name: item.first_name,
      last_name: item.last_name,
      position: item.position || '',
      jersey_number: item.jersey_number?.toString() || '',
      birth_date: item.birth_date ? item.birth_date.split('T')[0] : '',
      height_cm: item.height_cm?.toString() || '',
      weight_kg: item.weight_kg?.toString() || '',
      nationality: item.nationality,
      club: item.club || '',
      active: item.active,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este jogador?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Jogador eliminado com sucesso.",
      });

      await fetchPlayers();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar jogador: ${error.message}`,
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
      const playerData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        position: formData.position || null,
        jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
        birth_date: formData.birth_date || null,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
        nationality: formData.nationality,
        club: formData.club || null,
        active: formData.active,
        status: formData.status
      };

      if (editingItem) {
        const { error } = await supabase
          .from('players')
          .update(playerData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Jogador atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('players')
          .insert(playerData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Jogador criado com sucesso.",
        });
      }

      setShowDialog(false);
      await fetchPlayers();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar jogador: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (player: Player) => {
    const statusConfig = {
      'active': { color: 'bg-green-500', label: 'Ativo' },
      'inactive': { color: 'bg-gray-500', label: 'Inativo' },
      'injured': { color: 'bg-red-500', label: 'Lesionado' },
      'suspended': { color: 'bg-orange-500', label: 'Suspenso' },
      'retired': { color: 'bg-blue-500', label: 'Reformado' }
    };

    const config = statusConfig[player.status as keyof typeof statusConfig] || statusConfig.active;
    
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Jogadores</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Novo Jogador
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Clube</TableHead>
              <TableHead>Nacionalidade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : playersList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Nenhum jogador encontrado</TableCell>
              </TableRow>
            ) : (
              playersList.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {player.first_name} {player.last_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{player.position || '-'}</Badge>
                  </TableCell>
                  <TableCell>
                    {player.jersey_number && (
                      <Badge className="bg-blue-500">#{player.jersey_number}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{player.club || '-'}</TableCell>
                  <TableCell>{player.nationality}</TableCell>
                  <TableCell>{getStatusBadge(player)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(player)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(player.id)}
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
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Jogador' : 'Novo Jogador'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos para {editingItem ? 'atualizar' : 'criar'} o jogador.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="first_name" className="text-sm font-medium">
                    Primeiro Nome *
                  </label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="last_name" className="text-sm font-medium">
                    Último Nome *
                  </label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="position" className="text-sm font-medium">
                    Posição
                  </label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Selecionar posição</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="jersey_number" className="text-sm font-medium">
                    Número da Camisola
                  </label>
                  <Input
                    id="jersey_number"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.jersey_number}
                    onChange={(e) => setFormData({...formData, jersey_number: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="birth_date" className="text-sm font-medium">
                    Data de Nascimento
                  </label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="height_cm" className="text-sm font-medium">
                    Altura (cm)
                  </label>
                  <Input
                    id="height_cm"
                    type="number"
                    min="150"
                    max="250"
                    value={formData.height_cm}
                    onChange={(e) => setFormData({...formData, height_cm: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="weight_kg" className="text-sm font-medium">
                    Peso (kg)
                  </label>
                  <Input
                    id="weight_kg"
                    type="number"
                    min="50"
                    max="150"
                    value={formData.weight_kg}
                    onChange={(e) => setFormData({...formData, weight_kg: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="nationality" className="text-sm font-medium">
                    Nacionalidade
                  </label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="club" className="text-sm font-medium">
                    Clube
                  </label>
                  <Input
                    id="club"
                    value={formData.club}
                    onChange={(e) => setFormData({...formData, club: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                />
                <label htmlFor="active" className="text-sm font-medium">
                  Jogador Ativo
                </label>
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

export default PlayersContentManager;
