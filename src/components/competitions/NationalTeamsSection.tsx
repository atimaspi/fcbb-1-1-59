
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Globe, Star, Medal, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const NationalTeamsSection = () => {
  const achievements = [
    {
      year: '2023',
      title: 'Mundial FIBA',
      description: 'Participação histórica no Campeonato Mundial',
      type: 'mundial',
      position: '25º lugar',
      highlight: true
    },
    {
      year: '2022',
      title: 'AfroBasket',
      description: 'Excelente prestação no campeonato africano',
      type: 'continental',
      position: '8º lugar',
      highlight: false
    },
    {
      year: '2021',
      title: 'Eliminatórias AfroBasket',
      description: 'Qualificação para o AfroBasket',
      type: 'eliminatorias',
      position: 'Qualificado',
      highlight: false
    }
  ];

  const playerStats = [
    {
      name: 'Walter Tavares',
      position: 'Poste',
      club: 'Real Madrid (ESP)',
      stats: 'Jogador NBA e Euroliga'
    },
    {
      name: 'Edy Tavares',
      position: 'Poste',
      club: 'Real Madrid (ESP)',
      stats: 'Campeão Euroliga'
    },
    {
      name: 'Ivan Almeida',
      position: 'Base',
      club: 'Benfica (POR)',
      stats: 'Capitão da Seleção'
    }
  ];

  const upcomingEvents = [
    {
      event: 'AfroBasket 2025',
      date: '26 Ago - 7 Set 2025',
      location: 'Angola',
      status: 'Qualificado',
      importance: 'high'
    },
    {
      event: 'Eliminatórias Mundial 2027',
      date: 'Feb - Nov 2025',
      location: 'Várias',
      status: 'Em curso',
      importance: 'high'
    },
    {
      event: 'Jogos Amigáveis',
      date: 'Março 2025',
      location: 'Cabo Verde',
      status: 'Agendado',
      importance: 'medium'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cv-blue mb-4">
          Seleções Nacionais
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          O orgulho de Cabo Verde no cenário internacional do basquetebol
        </p>
      </div>

      <Tabs defaultValue="masculina" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="masculina">Seleção Masculina</TabsTrigger>
          <TabsTrigger value="feminina">Seleção Feminina</TabsTrigger>
        </TabsList>
        
        <TabsContent value="masculina" className="space-y-8">
          {/* Conquistas e Destaques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-cv-blue" />
                  <span>Principais Conquistas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        achievement.highlight 
                          ? 'bg-cv-blue/5 border-cv-blue' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{achievement.title}</h4>
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cv-blue">{achievement.year}</div>
                          <Badge variant={achievement.highlight ? "default" : "secondary"}>
                            {achievement.position}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-cv-blue" />
                  <span>Ranking Mundial</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-cv-blue mb-2">64º</div>
                <p className="text-gray-600 mb-4">Posição FIBA</p>
                <Badge className="bg-green-500">↗ +12 posições</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Jogadores Destaque */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-cv-blue" />
                <span>Jogadores em Destaque</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {playerStats.map((player, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-lg">{player.name}</h4>
                    <p className="text-cv-blue font-medium">{player.position}</p>
                    <p className="text-sm text-gray-600">{player.club}</p>
                    <p className="text-xs text-gray-500 mt-2">{player.stats}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-cv-blue" />
                <span>Próximos Eventos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{event.event}</h4>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{event.date}</p>
                      <Badge variant={event.importance === 'high' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feminina" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Seleção Feminina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Em Desenvolvimento
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  A seleção feminina está em processo de reestruturação e desenvolvimento, 
                  com foco no crescimento do basquetebol feminino nacional.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-cv-blue">15</div>
                    <p className="text-sm text-gray-600">Jogadoras Federadas</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <p className="text-sm text-gray-600">Clubes Femininos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NationalTeamsSection;
