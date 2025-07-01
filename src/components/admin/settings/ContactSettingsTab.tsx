
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import SettingFormField from './SettingFormField';
import { SiteSettingsFormData } from '@/types/siteSettings';

interface ContactSettingsTabProps {
  formData: SiteSettingsFormData;
  onFieldChange: (key: string, value: string) => void;
  onFieldSave: (key: string) => void;
}

const ContactSettingsTab = ({ formData, onFieldChange, onFieldSave }: ContactSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Contacto</CardTitle>
        <CardDescription>Email, telefone e outros contactos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SettingFormField
          id="contact_email"
          label="Email de Contacto"
          value={formData.contact_email || ''}
          onChange={(value) => onFieldChange('contact_email', value)}
          onSave={() => onFieldSave('contact_email')}
          type="email"
          icon={<Mail className="h-4 w-4" />}
        />
        
        <SettingFormField
          id="contact_phone"
          label="Telefone de Contacto"
          value={formData.contact_phone || ''}
          onChange={(value) => onFieldChange('contact_phone', value)}
          onSave={() => onFieldSave('contact_phone')}
          icon={<Phone className="h-4 w-4" />}
        />
      </CardContent>
    </Card>
  );
};

export default ContactSettingsTab;
