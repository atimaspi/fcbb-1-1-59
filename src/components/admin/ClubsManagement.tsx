
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
import { Plus, Edit, Trash2, Users, MapPin, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClubsManagement = () => {
  const { clubs, clubsLoading, operations, regionalAssociations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    island: '',
    founded_year: '',
    logo_url: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    website: '',
    description: '',
    status: 'ativo',
    regional_association_id: ''
  });

  const islands = ['Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 'Sal', 'Boa Vista', 'Brava', 'São Nicolau'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.island) {
      toast({
        title: "Erro",
        description: "Por favor, preencha os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const clubData = {
        ...formData,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null,
        active: true
      };

      if (editingClub) {
        await operations.clubs.update.mutateAsync({ 
          id: editingClub.id, 
          data: clubData 
        });
        toast({
          title: "Sucesso",
          description: "Clube atualizado com sucesso!"
        });
      } else {
        await operations.clubs.create.mutateAsync(clubData);
        toast({
          title: "Sucesso", 
          description: "Clube criado com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving club:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar clube: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (club: any) => {
    setEditingClub(club);
    setFormData({
      name: club.name || '',
      island: club.island || '',
      founded_year: club.founded_year?.toString() || '',
      logo_url: club.logo_url || '',
      contact_email: club.contact_email || '',
      contact_phone: club.contact_phone || '',
      address: club.address || '',
      website: club.website || '',
      description: club.description || '',
      status: club.status || 'ativo',
      regional_association_id: club.regional_association_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (clubId: string) => {
    if (confirm('Tem certeza que deseja eliminar este clube?')) {
      try {
        await operations.clubs.delete.mutateAsync(clubId);
        toast({
          title: "Sucesso",
          description: "Clube eliminado com sucesso!"
        });
      } catch (error: any) {
        console.error('Error deleting club:', error);
        toast({
          title: "Erro",
          description: `Erro ao eliminar clube: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      island: '',
      founded_year: '',
      logo_url: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      website: '',
      description: '',
      status: 'ativo',
      regional_association_id: ''
    });
    setEditingClub(null);
  };

  if (clubsLoading) {
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
            <Users className="h-6 w-6" />
            Gestão de Clubes
          </h2>
          <p className="text-gray-600">Gerir clubes e informações administrativas</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Clube
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClub ? 'Editar Clube' : 'Novo Clube'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do clube
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Clube *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Ex: Sporting Clube da Praia"
                  />
                </div>
                <div>
                  <Label htmlFor="island">Ilha *</Label>
                  <Select value={formData.island} onValueChange={(value) => handleInputChange('island', value)}>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founded_year">Ano de Fundação</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    value={formData.founded_year}
                    onChange={(e) => handleInputChange('founded_year', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Ex: 1985"
                  />
                </div>
                <div>
                  <Label htmlFor="regional_association_id">Associação Regional</Label>
                  <Select value={formData.regional_association_id} onValueChange={(value) => handleInputChange('regional_association_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar associação" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionalAssociations.map((association) => (
                        <SelectItem key={association.id} value={association.id}>
                          {association.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Email de Contacto</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                    placeholder="clube@exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Telefone de Contacto</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                    placeholder="+238 123 456 789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://clube.exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="logo_url">URL do Logo</Label>
                  <Input
                    id="logo_url"
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => handleInputChange('logo_url', e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Endereço completo do clube"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Breve descrição do clube"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingClub ? 'Atualizar' : 'Criar'} Clube
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-cv-blue" />
              <div>
                <p className="text-sm font-medium">Total de Clubes</p>
                <p className="text-2xl font-bold text-cv-blue">{clubs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Clubes Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {clubs.filter(club => club.active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Fundados Este Ano</p>
                <p className="text-2xl font-bold text-orange-600">
                  {clubs.filter(club => club.founded_year === new Date().getFullYear()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Ilhas Representadas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(clubs.map(club => club.island)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clubes Registados ({clubs.length})</CardTitle>
          <CardDescription>
            Lista completa de clubes no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ilha</TableHead>
                <TableHead>Fundação</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubs.map((club: any) => (
                <TableRow key={club.id}>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{club.island}</span>
                    </div>
                  </TableCell>
                  <TableCell>{club.founded_year || '—'}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {club.contact_email && <div>{club.contact_email}</div>}
                      {club.contact_phone && <div>{club.contact_phone}</div>}
                      {!club.contact_email && !club.contact_phone && '—'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={club.active ? 'default' : 'secondary'}>
                      {club.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(club)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(club.id)}
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

export default ClubsManagement;
