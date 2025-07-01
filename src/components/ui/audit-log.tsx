
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Info, AlertCircle, Bug, Download, Trash2 } from 'lucide-react';
import { logger } from '@/utils/logger';

interface AuditLogProps {
  className?: string;
}

const AuditLog = ({ className }: AuditLogProps) => {
  const [logs, setLogs] = useState(logger.getLogs());
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(logger.getLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.level === filter
  );

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'debug':
        return <Bug className="w-4 h-4 text-gray-500" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getLogBadgeVariant = (level: string) => {
    switch (level) {
      case 'error':
        return 'destructive';
      case 'warn':
        return 'secondary';
      case 'info':
        return 'default';
      case 'debug':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleExport = () => {
    const dataStr = logger.exportLogs();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `fcbb-logs-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleClear = () => {
    logger.clearLogs();
    setLogs([]);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Logs de Auditoria</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="error">Erros</TabsTrigger>
            <TabsTrigger value="warn">Avisos</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="debug">Debug</TabsTrigger>
          </TabsList>
          
          <TabsContent value={filter} className="mt-4">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <p className="text-center text-gray-500 py-4">
                  Nenhum log encontrado
                </p>
              ) : (
                filteredLogs.reverse().map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {getLogIcon(log.level)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getLogBadgeVariant(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {log.message}
                      </p>
                      {log.data && (
                        <details className="text-xs text-gray-600">
                          <summary className="cursor-pointer hover:text-gray-800">
                            Ver dados
                          </summary>
                          <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuditLog;
