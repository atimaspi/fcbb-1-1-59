
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Menu,
  Save
} from 'lucide-react';
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

interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  order_index: number;
  active: boolean;
  parent_id?: string;
  created_at: string;
}

const SidebarContentManager = () => {
  const [menuItems, setMenuItems] = useState<SidebarMenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<SidebarMenuItem | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    icon: '',
    path: '',
    order_index: 0,
    active: true,
    parent_id: ''
  });
  const { toast } = useToast();

  const availableIcons = [
    'LayoutDashboard', 'FileText', 'Calendar', 'Trophy', 'Users', 'Settings',
    'BarChart3', 'Shield', 'Upload', 'User', 'UserCheck', 'GraduationCap',
    'GamepadIcon', 'Building2', 'Building', 'Image', 'Star', 'Handshake'
  ];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      // Como não temos uma tabela específica para menu sidebar, vamos simular com dados
      const defaultMenuItems: SidebarMenuItem[] = [
        {
          id: '1',
          label: 'Dashboard',
          icon: 'LayoutDashboard',
          path: '/admin/dashboard',
          order_index: 1,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          label: 'Gestão de Dados',
          icon: 'FileText',
          path: '/admin/data',
          order_index: 2,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          label: 'Pontuação ao Vivo',
          icon: 'Trophy',
          path: '/admin/live-scoring',
          order_index: 3,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          label: 'Gestão de Jogos',
          icon: 'GamepadIcon',
          path: '/admin/games',
          order_index: 4,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          label: 'Gestão de Resultados',
          icon: 'BarChart3',
          path: '/admin/results',
          order_index: 5,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          label: 'Gestão de Galeria',
          icon: 'Image',
          path: '/admin/gallery',
          order_index: 6,
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '7',
          label: 'Integrações',
          icon: 'Settings',
          path: '/admin/integrations',
          order_index: 7,
          active: true,
          created_at: new Date().toISOString()
        }
      ];

      setMenuItems(defaultMenuItems);
    } catch (error: any) {
      console.error('Erro ao carregar itens do menu:', error);
      toast({
        title: "Erro",
        description: `Erro ao carregar itens do menu: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      label: '',
      icon: 'LayoutDashboard',
      path: '',
      order_index: menuItems.length + 1,
      active: true,
      parent_id: ''
    });
    setShowDialog(true);
  };

  const handleEdit = (item: SidebarMenuItem) => {
    setEditingItem(item);
    setFormData({
      label: item.label,
      icon: item.icon,
      path: item.path,
      order_index: item.order_index,
      active: item.active,
      parent_id: item.parent_id || ''
    });
    setShowDialog(true);
  };

  const toggleActive = (id: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    toast({
      title: "Sucesso",
      description: "Status do item alterado com sucesso.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Atualizar item existente
      setMenuItems(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      // Adicionar novo item
      const newItem: SidebarMenuItem = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString()
      };
      setMenuItems(prev => [...prev, newItem]);
    }

    setShowDialog(false);
    toast({
      title: "Sucesso",
      description: `Item ${editingItem ? 'atualizado' : 'criado'} com sucesso.`,
    });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Tem certeza que deseja eliminar este item?')) return;
    
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Sucesso",
      description: "Item eliminado com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-cv-blue">Gestão de Menu Sidebar</h3>
          <p className="text-gray-600 mt-1">Configure os itens do menu administrativo</p>
        </div>
        <Button onClick={handleAdd} className="bg-cv-blue hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Novo Item
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ordem</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead>Caminho</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
                </TableRow>
              ) : menuItems
                .sort((a, b) => a.order_index - b.order_index)
                .map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-center">
                    {item.order_index}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Menu size={16} className="text-gray-400" />
                      {item.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.icon}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {item.path}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.active ? 'default' : 'secondary'}>
                      {item.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleActive(item.id)}
                        className={`${item.active ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                        title={item.active ? 'Desativar' : 'Ativar'}
                      >
                        {item.active ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar Item do Menu' : 'Novo Item do Menu'}
            </DialogTitle>
            <DialogDescription>
              Configure o item do menu sidebar.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="label" className="text-sm font-medium">
                    Label *
                  </label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({...formData, label: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="icon" className="text-sm font-medium">
                    Ícone
                  </label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {availableIcons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="path" className="text-sm font-medium">
                  Caminho *
                </label>
                <Input
                  id="path"
                  value={formData.path}
                  onChange={(e) => setFormData({...formData, path: e.target.value})}
                  placeholder="/admin/exemplo"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="order_index" className="text-sm font-medium">
                    Ordem
                  </label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value) || 0})}
                    min="1"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  />
                  <label htmlFor="active" className="text-sm font-medium">
                    Item Ativo
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-cv-blue">
                <Save size={16} className="mr-2" />
                {editingItem ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarContentManager;
