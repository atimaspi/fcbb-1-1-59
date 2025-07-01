
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  TrendingUp,
  Star,
  ImageIcon,
  Play,
  Database,
  BarChart3
} from 'lucide-react';

import GamesManagement from './GamesManagement';
import ResultsManagement from './ResultsManagement';
import IntegrationsManagement from './IntegrationsManagement';
import GalleryManagement from './GalleryManagement';
import DataManagement from '../backend/DataManagement';
import LiveScoring from '../backend/LiveScoring';

const Dashboard = () => {
  const {
    teams,
    competitions,
    games,
    players,
    publishedNews,
    activeEvents,
    recentGames,
    upcomingGames,
    isLoading: backendLoading
  } = useBackendData();

  // Memoized computed data for better performance
  const computedData = useMemo(() => {
    const finishedGames = games.filter((g: any) => g.status === 'finalizado').length;
    const liveGames = games.filter((g: any) => g.status === 'ao_vivo').length;

    return {
      finishedGames,
      liveGames
    };
  }, [games]);

  // Memoized stats for performance
  const stats = useMemo(() => [
    {
      title: 'Total de Notícias',
      value: publishedNews.length,
      description: 'Artigos publicados',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Eventos Ativos',
      value: activeEvents.length,
      description: 'Próximos eventos',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Clubes Registados',
      value: teams.length,
      description: 'Clubes ativos',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      title: 'Jogadores',
      value: players.length,
      description: 'Atletas registados',
      icon: Users,
      color: 'text-purple-600'
    }
  ], [publishedNews.length, activeEvents.length, teams.length, players.length]);

  const [activeTab, setActiveTab] = useState('dashboard');

  // Optimized tab change handler with performance boost
  const handleTabChange = useCallback((newTab: string) => {
    console.log(`🔄 Switching to tab: ${newTab}`);
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      setActiveTab(newTab);
    });
  }, []);

  // Memoized quick action handlers
  const quickActions = useMemo(() => [
    {
      key: 'data',
      icon: Database,
      label: 'Gestão de Dados',
      color: 'bg-cv-blue/10 hover:bg-cv-blue/20',
      iconColor: 'text-cv-blue'
    },
    {
      key: 'live',
      icon: Play,
      label: 'Pontuação ao Vivo',
      color: 'bg-cv-red/10 hover:bg-cv-red/20',
      iconColor: 'text-cv-red'
    },
    {
      key: 'games',
      icon: Trophy,
      label: 'Gestão de Jogos',
      color: 'bg-green-100 hover:bg-green-200',
      iconColor: 'text-green-600'
    },
    {
      key: 'gallery',
      icon: ImageIcon,
      label: 'Galeria',
      color: 'bg-purple-100 hover:bg-purple-200',
      iconColor: 'text-purple-600'
    }
  ], []);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-cv-blue mb-2">Dashboard Administrativo FCBB</h2>
              <p className="text-gray-600">Sistema completo de gestão com sincronização em tempo real</p>
            </div>

            {/* Estatísticas principais otimizadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={`stat-${index}`} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-cv-blue">{stat.value}</div>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Estatísticas de backend em tempo real */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-cv-blue" />
                    Competições Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cv-blue">{competitions.length}</div>
                  <p className="text-sm text-gray-500">Ligas e torneios em curso</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-cv-blue" />
                    Jogos Realizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cv-blue">{computedData.finishedGames}</div>
                  <p className="text-sm text-gray-500">Jogos completados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cv-blue" />
                    Próximos Jogos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cv-blue">{upcomingGames.length}</div>
                  <p className="text-sm text-gray-500">Jogos agendados</p>
                </CardContent>
              </Card>
            </div>

            {/* Atividade recente e acesso rápido otimizado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-cv-blue" />
                    Últimos Resultados
                  </CardTitle>
                  <CardDescription>
                    Resultados dos jogos mais recentes (tempo real)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentGames.slice(0, 3).map((game: any) => (
                      <div key={game.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Trophy className="h-4 w-4 text-cv-blue" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {teams.find((t: any) => t.id === game.home_team_id)?.name || 'Casa'} {game.home_score} - {game.away_score} {teams.find((t: any) => t.id === game.away_team_id)?.name || 'Visitante'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(game.scheduled_date).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-cv-blue" />
                    Acesso Rápido
                  </CardTitle>
                  <CardDescription>
                    Ações mais utilizadas - resposta instantânea
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action) => (
                      <button 
                        key={action.key}
                        onClick={() => handleTabChange(action.key)}
                        className={`flex flex-col items-center p-4 ${action.color} rounded-lg transition-all duration-200 transform hover:scale-105`}
                      >
                        <action.icon className={`h-6 w-6 ${action.iconColor} mb-2`} />
                        <span className="text-sm font-medium text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'data':
        return <DataManagement />;
      case 'live':
        return <LiveScoring />;
      case 'games':
        return <GamesManagement />;
      case 'results':
        return <ResultsManagement />;
      case 'integrations':
        return <IntegrationsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      default:
        return (
          <div className="text-center py-8">
            <Database className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600">Selecione uma opção no menu lateral</p>
          </div>
        );
    }
  }, [activeTab, stats, competitions.length, computedData, upcomingGames.length, recentGames, teams, quickActions, handleTabChange]);

  // Show loading only for critical data
  if (backendLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Carregando dados em tempo real...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar otimizada com logo menor */}
      <div className="w-64 bg-cv-blue text-white p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png" 
            alt="FCBB Logo" 
            className="w-6 h-6 mr-3 object-contain"
          />
          <h2 className="text-lg font-bold">Admin FCBB</h2>
        </div>
        <nav className="space-y-1">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'data', icon: Database, label: 'Gestão de Dados' },
            { id: 'live', icon: Play, label: 'Pontuação ao Vivo' },
            { id: 'games', icon: Trophy, label: 'Gestão de Jogos' },
            { id: 'results', icon: FileText, label: 'Gestão de Resultados' },
            { id: 'gallery', icon: ImageIcon, label: 'Gestão de Galeria' },
            { id: 'integrations', icon: Star, label: 'Integrações' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                activeTab === item.id ? 'bg-blue-600 shadow-lg' : ''
              }`}
            >
              <item.icon className="inline w-4 h-4 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content otimizado */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
