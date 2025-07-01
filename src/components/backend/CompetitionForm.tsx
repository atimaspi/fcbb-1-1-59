
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CompetitionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isSubmitting?: boolean;
}

const CompetitionForm: React.FC<CompetitionFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'championship',
    season: '',
    status: 'upcoming',
    start_date: '',
    end_date: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'championship',
        season: initialData.season || '',
        status: initialData.status || 'upcoming',
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome da Competição *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ex: Campeonato Nacional"
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="championship">Campeonato</SelectItem>
              <SelectItem value="cup">Taça</SelectItem>
              <SelectItem value="tournament">Torneio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="season">Época</Label>
          <Input
            id="season"
            value={formData.season}
            onChange={(e) => handleInputChange('season', e.target.value)}
            placeholder="Ex: 2024/25"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Programado</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">Data de Início</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="end_date">Data de Fim</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descrição da competição"
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'A gravar...' : (initialData ? 'Atualizar' : 'Criar')} Competição
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default CompetitionForm;
