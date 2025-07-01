
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Target } from 'lucide-react';
import { useBackendData } from '@/hooks/useBackendData';

const FCBBStatsSection = () => {
  const { teams, competitions, games, players, news, isLoading } = useBackendData();

  const stats = [
    {
      icon: Trophy,
      label: "Competições Ativas",
      value: competitions?.filter(c => c.status === 'active').length || 0,
      description: "Campeonatos e torneios em curso"
    },
    {
      icon: Users,
      label: "Clubes Registados",
      value: teams?.length || 0,
      description: "Equipas oficialmente registadas"
    },
    {
      icon: Calendar,
      label: "Jogos Realizados",
      value: games?.filter(g => g.status === 'finished').length || 0,
      description: "Partidas já disputadas"
    },
    {
      icon: Target,
      label: "Jogadores Federados",
      value: players?.filter(p => p.active).length || 0,
      description: "Atletas ativos no sistema"
    }
  ];

  if (isLoading) {
    return (
      <section className="py-20 bg-fcbb-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-fcbb-light-gray h-32 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-fcbb-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-fcbb-white mb-6">
            FCBB em Números
          </h2>
          <p className="text-xl text-fcbb-white/80 max-w-3xl mx-auto leading-relaxed">
            Dados oficiais atualizados em tempo real
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-fcbb-light-gray rounded-3xl p-8 border border-fcbb-gold/20 hover:border-fcbb-gold/50 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="bg-fcbb-gold/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-fcbb-gold/30 transition-colors">
                    <IconComponent className="w-10 h-10 text-fcbb-gold" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-fcbb-white mb-3 font-display">
                    {stat.value}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-fcbb-gold mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-fcbb-white/80 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FCBBStatsSection;
