
import React, { useState } from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Trophy, Calendar, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface GameResult {
  id: string;
  home_team_score: number;
  away_team_score: number;
  game_status: string;
  start_time: string;
  end_time: string;
  game?: {
    id: string;
    scheduled_date: string;
    venue: string;
    home_team_id: string;
    away_team_id: string;
  };
}

const ResultsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch game results
  const { data: results = [], isLoading } = useQuery({
    queryKey: ['game-results-public'],
    queryFn: async (): Promise<GameResult[]> => {
      const { data, error } = await supabase
        .from('game_results')
        .select(`
          *,
          game:games(*)
        `)
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  // Calculate statistics
  const stats = {
    totalGames: results.length,
    completedGames: results.filter(r => r.game_status === 'completed').length,
    liveGames: results.filter(r => r.game_status === 'in-progress').length,
    scheduledGames: results.filter(r => r.game_status === 'scheduled').length
  };

  // Filter results
  const filteredResults = results.filter(result => {
    const matchesStatus = filterStatus === 'all' || result.game_status === filterStatus;
    return matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-red-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Finalizado';
      case 'in-progress': return 'Ao Vivo';
      case 'scheduled': return 'Agendado';
      default: return 'Desconhecido';
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Resultados" description="Resultados dos jogos de basquetebol">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Resultados" 
      description="Consulte todos os resultados dos jogos de basquetebol"
    >
      <div className="py-8">
        <div className="cv-container">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resultados</h1>
            <p className="text-xl text-gray-600">
              Consulte todos os resultados dos jogos de basquetebol
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Resultados ao Vivo
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Ver Calendário
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-cv-blue">{stats.totalGames}</div>
                <div className="text-sm text-gray-600">Jogos Esta Semana</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{stats.completedGames}</div>
                <div className="text-sm text-gray-600">Jogos Esta Época</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.liveGames}</div>
                <div className="text-sm text-gray-600">Jogos ao Vivo</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{stats.scheduledGames}</div>
                <div className="text-sm text-gray-600">Próximos Jogos</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Filtros:</span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Estados</SelectItem>
                      <SelectItem value="completed">Finalizados</SelectItem>
                      <SelectItem value="in-progress">Ao Vivo</SelectItem>
                      <SelectItem value="scheduled">Agendados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Badge variant="outline" className="px-3 py-1">
                  {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                {results.length === 0 ? 'Nenhum resultado disponível' : 'Nenhum resultado encontrado'}
              </h3>
              <p className="text-gray-400">
                {results.length === 0 
                  ? 'Os resultados dos jogos serão exibidos aqui quando estiverem disponíveis'
                  : 'Tente ajustar os filtros para encontrar resultados'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge className={`${getStatusColor(result.game_status)} text-white`}>
                          {getStatusLabel(result.game_status)}
                        </Badge>
                        <div className="text-sm text-gray-500">
                          {result.game?.scheduled_date 
                            ? new Date(result.game.scheduled_date).toLocaleDateString('pt-PT')
                            : 'Data não disponível'
                          }
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.game?.venue || 'Local não disponível'}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                      <div className="text-center">
                        <div className="text-lg font-medium mb-2">
                          Equipa Casa vs Equipa Visitante
                        </div>
                        <div className="text-4xl font-bold text-cv-blue">
                          {result.home_team_score} - {result.away_team_score}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ResultsPage;
