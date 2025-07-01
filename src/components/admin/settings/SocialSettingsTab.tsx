
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import SettingFormField from './SettingFormField';
import { SiteSettingsFormData } from '@/types/siteSettings';

interface SocialSettingsTabProps {
  formData: SiteSettingsFormData;
  onFieldChange: (key: string, value: string) => void;
  onFieldSave: (key: string) => void;
}

const SocialSettingsTab = ({ formData, onFieldChange, onFieldSave }: SocialSettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociais</CardTitle>
        <CardDescription>Links para redes sociais da FCBB</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SettingFormField
          id="social_facebook"
          label="Facebook URL"
          value={formData.social_facebook || ''}
          onChange={(value) => onFieldChange('social_facebook', value)}
          onSave={() => onFieldSave('social_facebook')}
          placeholder="https://facebook.com/fcbb.cv"
          icon={<Facebook className="h-4 w-4" />}
        />
        
        <SettingFormField
          id="social_instagram"
          label="Instagram URL"
          value={formData.social_instagram || ''}
          onChange={(value) => onFieldChange('social_instagram', value)}
          onSave={() => onFieldSave('social_instagram')}
          placeholder="https://instagram.com/fcbb.cv"
          icon={<Instagram className="h-4 w-4" />}
        />
        
        <SettingFormField
          id="social_youtube"
          label="YouTube URL"
          value={formData.social_youtube || ''}
          onChange={(value) => onFieldChange('social_youtube', value)}
          onSave={() => onFieldSave('social_youtube')}
          placeholder="https://youtube.com/@fcbb.cv"
          icon={<Youtube className="h-4 w-4" />}
        />
      </CardContent>
    </Card>
  );
};

export default SocialSettingsTab;
