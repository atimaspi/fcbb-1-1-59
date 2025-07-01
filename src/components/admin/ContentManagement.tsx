import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  Users, 
  Trophy, 
  Image, 
  Video,
  Settings,
  BarChart3,
  UserCheck,
  Building
} from 'lucide-react';

import NewsContentManager from './content/NewsContentManager';
import EventsContentManager from './content/EventsContentManager';
import PlayersContentManager from './content/PlayersContentManager';
import ClubsContentManager from './content/ClubsContentManager';
import RefereesContentManager from './content/RefereesContentManager';
import CompetitionsContentManager from './content/CompetitionsContentManager';
import MediaContentManager from './content/MediaContentManager';
import ContentPublisher from './content/ContentPublisher';
import ContentAnalytics from './content/ContentAnalytics';
import SidebarContentManager from './content/SidebarContentManager';

const ContentManagement = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Conteúdo</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Sistema Administrativo</Badge>
        </div>
      </div>
      
      <Tabs defaultValue="news" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-10">
          <TabsTrigger value="news" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Notícias</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Eventos</span>
          </TabsTrigger>
          <TabsTrigger value="players" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Jogadores</span>
          </TabsTrigger>
          <TabsTrigger value="clubs" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Clubes</span>
          </TabsTrigger>
          <TabsTrigger value="referees" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Árbitros</span>
          </TabsTrigger>
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Competições</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Multimédia</span>
          </TabsTrigger>
          <TabsTrigger value="publisher" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Publicador</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Análises</span>
          </TabsTrigger>
          <TabsTrigger value="sidebar" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Sidebar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Notícias</CardTitle>
              <CardDescription>
                Criar, editar e publicar notícias do site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Eventos</CardTitle>
              <CardDescription>
                Criar e gerir eventos e atividades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventsContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Jogadores</CardTitle>
              <CardDescription>
                Gerir jogadores e atletas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlayersContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clubs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Clubes</CardTitle>
              <CardDescription>
                Gerir clubes e equipas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClubsContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Árbitros</CardTitle>
              <CardDescription>
                Gerir árbitros e oficiais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RefereesContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Competições</CardTitle>
              <CardDescription>
                Gerir campeonatos e competições
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompetitionsContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Multimédia</CardTitle>
              <CardDescription>
                Gerir imagens, vídeos e documentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaContentManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publisher" className="space-y-4">
          <ContentPublisher />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <ContentAnalytics />
        </TabsContent>

        <TabsContent value="sidebar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Menu Sidebar</CardTitle>
              <CardDescription>
                Configure o menu da sidebar administrativa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SidebarContentManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
