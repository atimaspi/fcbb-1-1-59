
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Video, Radio } from 'lucide-react';

const TransmissoesPage = () => {
  const [selectedStream, setSelectedStream] = useState<number | null>(null);

  const liveStreams = [
    {
      id: 1,
      title: 'ABC Basquete vs Sporting CP',
      competition: 'Liga Nacional',
      status: 'ao-vivo',
      viewers: 324,
      quality: 'HD',
      platform: 'YouTube',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const upcomingStreams = [
    {
      id: 2,
      title: 'FC Porto vs CD Travadores',
      competition: 'Liga Nacional',
      date: '25/05/2025',
      time: '18:00',
      platform: 'Facebook Live'
    },
    {
      id: 3,
      title: 'Final da Taça de Cabo Verde',
      competition: 'Taça CV',
      date: '30/05/2025',
      time: '20:00',
      platform: 'YouTube'
    },
    {
      id: 4,
      title: 'Assembleia Geral FCBB',
      competition: 'Institucional',
      date: '5/06/2025',
      time: '10:00',
      platform: 'Zoom'
    }
  ];

  const highlights = [
    {
      id: 1,
      title: 'Melhores Jogadas - Jornada 18',
      duration: '05:32',
      views: 1205,
      date: '22/05/2025',
      thumbnail: 'https://via.placeholder.com/300x180?text=Highlights'
    },
    {
      id: 2,
      title: 'Resumo: ABC 85-72 Sporting',
      duration: '03:45',
      views: 856,
      date: '20/05/2025',
      thumbnail: 'https://via.placeholder.com/300x180?text=Resumo'
    },
    {
      id: 3,
      title: 'Entrevista Técnico ABC',
      duration: '08:15',
      views: 542,
      date: '18/05/2025',
      thumbnail: 'https://via.placeholder.com/300x180?text=Entrevista'
    }
  ];

  const podcastEpisodes = [
    {
      id: 1,
      title: 'Análise da Liga Nacional',
      description: 'Discussão sobre a fase final do campeonato',
      duration: '45:20',
      date: '23/05/2025',
      plays: 234
    },
    {
      id: 2,
      title: 'História do Basquetebol CV',
      description: 'Especial sobre a evolução do basquete em Cabo Verde',
      duration: '38:15',
      date: '16/05/2025',
      plays: 189
    },
    {
      id: 3,
      title: 'Jovens Promessas',
      description: 'Conversa sobre os novos talentos cabo-verdianos',
      duration: '52:30',
      date: '09/05/2025',
      plays: 156
    }
  ];

  return (
    <PageLayout title="Transmissões">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ao Vivo</CardTitle>
            <Video className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">{liveStreams.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espectadores</CardTitle>
            <Play className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">324</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">{upcomingStreams.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Podcasts</CardTitle>
            <Radio className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">{podcastEpisodes.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {/* Live Streams */}
        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Transmissões ao Vivo</h2>
          {liveStreams.length > 0 ? (
            <div className="space-y-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="border-l-4 border-red-500">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        {selectedStream === stream.id ? (
                          <div className="aspect-video bg-black rounded-lg overflow-hidden">
                            <iframe
                              width="100%"
                              height="100%"
                              src={stream.embedUrl}
                              title={stream.title}
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative">
                            <Button 
                              size="lg"
                              className="absolute bg-cv-blue hover:bg-blue-700"
                              onClick={() => setSelectedStream(stream.id)}
                            >
                              <Play className="mr-2 h-5 w-5" />
                              Assistir ao Vivo
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-cv-blue">{stream.title}</h3>
                          <p className="text-gray-600">{stream.competition}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            AO VIVO
                          </Badge>
                          <Badge variant="outline">{stream.quality}</Badge>
                          <Badge variant="outline">{stream.platform}</Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p>{stream.viewers} espectadores assistindo</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">Não há transmissões ao vivo neste momento.</p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Upcoming Streams */}
        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Próximas Transmissões</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingStreams.map((stream) => (
              <Card key={stream.id}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{stream.title}</h3>
                  <p className="text-gray-600 mb-4">{stream.competition}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span className="font-medium">{stream.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hora:</span>
                      <span className="font-medium">{stream.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plataforma:</span>
                      <Badge variant="outline">{stream.platform}</Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-cv-blue hover:bg-blue-700">
                    Definir Lembrete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-t-lg">
                      <Button size="lg" className="bg-cv-blue hover:bg-blue-700">
                        <Play className="mr-2 h-5 w-5" />
                        Assistir
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{video.views} visualizações</span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Podcasts */}
        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Podcasts</h2>
          <div className="space-y-4">
            {podcastEpisodes.map((episode) => (
              <Card key={episode.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{episode.title}</h3>
                      <p className="text-gray-600 mb-2">{episode.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{episode.duration}</span>
                        <span>{episode.date}</span>
                        <span>{episode.plays} reproduções</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button className="bg-cv-blue hover:bg-blue-700">
                        <Play className="mr-2 h-4 w-4" />
                        Ouvir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default TransmissoesPage;
