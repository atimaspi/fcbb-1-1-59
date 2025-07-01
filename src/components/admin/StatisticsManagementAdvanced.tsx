
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useApi } from '@/hooks/useApi';
import { Plus, Edit, Trash2, TrendingUp, Trophy, Users, Calendar, MapPin, Star } from 'lucide-react';

const StatisticsManagementAdvanced = () => {
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();
  const { data: stats = [], isLoading } = useFetch('basketball_stats');
  const createStat = useCreate('basketball_stats');
  const updateStat = useUpdate('basketball_stats');
  const deleteStat = useDelete('basketball_stats');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<any>(null);
  const [formData, setFormData] = useState({
    stat_key: '',
    stat_name: '',
    stat_value: '',
    icon_name: 'trophy',
    description: '',
    order_index: 0,
    active: true
  });

  const iconOptions = [
    { value: 'trophy', label: 'Troféu', icon: Trophy },
    { value: 'users', label: 'Utilizadores', icon: Users },
    { value: 'calendar', label: 'Calendário', icon: Calendar },
    { value: 'map-pin', label: 'Localização', icon: MapPin },
    { value: 'trending-up', label: 'Tendência', icon: TrendingUp },
    { value: 'star', label: 'Estrela', icon: Star }
  ];

  const resetForm = () => {
    setFormData({
      stat_key: '',
      stat_name: '',
      stat_value: '',
      icon_name: 'trophy',
      description: '',
      order_index: 0,
      active: true
    });
    setEditingStat(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingStat) {
        await updateStat.mutateAsync({ id: editingStat.id, data: formData });
      } else {
        await createStat.mutateAsync(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar estatística:', error);
    }
  };

  const handleEdit = (stat: any) => {
    setEditingStat(stat);
    setFormData({
      stat_key: stat.stat_key || '',
      stat_name: stat.stat_name || '',
      stat_value: stat.stat_value || '',
      icon_name: stat.icon_name || 'trophy',
      description: stat.description || '',
      order_index: stat.order_index || 0,
      active: stat.active ?? true
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta estatística?')) {
      await deleteStat.mutateAsync(id);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Trophy;
  };

  if (isLoading) {
    return <div>Carregando estatísticas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Estatísticas</h2>
          <p className="text-gray-600">Atualizar números em tempo real do basquetebol cabo-verdiano</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Estatística
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingStat ? 'Editar Estatística' : 'Nova Estatística'}</DialogTitle>
              <DialogDescription>
                {editingStat ? 'Edite os dados da estatística' : 'Adicione uma nova estatística'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stat_key">Chave Única *</Label>
                  <Input
                    id="stat_key"
                    value={formData.stat_key}
                    onChange={(e) => setFormData({ ...formData, stat_key: e.target.value })}
                    placeholder="ex: total_clubs"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stat_name">Nome da Estatística *</Label>
                  <Input
                    id="stat_name"
                    value={formData.stat_name}
                    onChange={(e) => setFormData({ ...formData, stat_name: e.target.value })}
                    placeholder="ex: Clubes Licenciados"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stat_value">Valor *</Label>
                  <Input
                    id="stat_value"
                    value={formData.stat_value}
                    onChange={(e) => setFormData({ ...formData, stat_value: e.target.value })}
                    placeholder="ex: 24 ou 1,250+"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon_name">Ícone</Label>
                  <Select
                    value={formData.icon_name}
                    onValueChange={(value) => setFormData({ ...formData, icon_name: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <option.icon className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da estatística"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order_index">Ordem</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Ativo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingStat ? 'Salvar Alterações' : 'Criar Estatística'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any) => {
          const IconComponent = getIconComponent(stat.icon_name);
          return (
            <Card key={stat.id} className={`${!stat.active ? 'opacity-50' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-cv-blue/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-cv-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-cv-blue">{stat.stat_value}</CardTitle>
                      <CardDescription className="font-medium">{stat.stat_name}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(stat)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(stat.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {stat.description && (
                <CardContent>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Ordem: {stat.order_index}</span>
                    <span>{stat.active ? 'Ativo' : 'Inativo'}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsManagementAdvanced;
