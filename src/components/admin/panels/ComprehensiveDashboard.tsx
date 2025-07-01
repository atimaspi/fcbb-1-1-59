
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  Trophy, 
  Calendar, 
  TrendingUp, 
  Eye,
  MessageCircle,
  Globe
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ComprehensiveDashboard = () => {
  // Dados de exemplo para os gráficos
  const visitorsData = [
    { name: 'Jan', visitors: 4000, pageViews: 2400 },
    { name: 'Fev', visitors: 3000, pageViews: 1398 },
    { name: 'Mar', visitors: 2000, pageViews: 9800 },
    { name: 'Abr', visitors: 2780, pageViews: 3908 },
    { name: 'Mai', visitors: 1890, pageViews: 4800 },
    { name: 'Jun', visitors: 2390, pageViews: 3800 },
  ];

  const contentData = [
    { name: 'Notícias', value: 45, color: '#0066CC' },
    { name: 'Fotos', value: 30, color: '#00AA44' },
    { name: 'Vídeos', value: 15, color: '#FF6600' },
    { name: 'Documentos', value: 10, color: '#CC0066' },
  ];

  const competitionsData = [
    { name: 'Campeonato Nacional', jogos: 24, equipas: 12 },
    { name: 'Taça Nacional', jogos: 16, equipas: 8 },
    { name: 'Super Taça', jogos: 4, equipas: 4 },
    { name: 'Torneio Juvenil', jogos: 18, equipas: 9 },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.3% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conteúdos Publicados</CardTitle>
            <FileText className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8 esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competições Ativas</CardTitle>
            <Trophy className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-blue-600 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              4 em curso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <MessageCircle className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2k</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% interações
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitantes e Visualizações</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#0066CC" strokeWidth={2} />
                <Line type="monotone" dataKey="pageViews" stroke="#00AA44" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Conteúdo</CardTitle>
            <CardDescription>Por tipo de conteúdo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Competições por Jogos</CardTitle>
            <CardDescription>Atividade nas competições</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competitionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jogos" fill="#0066CC" />
                <Bar dataKey="equipas" fill="#00AA44" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nova notícia publicada</p>
                <p className="text-xs text-gray-500">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Jogo finalizado</p>
                <p className="text-xs text-gray-500">Há 4 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Novo utilizador registado</p>
                <p className="text-xs text-gray-500">Há 6 horas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Backup automático realizado</p>
                <p className="text-xs text-gray-500">Há 8 horas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Alertas de Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              2 tentativas de login falhadas detetadas
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="text-yellow-600">Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Atualização de sistema agendada para domingo
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Agendar
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-green-600">Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Todos os serviços operacionais
            </p>
            <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
              Operacional
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;
