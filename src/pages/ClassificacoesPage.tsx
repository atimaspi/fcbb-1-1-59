
import React, { useState } from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Users, Calendar, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Standing {
  id: string;
  position: number;
  team_id: string;
  championship_id: string;
  played: number;
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  points: number;
}

const ClassificacoesPage = () => {
  const [selectedChampionship, setSelectedChampionship] = useState('all');

  // Fetch championships
  const { data: championships = [] } = useQuery({
    queryKey: ['championships-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  // Fetch standings
  const { data: standings = [], isLoading } = useQuery({
    queryKey: ['standings', selectedChampionship],
    queryFn: async (): Promise<Standing[]> => {
      let query = supabase
        .from('standings')
        .select('*')
        .order('position', { ascending: true });

      if (selectedChampionship !== 'all') {
        query = query.eq('championship_id', selectedChampionship);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <PageLayout title="Classificações" description="Classificações dos campeonatos">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Classificações"
      description="Consulte as classificações de todas as competições de basquetebol"
    >
      <div className="py-8">
        <div className="cv-container">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Classificações</h1>
            <p className="text-xl text-gray-600">
              Consulte as classificações atualizadas de todas as competições
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Filtros:</span>
                </div>
                
                <Select value={selectedChampionship} onValueChange={setSelectedChampionship}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Selecionar Competição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Competições</SelectItem>
                    {championships.map((championship) => (
                      <SelectItem key={championship.id} value={championship.id}>
                        {championship.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-cv-blue">{championships.length}</div>
                <div className="text-sm text-gray-600">Competições Ativas</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{standings.length}</div>
                <div className="text-sm text-gray-600">Equipas Classificadas</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">2024/25</div>
                <div className="text-sm text-gray-600">Época Atual</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-cv-red rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="text-2xl font-bold text-cv-red">Ao Vivo</div>
                <div className="text-sm text-gray-600">Estado</div>
              </CardContent>
            </Card>
          </div>

          {/* Classifications */}
          {standings.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Nenhuma classificação disponível
              </h3>
              <p className="text-gray-400 mb-4">
                As classificações serão exibidas aqui quando os jogos começarem
              </p>
              <p className="text-sm text-gray-500">
                Todas as classificações são geridas através do{' '}
                <span className="font-semibold text-cv-blue">Painel Administrativo FCBB</span>
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {championships
                .filter(champ => selectedChampionship === 'all' || champ.id === selectedChampionship)
                .map((championship) => {
                  const champStandings = standings.filter(s => s.championship_id === championship.id);
                  
                  if (champStandings.length === 0) return null;

                  return (
                    <Card key={championship.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-cv-blue" />
                          {championship.name}
                          <Badge variant="outline" className="ml-2">
                            {championship.season}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-3 px-2">Pos</th>
                                <th className="text-left py-3 px-2">Equipa</th>
                                <th className="text-center py-3 px-2">J</th>
                                <th className="text-center py-3 px-2">V</th>
                                <th className="text-center py-3 px-2">D</th>
                                <th className="text-center py-3 px-2">PM</th>
                                <th className="text-center py-3 px-2">PS</th>
                                <th className="text-center py-3 px-2">±</th>
                                <th className="text-center py-3 px-2">Pts</th>
                              </tr>
                            </thead>
                            <tbody>
                              {champStandings.map((standing) => (
                                <tr 
                                  key={standing.id} 
                                  className={`border-b hover:bg-gray-50 ${
                                    standing.position <= 2 ? 'bg-green-50' : 
                                    standing.position > 6 ? 'bg-red-50' : ''
                                  }`}
                                >
                                  <td className="py-3 px-2 font-bold text-cv-blue">{standing.position}</td>
                                  <td className="py-3 px-2 font-semibold">Equipa {standing.team_id.slice(0, 8)}</td>
                                  <td className="py-3 px-2 text-center">{standing.played}</td>
                                  <td className="py-3 px-2 text-center text-green-600 font-medium">{standing.wins}</td>
                                  <td className="py-3 px-2 text-center text-red-600 font-medium">{standing.losses}</td>
                                  <td className="py-3 px-2 text-center">{standing.points_for}</td>
                                  <td className="py-3 px-2 text-center">{standing.points_against}</td>
                                  <td className={`py-3 px-2 text-center font-semibold ${
                                    (standing.points_for - standing.points_against) > 0 ? 'text-green-600' : 
                                    (standing.points_for - standing.points_against) < 0 ? 'text-red-600' : 'text-gray-600'
                                  }`}>
                                    {standing.points_for - standing.points_against > 0 ? '+' : ''}
                                    {standing.points_for - standing.points_against}
                                  </td>
                                  <td className="py-3 px-2 text-center font-bold text-cv-blue">{standing.points}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}

          {/* Legend */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Legenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-200"></div>
                  <span>Posições 1-2: Qualificação Direta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-200"></div>
                  <span>Posições 3-6: Zona Segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-200"></div>
                  <span>Posições 7+: Zona de Risco</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ClassificacoesPage;
