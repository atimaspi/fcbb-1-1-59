
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FederationFormProps {
  formData: {
    name: string;
    acronym: string;
    address: string;
    contact_email: string;
    contact_phone: string;
    website: string;
    logo_url: string;
    foundation_date: string;
  };
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const FederationForm: React.FC<FederationFormProps> = ({
  formData,
  isEditing,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome da Federação *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            required
            placeholder="Ex: Federação Caboverdiana de Basquetebol"
          />
        </div>
        <div>
          <Label htmlFor="acronym">Acrónimo</Label>
          <Input
            id="acronym"
            value={formData.acronym}
            onChange={(e) => onInputChange('acronym', e.target.value)}
            placeholder="Ex: FCBB"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contact_email">Email de Contacto</Label>
          <Input
            id="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => onInputChange('contact_email', e.target.value)}
            placeholder="federacao@exemplo.com"
          />
        </div>
        <div>
          <Label htmlFor="contact_phone">Telefone de Contacto</Label>
          <Input
            id="contact_phone"
            value={formData.contact_phone}
            onChange={(e) => onInputChange('contact_phone', e.target.value)}
            placeholder="+238 123 456 789"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => onInputChange('website', e.target.value)}
            placeholder="https://federacao.exemplo.com"
          />
        </div>
        <div>
          <Label htmlFor="foundation_date">Data de Fundação</Label>
          <Input
            id="foundation_date"
            type="date"
            value={formData.foundation_date}
            onChange={(e) => onInputChange('foundation_date', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="Endereço da sede"
          />
        </div>
        <div>
          <Label htmlFor="logo_url">URL do Logo</Label>
          <Input
            id="logo_url"
            type="url"
            value={formData.logo_url}
            onChange={(e) => onInputChange('logo_url', e.target.value)}
            placeholder="https://exemplo.com/logo.png"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-cv-blue hover:bg-blue-700">
          {isEditing ? 'Atualizar' : 'Criar'} Federação
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default FederationForm;
