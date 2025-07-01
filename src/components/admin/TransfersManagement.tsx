import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { ArrowRightLeft, Plus, Edit, Trash2, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

const TransfersManagement = () => {
  const { useOptimizedFetch, useOptimizedCreate, useOptimizedUpdate, useOptimizedDelete } = useUnifiedApi();
  
  const { data: transfers = [], isLoading } = useOptimizedFetch('player_transfers');
  const { data: players = [] } = useOptimizedFetch('players');
  const { data: clubs = [] } = useOptimizedFetch('clubs');
  
  const createTransfer = useOptimizedCreate('player_transfers');
  const updateTransfer = useOptimizedUpdate('player_transfers');
  const deleteTransfer = useOptimizedDelete('player_transfers');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<any>(null);
  const [formData, setFormData] = useState({
    player_id: '',
    from_club_id: '',
    to_club_id: '',
    transfer_date: '',
    transfer_type: '',
    season: '',
    transfer_fee: '',
    contract_duration: '',
    status: 'pendente',
    notes: ''
  });

  const transferTypes = [
    { value: 'transferencia_definitiva', label: 'Transferência Definitiva' },
    { value: 'emprestimo', label: 'Empréstimo' },
    { value: 'renovacao', label: 'Renovação' },
    { value: 'contratacao', label: 'Contratação' },
    { value: 'rescisao', label: 'Rescisão' }
  ];

  const statusOptions = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'aprovada', label: 'Aprovada' },
    { value: 'rejeitada', label: 'Rejeitada' },
    { value: 'cancelada', label: 'Cancelada' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const transferData = {
        ...formData,
        transfer_fee: formData.transfer_fee ? parseFloat(formData.transfer_fee) : null,
        from_club_id: formData.from_club_id || null,
        to_club_id: formData.to_club_id || null
      };

      if (editingTransfer) {
        await updateTransfer.mutateAsync({ id: editingTransfer.id, data: transferData });
      } else {
        await createTransfer.mutateAsync(transferData);
      }
      
      setIsDialogOpen(false);
      setEditingTransfer(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar transferência:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      player_id: '',
      from_club_id: '',
      to_club_id: '',
      transfer_date: '',
      transfer_type: '',
      season: '',
      transfer_fee: '',
      contract_duration: '',
      status: 'pendente',
      notes: ''
    });
  };

  const handleEdit = (transfer: any) => {
    setEditingTransfer(transfer);
    setFormData({
      ...transfer,
      transfer_date: transfer.transfer_date ? new Date(transfer.transfer_date).toISOString().split('T')[0] : '',
      transfer_fee: transfer.transfer_fee?.toString() || '',
      from_club_id: transfer.from_club_id || '',
      to_club_id: transfer.to_club_id || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar esta transferência?')) {
      await deleteTransfer.mutateAsync(id);
    }
  };

  const getPlayerName = (playerId: string) => {
    const player = players.find((p: any) => p.id === playerId);
    return player ? `${player.first_name || ''} ${player.last_name || ''}` : 'Jogador não encontrado';
  };

  const getClubName = (clubId: string) => {
    if (!clubId) return '-';
    const club = clubs.find((c: any) => c.id === clubId);
    return club?.name || 'Clube não encontrado';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pendente': { icon: Clock, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'aprovada': { icon: CheckCircle, className: 'bg-green-100 text-green-800 border-green-200' },
      'rejeitada': { icon: XCircle, className: 'bg-red-100 text-red-800 border-red-200' },
      'cancelada': { icon: XCircle, className: 'bg-gray-100 text-gray-800 border-gray-200' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['pendente'];
    const IconComponent = config.icon;

    return (
      <Badge variant="outline" className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTransferTypeBadge = (type: string) => {
    const typeColors = {
      'transferencia_definitiva': 'bg-blue-100 text-blue-800 border-blue-200',
      'emprestimo': 'bg-orange-100 text-orange-800 border-orange-200',
      'renovacao': 'bg-green-100 text-green-800 border-green-200',
      'contratacao': 'bg-purple-100 text-purple-800 border-purple-200',
      'rescisao': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <Badge variant="outline" className={typeColors[type as keyof typeof typeColors] || 'bg-gray-100'}>
        {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
      </Badge>
    );
  };

  if (isLoading) {
    return <div>Carregando transferências...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6" />
            Gestão de Transferências
          </h2>
          <p className="text-gray-600">Gerir transferências e movimentações de jogadores</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transferência
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTransfer ? 'Editar Transferência' : 'Nova Transferência'}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from_club">Clube de Origem (opcional)</Label>
                  <Select 
                    value={formData.from_club_id} 
                    onValueChange={(value) => setFormData({...formData, from_club_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar clube origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      {clubs.map((club: any) => (
                        <SelectItem key={club.id} value={club.id}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="to_club">Clube de Destino (opcional)</Label>
                  <Select 
                    value={formData.to_club_id} 
                    onValueChange={(value) => setFormData({...formData, to_club_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar clube destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      {clubs.map((club: any) => (
                        <SelectItem key={club.id} value={club.id}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="transfer_type">Tipo de Transferência</Label>
                  <Select 
                    value={formData.transfer_type} 
                    onValueChange={(value) => setFormData({...formData, transfer_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {transferTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="transfer_date">Data da Transferência</Label>
                  <Input
                    id="transfer_date"
                    type="date"
                    value={formData.transfer_date}
                    onChange={(e) => setFormData({...formData, transfer_date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="season">Época</Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    placeholder="Ex: 2024/25"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="transfer_fee">Valor da Transferência (CVE)</Label>
                  <Input
                    id="transfer_fee"
                    type="number"
                    step="0.01"
                    value={formData.transfer_fee}
                    onChange={(e) => setFormData({...formData, transfer_fee: e.target.value})}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="contract_duration">Duração do Contrato</Label>
                  <Input
                    id="contract_duration"
                    value={formData.contract_duration}
                    onChange={(e) => setFormData({...formData, contract_duration: e.target.value})}
                    placeholder="Ex: 2 anos"
                  />
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
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  placeholder="Informações adicionais sobre a transferência"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingTransfer ? 'Atualizar' : 'Criar'}
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
            Transferências Registadas ({transfers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogador</TableHead>
                <TableHead>Movimentação</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Época</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer: any) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">
                    {getPlayerName(transfer.player_id)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getClubName(transfer.from_club_id)}</span>
                      <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{getClubName(transfer.to_club_id)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getTransferTypeBadge(transfer.transfer_type)}</TableCell>
                  <TableCell>
                    {new Date(transfer.transfer_date).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>{transfer.season}</TableCell>
                  <TableCell>
                    {transfer.transfer_fee ? `${transfer.transfer_fee} CVE` : '-'}
                  </TableCell>
                  <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(transfer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(transfer.id)}
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

export default TransfersManagement;
