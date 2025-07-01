
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Menu as MenuIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { useMenus, useCreateMenu, useUpdateMenu, useDeleteMenu } from '@/hooks/useCMSData';
import { Menu } from '@/types/cms';

const MenuManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    parent_id: '',
    active: true
  });

  const { data: menus = [], isLoading } = useMenus();
  const createMenuMutation = useCreateMenu();
  const updateMenuMutation = useUpdateMenu();
  const deleteMenuMutation = useDeleteMenu();

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      icon: '',
      parent_id: '',
      active: true
    });
    setEditingMenu(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const menuData = {
      ...formData,
      order_index: menus.length + 1,
      parent_id: formData.parent_id || null
    };

    if (editingMenu) {
      await updateMenuMutation.mutateAsync({ id: editingMenu.id, ...menuData });
    } else {
      await createMenuMutation.mutateAsync(menuData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      slug: menu.slug,
      icon: menu.icon || '',
      parent_id: menu.parent_id || '',
      active: menu.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este menu?')) {
      await deleteMenuMutation.mutateAsync(id);
    }
  };

  // Organizar menus hierarquicamente
  const organizeMenus = (menus: Menu[]): Menu[] => {
    const menuMap = new Map<string, Menu>();
    const rootMenus: Menu[] = [];

    menus.forEach(menu => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });

    menus.forEach(menu => {
      if (menu.parent_id) {
        const parent = menuMap.get(menu.parent_id);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(menuMap.get(menu.id)!);
        }
      } else {
        rootMenus.push(menuMap.get(menu.id)!);
      }
    });

    return rootMenus;
  };

  const hierarchicalMenus = organizeMenus(menus);

  const renderMenuRow = (menu: Menu, level: number = 0) => {
    const rows = [
      <TableRow key={menu.id}>
        <TableCell>
          <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
            <MenuIcon className="w-4 h-4 mr-2" />
            {menu.name}
          </div>
        </TableCell>
        <TableCell>
          <code className="text-sm bg-gray-100 px-2 py-1 rounded">/{menu.slug}</code>
        </TableCell>
        <TableCell>{menu.icon}</TableCell>
        <TableCell>
          <Badge variant={menu.active ? 'default' : 'secondary'}>
            {menu.active ? 'Ativo' : 'Inativo'}
          </Badge>
        </TableCell>
        <TableCell>{menu.order_index}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(menu)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDelete(menu.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ];

    // Adicionar submenus
    if (menu.children && menu.children.length > 0) {
      menu.children.forEach(child => {
        rows.push(...renderMenuRow(child, level + 1));
      });
    }

    return rows;
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando menus...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Menus</h2>
          <p className="text-gray-600">Gerir estrutura de navegação do site</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Menu
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingMenu ? 'Editar Menu' : 'Criar Menu'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="icon">Ícone (Lucide)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="home, user, settings..."
                />
              </div>
              
              <div>
                <Label htmlFor="parent">Menu Pai (opcional)</Label>
                <Select value={formData.parent_id} onValueChange={(value) => setFormData(prev => ({ ...prev, parent_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar menu pai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhum (Menu principal)</SelectItem>
                    {menus.filter(m => !m.parent_id && m.id !== editingMenu?.id).map(menu => (
                      <SelectItem key={menu.id} value={menu.id}>{menu.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Menu ativo</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMenuMutation.isPending || updateMenuMutation.isPending}>
                  {editingMenu ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menus ({menus.length})</CardTitle>
          <CardDescription>
            Estrutura hierárquica dos menus do site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hierarchicalMenus.map(menu => renderMenuRow(menu))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuManager;
