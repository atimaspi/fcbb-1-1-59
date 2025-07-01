
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useContentWorkflow } from '@/hooks/useContentWorkflow';
import { 
  Calendar,
  Clock,
  Eye,
  FileText,
  Globe,
  Image,
  MessageSquare,
  Play,
  Trophy,
  Users,
  Award,
  GraduationCap,
  FileImage,
  Tv,
  BookOpen,
  BarChart3,
  Handshake,
  Building
} from 'lucide-react';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('news');
  
  const contentTypes = [
    { id: 'news', label: 'Notícias', icon: FileText, table: 'news' },
    { id: 'championships', label: 'Competições', icon: Trophy, table: 'championships' },
    { id: 'clubs', label: 'Clubes', icon: Users, table: 'clubs' },
    { id: 'games', label: 'Jogos', icon: Calendar, table: 'games' },
    { id: 'national_teams', label: 'Seleções', icon: Award, table: 'national_teams' },
    { id: 'referees', label: 'Arbitragem', icon: Eye, table: 'referees' },
    { id: 'training_programs', label: 'Formação', icon: GraduationCap, table: 'training_programs' },
    { id: 'gallery', label: 'Galeria', icon: FileImage, table: 'gallery' },
    { id: 'broadcasts', label: 'Transmissões', icon: Tv, table: 'broadcasts' },
    { id: 'documents', label: 'Documentos', icon: BookOpen, table: 'documents' },
    { id: 'partners', label: 'Parceiros', icon: Handshake, table: 'partners' },
    { id: 'federation_members', label: 'Direção', icon: Building, table: 'federation_members' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-500';
      case 'em_analise': return 'bg-yellow-500';
      case 'publicado': return 'bg-green-500';
      case 'rejeitado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'rascunho': return 'Rascunho';
      case 'em_analise': return 'Em Análise';
      case 'publicado': return 'Publicado';
      case 'rejeitado': return 'Rejeitado';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cv-blue mb-2">Sistema de Gestão de Conteúdo</h1>
        <p className="text-gray-600">Gerencie todos os conteúdos da FCBB de forma centralizada</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <TabsTrigger 
                key={type.id} 
                value={type.id}
                className="flex items-center gap-1 text-xs"
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{type.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {contentTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="space-y-6">
            <ContentTypeManager 
              contentType={type.table}
              title={type.label}
              icon={type.icon}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface ContentTypeManagerProps {
  contentType: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ContentTypeManager: React.FC<ContentTypeManagerProps> = ({ 
  contentType, 
  title, 
  icon: Icon 
}) => {
  const {
    items,
    loading,
    userRole,
    submitForReview,
    approveContent,
    rejectContent,
    schedulePublication
  } = useContentWorkflow(contentType);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-500';
      case 'em_analise': return 'bg-yellow-500';
      case 'publicado': return 'bg-green-500';
      case 'rejeitado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'rascunho': return 'Rascunho';
      case 'em_analise': return 'Em Análise';
      case 'publicado': return 'Publicado';
      case 'rejeitado': return 'Rejeitado';
      default: return 'Desconhecido';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-cv-blue" />
            Gestão de {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-cv-blue">
                {items.filter(item => item.status === 'rascunho').length}
              </div>
              <div className="text-sm text-gray-600">Rascunhos</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {items.filter(item => item.status === 'em_analise').length}
              </div>
              <div className="text-sm text-gray-600">Em Análise</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {items.filter(item => item.status === 'publicado').length}
              </div>
              <div className="text-sm text-gray-600">Publicados</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {items.filter(item => item.status === 'rejeitado').length}
              </div>
              <div className="text-sm text-gray-600">Rejeitados</div>
            </div>
          </div>

          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum item encontrado
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{item.title}</h3>
                      <Badge className={`${getStatusColor(item.status)} text-white`}>
                        {getStatusLabel(item.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Criado em {new Date(item.created_at).toLocaleDateString('pt-PT')}
                      {item.scheduled_publish_at && (
                        <span className="ml-2">
                          • Agendado para {new Date(item.scheduled_publish_at).toLocaleDateString('pt-PT')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'rascunho' && userRole === 'redator' && (
                      <Button
                        size="sm"
                        onClick={() => submitForReview(item.id)}
                        className="bg-cv-blue hover:bg-blue-700"
                      >
                        Enviar para Revisão
                      </Button>
                    )}

                    {item.status === 'em_analise' && (userRole === 'revisor' || userRole === 'admin') && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => approveContent(item.id)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => rejectContent(item.id, 'Revisão necessária')}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Rejeitar
                        </Button>
                      </>
                    )}

                    {(userRole === 'admin' || userRole === 'revisor') && (
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" />
                        Agendar
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;
