
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Eye,
  Activity,
  Clock,
  User,
  Globe,
  Settings,
  RefreshCw,
  Download
} from 'lucide-react';

const SecurityCenter = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(true);

  // Mock data
  const securityAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Tentativas de Login Falhadas',
      description: '5 tentativas de login falhadas detetadas para o utilizador admin@fcbb.cv',
      timestamp: '2024-06-30 14:25',
      status: 'active'
    },
    {
      id: 2,
      type: 'info',
      title: 'Novo Login',
      description: 'Login bem-sucedido de IP 192.168.1.100',
      timestamp: '2024-06-30 13:45',
      status: 'resolved'
    }
  ];

  const loginHistory = [
    {
      id: 1,
      user: 'admin@fcbb.cv',
      ip: '192.168.1.100',
      location: 'Praia, Cabo Verde',
      device: 'Chrome 125 - Windows',
      timestamp: '2024-06-30 14:30',
      status: 'success'
    },
    {
      id: 2,
      user: 'editor@fcbb.cv',
      ip: '192.168.1.105',
      location: 'Mindelo, Cabo Verde',
      device: 'Firefox 126 - Mac',
      timestamp: '2024-06-30 12:15',
      status: 'success'
    },
    {
      id: 3,
      user: 'admin@fcbb.cv',
      ip: '203.0.113.1',
      location: 'Desconhecido',
      device: 'Chrome 124 - Linux',
      timestamp: '2024-06-30 11:30',
      status: 'failed'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      user: 'admin@fcbb.cv',
      ip: '192.168.1.100',
      device: 'Chrome 125 - Windows',
      location: 'Praia, Cabo Verde',
      started: '2024-06-30 14:30',
      lastActivity: '2024-06-30 15:45'
    },
    {
      id: 2,
      user: 'editor@fcbb.cv',
      ip: '192.168.1.105',
      device: 'Firefox 126 - Mac',
      location: 'Mindelo, Cabo Verde',
      started: '2024-06-30 12:15',
      lastActivity: '2024-06-30 15:40'
    }
  ];

  const SecurityOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Estado de Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">Seguro</div>
            <p className="text-xs text-gray-600">Sem ameaças detetadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Alertas Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-gray-600">Requer atenção</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Sessões Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">3</div>
            <p className="text-xs text-gray-600">Utilizadores online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Último Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Hoje 03:00</div>
            <p className="text-xs text-green-600">Backup bem-sucedido</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Alertas de Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityAlerts.map((alert) => (
              <Alert key={alert.id} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{alert.title}</div>
                      <div className="text-sm">{alert.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{alert.timestamp}</div>
                    </div>
                    <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                      {alert.status === 'active' ? 'Ativo' : 'Resolvido'}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-cv-blue" />
              <span>Sessões Ativas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{session.user}</div>
                    <div className="text-sm text-gray-600">{session.device}</div>
                    <div className="text-xs text-gray-500">{session.location}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Terminar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Autenticação</CardTitle>
          <CardDescription>Configurar parâmetros de segurança de login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-gray-600">Obrigar 2FA para todos os administradores</p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Expiração de Sessão</Label>
              <p className="text-sm text-gray-600">Sessões expiram automaticamente após inatividade</p>
            </div>
            <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Bloqueio por Tentativas Falhadas</Label>
              <p className="text-sm text-gray-600">Bloquear conta após múltiplas tentativas falhadas</p>
            </div>
            <Switch checked={loginAttempts} onCheckedChange={setLoginAttempts} />
          </div>
          <div>
            <Label htmlFor="sessionDuration">Duração da Sessão (horas)</Label>
            <Input id="sessionDuration" type="number" defaultValue="8" className="max-w-32" />
          </div>
          <div>
            <Label htmlFor="maxAttempts">Máximo de Tentativas de Login</Label>
            <Input id="maxAttempts" type="number" defaultValue="5" className="max-w-32" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Backup</CardTitle>
          <CardDescription>Configurar backups automáticos do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Backup Automático</Label>
              <p className="text-sm text-gray-600">Realizar backup diário automático</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div>
            <Label htmlFor="backupTime">Hora do Backup</Label>
            <Input id="backupTime" type="time" defaultValue="03:00" className="max-w-32" />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Backup Manual
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Restaurar Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ActivityLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Histórico de Login</h3>
          <p className="text-sm text-gray-600">Registos de tentativas de acesso ao sistema</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Logs
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizador</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>{log.device}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                      {log.status === 'success' ? 'Sucesso' : 'Falhado'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Logs de Atividade</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SecurityOverview />
        </TabsContent>

        <TabsContent value="settings">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="logs">
          <ActivityLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCenter;
