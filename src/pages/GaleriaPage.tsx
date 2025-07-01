
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Calendar, Eye, Download } from 'lucide-react';

const GaleriaPage = () => {
  const galleries = [
    {
      id: 1,
      title: "Final da Liga Nacional 2024",
      date: "2024-12-15",
      photos: 45,
      views: 2340,
      cover: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      category: "Competições"
    },
    {
      id: 2,
      title: "Inauguração do Pavilhão da Várzea",
      date: "2024-11-28",
      photos: 32,
      views: 1890,
      cover: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      category: "Eventos"
    },
    {
      id: 3,
      title: "Clássico Sporting vs Travadores",
      date: "2024-11-15",
      photos: 28,
      views: 1567,
      cover: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      category: "Liga Nacional"
    },
    {
      id: 4,
      title: "Formação de Jovens Atletas",
      date: "2024-10-20",
      photos: 38,
      views: 945,
      cover: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      category: "Formação"
    },
    {
      id: 5,
      title: "Taça de Cabo Verde - Meias Finais",
      date: "2024-10-05",
      photos: 52,
      views: 2100,
      cover: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      category: "Taça CV"
    },
    {
      id: 6,
      title: "Assembleia Geral da FCBB",
      date: "2024-09-18",
      photos: 18,
      views: 567,
      cover: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png",
      category: "Institucional"
    }
  ];

  const categories = [
    { name: "Todas", active: true },
    { name: "Competições", active: false },
    { name: "Liga Nacional", active: false },
    { name: "Taça CV", active: false },
    { name: "Eventos", active: false },
    { name: "Formação", active: false }
  ];

  return (
    <PageLayout 
      title="Galeria"
      description="Reviva os melhores momentos do basquetebol cabo-verdiano"
    >
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center border-t-4 border-cv-blue">
            <CardContent className="p-4">
              <Camera className="h-6 w-6 text-cv-blue mx-auto mb-2" />
              <div className="text-xl font-bold text-cv-blue">850+</div>
              <div className="text-sm text-gray-600">Fotografias</div>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-cv-red">
            <CardContent className="p-4">
              <Calendar className="h-6 w-6 text-cv-red mx-auto mb-2" />
              <div className="text-xl font-bold text-cv-red">24</div>
              <div className="text-sm text-gray-600">Eventos</div>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-cv-yellow">
            <CardContent className="p-4">
              <Eye className="h-6 w-6 text-cv-yellow mx-auto mb-2" />
              <div className="text-xl font-bold text-cv-yellow">15.6K</div>
              <div className="text-sm text-gray-600">Visualizações</div>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-green-500">
            <CardContent className="p-4">
              <Download className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-500">3.2K</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              className={`px-4 py-2 cursor-pointer ${
                category.active 
                  ? 'bg-cv-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-cv-blue hover:text-white'
              }`}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={gallery.cover} 
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <Button 
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-cv-blue hover:bg-gray-100"
                    size="sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ver Galeria
                  </Button>
                </div>
                <Badge className="absolute top-2 left-2 bg-cv-blue text-white text-xs">
                  {gallery.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-cv-blue mb-2">{gallery.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(gallery.date).toLocaleDateString('pt-PT')}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" />
                      {gallery.photos}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {gallery.views}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
                  Ver Fotografias
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
            Carregar Mais Galerias
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default GaleriaPage;
