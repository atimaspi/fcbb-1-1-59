
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, BarChart3, TrendingUp } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Statistic {
  id: string;
  stat_key: string;
  stat_name: string;
  stat_value: string;
  description: string;
  icon_name: string;
  active: boolean;
  order_index: number;
  updated_at: string;
}

const StatsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Statistic | null>(null);
  const [formData, setFormData] = useState({
    stat_key: '',
    stat_name: '',
    stat_value: '',
    description: '',
    icon_name: '',
    active: true,
    order_index: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const iconOptions = [
    'users', 'user-check', 'trophy', 'whistle', 'map', 'target', 
    'award', 'star', 'shield', 'calendar', 'globe', 'trending-up'
  ];

  const { data: statistics = [], isLoading } = useQuery({
    queryKey: ['basketball-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('basketball_stats')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as Statistic[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('basketball_stats')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basketball-stats'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Estatística criada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar estatística', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('basketball_stats')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basketball-stats'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Estatística atualizada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar estatística', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('basketball_stats')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basketball-stats'] });
      toast({ title: 'Estatística eliminada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar estatística', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      stat_key: '',
      stat_name: '',
      stat_value: '',
      description: '',
      icon_name: '',
      active: true,
      order_index: 0
    });
    setEditingStat(null);
  };

  const handleEdit = (stat: Statistic) => {
    setEditingStat(stat);
    setFormData({
      stat_key: stat.stat_key,
      stat_name: stat.stat_name,
      stat_value: stat.stat_value,
      description: stat.description || '',
      icon_name: stat.icon_name || '',
      active: stat.active,
      order_index: stat.order_index
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStat) {
      updateMutation.mutate({ id: editingStat.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando estatísticas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Estatísticas</h2>
          <p className="text-gray-600">Gerir estatísticas e números da FCBB</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Estatística
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingStat ? 'Editar Estatística' : 'Nova Estatística'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stat_key">Chave da Estatística</Label>
                  <Input
                    id="stat_key"
                    value={formData.stat_key}
                    onChange={(e) => setFormData({ ...formData, stat_key: e.target.value })}
                    placeholder="ex: total_clubs"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stat_name">Nome da Estatística</Label>
                  <Input
                    id="stat_name"
                    value={formData.stat_name}
                    onChange={(e) => setFormData({ ...formData, stat_name: e.target.value })}
                    placeholder="ex: Clubes Filiados"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stat_value">Valor</Label>
                  <Input
                    id="stat_value"
                    value={formData.stat_value}
                    onChange={(e) => setFormData({ ...formData, stat_value: e.target.value })}
                    placeholder="ex: 45"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order_index">Ordem de Exibição</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  placeholder="Descrição da estatística"
                />
              </div>

              <div>
                <Label htmlFor="icon_name">Ícone</Label>
                <select
                  id="icon_name"
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue"
                >
                  <option value="">Selecionar ícone</option>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked as boolean })}
                />
                <Label htmlFor="active">Estatística ativa</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingStat ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Lista de Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ordem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Chave</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Atualizada</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.map((stat) => (
                <TableRow key={stat.id}>
                  <TableCell className="text-center font-bold text-cv-blue">
                    {stat.order_index}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{stat.stat_name}</div>
                      {stat.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{stat.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-lg text-cv-blue">{stat.stat_value}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {stat.stat_key}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {stat.icon_name && (
                      <Badge variant="secondary">{stat.icon_name}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={stat.active ? 'default' : 'secondary'}>
                      {stat.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(stat.updated_at).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(stat)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(stat.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsManager;
