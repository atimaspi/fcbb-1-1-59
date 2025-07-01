
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Calendar, MapPin, TrendingUp, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const PremiumStatsSection = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['basketball-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('basketball_stats')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      'trophy': Trophy,
      'users': Users,
      'calendar': Calendar,
      'map-pin': MapPin,
      'trending-up': TrendingUp,
      'star': Star
    };
    return icons[iconName] || Trophy;
  };

  const AnimatedCounter = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState('0');
    
    useEffect(() => {
      // Extract numeric part for animation
      const numericMatch = value.match(/(\d+)/);
      if (!numericMatch) {
        setDisplayValue(value);
        return;
      }
      
      const targetNum = parseInt(numericMatch[1]);
      const increment = targetNum / (duration / 50);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          const formattedValue = value.replace(/\d+/, Math.floor(current).toString());
          setDisplayValue(formattedValue);
        }
      }, 50);
      
      return () => clearInterval(timer);
    }, [value, duration]);
    
    return <span>{displayValue}</span>;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-cv-blue/5 to-cv-red/5">
        <div className="cv-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-cv-blue mb-4">Basquetebol em Números</h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-12 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-cv-blue/5 to-cv-red/5">
      <div className="cv-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cv-blue mb-4">
            Basquetebol em Números
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe o crescimento extraordinário do basquetebol cabo-verdiano com dados em tempo real
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats?.map((stat, index) => {
            const IconComponent = getIconComponent(stat.icon_name || 'trophy');
            
            return (
              <Card 
                key={stat.id} 
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cv-blue/10 to-cv-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-6 text-center relative z-10">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cv-blue to-cv-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-3xl md:text-4xl font-bold text-cv-blue mb-2 group-hover:text-cv-red transition-colors duration-300">
                    <AnimatedCounter value={stat.stat_value} duration={1500 + index * 200} />
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {stat.stat_name}
                  </h3>
                  
                  {stat.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </CardContent>
                
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cv-yellow/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <TrendingUp className="w-5 h-5 text-cv-blue" />
            <span className="text-sm font-medium text-gray-700">
              Dados atualizados em tempo real
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumStatsSection;
