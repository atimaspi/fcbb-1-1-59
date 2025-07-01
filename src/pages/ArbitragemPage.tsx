
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Whistle, Users, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';

const ArbitragemPage = () => {
  const referees = [
    {
      name: "José Silva",
      level: "Internacional",
      experience: "15 anos",
      games: 245,
      speciality: "Liga Nacional",
      photo: "https://via.placeholder.com/150x150?text=JS"
    },
    {
      name: "Maria Santos",
      level: "Nacional A",
      experience: "8 anos",
      games: 156,
      speciality: "Liga Feminina",
      photo: "https://via.placeholder.com/150x150?text=MS"
    },
    {
      name: "António Costa",
      level: "Nacional B",
      experience: "5 anos",
      games: 89,
      speciality: "Competições Jovens",
      photo: "https://via.placeholder.com/150x150?text=AC"
    }
  ];

  const courses = [
    {
      title: "Curso Básico de Arbitragem",
      duration: "40 horas",
      date: "15-17 Março 2024",
      level: "Iniciante",
      price: "Gratuito",
      status: "Inscrições Abertas"
    },
    {
      title: "Arbitragem Avançada - Nível Nacional",
      duration: "60 horas",
      date: "22-25 Abril 2024",
      level: "Avançado",
      price: "2.500 CVE",
      status: "Brevemente"
    },
    {
      title: "Oficina de VAR no Basquetebol",
      duration: "16 horas",
      date: "10-11 Maio 2024",
      level: "Especialização",
      price: "1.500 CVE",
      status: "Inscrições Abertas"
    }
  ];

  const regulations = [
    { title: "Regulamento FIBA 2023", type: "PDF", size: "2.1 MB" },
    { title: "Manual do Árbitro FCBB", type: "PDF", size: "1.8 MB" },
    { title: "Guia de Sinalizações", type: "PDF", size: "950 KB" },
    { title: "Código de Ética", type: "PDF", size: "450 KB" }
  ];

  return (
    <PageLayout 
      title="Arbitragem"
      description="Centro de formação e informação para árbitros de basquetebol em Cabo Verde"
    >
      <div className="space-y-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-cv-blue text-white">
            <CardContent className="p-6 text-center">
              <Whistle className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">85</div>
              <div className="text-sm opacity-90">Árbitros Ativos</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">Instrutores</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">24</div>
              <div className="text-sm opacity-90">Cursos Realizados</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-sm opacity-90">Árbitros Internacionais</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="referees" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="referees">Árbitros</TabsTrigger>
            <TabsTrigger value="courses">Formação</TabsTrigger>
            <TabsTrigger value="rules">Regulamentos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="referees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Árbitros em Destaque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {referees.map((referee, index) => (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                      <img 
                        src={referee.photo} 
                        alt={referee.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-bold text-lg mb-2">{referee.name}</h3>
                      <Badge className="mb-3 bg-cv-blue">{referee.level}</Badge>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>{referee.experience} de experiência</div>
                        <div>{referee.games} jogos arbitrados</div>
                        <div className="font-medium text-cv-blue">{referee.speciality}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">{course.title}</h3>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span>Duração:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span className="font-medium">{course.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nível:</span>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Preço:</span>
                        <span className="font-bold text-cv-blue">{course.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={course.status === "Inscrições Abertas" ? "default" : "secondary"}
                        className={course.status === "Inscrições Abertas" ? "bg-green-500" : ""}
                      >
                        {course.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-cv-blue hover:bg-blue-700"
                        disabled={course.status !== "Inscrições Abertas"}
                      >
                        {course.status === "Inscrições Abertas" ? "Inscrever" : "Ver Detalhes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos e Regulamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regulations.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <BookOpen className="w-8 h-8 text-cv-blue" />
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Níveis de Arbitragem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">Nível Internacional</h4>
                    <p className="text-blue-700 text-sm">
                      Árbitros qualificados para competições internacionais FIBA. Requer certificação internacional.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-800 mb-2">Nacional A</h4>
                    <p className="text-green-700 text-sm">
                      Árbitros para Liga Nacional e competições principais. Mínimo 5 anos de experiência.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-semibold text-yellow-800 mb-2">Nacional B</h4>
                    <p className="text-yellow-700 text-sm">
                      Árbitros para competições regionais e de formação. Entrada no sistema nacional.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-gray-500 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">Regional</h4>
                    <p className="text-gray-700 text-sm">
                      Árbitros iniciantes para competições locais e de base.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
                  Próximos Eventos de Arbitragem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="bg-cv-blue text-white px-3 py-1 rounded-lg text-sm font-bold">15</div>
                      <div className="text-xs text-gray-600">MAR</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Curso Básico de Arbitragem</h4>
                      <p className="text-sm text-gray-600">Pavilhão Municipal da Praia</p>
                      <Badge variant="outline" className="mt-2">Formação</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">22</div>
                      <div className="text-xs text-gray-600">MAR</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Reunião Técnica de Árbitros</h4>
                      <p className="text-sm text-gray-600">Sede da FCBB</p>
                      <Badge variant="outline" className="mt-2">Reunião</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                    <div className="text-center">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold">10</div>
                      <div className="text-xs text-gray-600">ABR</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Exame de Progressão - Nível Nacional A</h4>
                      <p className="text-sm text-gray-600">Centro de Formação</p>
                      <Badge variant="outline" className="mt-2">Avaliação</Badge>
                    </div>
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

export default ArbitragemPage;
