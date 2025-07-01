
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FibaNewsSection = () => {
  const mainNews = {
    id: 1,
    title: "Final da Liga Nacional promete espetáculo em Santiago",
    summary: "As duas melhores equipas da época encontram-se no pavilhão da Praia para decidir o campeão nacional de basquetebol.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200",
    category: "Liga Nacional",
    date: "2024-06-24",
    featured: true
  };

  const sideNews = [
    {
      id: 2,
      title: "Seleção Nacional prepara-se para o AfroBasket",
      summary: "Convocados 16 jogadores para o estágio de preparação",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=400",
      category: "Seleção",
      date: "2024-06-23"
    },
    {
      id: 3,
      title: "Novo pavilhão inaugurado em São Vicente",
      summary: "Modernas instalações vêm reforçar a infraestrutura desportiva",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400",
      category: "Infraestrutura",
      date: "2024-06-22"
    },
    {
      id: 4,
      title: "Academia FCBB forma jovens talentos",
      summary: "Programa de desenvolvimento chega a todas as ilhas",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400",
      category: "Formação",
      date: "2024-06-21"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="cv-container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2 font-display">
              ÚLTIMAS NOTÍCIAS
            </h2>
            <p className="text-gray-600 text-lg">
              Mantenha-se atualizado com o basquetebol cabo-verdiano
            </p>
          </div>
          <Button variant="outline" className="border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white" asChild>
            <Link to="/noticias">
              Ver Todas <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured News */}
          <div className="lg:col-span-2">
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={mainNews.image} 
                  alt={mainNews.title}
                  className="w-full h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <Badge className="bg-cv-red text-white border-none">
                    {mainNews.category}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {mainNews.title}
                  </h3>
                  <p className="text-gray-200 mb-3">
                    {mainNews.summary}
                  </p>
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(mainNews.date)}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Side News */}
          <div className="space-y-6">
            {sideNews.map((news) => (
              <Card key={news.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <Badge className="bg-cv-blue text-white border-none text-xs mb-2">
                        {news.category}
                      </Badge>
                      <h4 className="font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-cv-blue transition-colors text-sm">
                        {news.title}
                      </h4>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {news.summary}
                      </p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(news.date)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FibaNewsSection;
