
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const RealNewsSection = () => {
  const { news, loading, error } = useRealFCBBData();

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

  if (loading) {
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

  if (error) {
    return (
      <section className="py-20">
        <div className="cv-container">
          <div className="text-center text-red-600">
            <p>Erro ao carregar notícias: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredNews = news.slice(0, 4);

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
            Acompanhe as novidades do basquetebol cabo-verdiano
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredNews.map((item, index) => (
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
                      src={item.image_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc"}
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

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-cv-red text-white text-xs font-bold border-0 shadow-lg">
                        Destaque
                      </Badge>
                    </div>
                  )}
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
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-cv-blue" />
                      <time dateTime={item.created_at}>
                        {format(new Date(item.created_at), 'dd MMM, yyyy', { locale: ptBR })}
                      </time>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-cv-red" />
                      <span>{item.author}</span>
                    </div>
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

export default RealNewsSection;
