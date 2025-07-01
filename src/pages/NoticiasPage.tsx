
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye } from 'lucide-react';

const NoticiasPage = () => {
  const news = [
    {
      id: 1,
      title: "CD Travadores Vence Clássico Contra Sporting",
      excerpt: "Em jogo emocionante no Pavilhão Adão Silvestre, os Travadores venceram por 85-78...",
      date: "2025-01-15",
      author: "Redação FCBB",
      category: "Liga Nacional",
      views: 1250,
      image: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    },
    {
      id: 2,
      title: "Abertura da Época 2024/25 com Record de Participação",
      excerpt: "A nova época arrancou com 16 equipas na Liga Nacional, o maior número de sempre...",
      date: "2025-01-12",
      author: "João Silva",
      category: "Competições",
      views: 890,
      image: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    },
    {
      id: 3,
      title: "Formação de Árbitros Chega a São Vicente",
      excerpt: "A FCBB promoveu mais uma ação de formação para árbitros regionais...",
      date: "2025-01-10",
      author: "Maria Santos",
      category: "Formação",
      views: 567,
      image: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    }
  ];

  const categories = [
    { name: "Todas", count: 45, active: true },
    { name: "Liga Nacional", count: 18, active: false },
    { name: "Competições", count: 12, active: false },
    { name: "Formação", count: 8, active: false },
    { name: "Internacional", count: 7, active: false }
  ];

  return (
    <PageLayout 
      title="Notícias"
      description="Fique a par de todas as novidades do basquetebol cabo-verdiano"
    >
      <div className="space-y-8">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              className={`px-4 py-2 cursor-pointer text-sm ${
                category.active 
                  ? 'bg-cv-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-cv-blue hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Featured News */}
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={news[0].image} 
                alt={news[0].title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <Badge className="bg-cv-blue text-white mb-3">
                {news[0].category}
              </Badge>
              <h2 className="text-2xl font-bold text-cv-blue mb-3">{news[0].title}</h2>
              <p className="text-gray-600 mb-4">{news[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(news[0].date).toLocaleDateString('pt-PT')}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {news[0].author}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {news[0].views}
                  </div>
                </div>
                <Button className="bg-cv-blue hover:bg-blue-700">
                  Ler Mais
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(1).map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="border-cv-blue text-cv-blue mb-2 text-xs">
                  {article.category}
                </Badge>
                <h3 className="font-bold text-cv-blue mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.date).toLocaleDateString('pt-PT')}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
                  Ler Artigo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
            Carregar Mais Notícias
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NoticiasPage;
