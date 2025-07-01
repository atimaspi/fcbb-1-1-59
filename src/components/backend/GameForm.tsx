
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackendData } from '@/hooks/useBackendData';

interface GameFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isSubmitting?: boolean;
}

const GameForm: React.FC<GameFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const { teams, competitions } = useBackendData();
  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    competition_id: '',
    scheduled_date: '',
    venue: '',
    round: '',
    status: 'scheduled'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        home_team_id: initialData.home_team_id || '',
        away_team_id: initialData.away_team_id || '',
        competition_id: initialData.competition_id || '',
        scheduled_date: initialData.scheduled_date ? initialData.scheduled_date.split('T')[0] : '',
        venue: initialData.venue || '',
        round: initialData.round || '',
        status: initialData.status || 'scheduled'
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      scheduled_date: new Date(formData.scheduled_date).toISOString()
    };
    onSubmit(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="competition_id">Competição *</Label>
        <Select value={formData.competition_id} onValueChange={(value) => handleInputChange('competition_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecionar competição" />
          </SelectTrigger>
          <SelectContent>
            {competitions.map((comp: any) => (
              <SelectItem key={comp.id} value={comp.id}>
                {comp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="home_team_id">Equipa Casa *</Label>
          <Select value={formData.home_team_id} onValueChange={(value) => handleInputChange('home_team_id', value)}>
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
          <Label htmlFor="away_team_id">Equipa Visitante *</Label>
          <Select value={formData.away_team_id} onValueChange={(value) => handleInputChange('away_team_id', value)}>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="scheduled_date">Data do Jogo *</Label>
          <Input
            id="scheduled_date"
            type="datetime-local"
            value={formData.scheduled_date}
            onChange={(e) => handleInputChange('scheduled_date', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="venue">Local</Label>
          <Input
            id="venue"
            value={formData.venue}
            onChange={(e) => handleInputChange('venue', e.target.value)}
            placeholder="Local do jogo"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="round">Jornada</Label>
          <Input
            id="round"
            value={formData.round}
            onChange={(e) => handleInputChange('round', e.target.value)}
            placeholder="Ex: Jornada 1"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="live">Ao Vivo</SelectItem>
              <SelectItem value="finished">Finalizado</SelectItem>
              <SelectItem value="postponed">Adiado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'A gravar...' : (initialData ? 'Atualizar' : 'Criar')} Jogo
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default GameForm;
