
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const ClassificacoesPage = () => {
  const standings = [
    { position: 1, team: 'CD Travadores', games: 12, wins: 11, losses: 1, points: 23, trend: 'up' },
    { position: 2, team: 'Sporting CV', games: 12, wins: 10, losses: 2, points: 22, trend: 'up' },
    { position: 3, team: 'Académica Mindelo', games: 12, wins: 9, losses: 3, points: 21, trend: 'stable' },
    { position: 4, team: 'ABC Basket', games: 12, wins: 8, losses: 4, points: 20, trend: 'up' },
    { position: 5, team: 'Five Stars', games: 12, wins: 6, losses: 6, points: 18, trend: 'down' },
    { position: 6, team: 'Sal Rei BC', games: 12, wins: 5, losses: 7, points: 17, trend: 'down' },
    { position: 7, team: 'Barreirense', games: 12, wins: 4, losses: 8, points: 16, trend: 'stable' },
    { position: 8, team: 'Unitec Assomada', games: 12, wins: 2, losses: 10, points: 14, trend: 'down' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  return (
    <PageLayout 
      title="Classificações"
      description="Consulte as classificações de todas as competições"
    >
      <div className="space-y-8">
        {/* Competition Selector */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Badge className="bg-cv-blue text-white px-4 py-2 text-base">
            Liga Nacional Masculina
          </Badge>
          <Badge variant="outline" className="border-cv-blue text-cv-blue px-4 py-2 text-base cursor-pointer hover:bg-cv-blue hover:text-white">
            Liga Nacional Feminina
          </Badge>
          <Badge variant="outline" className="border-cv-blue text-cv-blue px-4 py-2 text-base cursor-pointer hover:bg-cv-blue hover:text-white">
            Competições Regionais
          </Badge>
        </div>

        {/* Current Standings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-cv-blue" />
              Liga Nacional Masculina 2024/25
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
                    <th className="text-center py-3 px-2">Pts</th>
                    <th className="text-center py-3 px-2">Tend.</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team) => (
                    <tr 
                      key={team.position} 
                      className={`border-b hover:bg-gray-50 ${
                        team.position <= 4 ? 'bg-green-50' : 
                        team.position > 6 ? 'bg-red-50' : ''
                      }`}
                    >
                      <td className="py-3 px-2 font-bold text-cv-blue">{team.position}</td>
                      <td className="py-3 px-2 font-semibold">{team.team}</td>
                      <td className="py-3 px-2 text-center">{team.games}</td>
                      <td className="py-3 px-2 text-center text-green-600 font-medium">{team.wins}</td>
                      <td className="py-3 px-2 text-center text-red-600 font-medium">{team.losses}</td>
                      <td className="py-3 px-2 text-center font-bold text-cv-blue">{team.points}</td>
                      <td className="py-3 px-2 text-center">{getTrendIcon(team.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Legenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200"></div>
                <span>Posições 1-4: Acesso aos Playoffs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border border-gray-200"></div>
                <span>Posições 5-6: Zona Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200"></div>
                <span>Posições 7-8: Zona de Descida</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ClassificacoesPage;
