
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, Users, Trophy, Calendar, TrendingUp, Target, Award, Activity } from 'lucide-react';

const StatisticsManagement = () => {
  const { 
    teams, 
    competitions, 
    games, 
    players, 
    publishedNews, 
    activeEvents,
    isLoading 
  } = useBackendData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Estatísticas por ilha
  const islandStats = teams.reduce((acc: any, team: any) => {
    acc[team.island] = (acc[team.island] || 0) + 1;
    return acc;
  }, {});

  const islandData = Object.entries(islandStats).map(([island, count]) => ({
    island,
    clubes: count
  }));

  // Estatísticas de jogos por status
  const gameStats = games.reduce((acc: any, game: any) => {
    acc[game.status] = (acc[game.status] || 0) + 1;
    return acc;
  }, {});

  const gameStatusData = Object.entries(gameStats).map(([status, count]) => ({
    status,
    jogos: count
  }));

  // Estatísticas de competições por tipo
  const competitionStats = competitions.reduce((acc: any, comp: any) => {
    acc[comp.type] = (acc[comp.type] || 0) + 1;
    return acc;
  }, {});

  const competitionTypeData = Object.entries(competitionStats).map(([type, count]) => ({
    type,
    competicoes: count
  }));

  // Dados mensais fictícios para demonstração
  const monthlyData = [
    { mes: 'Jan', jogos: 12, noticias: 8 },
    { mes: 'Fev', jogos: 15, noticias: 12 },
    { mes: 'Mar', jogos: 18, noticias: 15 },
    { mes: 'Abr', jogos: 22, noticias: 18 },
    { mes: 'Mai', jogos: 25, noticias: 20 },
    { mes: 'Jun', jogos: 20, noticias: 16 }
  ];

  const COLORS = ['#1e40af', '#dc2626', '#059669', '#d97706', '#7c3aed', '#db2777'];

  const StatCard = ({ title, value, description, icon: Icon, color }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cv-blue">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Estatísticas e Relatórios
        </h2>
        <p className="text-gray-600">Análise detalhada dos dados da FCBB</p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clubes"
          value={teams.length}
          description="Clubes registados"
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Competições Ativas"
          value={competitions.filter((c: any) => c.status === 'ativo').length}
          description="Em andamento"
          icon={Trophy}
          color="text-green-600"
        />
        <StatCard
          title="Jogos Realizados"
          value={games.filter((g: any) => g.status === 'finalizado').length}
          description="Partidas completadas"
          icon={Calendar}
          color="text-yellow-600"
        />
        <StatCard
          title="Jogadores Ativos"
          value={players.length}
          description="Atletas registados"
          icon={Activity}
          color="text-purple-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="clubs">Clubes</TabsTrigger>
          <TabsTrigger value="games">Jogos</TabsTrigger>
          <TabsTrigger value="competitions">Competições</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Mensal</CardTitle>
                <CardDescription>Jogos e notícias por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="jogos" stroke="#1e40af" strokeWidth={2} />
                    <Line type="monotone" dataKey="noticias" stroke="#dc2626" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Jogos</CardTitle>
                <CardDescription>Distribuição por estado</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gameStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, jogos }) => `${status}: ${jogos}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="jogos"
                    >
                      {gameStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clubs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Clubes por Ilha</CardTitle>
              <CardDescription>Número de clubes registados em cada ilha</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={islandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="island" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clubes" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jogos Agendados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {games.filter((g: any) => g.status === 'agendado').length}
                </div>
                <p className="text-sm text-gray-500">Próximas partidas</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jogos ao Vivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {games.filter((g: any) => g.status === 'ao_vivo').length}
                </div>
                <p className="text-sm text-gray-500">Em andamento</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jogos Finalizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {games.filter((g: any) => g.status === 'finalizado').length}
                </div>
                <p className="text-sm text-gray-500">Completados</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competições por Tipo</CardTitle>
              <CardDescription>Distribuição das competições por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={competitionTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="competicoes" fill="#059669" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsManagement;
