
import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Trophy, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';

const RealPlayersSection = () => {
  const { players, loading, error } = useRealFCBBData();

  const getPositionColor = (position: string) => {
    switch (position?.toLowerCase()) {
      case 'pivot':
        return 'bg-cv-red text-white';
      case 'base':
        return 'bg-cv-blue text-white';
      case 'extremo':
        return 'bg-cv-yellow text-cv-blue';
      case 'poste':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="cv-container">
          <div className="text-center mb-12">
            <div className="fcbb-skeleton h-12 w-64 mx-auto mb-4"></div>
            <div className="fcbb-skeleton h-6 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-80 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="cv-container">
          <div className="text-center text-red-600">
            <p>Erro ao carregar jogadores: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar apenas os primeiros 8 jogadores
  const featuredPlayers = players.slice(0, 8);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-cv-blue mb-6">
            Seleção Nacional
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conheça os atletas que representam Cabo Verde no basquetebol internacional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-cv-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Jersey Number */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-cv-blue/10 group-hover:text-cv-blue/20 transition-colors duration-300">
                {player.jersey_number}
              </div>

              {/* Player Photo Placeholder */}
              <div className="relative z-10 text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cv-blue to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-cv-blue mb-1 group-hover:text-blue-700 transition-colors">
                  {player.first_name} {player.last_name}
                </h3>
                
                <Badge className={`${getPositionColor(player.position)} text-xs font-bold border-0`}>
                  {player.position}
                </Badge>
              </div>

              {/* Player Info */}
              <div className="relative z-10 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Idade:</span>
                  <span className="font-semibold text-cv-blue">{player.age} anos</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Altura:</span>
                  <span className="font-semibold text-cv-blue">{player.height_cm}cm</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Peso:</span>
                  <span className="font-semibold text-cv-blue">{player.weight_kg}kg</span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Trophy className="w-4 h-4 mr-2 text-cv-yellow" />
                    <span className="text-xs font-medium">{player.club}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-cv-red" />
                    <span className="text-xs">{player.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cv-blue via-cv-yellow to-cv-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/selecoes"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-cv-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl group font-display"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Ver Todas as Seleções</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Activity className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default RealPlayersSection;
