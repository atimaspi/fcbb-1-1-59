
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Calendar, Target, Star, TrendingUp, Download } from 'lucide-react';

const LigaNacionalDetalhesPage = () => {
  const currentStandings = [
    { pos: 1, team: "Sporting CV", games: 18, wins: 16, losses: 2, points: 32, streak: "V5" },
    { pos: 2, team: "CD Travadores", games: 18, wins: 14, losses: 4, points: 28, streak: "V3" },
    { pos: 3, team: "Académica", games: 18, wins: 13, losses: 5, points: 26, streak: "D1" },
    { pos: 4, team: "Mindelense", games: 18, wins: 12, losses: 6, points: 24, streak: "V2" },
    { pos: 5, team: "ABC Basket", games: 18, wins: 10, losses: 8, points: 20, streak: "V1" },
    { pos: 6, team: "Boavista", games: 18, wins: 9, losses: 9, points: 18, streak: "D2" },
    { pos: 7, team: "São Vicente", games: 18, wins: 7, losses: 11, points: 14, streak: "D1" },
    { pos: 8, team: "Sal Basket", games: 18, wins: 6, losses: 12, points: 12, streak: "D3" }
  ];

  const topScorers = [
    { name: "João Silva", team: "Sporting CV", points: 22.5, games: 18 },
    { name: "Carlos Mendes", team: "CD Travadores", points: 21.3, games: 18 },
    { name: "Pedro Lima", team: "Académica", points: 19.8, games: 17 },
    { name: "António Costa", team: "Mindelense", points: 18.9, games: 18 },
    { name: "Miguel Santos", team: "ABC Basket", points: 17.4, games: 16 }
  ];

  const upcomingGames = [
    { date: "2025-01-15", time: "19:00", home: "Sporting CV", away: "Académica", venue: "Pavilhão Adega", tv: "TCV" },
    { date: "2025-01-17", time: "18:00", home: "CD Travadores", away: "Mindelense", venue: "Pavilhão Vavá Duarte", tv: "RTC" },
    { date: "2025-01-19", time: "16:00", home: "ABC Basket", away: "Boavista", venue: "Pavilhão da Várzea", tv: "TCV" },
    { date: "2025-01-22", time: "20:00", home: "São Vicente", away: "Sal Basket", venue: "Pavilhão Norte", tv: "RTC" }
  ];

  const awards = [
    { season: "2023/24", champion: "Sporting CV", topScorer: "João Silva (24.2 ppg)", mvp: "João Silva" },
    { season: "2022/23", champion: "CD Travadores", topScorer: "Carlos Mendes (23.8 ppg)", mvp: "Carlos Mendes" },
    { season: "2021/22", champion: "Académica", topScorer: "Pedro Lima (22.1 ppg)", mvp: "Pedro Lima" }
  ];

  return (
    <PageLayout 
      title="Liga Nacional de Basquetebol"
      description="Acompanhe a Liga Nacional de Basquetebol de Cabo Verde - classificações, estatísticas e calendário"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-cv-blue to-cv-red text-white rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Liga Nacional 2024/2025</h1>
              <p className="text-lg opacity-90">A principal competição do basquetebol cabo-verdiano</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-80">Equipas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm opacity-80">Jornadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">216</div>
                <div className="text-sm opacity-80">Jogos</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="standings" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="standings">Classificação</TabsTrigger>
            <TabsTrigger value="fixtures">Calendário</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="awards">Palmarés</TabsTrigger>
            <TabsTrigger value="rules">Regulamento</TabsTrigger>
          </TabsList>

          <TabsContent value="standings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                  Classificação Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Pos</th>
                        <th className="text-left py-2">Equipa</th>
                        <th className="text-center py-2">J</th>
                        <th className="text-center py-2">V</th>
                        <th className="text-center py-2">D</th>
                        <th className="text-center py-2">Pts</th>
                        <th className="text-center py-2">Forma</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStandings.map((team, index) => (
                        <tr key={index} className={`border-b hover:bg-gray-50 ${
                          team.pos <= 4 ? 'bg-blue-50' : team.pos >= 7 ? 'bg-red-50' : ''
                        }`}>
                          <td className="py-3 font-bold">{team.pos}</td>
                          <td className="py-3 font-medium">{team.team}</td>
                          <td className="py-3 text-center">{team.games}</td>
                          <td className="py-3 text-center text-green-600 font-semibold">{team.wins}</td>
                          <td className="py-3 text-center text-red-600">{team.losses}</td>
                          <td className="py-3 text-center font-bold">{team.points}</td>
                          <td className="py-3 text-center">
                            <Badge variant={team.streak.startsWith('V') ? 'default' : 'destructive'}>
                              {team.streak}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
                    <span>Qualificação para Playoffs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
                    <span>Zona de Despromoção</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fixtures" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
                  Próximos Jogos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingGames.map((game, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-medium text-gray-500">{game.date}</div>
                          <div className="text-sm font-medium text-gray-500">{game.time}</div>
                          {game.tv && (
                            <Badge variant="outline" className="text-xs">{game.tv}</Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          <div className="font-semibold text-lg">
                            {game.home} vs {game.away}
                          </div>
                          <div className="text-sm text-gray-600">{game.venue}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-cv-blue" />
                  Melhores Marcadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topScorers.map((player, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-cv-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-gray-600">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{player.points}</div>
                        <div className="text-xs text-gray-500">PPG ({player.games} jogos)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="awards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                  Palmarés Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg mb-2">Época {award.season}</h4>
                          <div className="space-y-1">
                            <div><strong>Campeão:</strong> {award.champion}</div>
                            <div><strong>Melhor Marcador:</strong> {award.topScorer}</div>
                            <div><strong>MVP:</strong> {award.mvp}</div>
                          </div>
                        </div>
                        <Trophy className="w-8 h-8 text-yellow-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulamento e Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Regulamento da Liga</span>
                    </div>
                    <span className="text-sm text-gray-600">Normas e regulamento oficial da competição</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Calendário Completo</span>
                    </div>
                    <span className="text-sm text-gray-600">Todas as datas e horários dos jogos</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Estatísticas Detalhadas</span>
                    </div>
                    <span className="text-sm text-gray-600">Relatório completo de estatísticas</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="font-semibold">Formulário de Inscrição</span>
                    </div>
                    <span className="text-sm text-gray-600">Para a próxima época (2025/26)</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default LigaNacionalDetalhesPage;
