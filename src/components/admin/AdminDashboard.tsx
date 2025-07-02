
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Calendar, 
  FileText, 
  Image, 
  Settings,
  BarChart3,
  UserCheck,
  Globe
} from 'lucide-react';
import CompetitionsManager from './CompetitionsManager';
import ClubsManager from './ClubsManager';
import NewsManager from './NewsManager';
import GamesManager from './GamesManager';
import GalleryManager from './GalleryManager';
import DocumentsManager from './DocumentsManager';
import StandingsManager from './StandingsManager';
import FederationMembersManager from './FederationMembersManager';
import StatsManager from './StatsManager';
import { useContentData } from '@/hooks/useContentData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    newsData, 
    eventsData, 
    heroSlidesData, 
    partnersData, 
    statisticsData,
    isContentLoading 
  } = useContentData();

  const dashboardStats = [
    {
      title: 'Notícias Publicadas',
      value: newsData.filter(n => n.status === 'publicado').length.toString(),
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Eventos Agendados',
      value: eventsData.length.toString(),
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Slides Hero Ativos',
      value: heroSlidesData.filter(s => s.active).length.toString(),
      icon: Image,
      color: 'text-purple-600'
    },
    {
      title: 'Estatísticas Ativas',
      value: statisticsData.filter(s => s.active).length.toString(),
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  if (isContentLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue mx-auto mb-4"></div>
          <p>Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo FCBB</h1>
          <p className="text-gray-600">Sistema de gestão completo da Federação</p>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="competitions" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Competições</span>
            </TabsTrigger>
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Clubes</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Jogos</span>
            </TabsTrigger>
            <TabsTrigger value="standings" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Classificações</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Notícias</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Galeria</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documentos</span>
            </TabsTrigger>
            <TabsTrigger value="federation" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Federação</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Estatísticas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Últimas Notícias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {newsData.slice(0, 5).map((news) => (
                        <div key={news.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium truncate">{news.title}</p>
                            <p className="text-sm text-gray-600">{news.category}</p>
                          </div>
                          <Badge variant={news.status === 'publicado' ? 'default' : 'secondary'}>
                            {news.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Eventos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eventsData.slice(0, 5).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium truncate">{event.title}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(event.event_date).toLocaleDateString('pt-PT')}
                            </p>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="competitions">
            <CompetitionsManager />
          </TabsContent>

          <TabsContent value="clubs">
            <ClubsManager />
          </TabsContent>

          <TabsContent value="games">
            <GamesManager />
          </TabsContent>

          <TabsContent value="standings">
            <StandingsManager />
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsManager />
          </TabsContent>

          <TabsContent value="federation">
            <FederationMembersManager />
          </TabsContent>

          <TabsContent value="stats">
            <StatsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
