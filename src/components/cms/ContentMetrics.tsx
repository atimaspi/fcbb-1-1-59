
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Eye, Share2, Heart, MessageCircle, TrendingUp } from 'lucide-react';

interface Metrics {
  content_type: string;
  content_id: string;
  views: number;
  shares: number;
  likes: number;
  comments: number;
  title?: string;
}

const ContentMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMetrics, setTotalMetrics] = useState({
    total_views: 0,
    total_shares: 0,
    total_likes: 0,
    total_comments: 0
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('content_metrics')
        .select('*')
        .order('views', { ascending: false })
        .limit(20);

      if (error) throw error;

      setMetrics(data || []);

      // Calculate totals
      const totals = (data || []).reduce(
        (acc, item) => ({
          total_views: acc.total_views + item.views,
          total_shares: acc.total_shares + item.shares,
          total_likes: acc.total_likes + item.likes,
          total_comments: acc.total_comments + item.comments
        }),
        { total_views: 0, total_shares: 0, total_likes: 0, total_comments: 0 }
      );

      setTotalMetrics(totals);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const metricsCards = [
    {
      title: 'Total de Visualizações',
      value: totalMetrics.total_views,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total de Partilhas',
      value: totalMetrics.total_shares,
      icon: Share2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total de Gostos',
      value: totalMetrics.total_likes,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total de Comentários',
      value: totalMetrics.total_comments,
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Métricas de Desempenho</h2>
        <p className="text-gray-600">Acompanhe o desempenho do seu conteúdo</p>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${metric.bgColor} rounded-lg mb-4`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráfico de Visualizações por Conteúdo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cv-blue" />
            Top 10 Conteúdos por Visualizações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="content_type" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, name === 'views' ? 'Visualizações' : name]}
                labelFormatter={(label) => `Tipo: ${label}`}
              />
              <Bar dataKey="views" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Métricas Detalhadas */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho Detalhado por Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map((item, index) => (
              <div key={`${item.content_type}-${item.content_id}`} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">
                    {item.content_type} #{index + 1}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {item.content_id}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4 text-green-600" />
                    <span>{item.shares}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span>{item.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentMetrics;
