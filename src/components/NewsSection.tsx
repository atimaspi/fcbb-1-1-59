
import { ArrowRight } from "lucide-react";
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { memo } from 'react';

const NewsSection = memo(() => {
  const { useOptimizedFetch } = useUnifiedApi();
  
  const { 
    data: newsData, 
    isLoading: newsLoading,
    error: newsError 
  } = useOptimizedFetch('news', {
    limit: 4,
    orderBy: { column: 'published_at', ascending: false },
    select: 'id, title, published_at, featured_image_url, category',
    staleTime: 5 * 60 * 1000
  });

  if (newsLoading) {
    return (
      <section className="py-6 md:py-8">
        <div className="cv-container">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Últimas Notícias</h2>
          </div>
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  // Se não há dados ou erro, não mostra a seção
  if (newsError || !newsData || newsData.length === 0) {
    return (
      <section className="py-6 md:py-8">
        <div className="cv-container">
          <div className="text-center py-12">
            <h2 className="section-title mb-4">Últimas Notícias</h2>
            <p className="text-gray-600">
              Nenhuma notícia disponível. Adicione conteúdo através do Painel Administrativo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-8">
      <div className="cv-container">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Últimas Notícias</h2>
          <a 
            href="/noticias" 
            className="flex items-center text-cv-blue hover:text-blue-700 text-sm transition-colors"
          >
            Ver todas <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsData.slice(0, 4).map((item, index) => (
            <article 
              key={item.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 hover-lift"
            >
              <div className="h-32 overflow-hidden">
                <OptimizedImage
                  src={item.featured_image_url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  width={300}
                  height={128}
                  priority={index === 0}
                  lazy={index !== 0}
                  quality={70}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <Badge variant="secondary" className="bg-cv-blue text-white text-xs mb-2">
                  {item.category}
                </Badge>
                <h3 className="font-bold text-sm mb-2 line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                {item.published_at && (
                  <time className="text-gray-600 text-xs" dateTime={item.published_at}>
                    {format(new Date(item.published_at), 'dd MMM, yyyy', { locale: ptBR })}
                  </time>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

NewsSection.displayName = 'NewsSection';

export default NewsSection;
