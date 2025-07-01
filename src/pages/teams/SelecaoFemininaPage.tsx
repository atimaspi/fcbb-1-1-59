
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Users, MapPin, Target, TrendingUp } from 'lucide-react';

const SelecaoFemininaPage = () => {
  const currentRoster = [
    { name: "Maria Silva", position: "Base", age: 26, club: "ABC Basquete", caps: 45 },
    { name: "Ana Costa", position: "Extremo", age: 24, club: "Sporting CV", caps: 38 },
    { name: "Carla Monteiro", position: "Extremo", age: 28, club: "Seven Stars", caps: 52 },
    { name: "Sofia Pereira", position: "Ala-Pivot", age: 25, club: "Académica", caps: 41 },
    { name: "Lúcia Santos", position: "Poste", age: 29, club: "CD Travadores", caps: 48 },
    { name: "Isabel Rodrigues", position: "Base", age: 23, club: "Inter Clube", caps: 22 },
    { name: "Beatriz Fonseca", position: "Extremo", age: 27, club: "Five Stars", caps: 35 },
    { name: "Rita Tavares", position: "Ala-Pivot", age: 26, club: "Boavista FC", caps: 29 },
    { name: "Teresa Gomes", position: "Poste", age: 30, club: "Vitória SC", caps: 55 },
    { name: "Joana Lopes", position: "Base", age: 22, club: "FC Porto CV", caps: 18 },
    { name: "Cristina Mendes", position: "Extremo", age: 25, club: "Benfica CV", caps: 31 },
    { name: "Patrícia Alves", position: "Ala-Pivot", age: 27, club: "ABC Basquete", caps: 33 }
  ];

  const upcomingGames = [
    { opponent: "Senegal", date: "15 Jul 2024", venue: "Pavilhão Nacional, Praia", competition: "Qualificação AfroBasket" },
    { opponent: "Mali", date: "18 Jul 2024", venue: "Pavilhão Nacional, Praia", competition: "Qualificação AfroBasket" },
    { opponent: "Guiné-Bissau", date: "22 Jul 2024", venue: "Pavilhão Vavá Duarte, Mindelo", competition: "Qualificação AfroBasket" }
  ];

  const recentResults = [
    { opponent: "Mauritânia", date: "20 Mai 2024", score: "78-65", result: "V", venue: "Nouakchott" },
    { opponent: "Gâmbia", date: "16 Mai 2024", score: "85-72", result: "V", venue: "Banjul" },
    { opponent: "Angola", date: "10 Abr 2024", score: "69-74", result: "D", venue: "Luanda" }
  ];

  const achievements = [
    { year: 2023, competition: "AfroBasket Feminino", position: "9º lugar", location: "Ruanda" },
    { year: 2022, competition: "Qualificação Mundial", position: "2º Grupo B", location: "Cabo Verde" },
    { year: 2021, competition: "AfroBasket Feminino", position: "11º lugar", location: "Camarões" },
    { year: 2019, competition: "Jogos das Ilhas", position: "Medalha de Prata", location: "Maurícias" }
  ];

  const statistics = [
    { label: "Ranking FIBA África", value: "15º", icon: Trophy },
    { label: "Jogos Disputados (2024)", value: "8", icon: Target },
    { label: "Vitórias (2024)", value: "5", icon: TrendingUp },
    { label: "Jogadoras Convocadas", value: "12", icon: Users }
  ];

  const technicalStaff = [
    { name: "Carlos Mendes", role: "Selecionador Principal", experience: "8 anos" },
    { name: "Ana Barbosa", role: "Treinadora Adjunta", experience: "5 anos" },
    { name: "João Silva", role: "Preparador Físico", experience: "6 anos" },
    { name: "Dr. Maria Santos", role: "Médica da Equipa", experience: "10 anos" }
  ];

  return (
    <PageLayout title="Seleção Feminina">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-cv-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-cv-blue mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Sobre a Seleção</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              A Seleção Feminina de Basquetebol de Cabo Verde representa o país nas competições internacionais 
              femininas, demonstrando o crescimento e desenvolvimento do basquetebol feminino nacional. Com um 
              plantel jovem e talentoso, a equipa tem vindo a melhorar consistentemente o seu ranking africano.
            </p>
            <p>
              Sob a liderança do selecionador Carlos Mendes, a equipa tem como objetivo principal a qualificação 
              para o AfroBasket 2024 e melhorar a sua posição no ranking continental.
            </p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roster">Plantel</TabsTrigger>
            <TabsTrigger value="schedule">Calendário</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
            <TabsTrigger value="achievements">Historial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roster" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Plantel Atual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentRoster.map((player, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-cv-blue rounded-full flex items-center justify-center text-white font-bold">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold">{player.name}</div>
                              <div className="text-sm text-gray-600">{player.club}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">{player.position}</Badge>
                            <div className="text-sm text-gray-600">{player.caps} jogos</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Equipa Técnica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {technicalStaff.map((staff, index) => (
                        <div key={index} className="border-b pb-3 last:border-b-0">
                          <div className="font-semibold">{staff.name}</div>
                          <div className="text-sm text-gray-600">{staff.role}</div>
                          <div className="text-xs text-gray-500">{staff.experience}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Próximos Jogos</CardTitle>
                  <Badge className="bg-green-500">Qualificação AfroBasket 2024</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingGames.map((game, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xl font-bold">Cabo Verde vs {game.opponent}</div>
                          <div className="text-sm text-gray-600">{game.competition}</div>
                        </div>
                        <Badge variant="outline">{game.date}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {game.venue}
                      </div>
                      <Button size="sm" className="mt-3 bg-red-500 hover:bg-red-600">
                        Ver Transmissão
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resultados Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          result.result === 'V' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {result.result}
                        </div>
                        <div>
                          <div className="font-semibold">vs {result.opponent}</div>
                          <div className="text-sm text-gray-600">{result.venue}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cv-blue">{result.score}</div>
                        <div className="text-sm text-gray-600">{result.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Participações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-cv-blue">{achievement.year}</div>
                        <div>
                          <div className="font-semibold">{achievement.competition}</div>
                          <div className="text-sm text-gray-600">{achievement.location}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{achievement.position}</Badge>
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

export default SelecaoFemininaPage;
