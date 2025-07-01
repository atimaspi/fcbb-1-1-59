
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website?: string;
  active: boolean;
  order_index: number;
}

const PartnersSection = () => {
  const { data: partners, isLoading, error } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as Partner[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  if (isLoading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="cv-container">
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !partners || partners.length === 0) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="cv-container">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Parceiros</h2>
            <p className="text-gray-600">
              Nenhum parceiro registado. Adicione parceiros através do Painel Administrativo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="cv-container">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          Nossos Parceiros
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
            >
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <OptimizedImage
                    src={partner.logo_url}
                    alt={partner.name}
                    className="w-full h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    width={200}
                    height={64}
                    quality={80}
                  />
                </a>
              ) : (
                <OptimizedImage
                  src={partner.logo_url}
                  alt={partner.name}
                  className="w-full h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  width={200}
                  height={64}
                  quality={80}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
