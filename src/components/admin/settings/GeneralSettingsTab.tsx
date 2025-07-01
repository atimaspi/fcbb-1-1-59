
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SettingFormField from './SettingFormField';
import { SiteSettingsFormData } from '@/types/siteSettings';

interface GeneralSettingsTabProps {
  formData: SiteSettingsFormData;
  onFieldChange: (key: string, value: string) => void;
  onFieldSave: (key: string) => void;
}

const GeneralSettingsTab = ({ formData, onFieldChange, onFieldSave }: GeneralSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Gerais</CardTitle>
        <CardDescription>Configurações básicas do site</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SettingFormField
          id="site_title"
          label="Título do Site"
          value={formData.site_title || ''}
          onChange={(value) => onFieldChange('site_title', value)}
          onSave={() => onFieldSave('site_title')}
        />
        
        <SettingFormField
          id="site_description"
          label="Descrição do Site"
          value={formData.site_description || ''}
          onChange={(value) => onFieldChange('site_description', value)}
          onSave={() => onFieldSave('site_description')}
          type="textarea"
        />
      </CardContent>
    </Card>
  );
};

export default GeneralSettingsTab;
