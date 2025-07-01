
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Trophy, Users, Play, TrendingUp } from 'lucide-react';

const ResultadosAoVivoPage = () => {
  const liveGames = [
    {
      id: 1,
      homeTeam: "CD Travadores",
      awayTeam: "Sporting CV",
      homeScore: 78,
      awayScore: 82,
      quarter: "4º Q",
      time: "02:34",
      venue: "Pavilhão Adão Silvestre",
      competition: "Liga Nacional",
      status: "live"
    },
    {
      id: 2,
      homeTeam: "Académica Porto Novo",
      awayTeam: "CS Mindelense",
      homeScore: 65,
      awayScore: 71,
      quarter: "3º Q",
      time: "05:12",
      venue: "Pavilhão Municipal",
      competition: "Liga Nacional",
      status: "live"
    }
  ];

  const upcomingGames = [
    {
      id: 1,
      homeTeam: "Barreirense",
      awayTeam: "ABC Basket",
      date: "2025-06-10",
      time: "19:00",
      venue: "Pavilhão Adão Silvestre",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      homeTeam: "GDRC Oliveirense",
      awayTeam: "Juventude Furna",
      date: "2025-06-11",
      time: "20:30",
      venue: "Pavilhão Municipal",
      competition: "Liga Nacional"
    },
    {
      id: 3,
      homeTeam: "Unitec Assomada",
      awayTeam: "Five Stars",
      date: "2025-06-12",
      time: "18:00",
      venue: "Pavilhão da Várzea",
      competition: "Liga Nacional"
    },
    {
      id: 4,
      homeTeam: "Sal Rei BC",
      awayTeam: "Praia BC",
      date: "2025-06-13",
      time: "19:30",
      venue: "Pavilhão Boa Vista",
      competition: "Liga Nacional"
    }
  ];

  const recentResults = [
    {
      id: 1,
      homeTeam: "Unitec Assomada",
      awayTeam: "Sal Rei BC",
      homeScore: 89,
      awayScore: 76,
      date: "2025-06-08",
      competition: "Liga Nacional",
      highlights: true
    },
    {
      id: 2,
      homeTeam: "Five Stars",
      awayTeam: "Praia BC",
      homeScore: 72,
      awayScore: 85,
      date: "2025-06-07",
      competition: "Liga Nacional",
      highlights: true
    },
    {
      id: 3,
      homeTeam: "CS Mindelense",
      awayTeam: "ABC Basket",
      homeScore: 94,
      awayScore: 88,
      date: "2025-06-06",
      competition: "Liga Nacional",
      highlights: false
    },
    {
      id: 4,
      homeTeam: "Sporting CV",
      awayTeam: "Barreirense",
      homeScore: 77,
      awayScore: 82,
      date: "2025-06-05",
      competition: "Liga Nacional",
      highlights: true
    }
  ];

  const stats = [
    { label: "Jogos Hoje", value: "2", icon: <Clock className="w-5 h-5" /> },
    { label: "Jogos Esta Semana", value: "12", icon: <Calendar className="w-5 h-5" /> },
    { label: "Equipas em Competição", value: "16", icon: <Users className="w-5 h-5" /> },
    { label: "Média de Pontos", value: "78.5", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <PageLayout title="Resultados ao Vivo">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-t-4 border-cv-red">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2 text-cv-red">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-cv-blue">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Ao Vivo</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming">Próximos Jogos</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          {/* Live Games */}
          <TabsContent value="live" className="space-y-4">
            {liveGames.length > 0 ? (
              liveGames.map((game) => (
                <Card key={game.id} className="border-l-4 border-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{game.competition}</CardTitle>
                      <Badge variant="destructive" className="animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                        AO VIVO
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        {/* Teams and Scores */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">{game.homeTeam}</span>
                            <span className="text-2xl font-bold text-cv-blue">{game.homeScore}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">{game.awayTeam}</span>
                            <span className="text-2xl font-bold text-cv-blue">{game.awayScore}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <Badge className="bg-cv-red text-white">{game.quarter}</Badge>
                        <div className="text-lg font-mono">{game.time}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {game.venue}
                        </div>
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Não há jogos ao vivo neste momento</p>
                  <p className="text-sm text-gray-500 mt-2">Consulte os próximos jogos agendados</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Upcoming Games */}
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingGames.map((game) => (
                <Card key={game.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline">{game.competition}</Badge>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {game.date}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {game.time}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-medium">{game.homeTeam}</div>
                        <div className="text-sm text-gray-500 my-1">vs</div>
                        <div className="font-medium">{game.awayTeam}</div>
                      </div>
                      
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {game.venue}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Results */}
          <TabsContent value="results" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentResults.map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{result.competition}</Badge>
                        <span className="text-sm text-gray-600">{result.date}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{result.homeTeam}</span>
                          <span className={`text-xl font-bold ${result.homeScore > result.awayScore ? 'text-green-600' : 'text-gray-600'}`}>
                            {result.homeScore}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{result.awayTeam}</span>
                          <span className={`text-xl font-bold ${result.awayScore > result.homeScore ? 'text-green-600' : 'text-gray-600'}`}>
                            {result.awayScore}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver Detalhes
                        </Button>
                        {result.highlights && (
                          <Button size="sm" className="flex-1">
                            <Play className="w-4 h-4 mr-1" />
                            Highlights
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ResultadosAoVivoPage;
