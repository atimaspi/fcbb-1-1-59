
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Trophy, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Competition {
  id: string;
  name: string;
  type: string;
  season: string;
  status: string;
  start_date: string;
  end_date: string;
  description: string;
  venue: string;
  created_at: string;
}

const CompetitionsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'championship',
    season: '2024/25',
    status: 'upcoming',
    start_date: '',
    end_date: '',
    description: '',
    venue: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: competitions = [], isLoading } = useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Competition[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('championships')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Competição criada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar competição', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('championships')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Competição atualizada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar competição', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('championships')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      toast({ title: 'Competição eliminada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar competição', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'championship',
      season: '2024/25',
      status: 'upcoming',
      start_date: '',
      end_date: '',
      description: '',
      venue: ''
    });
    setEditingCompetition(null);
  };

  const handleEdit = (competition: Competition) => {
    setEditingCompetition(competition);
    setFormData({
      name: competition.name,
      type: competition.type,
      season: competition.season,
      status: competition.status,
      start_date: competition.start_date?.split('T')[0] || '',
      end_date: competition.end_date?.split('T')[0] || '',
      description: competition.description || '',
      venue: competition.venue || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompetition) {
      updateMutation.mutate({ id: editingCompetition.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'upcoming': return 'Próxima';
      case 'completed': return 'Finalizada';
      default: return status;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando competições...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Competições</h2>
          <p className="text-gray-600">Gerir campeonatos, torneios e competições</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Competição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCompetition ? 'Editar Competição' : 'Nova Competição'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Competição</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="season">Época</Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="championship">Campeonato</SelectItem>
                      <SelectItem value="cup">Taça</SelectItem>
                      <SelectItem value="tournament">Torneio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Próxima</SelectItem>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="completed">Finalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Data de Início</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">Data de Fim</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="venue">Local</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingCompetition ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Lista de Competições
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Época</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Datas</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitions.map((competition) => (
                <TableRow key={competition.id}>
                  <TableCell className="font-medium">{competition.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {competition.type === 'championship' ? 'Campeonato' : 
                       competition.type === 'cup' ? 'Taça' : 'Torneio'}
                    </Badge>
                  </TableCell>
                  <TableCell>{competition.season}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(competition.status)}>
                      {getStatusLabel(competition.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {competition.start_date && (
                        <div>Início: {new Date(competition.start_date).toLocaleDateString('pt-PT')}</div>
                      )}
                      {competition.end_date && (
                        <div>Fim: {new Date(competition.end_date).toLocaleDateString('pt-PT')}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(competition)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(competition.id)}
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

export default CompetitionsManager;
