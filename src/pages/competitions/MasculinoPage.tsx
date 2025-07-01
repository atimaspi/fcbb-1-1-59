
import React from 'react';
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, MapPin, Users } from 'lucide-react';

const MasculinoPage = () => {
  const currentStandings = [
    { position: 1, team: 'Sporting Clube da Praia', points: 18, wins: 9, losses: 1 },
    { position: 2, team: 'Académica do Mindelo', points: 16, wins: 8, losses: 2 },
    { position: 3, team: 'Tchadense', points: 14, wins: 7, losses: 3 },
    { position: 4, team: 'Boavista FC', points: 12, wins: 6, losses: 4 },
    { position: 5, team: 'Sal Rei', points: 10, wins: 5, losses: 5 },
  ];

  const recentGames = [
    { 
      date: '2025-01-15', 
      homeTeam: 'Sporting Praia', 
      awayTeam: 'Académica Mindelo', 
      homeScore: 78, 
      awayScore: 72,
      status: 'Finalizado'
    },
    { 
      date: '2025-01-12', 
      homeTeam: 'Tchadense', 
      awayTeam: 'Boavista FC', 
      homeScore: 85, 
      awayScore: 79,
      status: 'Finalizado'
    },
  ];

  const upcomingGames = [
    { 
      date: '2025-01-20', 
      homeTeam: 'Sal Rei', 
      awayTeam: 'Sporting Praia', 
      time: '18:00',
      venue: 'Pavilhão de Sal Rei'
    },
    { 
      date: '2025-01-22', 
      homeTeam: 'Académica Mindelo', 
      awayTeam: 'Tchadense', 
      time: '19:30',
      venue: 'Pavilhão do Mindelo'
    },
  ];

  return (
    <PageLayout 
      title="Campeonato Nacional Masculino"
      description="Acompanhe o Campeonato Nacional de Basquetebol Masculino de Cabo Verde"
    >
      <div className="space-y-8">
        {/* Informações da Competição */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-cv-blue" />
              Campeonato Nacional Masculino 2024/25
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-blue">12</div>
                <div className="text-sm text-gray-600">Equipas Participantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-blue">10</div>
                <div className="text-sm text-gray-600">Jornadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-blue">5</div>
                <div className="text-sm text-gray-600">Jornadas Disputadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classificação */}
        <Card>
          <CardHeader>
            <CardTitle>Classificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Pos</th>
                    <th className="text-left py-2">Equipa</th>
                    <th className="text-center py-2">V</th>
                    <th className="text-center py-2">D</th>
                    <th className="text-center py-2">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStandings.map((team) => (
                    <tr key={team.position} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-semibold">{team.position}</td>
                      <td className="py-3">{team.team}</td>
                      <td className="py-3 text-center">{team.wins}</td>
                      <td className="py-3 text-center">{team.losses}</td>
                      <td className="py-3 text-center font-semibold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Resultados Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGames.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {new Date(game.date).toLocaleDateString('pt-PT')}
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {game.status}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">
                      {game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximos Jogos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximos Jogos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingGames.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      {new Date(game.date).toLocaleDateString('pt-PT')}
                    </div>
                    <div className="text-sm text-gray-600">{game.time}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">
                      {game.homeTeam} vs {game.awayTeam}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {game.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MasculinoPage;
