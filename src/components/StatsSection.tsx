
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

interface BasketballStat {
  id: string;
  stat_key: string;
  stat_name: string;
  stat_value: string;
  description?: string;
  icon_name?: string;
  active: boolean;
  order_index: number;
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'trophy': return Trophy;
    case 'users': return Users;
    case 'calendar': return Calendar;
    case 'award': return Award;
    default: return Trophy;
  }
};

const StatsSection = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['basketball-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('basketball_stats')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as BasketballStat[];
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-cv-blue">
        <div className="cv-container">
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats || stats.length === 0) {
    return (
      <section className="py-12 bg-cv-blue">
        <div className="cv-container">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-white mb-4">Estatísticas</h2>
            <p className="text-blue-100">
              Nenhuma estatística disponível. Adicione dados através do Painel Administrativo.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-cv-blue">
      <div className="cv-container">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Basquetebol em Cabo Verde
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = getIcon(stat.icon_name);
            
            return (
              <div
                key={stat.id}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-opacity-20 transition-all duration-300"
              >
                <IconComponent className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.stat_value}
                </h3>
                <p className="text-blue-100 font-medium">
                  {stat.stat_name}
                </p>
                {stat.description && (
                  <p className="text-blue-200 text-sm mt-2">
                    {stat.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
