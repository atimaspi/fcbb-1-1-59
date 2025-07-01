import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { Flag, Plus, Edit, Trash2, Users } from 'lucide-react';

const NationalTeamManagement = () => {
  const { useOptimizedFetch, useOptimizedCreate, useOptimizedUpdate, useOptimizedDelete } = useUnifiedApi();
  
  const { data: callups = [], isLoading } = useOptimizedFetch('national_team_callups');
  const { data: players = [] } = useOptimizedFetch('players');
  
  const createCallup = useOptimizedCreate('national_team_callups');
  const updateCallup = useOptimizedUpdate('national_team_callups');
  const deleteCallup = useOptimizedDelete('national_team_callups');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCallup, setEditingCallup] = useState<any>(null);
  const [formData, setFormData] = useState({
    player_id: '',
    competition_name: '',
    callup_date: '',
    team_category: '',
    status: 'convocado',
    position: '',
    jersey_number: ''
  });

  const teamCategories = [
    { value: 'senior_masculino', label: 'Seleção A Masculina' },
    { value: 'senior_feminino', label: 'Seleção A Feminina' },
    { value: 'sub18_masculino', label: 'Sub-18 Masculino' },
    { value: 'sub18_feminino', label: 'Sub-18 Feminina' },
    { value: 'sub16_masculino', label: 'Sub-16 Masculino' },
    { value: 'sub16_feminino', label: 'Sub-16 Feminino' }
  ];

  const statusOptions = [
    { value: 'convocado', label: 'Convocado' },
    { value: 'dispensado', label: 'Dispensado' },
    { value: 'lesionado', label: 'Lesionado' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCallup) {
        await updateCallup.mutateAsync({ id: editingCallup.id, data: formData });
      } else {
        await createCallup.mutateAsync(formData);
      }
      
      setIsDialogOpen(false);
      setEditingCallup(null);
      setFormData({
        player_id: '',
        competition_name: '',
        callup_date: '',
        team_category: '',
        status: 'convocado',
        position: '',
        jersey_number: ''
      });
    } catch (error) {
      console.error('Erro ao salvar convocatória:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      player_id: '',
      competition_name: '',
      callup_date: '',
      team_category: '',
      status: 'convocado',
      position: '',
      jersey_number: ''
    });
  };

  const handleEdit = (callup: any) => {
    setEditingCallup(callup);
    setFormData({
      player_id: callup.player_id,
      competition_name: callup.competition_name,
      callup_date: callup.callup_date ? new Date(callup.callup_date).toISOString().split('T')[0] : '',
      team_category: callup.team_category,
      status: callup.status,
      position: callup.position,
      jersey_number: callup.jersey_number
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar esta convocatória?')) {
      await deleteCallup.mutateAsync(id);
    }
  };

  const getPlayerName = (playerId: string) => {
    const player = players.find((p: any) => p.id === playerId);
    return player ? `${player.first_name || ''} ${player.last_name || ''}` : 'Jogador não encontrado';
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'convocado': 'bg-green-100 text-green-800 border-green-200',
      'dispensado': 'bg-gray-100 text-gray-800 border-gray-200',
      'lesionado': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <Badge variant="outline" className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return <div>Carregando convocações...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <Flag className="w-6 h-6" />
            Gestão de Convocações
          </h2>
          <p className="text-gray-600">Gerir convocações para as seleções nacionais</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Convocatória
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCallup ? 'Editar Convocatória' : 'Nova Convocatória'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="player">Jogador</Label>
                <Select 
                  value={formData.player_id} 
                  onValueChange={(value) => setFormData({...formData, player_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar jogador" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map((player: any) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.first_name} {player.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="competition_name">Competição</Label>
                <Input
                  id="competition_name"
                  value={formData.competition_name}
                  onChange={(e) => setFormData({...formData, competition_name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="callup_date">Data da Convocatória</Label>
                  <Input
                    id="callup_date"
                    type="date"
                    value={formData.callup_date}
                    onChange={(e) => setFormData({...formData, callup_date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="team_category">Categoria da Equipa</Label>
                  <Select 
                    value={formData.team_category} 
                    onValueChange={(value) => setFormData({...formData, team_category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Posição</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Ex: Ala, Pivô, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="jersey_number">Número da Camisola</Label>
                  <Input
                    id="jersey_number"
                    type="number"
                    value={formData.jersey_number}
                    onChange={(e) => setFormData({...formData, jersey_number: e.target.value})}
                    placeholder="Ex: 4, 10, 11, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Estado</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingCallup ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Convocações Registadas ({callups.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogador</TableHead>
                <TableHead>Competição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Posição</TableHead>
                <TableHead>Nº</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callups.map((callup: any) => (
                <TableRow key={callup.id}>
                  <TableCell className="font-medium">
                    {getPlayerName(callup.player_id)}
                  </TableCell>
                  <TableCell>{callup.competition_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
                      {callup.team_category?.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(callup.callup_date).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>{callup.position || '-'}</TableCell>
                  <TableCell>
                    {callup.jersey_number ? (
                      <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {callup.jersey_number}
                      </Badge>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(callup.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(callup)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(callup.id)}
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

export default NationalTeamManagement;
