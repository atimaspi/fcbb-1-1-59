
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, User, Upload } from 'lucide-react';
import FileUploader from '@/components/media/FileUploader';
import MediaGallery from '@/components/media/MediaGallery';

const PlayersManagementAdvanced = () => {
  const { players, operations, playersLoading } = useBackendData();
  const { toast } = useToast();
  
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    jersey_number: '',
    birth_date: '',
    height_cm: '',
    weight_kg: '',
    nationality: 'CV',
    club: '',
    status: 'active',
    photo_url: '',
    documents: [] as any[]
  });

  const positions = [
    'Base', 'Extremo', 'Ala', 'Ala-Pivot', 'Pivot'
  ];

  const handleEdit = (player: any) => {
    setSelectedPlayer(player);
    setFormData({
      first_name: player.first_name || '',
      last_name: player.last_name || '',
      position: player.position || '',
      jersey_number: player.jersey_number?.toString() || '',
      birth_date: player.birth_date || '',
      height_cm: player.height_cm?.toString() || '',
      weight_kg: player.weight_kg?.toString() || '',
      nationality: player.nationality || 'CV',
      club: player.club || '',
      status: player.status || 'active',
      photo_url: player.photo_url || '',
      documents: player.documents || []
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedPlayer(null);
    setFormData({
      first_name: '',
      last_name: '',
      position: '',
      jersey_number: '',
      birth_date: '',
      height_cm: '',
      weight_kg: '',
      nationality: 'CV',
      club: '',
      status: 'active',
      photo_url: '',
      documents: []
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const playerData = {
        ...formData,
        jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
        age: formData.birth_date ? new Date().getFullYear() - new Date(formData.birth_date).getFullYear() : null
      };

      if (selectedPlayer) {
        await operations.players.update.mutateAsync({
          id: selectedPlayer.id,
          data: playerData
        });
        toast({ title: "Sucesso", description: "Jogador atualizado!" });
      } else {
        await operations.players.create.mutateAsync(playerData);
        toast({ title: "Sucesso", description: "Jogador criado!" });
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

  const handleDelete = async (playerId: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este jogador?')) {
      try {
        await operations.players.delete.mutateAsync(playerId);
        toast({ title: "Sucesso", description: "Jogador eliminado!" });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handlePhotoUpload = (file: any) => {
    setFormData(prev => ({ ...prev, photo_url: file.url }));
  };

  const handleDocumentUpload = (file: any) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, file]
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
            {selectedPlayer ? 'Editar Jogador' : 'Novo Jogador'}
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
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Nome *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="Nome do jogador"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Sobrenome *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="Sobrenome do jogador"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="birth_date">Data de Nascimento</Label>
                    <Input
                      id="birth_date"
                      type="date"
                      value={formData.birth_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height_cm">Altura (cm)</Label>
                    <Input
                      id="height_cm"
                      type="number"
                      value={formData.height_cm}
                      onChange={(e) => setFormData(prev => ({ ...prev, height_cm: e.target.value }))}
                      placeholder="185"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight_kg">Peso (kg)</Label>
                    <Input
                      id="weight_kg"
                      type="number"
                      value={formData.weight_kg}
                      onChange={(e) => setFormData(prev => ({ ...prev, weight_kg: e.target.value }))}
                      placeholder="80"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                    placeholder="CV"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações Desportivas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="position">Posição</Label>
                    <Select value={formData.position} onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar posição" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(pos => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jersey_number">Número da Camisola</Label>
                    <Input
                      id="jersey_number"
                      type="number"
                      value={formData.jersey_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, jersey_number: e.target.value }))}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="injured">Lesionado</SelectItem>
                        <SelectItem value="suspended">Suspenso</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="club">Clube</Label>
                  <Input
                    id="club"
                    value={formData.club}
                    onChange={(e) => setFormData(prev => ({ ...prev, club: e.target.value }))}
                    placeholder="Nome do clube"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>
                  Faça upload de documentos como certificados, contratos, etc.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={handleDocumentUpload}
                  entityType="player"
                  entityId={selectedPlayer?.id}
                  allowedTypes={['application/pdf', 'image/jpeg', 'image/png']}
                  folder="players/documents"
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
                  <User className="w-5 h-5" />
                  Foto do Jogador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={handlePhotoUpload}
                  entityType="player"
                  entityId={selectedPlayer?.id}
                  allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  maxFiles={1}
                  folder="players/photos"
                />
                
                {formData.photo_url && (
                  <div className="relative">
                    <img
                      src={formData.photo_url}
                      alt="Foto do jogador"
                      className="w-full h-48 object-cover rounded"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, photo_url: '' }))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
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
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Jogadores</h3>
        <Button onClick={handleCreate} className="bg-cv-blue hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Jogador
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player: any) => (
          <Card key={player.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {player.photo_url ? (
                    <img
                      src={player.photo_url}
                      alt={`${player.first_name} ${player.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {player.first_name} {player.last_name}
                  </h4>
                  <p className="text-sm text-gray-600">{player.position}</p>
                  <p className="text-sm text-gray-600">{player.club}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {player.jersey_number && (
                      <Badge variant="outline">#{player.jersey_number}</Badge>
                    )}
                    <Badge variant={player.status === 'active' ? 'default' : 'secondary'}>
                      {player.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(player)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(player.id)}>
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

export default PlayersManagementAdvanced;
