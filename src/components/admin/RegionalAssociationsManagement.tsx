
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
import { Plus, Edit, Trash2, Building2, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RegionalAssociationsManagement = () => {
  const { regionalAssociations, federations, regionalAssociationsLoading, operations } = useBackendData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssociation, setEditingAssociation] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    island: '',
    acronym: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    logo_url: '',
    federation_id: ''
  });

  const islands = ['Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 'Sal', 'Boa Vista', 'Brava', 'São Nicolau'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.federation_id) {
      toast({
        title: "Erro",
        description: "Por favor, preencha os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingAssociation) {
        await operations.regionalAssociations.update.mutateAsync({ 
          id: editingAssociation.id, 
          data: formData 
        });
        toast({
          title: "Sucesso",
          description: "Associação atualizada com sucesso!"
        });
      } else {
        await operations.regionalAssociations.create.mutateAsync(formData);
        toast({
          title: "Sucesso", 
          description: "Associação criada com sucesso!"
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving association:', error);
      toast({
        title: "Erro",
        description: `Erro ao salvar associação: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (association: any) => {
    setEditingAssociation(association);
    setFormData({
      name: association.name || '',
      island: association.island || '',
      acronym: association.acronym || '',
      address: association.address || '',
      contact_email: association.contact_email || '',
      contact_phone: association.contact_phone || '',
      logo_url: association.logo_url || '',
      federation_id: association.federation_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (associationId: string) => {
    if (confirm('Tem certeza que deseja eliminar esta associação?')) {
      try {
        await operations.regionalAssociations.delete.mutateAsync(associationId);
        toast({
          title: "Sucesso",
          description: "Associação eliminada com sucesso!"
        });
      } catch (error: any) {
        console.error('Error deleting association:', error);
        toast({
          title: "Erro",
          description: `Erro ao eliminar associação: ${error.message || 'Erro desconhecido'}`,
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      island: '',
      acronym: '',
      address: '',
      contact_email: '',
      contact_phone: '',
      logo_url: '',
      federation_id: ''
    });
    setEditingAssociation(null);
  };

  if (regionalAssociationsLoading) {
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
            <Building2 className="h-6 w-6" />
            Gestão de Associações Regionais
          </h2>
          <p className="text-gray-600">Gerir associações regionais de basquetebol</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Associação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAssociation ? 'Editar Associação' : 'Nova Associação'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da associação regional
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Associação *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Ex: Associação Regional de Santiago"
                  />
                </div>
                <div>
                  <Label htmlFor="acronym">Acrónimo</Label>
                  <Input
                    id="acronym"
                    value={formData.acronym}
                    onChange={(e) => handleInputChange('acronym', e.target.value)}
                    placeholder="Ex: ARS"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="island">Ilha</Label>
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
                <div>
                  <Label htmlFor="federation_id">Federação *</Label>
                  <Select value={formData.federation_id} onValueChange={(value) => handleInputChange('federation_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar federação" />
                    </SelectTrigger>
                    <SelectContent>
                      {federations.map((federation) => (
                        <SelectItem key={federation.id} value={federation.id}>
                          {federation.name}
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
                    placeholder="associacao@exemplo.com"
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
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Endereço da sede"
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

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
                  {editingAssociation ? 'Atualizar' : 'Criar'} Associação
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
          <CardTitle>Associações Regionais ({regionalAssociations.length})</CardTitle>
          <CardDescription>
            Lista de associações regionais de basquetebol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Acrónimo</TableHead>
                <TableHead>Ilha</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Federação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionalAssociations.map((association: any) => (
                <TableRow key={association.id}>
                  <TableCell className="font-medium">{association.name}</TableCell>
                  <TableCell>{association.acronym || '—'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{association.island || '—'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {association.contact_email && <div>{association.contact_email}</div>}
                      {association.contact_phone && <div>{association.contact_phone}</div>}
                      {!association.contact_email && !association.contact_phone && '—'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {federations.find(f => f.id === association.federation_id)?.name || '—'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(association)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(association.id)}
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

export default RegionalAssociationsManagement;
