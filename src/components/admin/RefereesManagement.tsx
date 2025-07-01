
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
import { Plus, Edit, Trash2, Shield, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RefereesManagement = () => {
  const { referees, refereesLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReferee, setEditingReferee] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    license_number: '',
    level: '',
    phone: '',
    email: '',
    island: '',
    active: true
  });

  const islands = ['Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 'Sal', 'Boa Vista', 'Brava', 'São Nicolau'];
  const levels = ['Nacional', 'Regional', 'Distrital', 'Juventude', 'Formação'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.first_name?.trim()) {
      toast({
        title: "Erro de Validação",
        description: "Primeiro nome é obrigatório.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.last_name?.trim()) {
      toast({
        title: "Erro de Validação",
        description: "Último nome é obrigatório.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.level) {
      toast({
        title: "Erro de Validação",
        description: "Nível é obrigatório.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Erro de Validação",
        description: "Email deve ter um formato válido.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const dataToSubmit = {
        ...formData,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        license_number: formData.license_number?.trim() || null,
        phone: formData.phone?.trim() || null,
        email: formData.email?.trim() || null,
      };

      if (editingReferee) {
        await operations.referees.update.mutateAsync({ 
          id: editingReferee.id, 
          data: dataToSubmit 
        });
        toast({
          title: "Sucesso",
          description: "Árbitro atualizado com sucesso!"
        });
      } else {
        await operations.referees.create.mutateAsync(dataToSubmit);
        toast({
          title: "Sucesso", 
          description: "Árbitro criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Erro ao salvar árbitro:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar árbitro: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (referee: any) => {
    setEditingReferee(referee);
    setFormData({
      first_name: referee.first_name || '',
      last_name: referee.last_name || '',
      license_number: referee.license_number || '',
      level: referee.level || '',
      phone: referee.phone || '',
      email: referee.email || '',
      island: referee.island || '',
      active: referee.active !== false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (refereeId: string, refereeName: string) => {
    if (confirm(`Tem certeza que deseja eliminar o árbitro "${refereeName}"?`)) {
      try {
        await operations.referees.delete.mutateAsync(refereeId);
        toast({
          title: "Sucesso",
          description: "Árbitro eliminado com sucesso!"
        });
      } catch (error: any) {
        console.error('Erro ao eliminar árbitro:', error);
        toast({
          title: "Erro",
          description: `Erro ao eliminar árbitro: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      license_number: '',
      level: '',
      phone: '',
      email: '',
      island: '',
      active: true
    });
    setEditingReferee(null);
  };

  if (refereesLoading) {
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
            <Shield className="h-6 w-6" />
            Gestão de Arbitragem
          </h2>
          <p className="text-gray-600">Gerir árbitros e oficiais de mesa</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Árbitro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingReferee ? 'Editar Árbitro' : 'Novo Árbitro'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do árbitro
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">Primeiro Nome *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    required
                    placeholder="Ex: João"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Último Nome *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    required
                    placeholder="Ex: Silva Santos"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license_number">Número de Licença</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                    placeholder="Ex: ARB2024001"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="level">Nível *</Label>
                  <Select 
                    value={formData.level} 
                    onValueChange={(value) => handleInputChange('level', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar nível" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Ex: +238 123 45 67"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="arbitro@email.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="island">Ilha</Label>
                  <Select 
                    value={formData.island} 
                    onValueChange={(value) => handleInputChange('island', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar ilha" />
                    </SelectTrigger>
                    <SelectContent>
                      {islands.map((island) => (
                        <SelectItem key={island} value={island}>{island}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="active">Status</Label>
                  <Select 
                    value={formData.active ? 'true' : 'false'} 
                    onValueChange={(value) => handleInputChange('active', value === 'true')}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Ativo</SelectItem>
                      <SelectItem value="false">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-cv-blue hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Salvando...
                    </>
                  ) : (
                    `${editingReferee ? 'Atualizar' : 'Criar'} Árbitro`
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-cv-blue" />
              <div>
                <p className="text-sm font-medium">Total de Árbitros</p>
                <p className="text-2xl font-bold text-cv-blue">{referees.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Árbitros Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {referees.filter(ref => ref.active !== false).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Nível Nacional</p>
                <p className="text-2xl font-bold text-orange-600">
                  {referees.filter(ref => ref.level === 'Nacional').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Ilhas Cobertas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(referees.map(ref => ref.island).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Árbitros Registados ({referees.length})</CardTitle>
          <CardDescription>
            Lista completa de árbitros no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referees.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Nenhum árbitro registado. Clique em "Novo Árbitro" para adicionar o primeiro.
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Licença</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ilha</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referees.map((referee: any) => (
                  <TableRow key={referee.id}>
                    <TableCell className="font-medium">
                      {referee.first_name} {referee.last_name}
                    </TableCell>
                    <TableCell>{referee.license_number || '—'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{referee.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {referee.phone && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{referee.phone}</span>
                          </div>
                        )}
                        {referee.email && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="truncate">{referee.email}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {referee.island && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{referee.island}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={referee.active !== false ? 'default' : 'secondary'}>
                        {referee.active !== false ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(referee)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(referee.id, `${referee.first_name} ${referee.last_name}`)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RefereesManagement;
