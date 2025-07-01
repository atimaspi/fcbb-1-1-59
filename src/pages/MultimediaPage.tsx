
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Image, Video, Camera, Download, Eye, Calendar, Search } from 'lucide-react';
import { useState } from 'react';

const MultimediaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const videos = [
    {
      id: 1,
      title: "Final Liga Nacional 2024 - Melhores Momentos",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "8:45",
      views: "12.5K",
      category: "Highlights",
      date: "2024-06-15",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      title: "Cabo Verde vs Senegal - AfroBasket Qualificação",
      thumbnail: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "95:30",
      views: "25.3K",
      category: "Jogos Completos",
      date: "2024-02-15",
      competition: "AfroBasket Qualif."
    },
    {
      id: 3,
      title: "Entrevista: Selecionador Nacional após vitória",
      thumbnail: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "12:15",
      views: "5.7K",
      category: "Entrevistas",
      date: "2024-02-18",
      competition: "AfroBasket Qualif."
    },
    {
      id: 4,
      title: "Cerimónia de Abertura Liga Nacional 2024",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "25:00",
      views: "8.9K",
      category: "Eventos",
      date: "2024-10-15",
      competition: "Liga Nacional"
    }
  ];

  const photoGalleries = [
    {
      id: 1,
      title: "Final Liga Nacional Masculina 2024",
      photos: 48,
      cover: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&h=300&q=80",
      date: "2024-06-15",
      category: "Competições"
    },
    {
      id: 2,
      title: "Seleção Nacional - Estágio de Preparação",
      photos: 32,
      cover: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=400&h=300&q=80",
      date: "2024-02-10",
      category: "Seleções"
    },
    {
      id: 3,
      title: "Workshop de Arbitragem - São Vicente",
      photos: 24,
      cover: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?auto=format&fit=crop&w=400&h=300&q=80",
      date: "2024-03-20",
      category: "Formação"
    },
    {
      id: 4,
      title: "Assembleia Geral FCBB 2024",
      photos: 16,
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300&q=80",
      date: "2024-04-12",
      category: "Eventos Oficiais"
    }
  ];

  const liveStreams = [
    {
      title: "Liga Nacional - Jornada 18",
      status: "Ao Vivo",
      viewers: 1234,
      startTime: "20:00",
      teams: "Sporting CV vs CD Travadores"
    },
    {
      title: "Liga Feminina - Semifinal",
      status: "Em Breve",
      viewers: 0,
      startTime: "21:30", 
      teams: "Académica vs Mindelense"
    }
  ];

  const categories = ['Highlights', 'Jogos Completos', 'Entrevistas', 'Eventos', 'Seleções', 'Formação'];

  return (
    <PageLayout 
      title="Multimédia"
      description="Galeria de fotos, vídeos e transmissões ao vivo do basquetebol cabo-verdiano"
    >
      <div className="space-y-8">
        {/* Transmissões ao Vivo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
              FCBB TV - Ao Vivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveStreams.map((stream, index) => (
                <Card key={index} className="border-2 border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={stream.status === "Ao Vivo" ? "destructive" : "secondary"}>
                        {stream.status}
                      </Badge>
                      {stream.status === "Ao Vivo" && (
                        <span className="text-sm text-gray-600 flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {stream.viewers} espectadores
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold mb-1">{stream.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{stream.teams}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{stream.startTime}</span>
                      <Button 
                        size="sm" 
                        variant={stream.status === "Ao Vivo" ? "destructive" : "outline"}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {stream.status === "Ao Vivo" ? "Assistir" : "Agendar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Multimédia */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="live">Arquivo de Transmissões</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            {/* Filtros de Vídeo */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Pesquisar vídeos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent"
                  >
                    <option value="todos">Todas as Categorias</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Grid de Vídeos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                    <Badge className="absolute top-2 left-2 bg-cv-blue text-white">
                      {video.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-cv-blue transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" />
                        {video.views}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {video.date}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {video.competition}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            {/* Grid de Galerias de Fotos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoGalleries.map((gallery) => (
                <Card key={gallery.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={gallery.cover} 
                      alt={gallery.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                    <Badge className="absolute top-2 left-2 bg-cv-blue text-white">
                      {gallery.photos} fotos
                    </Badge>
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      {gallery.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-cv-blue transition-colors">
                      {gallery.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Image className="mr-1 h-3 w-3" />
                        {gallery.photos} imagens
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {gallery.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="w-5 h-5 mr-2 text-cv-blue" />
                  Arquivo de Transmissões
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Final Liga Nacional 2024 - Jogo Completo", date: "2024-06-15", duration: "2:05:30", views: "8.2K" },
                    { title: "Cabo Verde vs Guiné-Bissau - AfroBasket Qualif.", date: "2024-02-18", duration: "1:55:45", views: "15.7K" },
                    { title: "Semifinal Taça CV - Sporting vs Travadores", date: "2024-05-20", duration: "1:48:20", views: "6.3K" },
                    { title: "Assembleia Geral FCBB 2024", date: "2024-04-12", duration: "3:15:10", views: "2.1K" }
                  ].map((stream, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">{stream.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{stream.date}</span>
                                <span>{stream.duration}</span>
                                <span>{stream.views} visualizações</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Assistir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Canal FCBB */}
        <Card className="bg-gradient-to-r from-cv-blue to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Canal FCBB</h3>
              <p className="mb-6 opacity-90">
                Subscreva o nosso canal para não perder nenhum momento do basquetebol cabo-verdiano
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">2.5K</div>
                  <div className="text-sm opacity-80">Subscritores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm opacity-80">Vídeos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">890K</div>
                  <div className="text-sm opacity-80">Visualizações</div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="secondary">
                  <Video className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-cv-blue">
                  Facebook
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-cv-blue">
                  Instagram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MultimediaPage;
