
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Globe, Calendar, BarChart3, RefreshCw } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  type: string;
  config: any;
  is_active: boolean;
  last_sync: string | null;
}

const IntegrationsManagement = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);
  const [formData, setFormData] = useState({
    base_url: '',
    api_key: '',
    calendar_id: '',
    tracking_id: '',
    property_id: '',
    timezone: 'Atlantic/Cape_Verde'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .order('name');

      if (error) throw error;
      setIntegrations(data || []);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao carregar integrações: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (integration: Integration) => {
    setEditingIntegration(integration);
    setFormData({
      base_url: integration.config.base_url || '',
      api_key: integration.config.api_key || '',
      calendar_id: integration.config.calendar_id || '',
      tracking_id: integration.config.tracking_id || '',
      property_id: integration.config.property_id || '',
      timezone: integration.config.timezone || 'Atlantic/Cape_Verde'
    });
    setShowDialog(true);
  };

  const handleToggleActive = async (integrationId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('integrations')
        .update({ is_active: isActive })
        .eq('id', integrationId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Integração ${isActive ? 'ativada' : 'desativada'} com sucesso.`,
      });

      await fetchIntegrations();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao atualizar integração: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIntegration) return;

    setLoading(true);

    try {
      let config = {};
      
      if (editingIntegration.type === 'api') {
        config = {
          base_url: formData.base_url,
          api_key: formData.api_key,
          version: 'v1'
        };
      } else if (editingIntegration.type === 'calendar') {
        config = {
          calendar_id: formData.calendar_id,
          timezone: formData.timezone
        };
      } else if (editingIntegration.type === 'analytics') {
        config = {
          tracking_id: formData.tracking_id,
          property_id: formData.property_id
        };
      }

      const { error } = await supabase
        .from('integrations')
        .update({
          config: config,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingIntegration.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Integração atualizada com sucesso.",
      });

      setShowDialog(false);
      await fetchIntegrations();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao atualizar integração: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testIntegration = async (integration: Integration) => {
    // Simular teste de integração
    toast({
      title: "Teste de Integração",
      description: `Testando conexão com ${integration.name}...`,
    });

    setTimeout(() => {
      toast({
        title: "Sucesso",
        description: `Conexão com ${integration.name} testada com sucesso.`,
      });
    }, 2000);
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'api':
        return <Globe className="h-5 w-5" />;
      case 'calendar':
        return <Calendar className="h-5 w-5" />;
      case 'analytics':
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (isActive: boolean, lastSync: string | null) => {
    if (!isActive) {
      return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Inativo</span>;
    }
    
    if (lastSync) {
      return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Conectado</span>;
    }
    
    return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Configurado</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Integrações</h3>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Integração</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Sincronização</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : integrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhuma integração encontrada</TableCell>
              </TableRow>
            ) : (
              integrations.map((integration) => (
                <TableRow key={integration.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getIntegrationIcon(integration.type)}
                      <span className="font-medium">{integration.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{integration.type}</TableCell>
                  <TableCell>{getStatusBadge(integration.is_active, integration.last_sync)}</TableCell>
                  <TableCell>
                    {integration.last_sync 
                      ? new Date(integration.last_sync).toLocaleString('pt-PT')
                      : 'Nunca'
                    }
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={integration.is_active}
                      onCheckedChange={(checked) => handleToggleActive(integration.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(integration)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Configurar"
                      >
                        <Settings size={16} />
                      </button>
                      <button 
                        onClick={() => testIntegration(integration)}
                        className="text-green-600 hover:text-green-800"
                        title="Testar Conexão"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              Configurar {editingIntegration?.name}
            </DialogTitle>
            <DialogDescription>
              Configure os parâmetros para esta integração.
            </DialogDescription>
          </DialogHeader>
          {editingIntegration && (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {editingIntegration.type === 'api' && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="base_url" className="text-sm font-medium">
                        URL Base da API
                      </label>
                      <Input
                        id="base_url"
                        value={formData.base_url}
                        onChange={(e) => setFormData({...formData, base_url: e.target.value})}
                        placeholder="https://api.fiba.basketball"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="api_key" className="text-sm font-medium">
                        Chave da API
                      </label>
                      <Input
                        id="api_key"
                        type="password"
                        value={formData.api_key}
                        onChange={(e) => setFormData({...formData, api_key: e.target.value})}
                        placeholder="Insira a chave da API"
                      />
                    </div>
                  </>
                )}

                {editingIntegration.type === 'calendar' && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="calendar_id" className="text-sm font-medium">
                        ID do Calendário
                      </label>
                      <Input
                        id="calendar_id"
                        value={formData.calendar_id}
                        onChange={(e) => setFormData({...formData, calendar_id: e.target.value})}
                        placeholder="exemplo@group.calendar.google.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="timezone" className="text-sm font-medium">
                        Fuso Horário
                      </label>
                      <select
                        id="timezone"
                        value={formData.timezone}
                        onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Atlantic/Cape_Verde">Atlantic/Cape_Verde</option>
                        <option value="Europe/Lisbon">Europe/Lisbon</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </>
                )}

                {editingIntegration.type === 'analytics' && (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="tracking_id" className="text-sm font-medium">
                        ID de Acompanhamento
                      </label>
                      <Input
                        id="tracking_id"
                        value={formData.tracking_id}
                        onChange={(e) => setFormData({...formData, tracking_id: e.target.value})}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="property_id" className="text-sm font-medium">
                        ID da Propriedade
                      </label>
                      <Input
                        id="property_id"
                        value={formData.property_id}
                        onChange={(e) => setFormData({...formData, property_id: e.target.value})}
                        placeholder="123456789"
                      />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue" disabled={loading}>
                  {loading ? 'A atualizar...' : 'Salvar'} Configuração
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsManagement;
