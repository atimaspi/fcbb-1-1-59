
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Globe, Mail, Bell, Shield, Database, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Configurações gerais
    siteName: 'Federação Cabo-verdiana de Basquetebol',
    siteDescription: 'Portal oficial da FCBB',
    contactEmail: 'geral@fcbb.cv',
    contactPhone: '+238 260 12 34',
    address: 'Praia, Cabo Verde',
    
    // Configurações de notificações
    emailNotifications: true,
    pushNotifications: false,
    newsNotifications: true,
    gameNotifications: true,
    
    // Configurações de sistema
    maintenanceMode: false,
    userRegistration: true,
    publicGallery: true,
    commentsEnabled: false,
    
    // Configurações de aparência
    theme: 'light',
    language: 'pt',
    timezone: 'Atlantic/Cape_Verde',
    
    // Configurações de backup
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: '30'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (section: string) => {
    // Simular salvamento
    toast({
      title: "Configurações Guardadas",
      description: `Configurações de ${section} foram atualizadas com sucesso.`
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Iniciado",
      description: "O processo de backup foi iniciado. Receberá uma notificação quando concluído."
    });
  };

  const handleRestore = () => {
    toast({
      title: "Restauro Iniciado", 
      description: "O processo de restauro foi iniciado. O sistema será reiniciado automaticamente.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Configurações do Sistema
        </h2>
        <p className="text-gray-600">Gerir parâmetros e configurações da plataforma</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informações Gerais
              </CardTitle>
              <CardDescription>
                Configurações básicas da federação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Nome da Organização</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Descrição</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Telefone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Morada</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleSettingChange('address', e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('gerais')}>
                Guardar Configurações Gerais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Gerir tipos de notificações e alertas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-gray-500">Receber notificações por email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-gray-500">Notificações no browser</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações de Notícias</Label>
                  <p className="text-sm text-gray-500">Alertas para novas notícias</p>
                </div>
                <Switch
                  checked={settings.newsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('newsNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações de Jogos</Label>
                  <p className="text-sm text-gray-500">Alertas para resultados e jogos</p>
                </div>
                <Switch
                  checked={settings.gameNotifications}
                  onCheckedChange={(checked) => handleSettingChange('gameNotifications', checked)}
                />
              </div>

              <Button onClick={() => handleSave('notificações')}>
                Guardar Configurações de Notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Parâmetros de segurança e funcionamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo de Manutenção</Label>
                  <p className="text-sm text-gray-500">Desativar o site para manutenção</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registo de Utilizadores</Label>
                  <p className="text-sm text-gray-500">Permitir novos registos</p>
                </div>
                <Switch
                  checked={settings.userRegistration}
                  onCheckedChange={(checked) => handleSettingChange('userRegistration', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Galeria Pública</Label>
                  <p className="text-sm text-gray-500">Permitir acesso público à galeria</p>
                </div>
                <Switch
                  checked={settings.publicGallery}
                  onCheckedChange={(checked) => handleSettingChange('publicGallery', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Comentários</Label>
                  <p className="text-sm text-gray-500">Ativar sistema de comentários</p>
                </div>
                <Switch
                  checked={settings.commentsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('commentsEnabled', checked)}
                />
              </div>

              <Button onClick={() => handleSave('sistema')}>
                Guardar Configurações do Sistema
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aparência e Localização</CardTitle>
              <CardDescription>
                Configurar tema, idioma e fuso horário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="theme">Tema</Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Atlantic/Cape_Verde">Cabo Verde (UTC-1)</SelectItem>
                      <SelectItem value="Europe/Lisbon">Lisboa (UTC+0)</SelectItem>
                      <SelectItem value="Europe/London">Londres (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => handleSave('aparência')}>
                Guardar Configurações de Aparência
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup e Restauro
              </CardTitle>
              <CardDescription>
                Gerir backups automáticos e restauro de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-500">Criar backups automaticamente</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backupFrequency">Frequência do Backup</Label>
                  <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">De hora em hora</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="retentionDays">Retenção (dias)</Label>
                  <Input
                    id="retentionDays"
                    type="number"
                    value={settings.retentionDays}
                    onChange={(e) => handleSettingChange('retentionDays', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={handleBackup}>
                    <Upload className="w-4 h-4 mr-2" />
                    Criar Backup Manual
                  </Button>
                  <Button variant="outline" onClick={handleRestore}>
                    Restaurar Sistema
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800">Atenção</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    O restauro do sistema irá substituir todos os dados atuais. 
                    Certifique-se de que tem um backup recente antes de prosseguir.
                  </p>
                </div>
              </div>

              <Button onClick={() => handleSave('backup')}>
                Guardar Configurações de Backup
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
