
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Globe, 
  Database, 
  Server,
  Mail,
  Image,
  Palette,
  Languages,
  Bell,
  Shield
} from 'lucide-react';

const SystemSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const GeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>Configurações básicas do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Nome do Site</Label>
            <Input id="siteName" defaultValue="Federação Cabo-verdiana de Basquetebol" />
          </div>
          <div>
            <Label htmlFor="siteDescription">Descrição do Site</Label>
            <Textarea id="siteDescription" defaultValue="Portal oficial da FCBB" rows={3} />
          </div>
          <div>
            <Label htmlFor="adminEmail">Email do Administrador</Label>
            <Input id="adminEmail" type="email" defaultValue="admin@fcbb.cv" />
          </div>
          <div>
            <Label htmlFor="timezone">Fuso Horário</Label>
            <Select defaultValue="atlantic/cape_verde">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="atlantic/cape_verde">Atlantic/Cape_Verde (UTC-1)</SelectItem>
                <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                <SelectItem value="europe/lisbon">Europe/Lisbon (UTC+1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenance" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            <Label htmlFor="maintenance">Modo de Manutenção</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Performance</CardTitle>
          <CardDescription>Otimizações do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cacheTime">Tempo de Cache (minutos)</Label>
            <Input id="cacheTime" type="number" defaultValue="60" />
          </div>
          <div>
            <Label htmlFor="maxFileSize">Tamanho Máximo de Upload (MB)</Label>
            <Input id="maxFileSize" type="number" defaultValue="50" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="imageCompression" defaultChecked />
            <Label htmlFor="imageCompression">Compressão Automática de Imagens</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="enableCdn" defaultChecked />
            <Label htmlFor="enableCdn">Utilizar CDN</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Email</CardTitle>
          <CardDescription>Configurar servidor de email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="smtpHost">Servidor SMTP</Label>
            <Input id="smtpHost" placeholder="smtp.gmail.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpPort">Porta</Label>
              <Input id="smtpPort" defaultValue="587" />
            </div>
            <div>
              <Label htmlFor="smtpEncryption">Encriptação</Label>
              <Select defaultValue="tls">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">Nenhuma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="smtpUsername">Utilizador</Label>
            <Input id="smtpUsername" type="email" placeholder="email@fcbb.cv" />
          </div>
          <div>
            <Label htmlFor="smtpPassword">Palavra-passe</Label>
            <Input id="smtpPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="emailNotifs" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            <Label htmlFor="emailNotifs">Ativar Notificações por Email</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações do Sistema</CardTitle>
          <CardDescription>Configurar alertas automáticos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="newUser" defaultChecked />
            <Label htmlFor="newUser">Novo utilizador registado</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="failedLogin" defaultChecked />
            <Label htmlFor="failedLogin">Tentativas de login falhadas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="systemError" defaultChecked />
            <Label htmlFor="systemError">Erros do sistema</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="backupComplete" defaultChecked />
            <Label htmlFor="backupComplete">Backup concluído</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DatabaseSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Base de Dados</CardTitle>
          <CardDescription>Gestão da base de dados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Estado da Conexão</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Conectado
                </Badge>
                <span className="text-sm text-gray-600">Supabase</span>
              </div>
            </div>
            <div>
              <Label>Última Otimização</Label>
              <div className="text-sm text-gray-600 mt-1">2024-06-30 03:00</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="autoBackupDb" checked={autoBackup} onCheckedChange={setAutoBackup} />
            <Label htmlFor="autoBackupDb">Backup Automático Diário</Label>
          </div>
          <div>
            <Label htmlFor="backupRetention">Retenção de Backups (dias)</Label>
            <Input id="backupRetention" type="number" defaultValue="30" />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Otimizar Base de Dados</Button>
            <Button variant="outline">Backup Manual</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas da Base de Dados</CardTitle>
          <CardDescription>Informações sobre o uso da base de dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-cv-blue">2.3 GB</div>
              <div className="text-sm text-gray-600">Tamanho Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">12,456</div>
              <div className="text-sm text-gray-600">Total de Registos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">234</div>
              <div className="text-sm text-gray-600">Tabelas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm text-gray-600">Backups</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const InternationalizationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Idioma</CardTitle>
          <CardDescription>Configurar idiomas disponíveis no site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="defaultLanguage">Idioma Padrão</Label>
            <Select defaultValue="pt">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Idiomas Disponíveis</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="portuguese" defaultChecked />
                  <Label htmlFor="portuguese">Português</Label>
                </div>
                <Badge variant="default">Padrão</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="english" defaultChecked />
                  <Label htmlFor="english">English</Label>
                </div>
                <Badge variant="outline">Disponível</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="autoDetect" defaultChecked />
            <Label htmlFor="autoDetect">Deteção Automática de Idioma</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Regionais</CardTitle>
          <CardDescription>Formatos de data, moeda e números</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dateFormat">Formato de Data</Label>
            <Select defaultValue="dd/mm/yyyy">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currency">Moeda</Label>
            <Select defaultValue="cve">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cve">Escudo Cabo-verdiano (CVE)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
                <SelectItem value="usd">Dólar Americano (USD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Base de Dados</span>
          </TabsTrigger>
          <TabsTrigger value="i18n" className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Idiomas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseSettings />
        </TabsContent>

        <TabsContent value="i18n">
          <InternationalizationSettings />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-cv-blue hover:bg-cv-blue/90">Guardar Configurações</Button>
      </div>
    </div>
  );
};

export default SystemSettings;
