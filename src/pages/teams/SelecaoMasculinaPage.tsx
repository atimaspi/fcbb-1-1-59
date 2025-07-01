
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, MapPin, Star, Download, ExternalLink } from 'lucide-react';

const SelecaoMasculinaPage = () => {
  const currentRoster = [
    { name: "João Silva", position: "Base", age: 28, club: "ABC Basquete", caps: 45, points: 380 },
    { name: "Carlos Santos", position: "Base", age: 25, club: "Seven Stars", caps: 32, points: 290 },
    { name: "Miguel Tavares", position: "Extremo", age: 30, club: "Sporting CP", caps: 52, points: 420 },
    { name: "António Pereira", position: "Extremo", age: 27, club: "CD Travadores", caps: 38, points: 315 },
    { name: "Pedro Gomes", position: "Extremo", age: 24, club: "FC Porto CV", caps: 28, points: 185 },
    { name: "Manuel Costa", position: "Ala-Pivot", age: 29, club: "Inter Clube", caps: 41, points: 295 },
    { name: "José Monteiro", position: "Ala-Pivot", age: 26, club: "Benfica CV", caps: 35, points: 275 },
    { name: "Roberto Lima", position: "Pivot", age: 31, club: "Académica", caps: 48, points: 385 },
    { name: "Daniel Rodrigues", position: "Pivot", age: 25, club: "Vitória SC", caps: 22, points: 145 },
    { name: "Fernando Alves", position: "Base", age: 23, club: "Boavista FC", caps: 15, points: 85 },
    { name: "Ricardo Mendes", position: "Extremo", age: 26, club: "ABC Basquete", caps: 30, points: 195 },
    { name: "Hugo Fernandes", position: "Pivot", age: 28, club: "Seven Stars", caps: 33, points: 220 }
  ];

  const recentMatches = [
    { 
      date: "15 Jun 2024", 
      opponent: "Senegal", 
      result: "W", 
      score: "78-72", 
      competition: "AfroBasket Qualifiers",
      venue: "Pavilhão Nacional"
    },
    { 
      date: "12 Jun 2024", 
      opponent: "Mali", 
      result: "L", 
      score: "65-71", 
      competition: "AfroBasket Qualifiers",
      venue: "Bamako"
    },
    { 
      date: "8 Mar 2024", 
      opponent: "Guiné-Bissau", 
      result: "W", 
      score: "89-63", 
      competition: "Amigável",
      venue: "Pavilhão Nacional"
    },
    { 
      date: "25 Fev 2024", 
      opponent: "Angola", 
      result: "L", 
      score: "74-82", 
      competition: "Amigável",
      venue: "Luanda"
    }
  ];

  const upcomingMatches = [
    {
      date: "15 Ago 2024",
      opponent: "Marrocos", 
      competition: "AfroBasket Qualifiers",
      venue: "Casablanca",
      time: "19:00"
    },
    {
      date: "18 Ago 2024",
      opponent: "Tunísia",
      competition: "AfroBasket Qualifiers", 
      venue: "Pavilhão Nacional",
      time: "20:00"
    }
  ];

  const achievements = [
    { year: 2018, competition: "AfroBasket", position: "8º lugar", venue: "Líbano" },
    { year: 2021, competition: "AfroBasket", position: "12º lugar", venue: "Ruanda" },
    { year: 2017, competition: "AfroBasket", position: "10º lugar", venue: "Senegal/Tunísia" },
    { year: 2015, competition: "AfroBasket", position: "14º lugar", venue: "Tunísia" }
  ];

  const statistics = [
    { label: "Participações AfroBasket", value: "8", icon: Trophy },
    { label: "Melhor Classificação", value: "8º", icon: Star },
    { label: "Internacionalizações", value: "450+", icon: Calendar },
    { label: "Ranking FIBA África", value: "18º", icon: MapPin }
  ];

  return (
    <PageLayout title="Seleção Masculina">
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

        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-cv-blue to-cv-red text-white">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Seleção Nacional Masculina de Basquetebol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Selecionador Nacional</h3>
                <p className="text-lg">Emanuel Trovoada</p>
                <p className="text-sm opacity-90">Em funções desde 2020</p>
                
                <h3 className="text-xl font-bold mb-3 mt-6">Próximo Objetivo</h3>
                <p className="text-lg">AfroBasket 2025 - Angola</p>
                <p className="text-sm opacity-90">Qualificação em curso</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Última Convocatória</h3>
                <p className="text-lg">15 de Junho 2024</p>
                <p className="text-sm opacity-90">vs Senegal - Qualificação AfroBasket</p>
                
                <div className="mt-4">
                  <Button className="bg-white text-cv-blue hover:bg-gray-100">
                    <Download className="mr-2 h-4 w-4" />
                    Lista de Convocados
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="roster" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roster">Plantel</TabsTrigger>
            <TabsTrigger value="fixtures">Calendário</TabsTrigger>
            <TabsTrigger value="history">História</TabsTrigger>
            <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roster" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Plantel Atual</CardTitle>
                  <Badge className="bg-cv-blue text-white">Época 2024</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {currentRoster.map((player, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <h3 className="font-semibold text-lg">{player.name}</h3>
                          <Badge variant="outline" className="mt-1">{player.position}</Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Idade</div>
                          <div className="font-semibold">{player.age}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Clube</div>
                          <div className="font-semibold">{player.club}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Internac.</div>
                          <div className="font-semibold text-cv-blue">{player.caps}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Pontos</div>
                          <div className="font-semibold text-cv-blue">{player.points}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fixtures" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-cv-blue">Próximos Jogos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMatches.map((match, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Badge className="bg-cv-blue text-white">{match.competition}</Badge>
                          <span className="text-sm text-gray-600">{match.date}</span>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">Cabo Verde vs {match.opponent}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {match.venue} - {match.time}
                          </div>
                        </div>
                        <Button className="w-full mt-3 bg-red-500 hover:bg-red-600">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Seguir em Direto
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-cv-blue">Últimos Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMatches.map((match, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline">{match.competition}</Badge>
                          <span className="text-sm text-gray-600">{match.date}</span>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            Cabo Verde vs {match.opponent}
                          </div>
                          <div className={`text-2xl font-bold mt-2 ${
                            match.result === 'W' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {match.score}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {match.venue}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Participações em Competições Internacionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cv-blue">{achievement.year}</div>
                        </div>
                        <div>
                          <div className="font-semibold">{achievement.competition}</div>
                        </div>
                        <div className="text-center">
                          <Badge className={`${
                            achievement.position.includes('8º') ? 'bg-yellow-500' : 'bg-gray-500'
                          } text-white`}>
                            {achievement.position}
                          </Badge>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                          {achievement.venue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Marcos Históricos</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <ul>
                  <li><strong>1998:</strong> Primeira participação no AfroBasket (Senegal)</li>
                  <li><strong>2006:</strong> Primeira vitória em competições oficiais</li>
                  <li><strong>2018:</strong> Melhor classificação de sempre - 8º lugar no AfroBasket</li>
                  <li><strong>2020:</strong> Nomeação de Emanuel Trovoada como selecionador</li>
                  <li><strong>2024:</strong> Qualificação para o AfroBasket 2025</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Melhores Marcadores Históricos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { player: "João Silva", points: 380, caps: 45, average: 8.4 },
                      { player: "Miguel Tavares", points: 420, caps: 52, average: 8.1 },
                      { player: "Roberto Lima", points: 385, caps: 48, average: 8.0 },
                      { player: "António Pereira", points: 315, caps: 38, average: 8.3 }
                    ].map((player, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-semibold">{player.player}</div>
                          <div className="text-sm text-gray-600">{player.caps} jogos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-cv-blue">{player.points}</div>
                          <div className="text-sm text-gray-500">{player.average}/jogo</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas Gerais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Jogos oficiais disputados:</span>
                      <span className="font-bold">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vitórias:</span>
                      <span className="font-bold text-green-600">38</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Derrotas:</span>
                      <span className="font-bold text-red-600">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percentagem de vitórias:</span>
                      <span className="font-bold">29.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Média de pontos marcados:</span>
                      <span className="font-bold">72.4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Média de pontos sofridos:</span>
                      <span className="font-bold">78.1</span>
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

export default SelecaoMasculinaPage;
