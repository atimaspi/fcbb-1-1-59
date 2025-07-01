
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from 'framer-motion';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { useContentData } from '@/hooks/useContentData';
import { useRef, useState, useEffect } from 'react';

// SVG Icons
const TrophyIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 4h14l-1 7h-1c-1.5 0-2.5 1.5-4 1.5S10.5 11 9 11H8L7 4zm7 12c1.5 0 2.83-.5 4-1.5v6c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-6c1.17 1 2.5 1.5 4 1.5z"/>
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4H4zM8 16v2h3v-2H8zM13 18v-2h3v2h-3z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const TargetIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
  </svg>
);

const TrendingIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Single StatCard component
const StatCard = ({ stat, index, isInView }: { stat: any; index: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const duration = 1500 + index * 200;
    const startCount = 0;
    const endCount = stat.numericValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(progress * (endCount - startCount) + startCount);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [stat.numericValue, index, isVisible]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  const displayValue = count > 0 ? (
    stat.value.includes('+') ? `${count.toLocaleString()}+` : 
    stat.value.includes(',') ? count.toLocaleString() : 
    count.toString()
  ) : stat.value;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group"
    >
      <Card className="relative overflow-hidden h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
              {stat.change}
            </div>
          </div>
          
          <div className="text-center">
            <motion.h3 
              className="text-4xl font-bold text-gray-900 mb-3 font-display"
              animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {displayValue}
            </motion.h3>
            <p className="text-lg font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              {stat.title}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cv-blue via-cv-yellow to-cv-red opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EnhancedStatsSection = () => {
  const { clubsData, gamesData, teamsData, isLoading } = useOptimizedDataFetching();
  const { statisticsData } = useContentData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calcular estatísticas em tempo real
  const stats = {
    totalClubs: clubsData?.length || 24,
    totalGames: gamesData?.length || 180,
    totalTeams: teamsData?.length || 48,
    activePlayers: 1250,
    completedGames: gamesData?.filter(game => game.status === 'completed')?.length || 120,
    liveGames: gamesData?.filter(game => game.status === 'live' || game.status === 'in_progress')?.length || 0
  };

  // Usar estatísticas do backend se disponíveis, senão usar as padrão
  const statsData = statisticsData?.length > 0 ? statisticsData.map(stat => {
    const iconMap: { [key: string]: any } = {
      'trophy': TrophyIcon,
      'users': UsersIcon,
      'calendar': CalendarIcon,
      'target': TargetIcon,
      'trending-up': TrendingIcon,
      'star': StarIcon,
      'map-pin': StarIcon
    };

    return {
      title: stat.stat_name,
      value: stat.stat_value,
      numericValue: parseInt(stat.stat_value.replace(/[^0-9]/g, '')) || 0,
      icon: iconMap[stat.icon_name] || TrophyIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      change: stat.description || ""
    };
  }) : [
    {
      title: "Clubes Licenciados",
      value: stats.totalClubs.toString(),
      numericValue: stats.totalClubs,
      icon: TrophyIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      change: "+3 este ano"
    },
    {
      title: "Atletas Federados",
      value: "1,250+",
      numericValue: 1250,
      icon: UsersIcon,
      color: "text-green-600", 
      bgColor: "bg-green-100",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      change: "+12% vs ano anterior"
    },
    {
      title: "Jogos por Época",
      value: stats.totalGames.toString() + "+",
      numericValue: stats.totalGames,
      icon: CalendarIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      change: `${stats.completedGames} concluídos`
    },
    {
      title: "Equipas Ativas",
      value: stats.totalTeams.toString(),
      numericValue: stats.totalTeams,
      icon: TargetIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      gradientFrom: "from-orange-500",
      gradientTo: "to-orange-600",
      change: "Masculinas e Femininas"
    },
    {
      title: "Jogos ao Vivo",
      value: stats.liveGames.toString(),
      numericValue: stats.liveGames,
      icon: TrendingIcon,
      color: "text-red-600",
      bgColor: "bg-red-100",
      gradientFrom: "from-red-500",
      gradientTo: "to-red-600",
      change: stats.liveGames > 0 ? "Agora mesmo" : "Próximos em breve"
    },
    {
      title: "Ilhas Participantes",
      value: "9",
      numericValue: 9,
      icon: StarIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-yellow-600",
      change: "Todo o arquipélago"
    }
  ];

  if (isLoading) {
    return (
      <div className="fcbb-section bg-gray-50">
        <div className="fcbb-container">
          <div className="fcbb-grid fcbb-grid-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-40 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-cv-blue mb-6">
            O Basquetebol Cabo-verdiano em Números
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Acompanhe o crescimento e desenvolvimento do nosso desporto favorito 
            através das estatísticas mais relevantes do panorama nacional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <StatCard 
              key={index} 
              stat={stat} 
              index={index} 
              isInView={isInView}
            />
          ))}
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red text-white overflow-hidden">
            <CardContent className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="relative">
                  <h3 className="text-3xl font-bold mb-3 font-display">Época 2024/25</h3>
                  <p className="text-xl opacity-90 mb-4">
                    {Math.round((stats.completedGames / stats.totalGames) * 100)}% Completa
                  </p>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-cv-yellow h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(stats.completedGames / stats.totalGames) * 100}%` } : {}}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <h3 className="text-3xl font-bold mb-3 font-display">Participação</h3>
                  <p className="text-xl opacity-90 mb-4">
                    Crescimento de 12% em atletas federados
                  </p>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-cv-yellow h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '78%' } : {}}
                      transition={{ duration: 2, delay: 1.2 }}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <h3 className="text-3xl font-bold mb-3 font-display">Cobertura</h3>
                  <p className="text-xl opacity-90 mb-4">
                    Presente em todas as 9 ilhas de Cabo Verde
                  </p>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-cv-yellow h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : {}}
                      transition={{ duration: 2, delay: 1.4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cv-yellow/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cv-red/10 rounded-full blur-2xl" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedStatsSection;
