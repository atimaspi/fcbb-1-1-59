
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CoachesManagement = () => {
  const { coaches, teams, coachesLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    team_id: '',
    license_number: '',
    phone: '',
    email: '',
    experience_years: '',
    status: 'ativo'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome do treinador.",
        variant: "destructive"
      });
      return;
    }

    try {
      const coachData = {
        ...formData,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null
      };

      if (editingCoach) {
        await operations.coaches.update.mutateAsync({ 
          id: editingCoach.id, 
          data: coachData 
        });
        toast({
          title: "Sucesso",
          description: "Treinador atualizado com sucesso!"
        });
      } else {
        await operations.coaches.create.mutateAsync(coachData);
        toast({
          title: "Sucesso", 
          description: "Treinador criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar treinador: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (coach: any) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name || '',
      team_id: coach.team_id || '',
      license_number: coach.license_number || '',
      phone: coach.phone || '',
      email: coach.email || '',
      experience_years: coach.experience_years?.toString() || '',
      status: coach.status || 'ativo'
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (coachId: string) => {
    if (confirm('Tem certeza que deseja eliminar este treinador?')) {
      try {
        await operations.coaches.delete.mutateAsync(coachId);
        toast({
          title: "Sucesso",
          description: "Treinador eliminado com sucesso!"
        });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `Erro ao eliminar treinador: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      team_id: '',
      license_number: '',
      phone: '',
      email: '',
      experience_years: '',
      status: 'ativo'
    });
    setEditingCoach(null);
  };

  if (coachesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Gestão de Treinadores
          </h2>
          <p className="text-gray-600">Gerir treinadores licenciados</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Treinador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCoach ? 'Editar Treinador' : 'Novo Treinador'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do treinador
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="team_id">Equipa</Label>
                  <Select value={formData.team_id} onValueChange={(value) => handleInputChange('team_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="license_number">Número da Licença</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience_years">Anos de Experiência</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => handleInputChange('experience_years', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingCoach ? 'Atualizar' : 'Criar'} Treinador
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Treinadores Registados ({coaches.length})</CardTitle>
          <CardDescription>
            Lista completa de treinadores no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Equipa</TableHead>
                <TableHead>Licença</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Experiência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coaches.map((coach: any) => (
                <TableRow key={coach.id}>
                  <TableCell className="font-medium">{coach.name}</TableCell>
                  <TableCell>
                    {teams.find(t => t.id === coach.team_id)?.name || '—'}
                  </TableCell>
                  <TableCell>{coach.license_number || '—'}</TableCell>
                  <TableCell>{coach.phone || '—'}</TableCell>
                  <TableCell>{coach.experience_years ? `${coach.experience_years} anos` : '—'}</TableCell>
                  <TableCell>
                    <Badge variant={coach.status === 'ativo' ? 'default' : 'secondary'}>
                      {coach.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(coach)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(coach.id)}
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

export default CoachesManagement;
