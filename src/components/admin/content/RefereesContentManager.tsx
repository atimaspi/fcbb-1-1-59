
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, UserCheck, Award } from 'lucide-react';
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

interface Referee {
  id: string;
  first_name: string;
  last_name: string;
  license_number?: string;
  level: string;
  island?: string;
  phone?: string;
  email?: string;
  active: boolean;
  certified_date?: string;
  created_at: string;
}

const RefereesContentManager = () => {
  const [refereesList, setRefereesList] = useState<Referee[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Referee | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    license_number: '',
    level: 'regional',
    island: 'Santiago',
    phone: '',
    email: '',
    active: true,
    certified_date: ''
  });
  const { toast } = useToast();

  const levels = [
    'regional', 'nacional', 'internacional', 'fiba'
  ];

  const islands = [
    'Santiago', 'Santo Antão', 'São Vicente', 'Fogo', 'Maio', 
    'Sal', 'Boa Vista', 'Brava', 'São Nicolau'
  ];

  useEffect(() => {
    fetchReferees();
  }, []);

  const fetchReferees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('referees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRefereesList(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar árbitros:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar árbitros: ${error.message}`,
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
      license_number: '',
      level: 'regional',
      island: 'Santiago',
      phone: '',
      email: '',
      active: true,
      certified_date: ''
    });
    setShowDialog(true);
  };

  const handleEdit = (item: Referee) => {
    setEditingItem(item);
    setFormData({
      first_name: item.first_name,
      last_name: item.last_name,
      license_number: item.license_number || '',
      level: item.level,
      island: item.island || 'Santiago',
      phone: item.phone || '',
      email: item.email || '',
      active: item.active,
      certified_date: item.certified_date ? item.certified_date.split('T')[0] : ''
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este árbitro?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('referees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Árbitro eliminado com sucesso.",
      });

      await fetchReferees();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar árbitro: ${error.message}`,
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
      const refereeData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        license_number: formData.license_number || null,
        level: formData.level,
        island: formData.island || null,
        phone: formData.phone || null,
        email: formData.email || null,
        active: formData.active,
        certified_date: formData.certified_date || null
      };

      if (editingItem) {
        const { error } = await supabase
          .from('referees')
          .update(refereeData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Árbitro atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('referees')
          .insert(refereeData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Árbitro criado com sucesso.",
        });
      }

      setShowDialog(false);
      await fetchReferees();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar árbitro: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'regional': { color: 'bg-blue-500', label: 'Regional' },
      'nacional': { color: 'bg-green-500', label: 'Nacional' },
      'internacional': { color: 'bg-purple-500', label: 'Internacional' },
      'fiba': { color: 'bg-red-500', label: 'FIBA' }
    };

    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.regional;
    
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Árbitros</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Novo Árbitro
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Licença</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Ilha</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : refereesList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">Nenhum árbitro encontrado</TableCell>
              </TableRow>
            ) : (
              refereesList.map((referee) => (
                <TableRow key={referee.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserCheck size={16} />
                      {referee.first_name} {referee.last_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {referee.license_number && (
                      <div className="flex items-center gap-1">
                        <Award size={14} />
                        <span className="font-mono text-sm">{referee.license_number}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getLevelBadge(referee.level)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{referee.island || '-'}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {referee.email && <div>{referee.email}</div>}
                      {referee.phone && <div>{referee.phone}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={referee.active ? 'bg-green-500' : 'bg-gray-500'}>
                      {referee.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(referee)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(referee.id)}
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
              {editingItem ? 'Editar Árbitro' : 'Novo Árbitro'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos para {editingItem ? 'atualizar' : 'criar'} o árbitro.
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

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="license_number" className="text-sm font-medium">
                    Número da Licença
                  </label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => setFormData({...formData, license_number: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="level" className="text-sm font-medium">
                    Nível *
                  </label>
                  <select
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="island" className="text-sm font-medium">
                    Ilha
                  </label>
                  <select
                    id="island"
                    value={formData.island}
                    onChange={(e) => setFormData({...formData, island: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {islands.map(island => (
                      <option key={island} value={island}>{island}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="certified_date" className="text-sm font-medium">
                    Data de Certificação
                  </label>
                  <Input
                    id="certified_date"
                    type="date"
                    value={formData.certified_date}
                    onChange={(e) => setFormData({...formData, certified_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
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
                  Árbitro Ativo
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

export default RefereesContentManager;
