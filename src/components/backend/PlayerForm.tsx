
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackendData } from '@/hooks/useBackendData';

interface PlayerFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isSubmitting?: boolean;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const { teams } = useBackendData();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    team_id: '',
    position: '',
    jersey_number: '',
    birth_date: '',
    height_cm: '',
    weight_kg: '',
    nationality: 'CV',
    club: '',
    active: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        team_id: initialData.team_id || '',
        position: initialData.position || '',
        jersey_number: initialData.jersey_number?.toString() || '',
        birth_date: initialData.birth_date || '',
        height_cm: initialData.height_cm?.toString() || '',
        weight_kg: initialData.weight_kg?.toString() || '',
        nationality: initialData.nationality || 'CV',
        club: initialData.club || '',
        active: initialData.active !== undefined ? initialData.active : true
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      jersey_number: formData.jersey_number ? parseInt(formData.jersey_number) : null,
      height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
      weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null
    };
    onSubmit(submitData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const positions = [
    'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">Primeiro Nome *</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Último Nome *</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="team_id">Equipa</Label>
          <Select value={formData.team_id} onValueChange={(value) => handleInputChange('team_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar equipa" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team: any) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="club">Clube</Label>
          <Input
            id="club"
            value={formData.club}
            onChange={(e) => handleInputChange('club', e.target.value)}
            placeholder="Nome do clube"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Posição</Label>
          <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar posição" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
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
            onChange={(e) => handleInputChange('jersey_number', e.target.value)}
            min="0"
            max="99"
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
            onChange={(e) => handleInputChange('birth_date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="height_cm">Altura (cm)</Label>
          <Input
            id="height_cm"
            type="number"
            value={formData.height_cm}
            onChange={(e) => handleInputChange('height_cm', e.target.value)}
            placeholder="Ex: 185"
          />
        </div>
        <div>
          <Label htmlFor="weight_kg">Peso (kg)</Label>
          <Input
            id="weight_kg"
            type="number"
            value={formData.weight_kg}
            onChange={(e) => handleInputChange('weight_kg', e.target.value)}
            placeholder="Ex: 80"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationality">Nacionalidade</Label>
          <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CV">Cabo Verde</SelectItem>
              <SelectItem value="PT">Portugal</SelectItem>
              <SelectItem value="BR">Brasil</SelectItem>
              <SelectItem value="US">Estados Unidos</SelectItem>
              <SelectItem value="FR">França</SelectItem>
              <SelectItem value="ES">Espanha</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="active">Status</Label>
          <Select value={formData.active.toString()} onValueChange={(value) => handleInputChange('active', value === 'true')}>
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
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'A gravar...' : (initialData ? 'Atualizar' : 'Criar')} Jogador
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default PlayerForm;
