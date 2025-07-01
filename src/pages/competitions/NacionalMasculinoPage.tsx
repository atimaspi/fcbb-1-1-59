
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Calendar, Users, TrendingUp, Download, Play, MapPin } from 'lucide-react';

const NacionalMasculinoPage = () => {
  const classificacao = [
    { pos: 1, team: 'ABC Basquete', games: 22, wins: 19, losses: 3, points: 41, form: ['W', 'W', 'W', 'L', 'W'] },
    { pos: 2, team: 'CD Travadores', games: 22, wins: 18, losses: 4, points: 40, form: ['W', 'W', 'L', 'W', 'W'] },
    { pos: 3, team: 'Sporting CP', games: 22, wins: 17, losses: 5, points: 39, form: ['W', 'L', 'W', 'W', 'W'] },
    { pos: 4, team: 'FC Porto CV', games: 22, wins: 15, losses: 7, points: 37, form: ['L', 'W', 'W', 'W', 'L'] },
    { pos: 5, team: 'Benfica CV', games: 22, wins: 13, losses: 9, points: 35, form: ['W', 'W', 'L', 'L', 'W'] },
    { pos: 6, team: 'Académica', games: 22, wins: 11, losses: 11, points: 33, form: ['L', 'W', 'L', 'W', 'L'] },
    { pos: 7, team: 'Vitória SC', games: 22, wins: 9, losses: 13, points: 31, form: ['L', 'L', 'W', 'L', 'W'] },
    { pos: 8, team: 'Boavista FC', games: 22, wins: 6, losses: 16, points: 28, form: ['L', 'L', 'L', 'W', 'L'] }
  ];

  const proximosJogos = [
    {
      data: "25/06/2024",
      hora: "19:00", 
      casa: "ABC Basquete",
      fora: "Sporting CP",
      jornada: "Jornada 23",
      local: "Pavilhão Nacional",
      livestream: true
    },
    {
      data: "26/06/2024",
      hora: "17:00",
      casa: "CD Travadores", 
      fora: "FC Porto CV",
      jornada: "Jornada 23",
      local: "Pavilhão Vavá Duarte",
      livestream: false
    },
    {
      data: "27/06/2024",
      hora: "20:00",
      casa: "Benfica CV", 
      fora: "Académica",
      jornada: "Jornada 23",
      local: "Pavilhão Achadinha",
      livestream: true
    }
  ];

  const ultimosResultados = [
    { 
      data: "20/06/2024", 
      casa: "ABC Basquete", 
      fora: "Vitória SC", 
      resultado: "89-76",
      jornada: "Jornada 22"
    },
    { 
      data: "20/06/2024", 
      casa: "CD Travadores", 
      fora: "Boavista FC", 
      resultado: "94-68",
      jornada: "Jornada 22"
    },
    { 
      data: "19/06/2024", 
      casa: "Sporting CP", 
      fora: "Académica", 
      resultado: "82-79",
      jornada: "Jornada 22"
    }
  ];

  const topScorers = [
    { player: "João Silva", team: "ABC Basquete", ppg: 24.5, games: 19 },
    { player: "Carlos Santos", team: "CD Travadores", ppg: 22.8, games: 18 },
    { player: "Miguel Tavares", team: "Sporting CP", ppg: 20.3, games: 20 },
    { player: "António Pereira", team: "FC Porto CV", ppg: 19.7, games: 17 }
  ];

  const estatisticas = {
    totalJogos: 176,
    golosMedia: 156.8,
    espectadores: 45000,
    equipas: 8
  };

  return (
    <PageLayout title="Liga Nacional Masculina">
      <div className="space-y-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue">{estatisticas.totalJogos}</div>
              <p className="text-gray-600">Jogos Realizados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue">{estatisticas.golosMedia}</div>
              <p className="text-gray-600">Pontos/Jogo (Média)</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue">{estatisticas.espectadores.toLocaleString()}</div>
              <p className="text-gray-600">Espectadores Total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue">{estatisticas.equipas}</div>
              <p className="text-gray-600">Equipas Participantes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="classificacao" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="classificacao">Classificação</TabsTrigger>
            <TabsTrigger value="proximos">Próximos Jogos</TabsTrigger>
            <TabsTrigger value="resultados">Resultados</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classificacao" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-cv-blue">Classificação Liga Nacional Masculina 2024/25</CardTitle>
                  <Badge variant="outline">Jornada 22/30</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Tabela Classificativa
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendário Completo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Pos</TableHead>
                      <TableHead>Equipa</TableHead>
                      <TableHead className="text-center">J</TableHead>
                      <TableHead className="text-center">V</TableHead>
                      <TableHead className="text-center">D</TableHead>
                      <TableHead className="text-center">Pts</TableHead>
                      <TableHead className="text-center">Forma</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classificacao.map((team) => (
                      <TableRow key={team.pos}>
                        <TableCell className="font-medium">
                          {team.pos <= 4 && <Badge className="bg-green-500 text-white mr-2">PO</Badge>}
                          {team.pos}
                        </TableCell>
                        <TableCell className="font-medium">{team.team}</TableCell>
                        <TableCell className="text-center">{team.games}</TableCell>
                        <TableCell className="text-center">{team.wins}</TableCell>
                        <TableCell className="text-center">{team.losses}</TableCell>
                        <TableCell className="text-center font-bold">{team.points}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-1">
                            {team.form.map((result, index) => (
                              <div 
                                key={index}
                                className={`w-6 h-6 text-xs flex items-center justify-center rounded text-white ${
                                  result === 'W' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-xs text-gray-600">
                  <Badge className="bg-green-500 text-white mr-2">PO</Badge> Qualificados para Playoffs
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="proximos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proximosJogos.map((jogo, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Badge className="mb-4">{jogo.jornada}</Badge>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-right flex-1">
                            <p className="font-semibold">{jogo.casa}</p>
                          </div>
                          <div className="mx-4">
                            <div className="text-2xl font-bold text-cv-blue">VS</div>
                            <div className="text-sm text-gray-600">{jogo.hora}</div>
                          </div>
                          <div className="text-left flex-1">
                            <p className="font-semibold">{jogo.fora}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          {jogo.local}
                        </div>
                        <div className="text-sm text-gray-600">
                          📅 {jogo.data}
                        </div>
                      </div>
                      {jogo.livestream && (
                        <Button className="mt-4 bg-red-500 hover:bg-red-600">
                          <Play className="h-4 w-4 mr-2" />
                          Ver em Direto
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resultados" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue">Últimos Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ultimosResultados.map((resultado, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{resultado.jornada}</Badge>
                        <span className="text-sm text-gray-600">{resultado.data}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold mb-2">
                          {resultado.casa} vs {resultado.fora}
                        </div>
                        <div className="text-2xl font-bold text-cv-blue">
                          {resultado.resultado}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="estatisticas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Marcadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topScorers.map((player, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold">{player.player}</p>
                        <p className="text-sm text-gray-600">{player.team}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-cv-blue">{player.ppg}</p>
                        <p className="text-xs text-gray-600">{player.games} jogos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default NacionalMasculinoPage;
