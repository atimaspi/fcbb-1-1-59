import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Calendar,
  FileText,
  Image,
  Users,
  Trophy
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalNews: number;
  totalGalleries: number;
  totalPlayers: number;
  totalClubs: number;
  totalReferees: number;
  totalCompetitions: number;
  publishedNews: number;
  publishedGalleries: number;
  recentActivity: Array<{
    type: string;
    title: string;
    date: string;
    status: string;
  }>;
}

const ContentAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalNews: 0,
    totalGalleries: 0,
    totalPlayers: 0,
    totalClubs: 0,
    totalReferees: 0,
    totalCompetitions: 0,
    publishedNews: 0,
    publishedGalleries: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Contar notícias
      const { count: newsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });

      const { count: publishedNewsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

      // Contar galerias
      const { count: galleriesCount } = await supabase
        .from('gallery')
        .select('*', { count: 'exact', head: true });

      const { count: publishedGalleriesCount } = await supabase
        .from('gallery')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');

      // Contar jogadores
      const { count: playersCount } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true });

      // Contar clubes
      const { count: clubsCount } = await supabase
        .from('clubs')
        .select('*', { count: 'exact', head: true });

      // Contar árbitros
      const { count: refereesCount } = await supabase
        .from('referees')
        .select('*', { count: 'exact', head: true });

      // Contar competições
      const { count: competitionsCount } = await supabase
        .from('championships')
        .select('*', { count: 'exact', head: true });

      // Atividade recente
      const { data: recentNews } = await supabase
        .from('news')
        .select('title, created_at, published')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: recentGalleries } = await supabase
        .from('gallery')
        .select('title, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5);

      const recentActivity = [
        ...(recentNews || []).map(item => ({
          type: 'Notícia',
          title: item.title,
          date: item.created_at,
          status: item.published ? 'Publicado' : 'Rascunho'
        })),
        ...(recentGalleries || []).map(item => ({
          type: 'Galeria',
          title: item.title,
          date: item.created_at,
          status: item.status === 'published' ? 'Publicado' : 'Rascunho'
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

      setAnalytics({
        totalNews: newsCount || 0,
        totalGalleries: galleriesCount || 0,
        totalPlayers: playersCount || 0,
        totalClubs: clubsCount || 0,
        totalReferees: refereesCount || 0,
        totalCompetitions: competitionsCount || 0,
        publishedNews: publishedNewsCount || 0,
        publishedGalleries: publishedGalleriesCount || 0,
        recentActivity
      });
    } catch (error: any) {
      console.error('Erro ao carregar analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Notícia':
        return <FileText size={16} className="text-blue-500" />;
      case 'Galeria':
        return <Image size={16} className="text-green-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cv-blue mx-auto mb-4"></div>
          <p>Carregando análises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Análises de Conteúdo</h2>
        <Badge variant="outline" className="text-sm">
          Atualizado em tempo real
        </Badge>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{analytics.totalNews}</div>
                <div className="text-sm text-gray-600">Notícias</div>
                <div className="text-xs text-green-600">
                  {analytics.publishedNews} publicadas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Image className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{analytics.totalGalleries}</div>
                <div className="text-sm text-gray-600">Galerias</div>
                <div className="text-xs text-green-600">
                  {analytics.publishedGalleries} publicadas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{analytics.totalPlayers}</div>
                <div className="text-sm text-gray-600">Jogadores</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{analytics.totalCompetitions}</div>
                <div className="text-sm text-gray-600">Competições</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Detalhadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estatísticas por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Users size={16} />
                  Clubes
                </span>
                <Badge variant="outline">{analytics.totalClubs}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Eye size={16} />
                  Árbitros
                </span>
                <Badge variant="outline">{analytics.totalReferees}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  Taxa de Publicação (Notícias)
                </span>
                <Badge className="bg-green-500">
                  {analytics.totalNews > 0 
                    ? Math.round((analytics.publishedNews / analytics.totalNews) * 100)
                    : 0}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  Taxa de Publicação (Galerias)
                </span>
                <Badge className="bg-blue-500">
                  {analytics.totalGalleries > 0 
                    ? Math.round((analytics.publishedGalleries / analytics.totalGalleries) * 100)
                    : 0}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas atualizações de conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.recentActivity.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Nenhuma atividade recente
                </div>
              ) : (
                analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border-l-2 border-gray-200">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="font-medium truncate">{activity.title}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span>{activity.type}</span>
                        <Badge 
                          variant={activity.status === 'Publicado' ? 'default' : 'secondary'}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString('pt-PT')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentAnalytics;
