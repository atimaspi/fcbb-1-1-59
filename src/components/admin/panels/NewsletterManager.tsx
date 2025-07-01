
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Mail, 
  Send, 
  Users, 
  Plus,
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Calendar,
  TrendingUp,
  UserPlus
} from 'lucide-react';

const NewsletterManager = () => {
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isAddSubscriberOpen, setIsAddSubscriberOpen] = useState(false);

  // Mock data
  const campaigns = [
    {
      id: 1,
      name: 'Newsletter Mensal - Junho 2024',
      subject: 'Novidades do Basquetebol Caboverdiano',
      status: 'sent',
      recipients: 1250,
      opens: 780,
      clicks: 125,
      sentDate: '2024-06-15'
    },
    {
      id: 2,
      name: 'Campeonato Nacional 2024',
      subject: 'Arranca o Campeonato Nacional!',
      status: 'draft',
      recipients: 0,
      opens: 0,
      clicks: 0,
      sentDate: null
    }
  ];

  const subscribers = [
    {
      id: 1,
      email: 'joao.silva@email.com',
      name: 'João Silva',
      status: 'active',
      subscribed: '2024-03-15',
      lastOpen: '2024-06-20'
    },
    {
      id: 2,
      email: 'maria.santos@email.com',
      name: 'Maria Santos',
      status: 'active',
      subscribed: '2024-04-10',
      lastOpen: '2024-06-25'
    },
    {
      id: 3,
      email: 'pedro.mendes@email.com',
      name: 'Pedro Mendes',
      status: 'unsubscribed',
      subscribed: '2024-02-20',
      lastOpen: '2024-05-15'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Newsletter Mensal',
      description: 'Template para newsletter mensal',
      category: 'newsletter',
      lastUsed: '2024-06-15'
    },
    {
      id: 2,
      name: 'Anúncio de Competição',
      description: 'Template para anúncios de competições',
      category: 'competition',
      lastUsed: '2024-05-20'
    }
  ];

  const CampaignsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Campanhas de Email</h3>
          <p className="text-sm text-gray-600">Gerir campanhas de newsletter</p>
        </div>
        <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Campanha</DialogTitle>
              <DialogDescription>
                Configure uma nova campanha de email
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Nome da Campanha</Label>
                <Input id="campaignName" placeholder="Nome interno da campanha" />
              </div>
              <div>
                <Label htmlFor="subject">Assunto do Email</Label>
                <Input id="subject" placeholder="Assunto que aparecerá no email" />
              </div>
              <div>
                <Label htmlFor="template">Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Newsletter Mensal</SelectItem>
                    <SelectItem value="competition">Anúncio de Competição</SelectItem>
                    <SelectItem value="custom">Template Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea id="content" placeholder="Conteúdo do email" rows={8} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sendDate">Data de Envio</Label>
                  <Input id="sendDate" type="datetime-local" />
                </div>
                <div>
                  <Label htmlFor="recipients">Destinatários</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Subscritores</SelectItem>
                      <SelectItem value="active">Subscritores Ativos</SelectItem>
                      <SelectItem value="segment">Segmento Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateCampaignOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="outline">
                  Guardar Rascunho
                </Button>
                <Button className="bg-cv-blue hover:bg-cv-blue/90">
                  Criar e Enviar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Campanhas Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">12</div>
            <p className="text-xs text-green-600">+2 este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Taxa de Abertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">62.4%</div>
            <p className="text-xs text-green-600">+5.2% vs anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Taxa de Cliques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">10.2%</div>
            <p className="text-xs text-green-600">+1.8% vs anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Subscritores Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">1,247</div>
            <p className="text-xs text-green-600">+23 esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Aberturas</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.subject}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'sent' ? 'default' : 'secondary'}>
                      {campaign.status === 'sent' ? 'Enviado' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.recipients}</TableCell>
                  <TableCell>{campaign.opens}</TableCell>
                  <TableCell>{campaign.clicks}</TableCell>
                  <TableCell>{campaign.sentDate || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const SubscribersContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Subscritores</h3>
          <p className="text-sm text-gray-600">Gerir lista de subscritores</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddSubscriberOpen} onOpenChange={setIsAddSubscriberOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cv-blue hover:bg-cv-blue/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Subscritor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Subscritor</DialogTitle>
                <DialogDescription>
                  Adicionar manualmente um novo subscritor à lista
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subscriberEmail">Email</Label>
                  <Input id="subscriberEmail" type="email" placeholder="email@exemplo.com" />
                </div>
                <div>
                  <Label htmlFor="subscriberName">Nome (opcional)</Label>
                  <Input id="subscriberName" placeholder="Nome completo" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sendWelcome" defaultChecked />
                  <Label htmlFor="sendWelcome">Enviar email de boas-vindas</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddSubscriberOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-cv-blue hover:bg-cv-blue/90">
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Data de Subscrição</TableHead>
                <TableHead>Última Abertura</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>{subscriber.name}</TableCell>
                  <TableCell>
                    <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                      {subscriber.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscriber.subscribed}</TableCell>
                  <TableCell>{subscriber.lastOpen}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="campaigns" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Campanhas</span>
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Subscritores</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <CampaignsContent />
        </TabsContent>

        <TabsContent value="subscribers">
          <SubscribersContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsletterManager;
