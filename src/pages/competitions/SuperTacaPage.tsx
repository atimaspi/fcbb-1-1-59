import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Star, Play, MapPin } from 'lucide-react';

const SuperTacaPage = () => {
  const currentEdition = {
    year: 2024,
    champion: "ABC Basquete",
    cupWinner: "Seven Stars",
    venue: "Pavilhão Nacional",
    date: "15 de Setembro 2024",
    time: "19:00",
    ticketPrice: "500 CVE"
  };

  const historicMatches = [
    { year: 2024, champion: "ABC Basquete", cupWinner: "Seven Stars", score: "85-78", venue: "Pavilhão Nacional" },
    { year: 2023, champion: "Seven Stars", cupWinner: "ABC Basquete", score: "92-89", venue: "Pavilhão Vavá Duarte" },
    { year: 2022, champion: "Académica", cupWinner: "CD Travadores", score: "76-73", venue: "Pavilhão Nacional" },
    { year: 2021, champion: "Inter Clube", cupWinner: "Five Stars", score: "81-79", venue: "Pavilhão Adérito Sena" },
    { year: 2020, champion: "ABC Basquete", cupWinner: "Sporting CP", score: "88-82", venue: "Pavilhão Nacional" }
  ];

  const statistics = [
    { label: "Edições Realizadas", value: "15", icon: Trophy },
    { label: "Média de Espectadores", value: "4,500", icon: Star },
    { label: "Próxima Edição", value: "Set 2024", icon: Calendar }
  ];

  return (
    <PageLayout title="Super Taça">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Current Edition Highlight */}
        <Card className="bg-gradient-to-r from-cv-blue to-cv-red text-white">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="mr-2 h-6 w-6" />
              Super Taça {currentEdition.year}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Campeão Nacional</h3>
                <div className="text-3xl font-bold">{currentEdition.champion}</div>
                <Badge className="mt-2 bg-yellow-500 text-black">Liga Nacional 2023/24</Badge>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Vencedor da Taça</h3>
                <div className="text-3xl font-bold">{currentEdition.cupWinner}</div>
                <Badge className="mt-2 bg-green-500">Taça CV 2024</Badge>
              </div>
            </div>
            <div className="mt-6 text-center space-y-2">
              <div className="flex items-center justify-center text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                {currentEdition.date} às {currentEdition.time}
              </div>
              <div className="flex items-center justify-center text-lg">
                <MapPin className="mr-2 h-5 w-5" />
                {currentEdition.venue}
              </div>
              <Button className="mt-4 bg-white text-cv-blue hover:bg-gray-100">
                <Play className="mr-2 h-4 w-4" />
                Comprar Bilhetes - {currentEdition.ticketPrice}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Sobre a Competição</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue">O que é a Super Taça?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  A Super Taça de Cabo Verde é o troféu que marca oficialmente o início da nova temporada de basquetebol. 
                  Esta competição prestigiosa coloca frente a frente o campeão nacional da época anterior e o vencedor 
                  da Taça de Cabo Verde.
                </p>
                <p>
                  Criada em 2009, a Super Taça rapidamente se tornou um dos eventos mais aguardados do calendário 
                  desportivo nacional, servindo como uma prévia emocionante do que esperar na nova temporada.
                </p>
                
                <h4>Formato da Competição</h4>
                <ul>
                  <li>Jogo único entre o campeão nacional e o vencedor da Taça</li>
                  <li>Em caso de empate, joga-se prolongamento</li>
                  <li>Realizada tradicionalmente em setembro</li>
                  <li>Local alternado entre as principais cidades</li>
                </ul>
                
                <h4>Critérios de Participação</h4>
                <ul>
                  <li>Campeão Nacional da época anterior</li>
                  <li>Vencedor da Taça de Cabo Verde</li>
                  <li>Se a mesma equipa ganhar ambos os troféus, joga contra o finalista vencido da Taça</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Jogos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicMatches.map((match, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-2xl font-bold text-cv-blue">{match.year}</div>
                        <Badge variant="outline">{match.venue}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="text-center">
                          <div className="font-semibold">{match.champion}</div>
                          <div className="text-xs text-gray-500">Campeão Nacional</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cv-blue">{match.score}</div>
                          <div className="text-xs text-gray-500">Resultado Final</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{match.cupWinner}</div>
                          <div className="text-xs text-gray-500">Vencedor da Taça</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipas Mais Vencedoras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { team: "ABC Basquete", wins: 4, years: "2024, 2020, 2018, 2015" },
                      { team: "Seven Stars", wins: 3, years: "2023, 2019, 2017" },
                      { team: "Académica", wins: 2, years: "2022, 2016" },
                      { team: "Inter Clube", wins: 2, years: "2021, 2014" }
                    ].map((team, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-semibold">{team.team}</div>
                          <div className="text-xs text-gray-600">{team.years}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cv-blue">{team.wins}</div>
                          <div className="text-xs text-gray-500">títulos</div>
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
                      <span>Jogos realizados:</span>
                      <span className="font-bold">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Média de pontos por jogo:</span>
                      <span className="font-bold">164.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maior vitória:</span>
                      <span className="font-bold">18 pontos (2019)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jogos decididos no prolongamento:</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maior assistência:</span>
                      <span className="font-bold">5,200 (2023)</span>
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

export default SuperTacaPage;
