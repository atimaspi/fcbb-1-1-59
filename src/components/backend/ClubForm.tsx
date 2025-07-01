
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClubFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isSubmitting?: boolean;
}

const ClubForm: React.FC<ClubFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    island: '',
    founded_year: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    address: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        island: initialData.island || '',
        founded_year: initialData.founded_year?.toString() || '',
        contact_email: initialData.contact_email || '',
        contact_phone: initialData.contact_phone || '',
        website: initialData.website || '',
        address: initialData.address || '',
        description: initialData.description || '',
        status: initialData.status || 'active'
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      founded_year: formData.founded_year ? parseInt(formData.founded_year) : null
    };
    onSubmit(submitData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const islands = [
    'Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 
    'Boavista', 'Sal', 'Brava', 'São Nicolau'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Clube *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Ex: Sporting Clube da Praia"
            required
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
            placeholder="Ex: 1985"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
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

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder="https://clube.exemplo.com"
        />
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
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Breve descrição do clube"
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'A gravar...' : (initialData ? 'Atualizar' : 'Criar')} Clube
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ClubForm;
