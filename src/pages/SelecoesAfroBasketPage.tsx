
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Users, Target, Star, Award, Globe } from 'lucide-react';

const SelecoesAfroBasketPage = () => {
  const afroBasketHistory = [
    { year: "2025", location: "Angola", status: "Qualificado", phase: "Fase de Grupos" },
    { year: "2021", location: "Ruanda", result: "9º lugar", phase: "Primeira Fase" },
    { year: "2017", location: "Senegal", result: "11º lugar", phase: "Primeira Fase" },
    { year: "2015", location: "Tunísia", result: "12º lugar", phase: "Primeira Fase" },
    { year: "2013", location: "Costa do Marfim", result: "Não participou", phase: "-" }
  ];

  const qualificationGames = [
    { opponent: "Senegal", result: "78-82", date: "2024-02-15", venue: "Dakar", status: "Derrota" },
    { opponent: "Guiné-Bissau", result: "89-76", date: "2024-02-18", venue: "Praia", status: "Vitória" },
    { opponent: "Mali", result: "71-85", date: "2024-06-12", venue: "Bamako", status: "Derrota" },
    { opponent: "Mauritânia", result: "94-68", date: "2024-06-15", venue: "Praia", status: "Vitória" }
  ];

  const currentRoster = [
    { name: "João Monteiro", position: "Base", club: "Sporting CV", caps: 45 },
    { name: "Carlos Silva", position: "Extremo", club: "CD Travadores", caps: 38 },
    { name: "Pedro Lima", position: "Poste", club: "Académica", caps: 52 },
    { name: "António Santos", position: "Ala", club: "Mindelense", caps: 29 },
    { name: "Miguel Rodrigues", position: "Base", club: "ABC Basket", caps: 15 },
    { name: "Rui Tavares", position: "Ala-Pivot", club: "Boavista", caps: 22 },
    { name: "Nuno Pereira", position: "Extremo", club: "Sporting CV", caps: 33 },
    { name: "Tiago Costa", position: "Poste", club: "Desportivo", caps: 18 }
  ];

  const technicalStaff = {
    headCoach: "José Maria Silva",
    assistantCoach: "Pedro Santos",
    physicalTrainer: "Ana Tavares",
    teamManager: "Carlos Mendes",
    doctor: "Dr. Maria Silva"
  };

  return (
    <PageLayout 
      title="Seleções AfroBasket"
      description="Acompanhe a participação de Cabo Verde no AfroBasket - o principal torneio continental de basquetebol"
    >
      <div className="space-y-8">
        {/* Header com Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-cv-blue text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-sm opacity-90">Participações</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">9º</div>
              <div className="text-sm opacity-90">Melhor Resultado</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">68º</div>
              <div className="text-sm opacity-90">Ranking FIBA</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">2025</div>
              <div className="text-sm opacity-90">Próximo AfroBasket</div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="qualification">Qualificação</TabsTrigger>
            <TabsTrigger value="team">Equipa Atual</TabsTrigger>
            <TabsTrigger value="next">AfroBasket 2025</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                  Histórico de Participações no AfroBasket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {afroBasketHistory.map((tournament, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          {tournament.year}
                        </Badge>
                        <div>
                          <div className="font-semibold">{tournament.location}</div>
                          <div className="text-sm text-gray-600">{tournament.phase}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={tournament.result === "Qualificado" ? "default" : 
                                  tournament.result === "Não participou" ? "destructive" : "secondary"}
                        >
                          {tournament.result || tournament.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Históricas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-cv-blue mb-2">23</div>
                    <div className="text-sm text-gray-600">Jogos Disputados</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">8</div>
                    <div className="text-sm text-gray-600">Vitórias</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-2">15</div>
                    <div className="text-sm text-gray-600">Derrotas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qualification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
                  Qualificação AfroBasket 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualificationGames.map((game, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-semibold">Cabo Verde vs {game.opponent}</div>
                          <div className="text-sm text-gray-600">{game.venue} • {game.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{game.result}</div>
                        <Badge variant={game.status === "Vitória" ? "default" : "destructive"}>
                          {game.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Situação na Qualificação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-800">Qualificado para o AfroBasket 2025</h3>
                  </div>
                  <p className="text-green-700">
                    Cabo Verde garantiu a qualificação para o AfroBasket 2025 que decorrerá em Angola, 
                    após uma campanha positiva na fase de qualificação.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-cv-blue" />
                  Equipa Técnica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Treinador Principal</span>
                      <span>{technicalStaff.headCoach}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Treinador Adjunto</span>
                      <span>{technicalStaff.assistantCoach}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Preparador Físico</span>
                      <span>{technicalStaff.physicalTrainer}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Chefe de Equipa</span>
                      <span>{technicalStaff.teamManager}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium">Médico</span>
                      <span>{technicalStaff.doctor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Convocados Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentRoster.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-gray-600">{player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{player.club}</div>
                        <div className="text-xs text-gray-500">{player.caps} jogos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="next" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-cv-blue" />
                  AfroBasket 2025 - Angola
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Informações do Torneio</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Local:</span>
                        <span className="font-medium">Luanda, Angola</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Data:</span>
                        <span className="font-medium">23 Ago - 4 Set 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Equipas:</span>
                        <span className="font-medium">16 Seleções</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Formato:</span>
                        <span className="font-medium">4 Grupos de 4</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Objetivos</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="font-medium text-blue-800">Objetivo Mínimo</div>
                        <div className="text-sm text-blue-600">Passar da primeira fase</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <div className="font-medium text-green-800">Objetivo Realista</div>
                        <div className="text-sm text-green-600">Chegar aos quartos de final</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <div className="font-medium text-yellow-800">Objetivo Ambicioso</div>
                        <div className="text-sm text-yellow-600">Melhor resultado histórico</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preparação para o Torneio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">Fase de Treinos</h4>
                    <p className="text-blue-700 text-sm">
                      Concentração de 3 semanas em Portugal com jogos de preparação contra equipas europeias
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-800 mb-2">Jogos de Preparação</h4>
                    <p className="text-green-700 text-sm">
                      Torneio de preparação em Cabo Verde com Guiné-Bissau, Senegal e Gâmbia
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold text-orange-800 mb-2">Apoio Logístico</h4>
                    <p className="text-orange-700 text-sm">
                      Equipamento fornecido pela marca oficial e apoio médico especializado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default SelecoesAfroBasketPage;
