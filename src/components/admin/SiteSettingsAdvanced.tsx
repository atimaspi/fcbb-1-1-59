
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { Save, Mail, Globe, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SiteSetting, SiteSettingsFormData } from '@/types/siteSettings';
import GeneralSettingsTab from './settings/GeneralSettingsTab';
import ContactSettingsTab from './settings/ContactSettingsTab';
import SocialSettingsTab from './settings/SocialSettingsTab';

const SiteSettingsAdvanced = () => {
  const { useOptimizedFetch, useOptimizedUpdate } = useUnifiedApi();
  const { data: settings = [], isLoading, error } = useOptimizedFetch('site_settings');
  const updateSetting = useOptimizedUpdate('site_settings');
  const { toast } = useToast();

  const [formData, setFormData] = useState<SiteSettingsFormData>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (Array.isArray(settings) && settings.length > 0) {
      const settingsObj = settings.reduce((acc: SiteSettingsFormData, setting: SiteSetting) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {});
      setFormData(settingsObj);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async (settingKey: string) => {
    try {
      if (Array.isArray(settings)) {
        const setting = settings.find((s: SiteSetting) => s.setting_key === settingKey);
        if (setting && setting.id) {
          await updateSetting.mutateAsync({
            id: setting.id,
            data: { setting_value: formData[settingKey] }
          });
          setHasChanges(false);
          toast({
            title: "Sucesso",
            description: "Configuração atualizada com sucesso!",
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configuração",
        variant: "destructive",
      });
    }
  };

  const handleSaveAll = async () => {
    try {
      if (Array.isArray(settings)) {
        const updates = settings.map((setting: SiteSetting) => 
          updateSetting.mutateAsync({
            id: setting.id,
            data: { setting_value: formData[setting.setting_key] || setting.setting_value }
          })
        );
        
        await Promise.all(updates);
        setHasChanges(false);
        toast({
          title: "Sucesso",
          description: "Todas as configurações foram atualizadas!",
        });
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Carregando configurações...</div>;
  }

  if (error) {
    return <div>Erro ao carregar configurações: {error.message}</div>;
  }

  if (!Array.isArray(settings)) {
    return <div>Erro ao carregar configurações</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Configurações do Site</h2>
          <p className="text-gray-600">Gerir informações gerais e de contacto</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSaveAll} className="bg-cv-blue hover:bg-cv-blue/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Todas
          </Button>
        )}
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contacto
          </TabsTrigger>
          <TabsTrigger value="social">
            <Globe className="h-4 w-4 mr-2" />
            Redes Sociais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <GeneralSettingsTab
            formData={formData}
            onFieldChange={handleChange}
            onFieldSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <ContactSettingsTab
            formData={formData}
            onFieldChange={handleChange}
            onFieldSave={handleSave}
          />
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <SocialSettingsTab
            formData={formData}
            onFieldChange={handleChange}
            onFieldSave={handleSave}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsAdvanced;
