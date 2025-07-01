
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Building, Globe, Mail, Phone } from 'lucide-react';
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

interface Club {
  id: string;
  name: string;
  island: string;
  logo_url?: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  website?: string;
  founded_year?: number;
  active: boolean;
  status: string;
  created_at: string;
}

const ClubsContentManager = () => {
  const [clubsList, setClubsList] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Club | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    island: '',
    logo_url: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    website: '',
    founded_year: '',
    active: true,
    status: 'active'
  });
  const { toast } = useToast();

  const islands = [
    'Santiago', 'Santo Antão', 'São Vicente', 'Fogo', 'Maio', 
    'Sal', 'Boa Vista', 'Brava', 'São Nicolau'
  ];

  const statuses = ['active', 'inactive', 'suspended'];

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setClubsList(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar clubes:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar clubes: ${error.message}`,
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
      island: 'Santiago',
      logo_url: '',
      description: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      website: '',
      founded_year: '',
      active: true,
      status: 'active'
    });
    setShowDialog(true);
  };

  const handleEdit = (item: Club) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      island: item.island,
      logo_url: item.logo_url || '',
      description: item.description || '',
      contact_email: item.contact_email || '',
      contact_phone: item.contact_phone || '',
      address: item.address || '',
      website: item.website || '',
      founded_year: item.founded_year?.toString() || '',
      active: item.active,
      status: item.status
    });
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este clube?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('clubs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Clube eliminado com sucesso.",
      });

      await fetchClubs();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao eliminar clube: ${error.message}`,
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
      const clubData = {
        name: formData.name,
        island: formData.island,
        logo_url: formData.logo_url || null,
        description: formData.description || null,
        contact_email: formData.contact_email || null,
        contact_phone: formData.contact_phone || null,
        address: formData.address || null,
        website: formData.website || null,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
        active: formData.active,
        status: formData.status
      };

      if (editingItem) {
        const { error } = await supabase
          .from('clubs')
          .update(clubData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Clube atualizado com sucesso.",
        });
      } else {
        const { error } = await supabase
          .from('clubs')
          .insert(clubData);

        if (error) throw error;

        toast({
          title: "Sucesso",
          description: "Clube criado com sucesso.",
        });
      }

      setShowDialog(false);
      await fetchClubs();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar clube: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (club: Club) => {
    const statusConfig = {
      'active': { color: 'bg-green-500', label: 'Ativo' },
      'inactive': { color: 'bg-gray-500', label: 'Inativo' },
      'suspended': { color: 'bg-red-500', label: 'Suspenso' }
    };

    const config = statusConfig[club.status as keyof typeof statusConfig] || statusConfig.active;
    
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Clubes</h3>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Novo Clube
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Ilha</TableHead>
              <TableHead>Fundado</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : clubsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum clube encontrado</TableCell>
              </TableRow>
            ) : (
              clubsList.map((club) => (
                <TableRow key={club.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building size={16} />
                      <div>
                        <div className="font-medium">{club.name}</div>
                        {club.website && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Globe size={12} />
                            <span>{club.website}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{club.island}</Badge>
                  </TableCell>
                  <TableCell>{club.founded_year || '-'}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {club.contact_email && (
                        <div className="flex items-center gap-1 text-sm">
                          <Mail size={12} />
                          <span>{club.contact_email}</span>
                        </div>
                      )}
                      {club.contact_phone && (
                        <div className="flex items-center gap-1 text-sm">
                          <Phone size={12} />
                          <span>{club.contact_phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(club)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(club)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(club.id)}
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Clube' : 'Novo Clube'}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos para {editingItem ? 'atualizar' : 'criar'} o clube.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome do Clube *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="island" className="text-sm font-medium">
                    Ilha *
                  </label>
                  <select
                    id="island"
                    value={formData.island}
                    onChange={(e) => setFormData({...formData, island: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    {islands.map(island => (
                      <option key={island} value={island}>{island}</option>
                    ))}
                  </select>
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="contact_email" className="text-sm font-medium">
                    Email de Contacto
                  </label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="contact_phone" className="text-sm font-medium">
                    Telefone de Contacto
                  </label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Endereço
                </label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="website" className="text-sm font-medium">
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://exemplo.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="founded_year" className="text-sm font-medium">
                    Ano de Fundação
                  </label>
                  <Input
                    id="founded_year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.founded_year}
                    onChange={(e) => setFormData({...formData, founded_year: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="logo_url" className="text-sm font-medium">
                  URL do Logótipo
                </label>
                <Input
                  id="logo_url"
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  />
                  <label htmlFor="active" className="text-sm font-medium">
                    Clube Ativo
                  </label>
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

export default ClubsContentManager;
