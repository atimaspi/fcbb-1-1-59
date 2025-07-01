
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Globe, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Database, 
  Clock,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

const FibaIntegration = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const syncStatus = [
    {
      endpoint: 'Classificações',
      status: 'success',
      lastSync: '2024-06-30 14:30',
      records: 16
    },
    {
      endpoint: 'Resultados',
      status: 'success',
      lastSync: '2024-06-30 14:25',
      records: 45
    },
    {
      endpoint: 'Estatísticas',
      status: 'warning',
      lastSync: '2024-06-30 13:15',
      records: 234
    },
    {
      endpoint: 'Calendário',
      status: 'error',
      lastSync: '2024-06-30 12:00',
      records: 0
    }
  ];

  const apiLogs = [
    {
      time: '2024-06-30 14:30:15',
      endpoint: '/api/v1/standings',
      method: 'GET',
      status: 200,
      response: 'Success'
    },
    {
      time: '2024-06-30 14:25:32',
      endpoint: '/api/v1/games',
      method: 'GET',
      status: 200,
      response: 'Success'
    },
    {
      time: '2024-06-30 13:15:45',
      endpoint: '/api/v1/statistics',
      method: 'GET',
      status: 429,
      response: 'Rate limit exceeded'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Integração FIBA</h3>
          <p className="text-sm text-gray-600">Integração com a API oficial da FIBA</p>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Badge className="bg-green-100 text-green-800">
              <Wifi className="h-3 w-3 mr-1" />
              Conectado
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800">
              <WifiOff className="h-3 w-3 mr-1" />
              Desconectado
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar Agora
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Status da Conexão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Última Sincronização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">30/06/2024 14:30</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Registos Sincronizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">295</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Próxima Sincronização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">30/06/2024 15:00</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="sync" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
          <TabsTrigger value="config">Configuração</TabsTrigger>
          <TabsTrigger value="logs">Logs da API</TabsTrigger>
        </TabsList>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Status da Sincronização</CardTitle>
              <CardDescription>Estado atual da sincronização com a API FIBA</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Sincronização</TableHead>
                    <TableHead>Registos</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncStatus.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.endpoint}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <Badge className={getStatusColor(item.status)}>
                            {item.status === 'success' ? 'Sucesso' : 
                             item.status === 'warning' ? 'Aviso' : 'Erro'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{item.lastSync}</TableCell>
                      <TableCell>{item.records}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração da API</CardTitle>
                <CardDescription>Configurar parâmetros de conexão com a FIBA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">Chave da API</Label>
                  <Input id="apiKey" type="password" placeholder="••••••••••••••••" />
                </div>
                <div>
                  <Label htmlFor="baseUrl">URL Base</Label>
                  <Input id="baseUrl" defaultValue="https://api.fiba.basketball/v1" />
                </div>
                <div>
                  <Label htmlFor="timeout">Timeout (segundos)</Label>
                  <Input id="timeout" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enableApi" checked={isConnected} onCheckedChange={setIsConnected} />
                  <Label htmlFor="enableApi">Ativar integração FIBA</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuração de Sincronização</CardTitle>
                <CardDescription>Definir frequência e parâmetros de sincronização</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="autoSync" checked={autoSync} onCheckedChange={setAutoSync} />
                  <Label htmlFor="autoSync">Sincronização automática</Label>
                </div>
                <div>
                  <Label htmlFor="syncInterval">Intervalo de Sincronização (minutos)</Label>
                  <Input id="syncInterval" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="retryAttempts">Tentativas de Reenvio</Label>
                  <Input id="retryAttempts" type="number" defaultValue="3" />
                </div>
                <Button className="bg-cv-blue hover:bg-cv-blue/90">
                  Guardar Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Logs da API</CardTitle>
              <CardDescription>Histórico de chamadas à API FIBA</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hora</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resposta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{log.time}</TableCell>
                      <TableCell className="font-mono text-sm">{log.endpoint}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.method}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={log.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.response}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FibaIntegration;
