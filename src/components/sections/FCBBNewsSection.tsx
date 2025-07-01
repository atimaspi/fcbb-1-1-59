
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useBackendData } from '@/hooks/useBackendData';
import { Link } from 'react-router-dom';

const FCBBNewsSection = () => {
  const { news, isLoading } = useBackendData();

  if (isLoading) {
    return (
      <section className="py-20 bg-fcbb-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-fcbb-dark-gray h-80 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Filtrar apenas notícias publicadas
  const publishedNews = news.filter(article => article.status === 'published').slice(0, 6);

  return (
    <section className="py-20 bg-fcbb-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-fcbb-white mb-6">
            Últimas Notícias
          </h2>
          <p className="text-xl text-fcbb-white/80 max-w-3xl mx-auto leading-relaxed">
            Mantenha-se atualizado com as últimas novidades do basquetebol cabo-verdiano
          </p>
        </motion.div>

        {publishedNews.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-fcbb-gold/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-fcbb-white mb-2">
              Nenhuma notícia disponível
            </h3>
            <p className="text-fcbb-white/60">
              As notícias serão exibidas aqui quando estiverem publicadas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedNews.map((noticia, index) => (
              <motion.article
                key={noticia.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-fcbb-dark-gray rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-fcbb-gold/10 hover:border-fcbb-gold/30"
              >
                {noticia.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={noticia.image_url} 
                      alt={noticia.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-fcbb-gold/20 text-fcbb-gold px-3 py-1 rounded-full text-sm font-medium">
                      {noticia.category}
                    </span>
                    <div className="flex items-center text-fcbb-white/60 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(new Date(noticia.created_at), 'dd MMM', { locale: ptBR })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-fcbb-white mb-3 group-hover:text-fcbb-gold transition-colors line-clamp-2">
                    {noticia.title}
                  </h3>
                  
                  {noticia.excerpt && (
                    <p className="text-fcbb-white/80 text-sm mb-4 line-clamp-3">
                      {noticia.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-fcbb-white/60 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {noticia.author}
                    </div>
                    <button className="flex items-center text-fcbb-gold hover:text-fcbb-gold/80 transition-colors font-medium">
                      <span>Ler mais</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            to="/noticias"
            className="inline-flex items-center space-x-3 bg-fcbb-gold text-fcbb-black px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver Todas as Notícias</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FCBBNewsSection;
