
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Trophy, Calendar, MapPin, Clock, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FibaStyleLiveResults = () => {
  const liveGames = [
    {
      id: 1,
      competition: "Liga Nacional",
      homeTeam: "CD Travadores",
      awayTeam: "Sporting CV",
      homeScore: 82,
      awayScore: 76,
      homeLogo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      awayLogo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      period: "4º Período",
      time: "02:34",
      venue: "Pavilhão Adão Silvestre",
      isLive: true
    }
  ];

  const upcomingGames = [
    {
      id: 1,
      competition: "Liga Nacional",
      homeTeam: "Académica Porto Novo",
      awayTeam: "CS Mindelense",
      date: "Hoje",
      time: "20:00",
      venue: "Pavilhão Municipal"
    },
    {
      id: 2,
      competition: "Taça CV",
      homeTeam: "Five Stars",
      awayTeam: "ABC Basket",
      date: "Amanhã",
      time: "19:30",
      venue: "Pavilhão da Várzea"
    }
  ];

  const recentResults = [
    {
      id: 1,
      competition: "Liga Nacional",
      homeTeam: "Barreirense",
      awayTeam: "Unitec Assomada",
      homeScore: 78,
      awayScore: 85,
      date: "Ontem"
    },
    {
      id: 2,
      competition: "Liga Nacional",
      homeTeam: "Sal Rei BC",
      awayTeam: "Praia BC",
      homeScore: 92,
      awayScore: 88,
      date: "Domingo"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="cv-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cv-blue mb-4">
            Resultados & Jogos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompanhe todos os jogos em tempo real
          </p>
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="live" 
              className="flex items-center space-x-2 data-[state=active]:bg-cv-red data-[state=active]:text-white rounded-lg"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Ao Vivo</span>
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              className="data-[state=active]:bg-cv-blue data-[state=active]:text-white rounded-lg"
            >
              Próximos
            </TabsTrigger>
            <TabsTrigger 
              value="results"
              className="data-[state=active]:bg-cv-blue data-[state=active]:text-white rounded-lg"
            >
              Resultados
            </TabsTrigger>
          </TabsList>

          {/* Live Games */}
          <TabsContent value="live" className="space-y-6">
            {liveGames.length > 0 ? (
              liveGames.map((game) => (
                <Card key={game.id} className="overflow-hidden shadow-xl border-l-4 border-red-500">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-cv-blue">{game.competition}</CardTitle>
                      <Badge className="bg-red-500 text-white animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        AO VIVO
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Teams and Scores */}
                      <div className="md:col-span-2">
                        <div className="space-y-4">
                          {/* Home Team */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={game.homeLogo} 
                                alt={game.homeTeam}
                                className="w-12 h-12 object-contain"
                              />
                              <span className="text-xl font-semibold">{game.homeTeam}</span>
                            </div>
                            <span className="text-4xl font-bold text-cv-blue">{game.homeScore}</span>
                          </div>
                          
                          {/* Away Team */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={game.awayLogo} 
                                alt={game.awayTeam}
                                className="w-12 h-12 object-contain"
                              />
                              <span className="text-xl font-semibold">{game.awayTeam}</span>
                            </div>
                            <span className="text-4xl font-bold text-cv-blue">{game.awayScore}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Game Info */}
                      <div className="text-center space-y-4">
                        <div>
                          <Badge className="bg-cv-red text-white text-lg px-4 py-2">
                            {game.period}
                          </Badge>
                          <div className="text-2xl font-mono font-bold text-cv-blue mt-2">
                            {game.time}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 flex items-center justify-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {game.venue}
                        </div>
                        
                        <Button className="w-full bg-cv-blue hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="text-center py-16">
                <CardContent>
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Não há jogos ao vivo
                  </h3>
                  <p className="text-gray-500">
                    Consulte os próximos jogos agendados
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Upcoming Games */}
          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingGames.map((game) => (
                <Card key={game.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-cv-blue text-cv-blue">
                          {game.competition}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {game.date} • {game.time}
                        </div>
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="font-semibold text-lg">{game.homeTeam}</div>
                        <div className="text-gray-500">vs</div>
                        <div className="font-semibold text-lg">{game.awayTeam}</div>
                      </div>
                      
                      <div className="text-center text-sm text-gray-600 flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {game.venue}
                      </div>
                      
                      <Button variant="outline" className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Results */}
          <TabsContent value="results">
            <div className="grid md:grid-cols-2 gap-6">
              {recentResults.map((result) => (
                <Card key={result.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-cv-blue text-cv-blue">
                          {result.competition}
                        </Badge>
                        <div className="text-sm text-gray-600">{result.date}</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{result.homeTeam}</span>
                          <span className={`text-2xl font-bold ${result.homeScore > result.awayScore ? 'text-green-600' : 'text-gray-500'}`}>
                            {result.homeScore}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{result.awayTeam}</span>
                          <span className={`text-2xl font-bold ${result.awayScore > result.homeScore ? 'text-green-600' : 'text-gray-500'}`}>
                            {result.awayScore}
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-cv-blue hover:bg-blue-700 px-8 py-4"
            asChild
          >
            <Link to="/resultados">
              Ver Todos os Resultados
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FibaStyleLiveResults;
