
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Award, MapPin, Calendar, Zap, Target } from 'lucide-react';

const AtletasPage = () => {
  const featuredAthletes = [
    {
      id: 1,
      name: "Carlos Silva",
      position: "Pivot",
      age: 28,
      height: "2.08m",
      club: "Sporting CV",
      nationality: "Cabo Verde",
      photo: "https://via.placeholder.com/200x250?text=Carlos+Silva",
      stats: { ppg: 18.5, rpg: 9.2, apg: 2.1 },
      achievements: ["MVP Liga Nacional 2023", "Melhor Marcador 2022"]
    },
    {
      id: 2,
      name: "Ana Monteiro",
      position: "Base",
      age: 24,
      height: "1.68m",
      club: "CD Travadores",
      nationality: "Cabo Verde",
      photo: "https://via.placeholder.com/200x250?text=Ana+Monteiro",
      stats: { ppg: 14.8, rpg: 4.3, apg: 7.9 },
      achievements: ["Melhor Assistente Liga Feminina 2023"]
    },
    {
      id: 3,
      name: "João Santos",
      position: "Extremo",
      age: 26,
      height: "1.98m",
      club: "ABC Basquete",
      nationality: "Cabo Verde",
      photo: "https://via.placeholder.com/200x250?text=João+Santos",
      stats: { ppg: 21.3, rpg: 6.1, apg: 4.2 },
      achievements: ["Top Scorer Liga Nacional 2023"]
    }
  ];

  const youngTalents = [
    { name: "Pedro Lima", age: 19, position: "Ala", club: "Juventude CV" },
    { name: "Maria Costa", age: 20, position: "Base", club: "Académica Fem" },
    { name: "António Pereira", age: 18, position: "Poste", club: "Boavista" }
  ];

  const nationalTeamPlayers = [
    { name: "Carlos Silva", caps: 45, position: "Pivot" },
    { name: "João Santos", caps: 38, position: "Extremo" },
    { name: "Miguel Rodrigues", caps: 42, position: "Base" }
  ];

  return (
    <PageLayout 
      title="Atletas"
      description="Conheça os melhores atletas do basquetebol cabo-verdiano"
    >
      <div className="space-y-8">
        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-cv-blue text-white">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">450+</div>
              <div className="text-sm opacity-90">Atletas Registados</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">125</div>
              <div className="text-sm opacity-90">Atletas Premiados</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">45</div>
              <div className="text-sm opacity-90">Seleção Nacional</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">89</div>
              <div className="text-sm opacity-90">Jovens Talentos</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Atletas Destaque</TabsTrigger>
            <TabsTrigger value="national">Seleção Nacional</TabsTrigger>
            <TabsTrigger value="youth">Jovens Talentos</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAthletes.map((athlete) => (
                <Card key={athlete.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={athlete.photo} 
                      alt={athlete.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-cv-blue">{athlete.position}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{athlete.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {athlete.age} anos • {athlete.height}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {athlete.club}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="font-bold text-cv-blue">{athlete.stats.ppg}</div>
                        <div className="text-xs text-gray-500">PPG</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-cv-blue">{athlete.stats.rpg}</div>
                        <div className="text-xs text-gray-500">RPG</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-cv-blue">{athlete.stats.apg}</div>
                        <div className="text-xs text-gray-500">APG</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {athlete.achievements.map((achievement, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="national" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convocados Atuais da Seleção Nacional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nationalTeamPlayers.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm text-gray-600">{player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cv-blue">{player.caps}</div>
                        <div className="text-xs text-gray-500">jogos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="youth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Promessas do Basquetebol Cabo-verdiano</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {youngTalents.map((talent, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-cv-blue/10 rounded-lg">
                      <div className="w-20 h-20 bg-cv-blue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="w-10 h-10 text-cv-blue" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{talent.name}</h3>
                      <p className="text-gray-600 mb-1">{talent.age} anos</p>
                      <p className="text-sm text-gray-500 mb-2">{talent.position}</p>
                      <Badge variant="outline">{talent.club}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Marcadores Liga Nacional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <span className="font-semibold">1. João Santos</span>
                      <span className="font-bold text-yellow-600">21.3 PPG</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                      <span className="font-semibold">2. Carlos Silva</span>
                      <span className="font-bold text-gray-600">18.5 PPG</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                      <span className="font-semibold">3. Miguel Costa</span>
                      <span className="font-bold text-orange-600">16.8 PPG</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Melhores Assistentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <span className="font-semibold">1. Ana Monteiro</span>
                      <span className="font-bold text-blue-600">7.9 APG</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <span className="font-semibold">2. Pedro Lima</span>
                      <span className="font-bold text-green-600">6.2 APG</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                      <span className="font-semibold">3. Rui Santos</span>
                      <span className="font-bold text-purple-600">5.8 APG</span>
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

export default AtletasPage;
