
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi } from '@/hooks/useApi';
import { Plus, Edit, Trash2, ExternalLink, Building, Award, Tv, Users } from 'lucide-react';

const PartnersManagementAdvanced = () => {
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();
  const { data: partners = [], isLoading } = useFetch('partners');
  const createPartner = useCreate('partners');
  const updatePartner = useUpdate('partners');
  const deletePartner = useDelete('partners');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    category: 'sponsor',
    description: '',
    order_index: 0,
    active: true
  });

  const categoryOptions = [
    { value: 'institutional', label: 'Institucional', icon: Building },
    { value: 'sponsor', label: 'Patrocinador', icon: Award },
    { value: 'federation', label: 'Federação', icon: Users },
    { value: 'media', label: 'Mídia', icon: Tv }
  ];

  const categorizedPartners = {
    institutional: partners?.filter((p: any) => p.category === 'institutional') || [],
    sponsor: partners?.filter((p: any) => p.category === 'sponsor') || [],
    federation: partners?.filter((p: any) => p.category === 'federation') || [],
    media: partners?.filter((p: any) => p.category === 'media') || []
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo_url: '',
      website_url: '',
      category: 'sponsor',
      description: '',
      order_index: 0,
      active: true
    });
    setEditingPartner(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPartner) {
        await updatePartner.mutateAsync({ id: editingPartner.id, data: formData });
      } else {
        await createPartner.mutateAsync(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar parceiro:', error);
    }
  };

  const handleEdit = (partner: any) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name || '',
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      category: partner.category || 'sponsor',
      description: partner.description || '',
      order_index: partner.order_index || 0,
      active: partner.active ?? true
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este parceiro?')) {
      await deletePartner.mutateAsync(id);
    }
  };

  const renderPartnerCard = (partner: any) => (
    <Card key={partner.id} className={`${!partner.active ? 'opacity-50' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="w-12 h-12 object-contain rounded"
            />
            <div>
              <CardTitle className="text-lg">{partner.name}</CardTitle>
              {partner.description && (
                <CardDescription>{partner.description}</CardDescription>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {partner.website_url && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(partner.website_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(partner)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(partner.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Ordem: {partner.order_index}</span>
          <span>{partner.active ? 'Ativo' : 'Inativo'}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return <div>Carregando parceiros...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Parceiros</h2>
          <p className="text-gray-600">Organizar parceiros por categorias</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Parceiro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPartner ? 'Editar Parceiro' : 'Novo Parceiro'}</DialogTitle>
              <DialogDescription>
                {editingPartner ? 'Edite as informações do parceiro' : 'Adicione um novo parceiro'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
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
                <Label htmlFor="logo_url">URL do Logo *</Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website_url">URL do Website</Label>
                <Input
                  id="website_url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  {editingPartner ? 'Salvar Alterações' : 'Criar Parceiro'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="institutional" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutional">
            <Building className="h-4 w-4 mr-2" />
            Institucionais ({categorizedPartners.institutional.length})
          </TabsTrigger>
          <TabsTrigger value="federation">
            <Users className="h-4 w-4 mr-2" />
            Federações ({categorizedPartners.federation.length})
          </TabsTrigger>
          <TabsTrigger value="sponsor">
            <Award className="h-4 w-4 mr-2" />
            Patrocinadores ({categorizedPartners.sponsor.length})
          </TabsTrigger>
          <TabsTrigger value="media">
            <Tv className="h-4 w-4 mr-2" />
            Mídia ({categorizedPartners.media.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutional" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorizedPartners.institutional.map(renderPartnerCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="federation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorizedPartners.federation.map(renderPartnerCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="sponsor" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorizedPartners.sponsor.map(renderPartnerCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorizedPartners.media.map(renderPartnerCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnersManagementAdvanced;
