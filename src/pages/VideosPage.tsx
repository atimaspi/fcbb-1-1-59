
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Eye, Calendar, Clock, ThumbsUp, Share2 } from 'lucide-react';

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const featuredVideos = [
    {
      id: 1,
      title: "Final Liga Nacional 2024 - Melhores Momentos",
      thumbnail: "https://via.placeholder.com/400x225?text=Final+Liga",
      duration: "08:45",
      views: 15420,
      date: "2024-01-15",
      category: "Highlights",
      description: "Os melhores momentos da emocionante final da Liga Nacional"
    },
    {
      id: 2,
      title: "Seleção Nacional - Preparação AfroBasket",
      thumbnail: "https://via.placeholder.com/400x225?text=Selecao+Nacional",
      duration: "12:30",
      views: 8935,
      date: "2024-01-10",
      category: "Seleções",
      description: "Bastidores da preparação da seleção para o AfroBasket"
    },
    {
      id: 3,
      title: "Tutorial: Técnicas de Arremesso",
      thumbnail: "https://via.placeholder.com/400x225?text=Tutorial",
      duration: "15:20",
      views: 12680,
      date: "2024-01-08",
      category: "Formação",
      description: "Aprenda as técnicas fundamentais do arremesso no basquetebol"
    }
  ];

  const liveStreams = [
    {
      id: 'live1',
      title: 'ABC Basquete vs Sporting CV - Liga Nacional',
      status: 'ao-vivo',
      viewers: 324,
      startTime: '18:00'
    }
  ];

  const highlights = [
    {
      id: 4,
      title: "Top 10 Jogadas da Semana",
      thumbnail: "https://via.placeholder.com/300x180?text=Top+10",
      duration: "05:32",
      views: 9876,
      date: "2024-01-12"
    },
    {
      id: 5,
      title: "Resumo: CD Travadores 78-85 Académica",
      thumbnail: "https://via.placeholder.com/300x180?text=Resumo",
      duration: "07:15",
      views: 5432,
      date: "2024-01-11"
    },
    {
      id: 6,
      title: "Entrevista: Treinador do Ano 2023",
      thumbnail: "https://via.placeholder.com/300x180?text=Entrevista",
      duration: "18:45",
      views: 3210,
      date: "2024-01-09"
    }
  ];

  const tutorials = [
    {
      id: 7,
      title: "Fundamentos do Drible",
      thumbnail: "https://via.placeholder.com/300x180?text=Drible",
      duration: "12:30",
      views: 8765,
      difficulty: "Iniciante"
    },
    {
      id: 8,
      title: "Táticas Defensivas Avançadas",
      thumbnail: "https://via.placeholder.com/300x180?text=Defesa",
      duration: "22:15",
      views: 4321,
      difficulty: "Avançado"
    },
    {
      id: 9,
      title: "Preparação Física para Basquetebol",
      thumbnail: "https://via.placeholder.com/300x180?text=Fisico",
      duration: "25:40",
      views: 6543,
      difficulty: "Intermédio"
    }
  ];

  return (
    <PageLayout title="Vídeos" description="Centro de vídeos do basquetebol cabo-verdiano">
      <div className="space-y-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6 text-center">
              <Play className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-sm opacity-90">Vídeos</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-cv-blue text-white">
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">45K</div>
              <div className="text-sm opacity-90">Visualizações</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">12h</div>
              <div className="text-sm opacity-90">Conteúdo Semanal</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <ThumbsUp className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Aprovação</div>
            </CardContent>
          </Card>
        </div>

        {/* Transmissões ao Vivo */}
        {liveStreams.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-cv-blue mb-6">Ao Vivo Agora</h2>
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="border-l-4 border-red-500 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{stream.title}</h3>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          ● AO VIVO
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {stream.viewers} espectadores
                        </span>
                        <span className="text-sm text-gray-600">
                          Iniciado às {stream.startTime}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-red-500 hover:bg-red-600">
                      <Play className="mr-2 h-4 w-4" />
                      Assistir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {/* Vídeos em Destaque */}
        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Vídeos em Destaque</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                    <Button 
                      size="lg" 
                      className="bg-cv-blue hover:bg-blue-700"
                      onClick={() => setSelectedVideo(video.id.toString())}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Assistir
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">{video.category}</Badge>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {video.views.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(video.date).toLocaleDateString('pt-PT')}
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Gostar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Partilhar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conteúdo por Categorias */}
        <Tabs defaultValue="highlights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
            <TabsTrigger value="interviews">Entrevistas</TabsTrigger>
          </TabsList>

          <TabsContent value="highlights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>{new Date(video.date).toLocaleDateString('pt-PT')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge 
                        variant={video.difficulty === 'Iniciante' ? 'default' : 
                               video.difficulty === 'Intermédio' ? 'secondary' : 'destructive'}
                      >
                        {video.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">{video.title}</h3>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>{video.difficulty}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Play className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Entrevistas em Breve</h3>
              <p className="text-gray-500">
                Estamos a preparar conteúdo exclusivo com entrevistas aos principais nomes do basquetebol cabo-verdiano.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default VideosPage;
