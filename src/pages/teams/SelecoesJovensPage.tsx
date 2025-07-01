
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Users, Target, BookOpen, Award } from 'lucide-react';

const SelecoesJovensPage = () => {
  const categories = [
    {
      name: "Sub-18 Masculino",
      coach: "Pedro Santos",
      players: 15,
      nextGame: "vs Senegal - 20 Jul 2024",
      lastResult: "V 89-75 vs Gâmbia",
      objective: "Qualificação AfroBasket U18"
    },
    {
      name: "Sub-18 Feminino", 
      coach: "Maria Fernandes",
      players: 12,
      nextGame: "vs Mali - 22 Jul 2024",
      lastResult: "D 67-72 vs Angola",
      objective: "Qualificação AfroBasket U18"
    },
    {
      name: "Sub-16 Masculino",
      coach: "João Rodrigues",
      players: 14,
      nextGame: "Torneio Regional - Ago 2024",
      lastResult: "V 95-68 vs Guiné-Bissau",
      objective: "Desenvolvimento de Talentos"
    },
    {
      name: "Sub-16 Feminino",
      coach: "Ana Silva",
      players: 13,
      nextGame: "Torneio Regional - Ago 2024", 
      lastResult: "V 78-65 vs Mauritânia",
      objective: "Desenvolvimento de Talentos"
    }
  ];

  const developmentPrograms = [
    {
      title: "Academia Nacional de Basquetebol",
      description: "Programa de formação para jovens talentos dos 12 aos 18 anos",
      participants: 45,
      locations: ["Praia", "Mindelo", "Sal"]
    },
    {
      title: "Campus de Verão",
      description: "Estágios intensivos durante as férias escolares",
      participants: 120,
      locations: ["Santiago", "São Vicente", "Sal", "Fogo"]
    },
    {
      title: "Escola de Treinadores Jovens",
      description: "Formação de treinadores especializados em categorias jovens",
      participants: 25,
      locations: ["Praia", "Mindelo"]
    }
  ];

  const upcomingTournaments = [
    { name: "AfroBasket U18 Masculino", date: "Ago 2024", location: "Madagáscar", status: "Qualificados" },
    { name: "AfroBasket U18 Feminino", date: "Set 2024", location: "Moçambique", status: "Em Qualificação" },
    { name: "Torneio Regional Sub-16", date: "Ago 2024", location: "Cabo Verde", status: "Organizadores" },
    { name: "Jogos das Ilhas U18", date: "Nov 2024", location: "Maldivas", status: "Convidados" }
  ];

  const recentAchievements = [
    { category: "Sub-18 M", achievement: "Campeões Torneio ECOWAS", year: 2024 },
    { category: "Sub-16 F", achievement: "3º lugar AfroBasket U16", year: 2023 },
    { category: "Sub-18 F", achievement: "Melhor Progressão África", year: 2023 },
    { category: "Sub-16 M", achievement: "Campeões Jogos das Ilhas", year: 2023 }
  ];

  const statistics = [
    { label: "Categorias Ativas", value: "4", icon: Trophy },
    { label: "Jovens em Formação", value: "54", icon: Users },
    { label: "Torneios por Ano", value: "8", icon: Target },
    { label: "Programas de Desenvolvimento", value: "3", icon: BookOpen }
  ];

  return (
    <PageLayout title="Seleções Jovens">
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

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Formação do Futuro</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              As Seleções Jovens de Cabo Verde representam o futuro do basquetebol nacional, desenvolvendo 
              jovens talentos através de programas estruturados de formação e competições internacionais. 
              O nosso objetivo é preparar a próxima geração de jogadores para as seleções seniores.
            </p>
            <p>
              Com categorias Sub-16 e Sub-18 para ambos os géneros, oferecemos um caminho claro de 
              desenvolvimento desportivo, combinando formação técnica, tática e educacional.
            </p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="tournaments">Torneios</TabsTrigger>
            <TabsTrigger value="development">Formação</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant="outline">{category.players} jogadores</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Treinador:</div>
                      <div className="font-semibold">{category.coach}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600">Objetivo 2024:</div>
                      <div className="font-semibold text-cv-blue">{category.objective}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Próximo Jogo:</div>
                        <div className="text-sm">{category.nextGame}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-600">Último Resultado:</div>
                        <div className="text-sm font-semibold text-green-600">{category.lastResult}</div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">Ver Plantel Completo</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tournaments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Torneios 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTournaments.map((tournament, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-8 w-8 text-cv-blue" />
                        <div>
                          <div className="font-semibold">{tournament.name}</div>
                          <div className="text-sm text-gray-600">{tournament.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">{tournament.date}</Badge>
                        <div className={`text-sm font-medium ${
                          tournament.status === 'Qualificados' ? 'text-green-600' :
                          tournament.status === 'Em Qualificação' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {tournament.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="development" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Programas de Desenvolvimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {developmentPrograms.map((program, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{program.title}</h3>
                          <p className="text-gray-600">{program.description}</p>
                        </div>
                        <Badge>{program.participants} participantes</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600">Localizações:</span>
                        {program.locations.map((location, locIndex) => (
                          <Badge key={locIndex} variant="outline" className="text-xs">
                            {location}
                          </Badge>
                        ))}
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
                <CardTitle>Conquistas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div>
                          <div className="font-semibold">{achievement.achievement}</div>
                          <div className="text-sm text-gray-600">{achievement.category}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-cv-blue">{achievement.year}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jogadores Promovidos às Seleções Seniores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Carlos Silva", fromCategory: "Sub-18 M", toTeam: "Seleção A Masculina", year: 2024 },
                    { name: "Ana Costa", fromCategory: "Sub-18 F", toTeam: "Seleção A Feminina", year: 2024 },
                    { name: "João Santos", fromCategory: "Sub-18 M", toTeam: "Seleção A Masculina", year: 2023 },
                    { name: "Maria Pereira", fromCategory: "Sub-18 F", toTeam: "Seleção A Feminina", year: 2023 }
                  ].map((player, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-gray-600">{player.fromCategory} → {player.toTeam}</div>
                      <div className="text-xs text-cv-blue font-medium">{player.year}</div>
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

export default SelecoesJovensPage;
