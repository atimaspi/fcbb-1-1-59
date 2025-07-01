
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Eye, Clock, Search, Filter, Calendar } from 'lucide-react';

const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const videos = [
    {
      id: 1,
      title: "Melhores momentos: ABC vs Sporting - Final da Liga Nacional",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "8:45",
      views: "12.5K",
      category: "Highlights",
      date: "há 2 dias",
      description: "Os melhores momentos da emocionante final da Liga Nacional Masculina."
    },
    {
      id: 2,
      title: "Treino da Seleção Nacional Masculina - Preparação para o AfroBasket",
      thumbnail: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "15:30",
      views: "8.2K",
      category: "Seleções",
      date: "há 5 dias",
      description: "Acompanhe os treinos intensivos da nossa seleção nacional."
    },
    {
      id: 3,
      title: "Entrevista: Técnico Carlos Silva fala sobre a nova época",
      thumbnail: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "22:15",
      views: "5.7K",
      category: "Entrevistas",
      date: "há 1 semana",
      description: "O treinador da seleção nacional partilha as suas expectativas."
    },
    {
      id: 4,
      title: "Resumo Jornada 15 - Liga Nacional Feminina",
      thumbnail: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "6:20",
      views: "4.1K",
      category: "Highlights",
      date: "há 3 dias",
      description: "Todos os golos e melhores jogadas da jornada."
    },
    {
      id: 5,
      title: "Cerimónia de Abertura do Campeonato Regional de São Vicente",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "12:00",
      views: "3.8K",
      category: "Eventos",
      date: "há 2 semanas",
      description: "A festa de abertura do campeonato regional em Mindelo."
    },
    {
      id: 6,
      title: "Documentário: História do Basquetebol em Cabo Verde",
      thumbnail: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=400&h=225&q=80",
      duration: "45:30",
      views: "15.3K",
      category: "Documentários",
      date: "há 1 mês",
      description: "A evolução do basquetebol cabo-verdiano desde os primórdios."
    }
  ];

  const categories = ['Highlights', 'Seleções', 'Entrevistas', 'Eventos', 'Documentários', 'Treinos'];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'todos' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout title="Vídeos FCBB">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Pesquisar vídeos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
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
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Vista em Grelha</TabsTrigger>
            <TabsTrigger value="list">Vista em Lista</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
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
                    <Badge className="absolute top-2 left-2 bg-cv-red text-white">
                      {video.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-cv-blue transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" />
                        {video.views}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {video.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg hover:text-cv-blue transition-colors cursor-pointer">
                            {video.title}
                          </h3>
                          <Badge className="bg-cv-red text-white ml-2">
                            {video.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {video.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            {video.views} visualizações
                          </span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {video.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredVideos.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Play className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhum vídeo encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou termos de pesquisa.
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Subscreva o nosso canal</h3>
            <p className="text-gray-600 mb-4">
              Mantenha-se atualizado com os últimos vídeos do basquetebol cabo-verdiano.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                YouTube
              </Button>
              <Button variant="outline">
                Facebook
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Instagram
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VideosPage;
