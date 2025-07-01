
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Target, Users, TrendingUp } from 'lucide-react';

const EstatisticasPage = () => {
  const scoringLeaders = [
    { name: "Carlos Silva", team: "ABC Basquete", points: 24.5, games: 18 },
    { name: "João Santos", team: "Seven Stars", points: 23.2, games: 18 },
    { name: "Pedro Costa", team: "Sporting CP", points: 21.8, games: 17 },
    { name: "Mário Lopes", team: "Académica", points: 20.6, games: 18 },
    { name: "André Silva", team: "CD Travadores", points: 19.8, games: 16 }
  ];

  const assistsLeaders = [
    { name: "Bruno Fernandes", team: "Seven Stars", assists: 8.7, games: 18 },
    { name: "Ricardo Pereira", team: "ABC Basquete", assists: 7.9, games: 18 },
    { name: "Tiago Santos", team: "Inter Clube", assists: 7.5, games: 17 },
    { name: "Hugo Costa", team: "Sporting CP", assists: 7.2, games: 18 },
    { name: "David Lopes", team: "Five Stars", assists: 6.8, games: 16 }
  ];

  const reboundsLeaders = [
    { name: "Paulo Rodrigues", team: "Académica", rebounds: 12.3, games: 18 },
    { name: "Miguel Santos", team: "ABC Basquete", rebounds: 11.8, games: 17 },
    { name: "José Silva", team: "CD Travadores", rebounds: 11.2, games: 18 },
    { name: "António Costa", team: "Boavista FC", rebounds: 10.9, games: 16 },
    { name: "Manuel Pereira", team: "Seven Stars", rebounds: 10.5, games: 18 }
  ];

  const teamStats = [
    { team: "ABC Basquete", ppg: 89.5, apg: 22.1, rpg: 45.2, fgp: 48.2 },
    { team: "Seven Stars", ppg: 88.7, apg: 23.5, rpg: 43.8, fgp: 47.8 },
    { team: "Sporting CP", ppg: 86.3, apg: 21.8, rpg: 44.5, fgp: 46.9 },
    { team: "Académica", ppg: 84.9, apg: 20.9, rpg: 46.1, fgp: 45.8 },
    { team: "CD Travadores", ppg: 83.2, apg: 19.7, rpg: 42.3, fgp: 44.6 }
  ];

  const gameAttendance = [
    { month: "Out", attendance: 3200 },
    { month: "Nov", attendance: 3450 },
    { month: "Dez", attendance: 3800 },
    { month: "Jan", attendance: 4100 },
    { month: "Fev", attendance: 4350 },
    { month: "Mar", attendance: 4200 },
    { month: "Abr", attendance: 4500 },
    { month: "Mai", attendance: 4800 }
  ];

  const positionDistribution = [
    { name: "Bases", value: 35, color: "#3B82F6" },
    { name: "Extremos", value: 40, color: "#10B981" },
    { name: "Alas-Pivot", value: 15, color: "#F59E0B" },
    { name: "Postes", value: 10, color: "#EF4444" }
  ];

  const seasonStatistics = [
    { label: "Média de Pontos por Jogo", value: "165.8", icon: Target },
    { label: "Jogadores Registados", value: "324", icon: Users },
    { label: "Jogos Disputados", value: "156", icon: Trophy },
    { label: "Assistência Média", value: "4,250", icon: TrendingUp }
  ];

  return (
    <PageLayout title="Estatísticas">
      <div className="space-y-8">
        {/* Season Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {seasonStatistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-cv-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-cv-blue mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Statistics Tabs */}
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="individual">Estatísticas Individuais</TabsTrigger>
            <TabsTrigger value="team">Estatísticas de Equipa</TabsTrigger>
            <TabsTrigger value="attendance">Assistências</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Scoring Leaders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Melhor Pontuação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scoringLeaders.map((player, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-sm text-gray-600">{player.team}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-cv-blue">{player.points}</div>
                          <div className="text-xs text-gray-500">{player.games} jogos</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Assists Leaders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Melhores Assistências</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assistsLeaders.map((player, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-sm text-gray-600">{player.team}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{player.assists}</div>
                          <div className="text-xs text-gray-500">{player.games} jogos</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rebounds Leaders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Melhores Ressaltos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reboundsLeaders.map((player, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-sm text-gray-600">{player.team}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-orange-600">{player.rebounds}</div>
                          <div className="text-xs text-gray-500">{player.games} jogos</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas por Equipa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Equipa</th>
                        <th className="text-center p-2">PPJ</th>
                        <th className="text-center p-2">APJ</th>
                        <th className="text-center p-2">RPJ</th>
                        <th className="text-center p-2">FG%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamStats.map((team, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-semibold">{team.team}</td>
                          <td className="p-2 text-center font-bold text-cv-blue">{team.ppg}</td>
                          <td className="p-2 text-center font-bold text-green-600">{team.apg}</td>
                          <td className="p-2 text-center font-bold text-orange-600">{team.rpg}</td>
                          <td className="p-2 text-center font-bold text-purple-600">{team.fgp}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="text-sm font-medium text-blue-700">PPJ</div>
                    <div className="text-xs text-blue-600">Pontos por Jogo</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <div className="text-sm font-medium text-green-700">APJ</div>
                    <div className="text-xs text-green-600">Assistências por Jogo</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded">
                    <div className="text-sm font-medium text-orange-700">RPJ</div>
                    <div className="text-xs text-orange-600">Ressaltos por Jogo</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="text-sm font-medium text-purple-700">FG%</div>
                    <div className="text-xs text-purple-600">% Field Goals</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Assistência aos Jogos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gameAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#1E40AF" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-cv-blue">4,800</div>
                    <div className="text-sm text-gray-600">Maior Assistência</div>
                    <div className="text-xs text-gray-500">Final ABC vs Seven Stars</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-cv-blue">4,056</div>
                    <div className="text-sm text-gray-600">Média da Época</div>
                    <div className="text-xs text-gray-500">+12% vs época anterior</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-cv-blue">85%</div>
                    <div className="text-sm text-gray-600">Taxa de Ocupação</div>
                    <div className="text-xs text-gray-500">Pavilhões nacionais</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Posição</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={positionDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {positionDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {positionDistribution.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dados da Época</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">89.2</div>
                      <div className="text-sm text-blue-700">Média PPJ Liga</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">76.6</div>
                      <div className="text-sm text-green-700">Média Pontos Sofridos</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-2xl font-bold text-orange-600">21.5</div>
                      <div className="text-sm text-orange-700">Assistências Médias</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-2xl font-bold text-purple-600">44.2</div>
                      <div className="text-sm text-purple-700">Ressaltos Médios</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">Recordes da Época</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Maior vitória:</span>
                        <span className="font-semibold">ABC 128-89 União Desportiva</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jogo mais emocionante:</span>
                        <span className="font-semibold">Seven Stars 98-97 Sporting (2 prorrogações)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Melhor performance individual:</span>
                        <span className="font-semibold">Carlos Silva - 45 pontos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default EstatisticasPage;
