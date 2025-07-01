
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Clock } from 'lucide-react';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';

const iconMap = {
  trophy: Trophy,
  users: Users,
  calendar: Calendar,
  clock: Clock,
};

const RealFCBBStats = () => {
  const { stats, loading, error } = useRealFCBBData();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-cv-blue to-blue-800">
        <div className="cv-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-32 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-cv-blue to-blue-800">
        <div className="cv-container">
          <div className="text-center text-white">
            <p>Erro ao carregar estatísticas: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cv-blue to-blue-800">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-white mb-6">
            FCBB em Números
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Dados oficiais da Federação Cabo-verdiana de Basquetebol
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon_name as keyof typeof iconMap] || Trophy;
            
            return (
              <motion.div
                key={stat.stat_key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-cv-yellow/50 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="bg-cv-yellow/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-cv-yellow/30 transition-colors">
                    <IconComponent className="w-10 h-10 text-cv-yellow" />
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-display">
                    {stat.stat_value}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-cv-yellow mb-2">
                    {stat.stat_name}
                  </h3>
                  
                  <p className="text-blue-100 text-sm leading-relaxed">
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

export default RealFCBBStats;
