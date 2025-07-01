
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useContentData } from '@/hooks/useContentData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

const NoticiasSection = () => {
  const { newsData, isContentLoading } = useContentData();

  // Fallback para notícias estáticas (otimizado)
  const fallbackNews = [
    {
      id: "1",
      title: "ABC vence a SuperTaça de Cabo Verde 2025",
      excerpt: "Em jogo emocionante, o ABC da Praia conquistou a SuperTaça ao vencer o Sporting por 78-72.",
      published_at: "2025-03-23T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      category: "Competições",
      author: "FCBB Media"
    },
    {
      id: "2",
      title: "Seleção Nacional convoca 20 jogadores para o AfroBasket",
      excerpt: "O selecionador nacional anunciou a lista de 20 atletas que representarão Cabo Verde na competição continental.",
      published_at: "2025-03-20T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
      category: "Seleções",
      author: "FCBB Media"
    },
    {
      id: "3",
      title: "Final Four da Liga Nacional em São Vicente",
      excerpt: "As meias-finais e final da Liga Nacional decorrerão no Pavilhão Adérito Sena, em Mindelo.",
      published_at: "2025-03-15T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a",
      category: "Competições",
      author: "FCBB Media"
    },
    {
      id: "4",
      title: "Workshop para treinadores na Praia",
      excerpt: "Formação técnica reunirá 30 treinadores de todo o país para atualização de conhecimentos.",
      published_at: "2025-03-10T00:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
      category: "Formação",
      author: "FCBB Media"
    }
  ];

  const newsToShow = newsData?.length > 0 ? newsData.slice(0, 4) : fallbackNews;

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'competições':
        return 'bg-cv-blue text-white';
      case 'seleções':
        return 'bg-cv-red text-white';
      case 'formação':
        return 'bg-cv-yellow text-cv-blue';
      case 'clubes':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isContentLoading) {
    return (
      <section className="py-20">
        <div className="cv-container">
          <div className="text-center mb-12">
            <div className="fcbb-skeleton h-12 w-64 mx-auto mb-4"></div>
            <div className="fcbb-skeleton h-6 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-96 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-cv-blue mb-6">
            Últimas Notícias
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fique a par de todas as novidades do basquetebol cabo-verdiano
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newsToShow.map((item, index) => (
            <motion.article 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group h-full"
            >
              <Card className="h-full overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                <div className="relative">
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.featured_image_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(item.category)} text-xs font-bold border-0 shadow-lg`}>
                      <Tag className="w-3 h-3 mr-1" />
                      {item.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Title */}  
                  <h3 className="font-bold text-lg mb-3 line-clamp-2 leading-tight group-hover:text-cv-blue transition-colors duration-300 font-display">
                    {item.title}
                  </h3>
                  
                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {item.excerpt}
                    </p>
                  )}
                  
                  {/* Meta Info */}
                  <div className="space-y-3 text-xs text-gray-500 border-t border-gray-100 pt-4">
                    {item.published_at && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-cv-blue" />
                        <time dateTime={item.published_at}>
                          {format(new Date(item.published_at), 'dd MMM, yyyy', { locale: ptBR })}
                        </time>
                      </div>
                    )}
                    
                    {item.author && (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-cv-red" />
                        <span>{item.author}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Read More */}
                  <div className="mt-4">
                    <motion.button 
                      className="flex items-center space-x-2 text-cv-blue hover:text-blue-700 font-semibold text-sm group/btn"
                      whileHover={{ x: 5 }}
                    >
                      <span>Ler mais</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                </CardContent>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-cv-blue via-cv-yellow to-cv-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="/noticias" 
            className="inline-flex items-center space-x-3 px-8 py-4 bg-cv-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl group font-display"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Ver Todas as Notícias</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default NoticiasSection;
