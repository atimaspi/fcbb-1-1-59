
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const FibaStyleNews = () => {
  const featuredNews = {
    id: 1,
    title: "Liga Nacional 2023/24: CD Travadores lidera após 8ª jornada",
    excerpt: "Com uma vitória convincente sobre o Sporting CV por 89-76, o CD Travadores mantém-se na liderança da Liga Nacional com 8 vitórias em 8 jogos.",
    image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=2970",
    category: "Liga Nacional",
    date: "2024-01-15",
    readTime: "3 min",
    views: "2.4k"
  };

  const regularNews = [
    {
      id: 2,
      title: "Seleção Nacional convocada para o Afrobasket 2024",
      excerpt: "O técnico nacional convocou 16 jogadores para os treinos preparatórios",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2970",
      category: "Seleção Nacional",
      date: "2024-01-14",
      readTime: "2 min"
    },
    {
      id: 3,
      title: "Novo pavilhão inaugurado na cidade da Praia",
      excerpt: "Infraestrutura com capacidade para 2.000 espectadores",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2969",
      category: "Infraestruturas",
      date: "2024-01-13",
      readTime: "4 min"
    },
    {
      id: 4,
      title: "Taça de Cabo Verde: Sorteio dos quartos-de-final",
      excerpt: "Confrontos definidos para a próxima fase da competição",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990",
      category: "Taça CV",
      date: "2024-01-12",
      readTime: "2 min"
    },
    {
      id: 5,
      title: "Workshop de arbitragem realizado em São Vicente",
      excerpt: "25 árbitros participaram na formação avançada",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=2970",
      category: "Formação",
      date: "2024-01-11",
      readTime: "3 min"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="cv-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cv-blue mb-4">
            Últimas Notícias
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mantenha-se atualizado com tudo o que acontece no basquetebol cabo-verdiano
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured News - Large Card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="relative">
                <img 
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-cv-red text-white border-none">
                  {featuredNews.category}
                </Badge>
                <div className="absolute bottom-4 right-4 flex items-center text-white text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  {featuredNews.views}
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cv-blue mb-4 group-hover:text-cv-red transition-colors">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredNews.date).toLocaleDateString('pt-PT')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredNews.readTime}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-cv-blue hover:text-cv-red hover:bg-cv-blue/5 p-0"
                    asChild
                  >
                    <Link to={`/noticias/${featuredNews.id}`}>
                      Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regular News - Smaller Cards */}
          <div className="space-y-6">
            {regularNews.map((news) => (
              <Card key={news.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="flex">
                  <div className="w-24 h-20 flex-shrink-0">
                    <img 
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex-1">
                    <Badge variant="outline" className="text-xs mb-2 border-cv-blue text-cv-blue">
                      {news.category}
                    </Badge>
                    <h4 className="font-semibold text-sm text-cv-blue mb-2 group-hover:text-cv-red transition-colors line-clamp-2">
                      {news.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                      <span>{new Date(news.date).toLocaleDateString('pt-PT')}</span>
                      <span>•</span>
                      <span>{news.readTime}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white"
              asChild
            >
              <Link to="/noticias">
                Ver Todas as Notícias
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FibaStyleNews;
