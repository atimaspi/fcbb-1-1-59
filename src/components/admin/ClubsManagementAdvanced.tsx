
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Building, Upload } from 'lucide-react';
import FileUploader from '@/components/media/FileUploader';
import MediaGallery from '@/components/media/MediaGallery';

const ClubsManagementAdvanced = () => {
  const { clubs, operations, clubsLoading } = useBackendData();
  const { toast } = useToast();
  
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    island: '',
    logo_url: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    website: '',
    founded_year: '',
    active: true,
    status: 'active',
    gallery_images: [] as any[],
    documents: [] as any[]
  });

  const islands = [
    'Santiago', 'São Vicente', 'Santo Antão', 'São Nicolau', 
    'Sal', 'Boavista', 'Maio', 'Fogo', 'Brava'
  ];

  const handleEdit = (club: any) => {
    setSelectedClub(club);
    setFormData({
      name: club.name || '',
      island: club.island || '',
      logo_url: club.logo_url || '',
      description: club.description || '',
      contact_email: club.contact_email || '',
      contact_phone: club.contact_phone || '',
      address: club.address || '',
      website: club.website || '',
      founded_year: club.founded_year?.toString() || '',
      active: club.active ?? true,
      status: club.status || 'active',
      gallery_images: club.gallery_images || [],
      documents: club.documents || []
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedClub(null);
    setFormData({
      name: '',
      island: '',
      logo_url: '',
      description: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      website: '',
      founded_year: '',
      active: true,
      status: 'active',
      gallery_images: [],
      documents: []
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const clubData = {
        ...formData,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : null
      };

      if (selectedClub) {
        await operations.clubs.update.mutateAsync({
          id: selectedClub.id,
          data: clubData
        });
        toast({ title: "Sucesso", description: "Clube atualizado!" });
      } else {
        await operations.clubs.create.mutateAsync(clubData);
        toast({ title: "Sucesso", description: "Clube criado!" });
      }
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (clubId: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este clube?')) {
      try {
        await operations.clubs.delete.mutateAsync(clubId);
        toast({ title: "Sucesso", description: "Clube eliminado!" });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleLogoUpload = (file: any) => {
    setFormData(prev => ({ ...prev, logo_url: file.url }));
  };

  const handleGalleryUpload = (file: any) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, file]
    }));
  };

  const handleDocumentUpload = (file: any) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, file]
    }));
  };

  const handleGalleryRemove = (fileId: string) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter(img => img.id !== fileId)
    }));
  };

  const handleDocumentRemove = (fileId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== fileId)
    }));
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-cv-blue">
            {selectedClub ? 'Editar Clube' : 'Novo Clube'}
          </h3>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-cv-blue hover:bg-blue-700">
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário principal */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Clube *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome do clube"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="island">Ilha</Label>
                    <select
                      id="island"
                      value={formData.island}
                      onChange={(e) => setFormData(prev => ({ ...prev, island: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Selecionar ilha</option>
                      {islands.map(island => (
                        <option key={island} value={island}>{island}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="founded_year">Ano de Fundação</Label>
                    <Input
                      id="founded_year"
                      type="number"
                      value={formData.founded_year}
                      onChange={(e) => setFormData(prev => ({ ...prev, founded_year: e.target.value }))}
                      placeholder="1990"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição do clube"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Endereço completo do clube"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contactos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_email">Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                      placeholder="clube@exemplo.cv"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_phone">Telefone</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                      placeholder="+238 123 45 67"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://www.clube.cv"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Galeria */}
            <Card>
              <CardHeader>
                <CardTitle>Galeria do Clube</CardTitle>
                <CardDescription>
                  Imagens do pavilhão, troféus, eventos, etc.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={handleGalleryUpload}
                  entityType="club"
                  entityId={selectedClub?.id}
                  allowedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
                  folder="clubs/gallery"
                />
                
                {formData.gallery_images.length > 0 && (
                  <MediaGallery
                    files={formData.gallery_images}
                    onFileRemove={handleGalleryRemove}
                    editable
                  />
                )}
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>
                  Estatutos, regulamentos, certificações, etc.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={handleDocumentUpload}
                  entityType="club"
                  entityId={selectedClub?.id}
                  allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                  folder="clubs/documents"
                />
                
                {formData.documents.length > 0 && (
                  <MediaGallery
                    files={formData.documents}
                    onFileRemove={handleDocumentRemove}
                    editable
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Logo do Clube
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={handleLogoUpload}
                  entityType="club"
                  entityId={selectedClub?.id}
                  allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  maxFiles={1}
                  folder="clubs/logos"
                />
                
                {formData.logo_url && (
                  <div className="relative">
                    <img
                      src={formData.logo_url}
                      alt="Logo do clube"
                      className="w-full h-32 object-contain rounded border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, logo_url: '' }))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  />
                  <Label htmlFor="active">Clube Ativo</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Clubes</h3>
        <Button onClick={handleCreate} className="bg-cv-blue hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Clube
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map((club: any) => (
          <Card key={club.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                  {club.logo_url ? (
                    <img
                      src={club.logo_url}
                      alt={club.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold">{club.name}</h4>
                  <p className="text-sm text-gray-600">{club.island}</p>
                  {club.founded_year && (
                    <p className="text-sm text-gray-600">Fundado em {club.founded_year}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={club.active ? 'default' : 'secondary'}>
                      {club.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(club)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(club.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubsManagementAdvanced;
