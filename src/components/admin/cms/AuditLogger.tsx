
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, Eye, Filter, Calendar, User, Activity } from 'lucide-react';
import { useAuditLogs } from '@/hooks/useCMSData';
import { AuditLog } from '@/types/cms';

const AuditLogger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterTable, setFilterTable] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const { data: auditLogs = [], isLoading } = useAuditLogs();

  const getActionBadge = (action: string) => {
    const variants = {
      'create': 'default',
      'update': 'secondary', 
      'delete': 'destructive',
      'login': 'outline',
      'logout': 'outline'
    } as const;
    
    const labels = {
      'create': 'Criar',
      'update': 'Atualizar',
      'delete': 'Eliminar',
      'login': 'Login',
      'logout': 'Logout'
    };
    
    return (
      <Badge variant={variants[action as keyof typeof variants] || 'secondary'}>
        {labels[action as keyof typeof labels] || action}
      </Badge>
    );
  };

  const getTableIcon = (tableName: string) => {
    const icons = {
      'menus': '📋',
      'posts': '📝',
      'documents': '📄',
      'media': '🖼️',
      'categories': '🏷️',
      'users': '👤'
    };
    
    return icons[tableName as keyof typeof icons] || '📊';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.table_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.user_id && log.user_id.includes(searchTerm));
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesTable = filterTable === 'all' || log.table_name === filterTable;
    
    return matchesSearch && matchesAction && matchesTable;
  });

  const uniqueTables = [...new Set(auditLogs.map(log => log.table_name))];

  const logStats = {
    total: auditLogs.length,
    creates: auditLogs.filter(l => l.action === 'create').length,
    updates: auditLogs.filter(l => l.action === 'update').length,
    deletes: auditLogs.filter(l => l.action === 'delete').length,
    today: auditLogs.filter(l => {
      const today = new Date().toDateString();
      return new Date(l.created_at).toDateString() === today;
    }).length
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando logs de auditoria...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Logs de Auditoria</h2>
        <p className="text-gray-600">Rastreamento completo de atividades do sistema</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Total de Ações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">{logStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Criações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{logStats.creates}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Atualizações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{logStats.updates}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Eliminações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{logStats.deletes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{logStats.today}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as ações</SelectItem>
                <SelectItem value="create">Criar</SelectItem>
                <SelectItem value="update">Atualizar</SelectItem>
                <SelectItem value="delete">Eliminar</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterTable} onValueChange={setFilterTable}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tabela" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as tabelas</SelectItem>
                {uniqueTables.map(table => (
                  <SelectItem key={table} value={table}>{table}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Badge variant="outline" className="px-3 py-1">
              {filteredLogs.length} registro{filteredLogs.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Auditoria</CardTitle>
          <CardDescription>
            Histórico detalhado de todas as atividades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Tabela</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(log.created_at).toLocaleDateString('pt-PT')}</div>
                      <div className="text-gray-500">
                        {new Date(log.created_at).toLocaleTimeString('pt-PT')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {log.user_id ? log.user_id.substring(0, 8) + '...' : 'Sistema'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{getTableIcon(log.table_name)}</span>
                      <span className="font-mono text-sm">{log.table_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {log.ip_address || 'N/A'}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Log de Auditoria</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">ID do Log</Label>
                              <p className="text-sm text-gray-600">{log.id}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Data/Hora</Label>
                              <p className="text-sm text-gray-600">
                                {new Date(log.created_at).toLocaleString('pt-PT')}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Usuário</Label>
                              <p className="text-sm text-gray-600">{log.user_id || 'Sistema'}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Endereço IP</Label>
                              <p className="text-sm text-gray-600">{log.ip_address || 'N/A'}</p>
                            </div>
                          </div>
                          
                          {log.old_values && (
                            <div>
                              <Label className="text-sm font-medium">Valores Anteriores</Label>
                              <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-auto">
                                {JSON.stringify(log.old_values, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          {log.new_values && (
                            <div>
                              <Label className="text-sm font-medium">Valores Novos</Label>
                              <pre className="text-xs bg-gray-100 p-3 rounded mt-2 overflow-auto">
                                {JSON.stringify(log.new_values, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          {log.user_agent && (
                            <div>
                              <Label className="text-sm font-medium">User Agent</Label>
                              <p className="text-xs text-gray-600 break-all">{log.user_agent}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogger;
