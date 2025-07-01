
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, Calendar, Target, Star, Award } from 'lucide-react';

const SelecoesPage = () => {
  const seniorMaleTeam = {
    coach: "José Maria Silva",
    assistantCoach: "Pedro Santos",
    physicalTrainer: "Ana Tavares",
    players: [
      { name: "João Monteiro", position: "Base", height: "1.85m", team: "Sporting CV", international: 45 },
      { name: "Carlos Silva", position: "Extremo", height: "1.92m", team: "CD Travadores", international: 38 },
      { name: "Pedro Lima", position: "Poste", height: "2.08m", team: "Académica", international: 52 },
      { name: "António Santos", position: "Ala", height: "1.98m", team: "Mindelense", international: 29 },
      { name: "Miguel Rodrigues", position: "Base", height: "1.80m", team: "ABC Basket", international: 15 }
    ],
    recentGames: [
      { opponent: "Senegal", result: "78-82", date: "2024-02-15", competition: "AfroBasket Qualif." },
      { opponent: "Guiné-Bissau", result: "89-76", date: "2024-02-18", competition: "AfroBasket Qualif." },
      { opponent: "Mali", result: "71-85", date: "2024-06-12", competition: "Amigável" }
    ]
  };

  const seniorFemaleTeam = {
    coach: "Maria Fernandes",
    assistantCoach: "Carla Mendes",
    physicalTrainer: "Sofia Costa",
    players: [
      { name: "Rita Gomes", position: "Base", height: "1.70m", team: "Sporting CV", international: 32 },
      { name: "Lúcia Santos", position: "Extremo", height: "1.78m", team: "Académica", international: 28 },
      { name: "Isabel Lima", position: "Poste", height: "1.85m", team: "Mindelense", international: 25 },
      { name: "Paula Rodrigues", position: "Ala", height: "1.75m", team: "CD Travadores", international: 19 },
      { name: "Ana Silva", position: "Base", height: "1.68m", team: "ABC Basket", international: 12 }
    ],
    recentGames: [
      { opponent: "Marrocos", result: "65-72", date: "2024-03-10", competition: "AfroBasket Qualif." },
      { opponent: "Tunísia", result: "58-69", date: "2024-03-13", competition: "AfroBasket Qualif." },
      { opponent: "Guiné", result: "74-68", date: "2024-05-20", competition: "Amigável" }
    ]
  };

  const youthTeams = [
    {
      category: "Sub-18 Masculino",
      coach: "Rui Pereira",
      lastCompetition: "AfroBasket U18 2023",
      result: "7º lugar",
      nextCompetition: "AfroBasket U18 2025"
    },
    {
      category: "Sub-18 Feminino", 
      coach: "Teresa Alves",
      lastCompetition: "AfroBasket U18 2023",
      result: "5º lugar",
      nextCompetition: "AfroBasket U18 2025"
    },
    {
      category: "Sub-16 Masculino",
      coach: "Manuel Costa",
      lastCompetition: "Torneio CPLP 2024",
      result: "Medalha de Bronze",
      nextCompetition: "Torneio CPLP 2025"
    },
    {
      category: "Sub-16 Feminino",
      coach: "Cristina Martins",
      lastCompetition: "Torneio CPLP 2024", 
      result: "4º lugar",
      nextCompetition: "Torneio CPLP 2025"
    }
  ];

  const achievements = [
    { year: "1995", event: "Primeira participação no AfroBasket (Masculino)", result: "12º lugar" },
    { year: "2007", event: "Melhor resultado AfroBasket Masculino", result: "8º lugar" },
    { year: "2009", event: "Primeira participação AfroBasket Feminino", result: "10º lugar" },
    { year: "2019", event: "Medalha de Ouro Jogos das Ilhas", result: "Campeão (Masc./Fem.)" },
    { year: "2023", event: "AfroBasket U18 Masculino", result: "7º lugar" }
  ];

  return (
    <PageLayout 
      title="Seleções Nacionais"
      description="Conheça as seleções cabo-verdianas de basquetebol e acompanhe os seus resultados"
    >
      <div className="space-y-8">
        {/* Visão Geral das Seleções */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-cv-blue text-white">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-sm opacity-90">Seleções Ativas</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">147</div>
              <div className="text-sm opacity-90">Jogos Internacionais</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-sm opacity-90">Participações AfroBasket</div>
            </CardContent>
          </Card>
        </div>

        {/* Seleções por Categoria */}
        <Tabs defaultValue="senior-male" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="senior-male">Sénior Masculino</TabsTrigger>
            <TabsTrigger value="senior-female">Sénior Feminino</TabsTrigger>
            <TabsTrigger value="youth">Seleções Jovens</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          </TabsList>

          <TabsContent value="senior-male" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-cv-blue" />
                  Seleção Nacional Masculina Sénior
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Equipa Técnica</h4>
                    <div className="space-y-2">
                      <div><strong>Treinador Principal:</strong> {seniorMaleTeam.coach}</div>
                      <div><strong>Treinador Adjunto:</strong> {seniorMaleTeam.assistantCoach}</div>
                      <div><strong>Preparador Físico:</strong> {seniorMaleTeam.physicalTrainer}</div>
                    </div>

                    <h4 className="font-semibold mt-6 mb-4">Resultados Recentes</h4>
                    <div className="space-y-2">
                      {seniorMaleTeam.recentGames.map((game, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">vs {game.opponent}</div>
                            <div className="text-sm text-gray-600">{game.competition}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{game.result}</div>
                            <div className="text-sm text-gray-600">{game.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Convocados (Última Convocatória)</h4>
                    <div className="space-y-3">
                      {seniorMaleTeam.players.map((player, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-gray-600">{player.position} • {player.height}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{player.team}</div>
                            <div className="text-xs text-gray-500">{player.international} jogos</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="senior-female" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-cv-blue" />
                  Seleção Nacional Feminina Sénior
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Equipa Técnica</h4>
                    <div className="space-y-2">
                      <div><strong>Treinadora Principal:</strong> {seniorFemaleTeam.coach}</div>
                      <div><strong>Treinadora Adjunta:</strong> {seniorFemaleTeam.assistantCoach}</div>
                      <div><strong>Preparadora Física:</strong> {seniorFemaleTeam.physicalTrainer}</div>
                    </div>

                    <h4 className="font-semibold mt-6 mb-4">Resultados Recentes</h4>
                    <div className="space-y-2">
                      {seniorFemaleTeam.recentGames.map((game, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">vs {game.opponent}</div>
                            <div className="text-sm text-gray-600">{game.competition}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{game.result}</div>
                            <div className="text-sm text-gray-600">{game.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Convocadas (Última Convocatória)</h4>
                    <div className="space-y-3">
                      {seniorFemaleTeam.players.map((player, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-sm text-gray-600">{player.position} • {player.height}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{player.team}</div>
                            <div className="text-xs text-gray-500">{player.international} jogos</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="youth" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {youthTeams.map((team, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{team.category}</span>
                      <Badge variant="outline">Jovens</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <strong>Treinador:</strong> {team.coach}
                      </div>
                      <div>
                        <strong>Última Competição:</strong> {team.lastCompetition}
                      </div>
                      <div>
                        <strong>Resultado:</strong> 
                        <Badge variant="secondary" className="ml-2">{team.result}</Badge>
                      </div>
                      <div>
                        <strong>Próxima Competição:</strong> {team.nextCompetition}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                  Principais Conquistas e Participações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Badge variant="outline" className="text-lg px-3 py-1">{achievement.year}</Badge>
                      <div className="flex-1">
                        <div className="font-medium">{achievement.event}</div>
                        <div className="text-sm text-gray-600">{achievement.result}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ranking FIBA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-cv-blue mb-2">68º</div>
                    <div className="text-sm text-gray-600">Ranking Mundial Masculino</div>
                    <div className="text-xs text-gray-500 mt-1">FIBA World Ranking</div>
                  </div>
                  <div className="text-center p-6 bg-pink-50 rounded-lg">
                    <div className="text-3xl font-bold text-pink-600 mb-2">45º</div>
                    <div className="text-sm text-gray-600">Ranking Mundial Feminino</div>
                    <div className="text-xs text-gray-500 mt-1">FIBA World Ranking</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Próximos Jogos/Competições */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
              Calendário das Seleções 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Fevereiro 2025</h4>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>• Qualificação AfroBasket (Masculino)</li>
                  <li>• Estágio Seleção Sub-18</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Junho 2025</h4>
                <ul className="text-sm space-y-1 text-green-800">
                  <li>• AfroBasket U18 (Angola)</li>
                  <li>• Torneio Preparação Feminino</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Agosto 2025</h4>
                <ul className="text-sm space-y-1 text-orange-800">
                  <li>• AfroBasket Masculino (Angola)</li>
                  <li>• Qualificação AfroBasket Feminino</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SelecoesPage;
