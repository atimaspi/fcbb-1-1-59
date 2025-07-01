
import { motion } from 'framer-motion';
import { User, MapPin, Trophy, ArrowRight } from 'lucide-react';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';
import { Link } from 'react-router-dom';

const FCBBPlayersSection = () => {
  const { players, loading, error } = useRealFCBBData();

  // Fallback players
  const fallbackPlayers = [
    {
      id: '1',
      first_name: "João",
      last_name: "Silva",
      position: "Base",
      jersey_number: 10,
      age: 25,
      nationality: "CV",
      club: "ABC Praia",
      height_cm: 185,
      weight_kg: 80,
      photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f80?w=300&h=400&fit=crop"
    },
    {
      id: '2',
      first_name: "Maria",
      last_name: "Santos",
      position: "Extremo",
      jersey_number: 12,
      age: 23,
      nationality: "CV",
      club: "Sporting Mindelo",
      height_cm: 175,
      weight_kg: 65,
      photo_url: "https://images.unsplash.com/photo-1494790108755-2616b332b8e0?w=300&h=400&fit=crop"
    },
    {
      id: '3',
      first_name: "Carlos",
      last_name: "Monteiro",
      position: "Poste",
      jersey_number: 15,
      age: 28,
      nationality: "CV",
      club: "Tchadense",
      height_cm: 205,
      weight_kg: 95,
      photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
    },
    {
      id: '4',
      first_name: "Ana",
      last_name: "Pereira",
      position: "Ala",
      jersey_number: 8,
      age: 22,
      nationality: "CV",
      club: "Bairro Praia",
      height_cm: 170,
      weight_kg: 60,
      photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop"
    }
  ];

  const playersToShow = players.length > 0 ? players.slice(0, 4) : fallbackPlayers;

  if (loading) {
    return (
      <section className="py-20 bg-fcbb-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-fcbb-dark-gray h-12 w-64 mx-auto mb-4 rounded"></div>
            <div className="animate-pulse bg-fcbb-dark-gray h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-fcbb-dark-gray h-96 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Erro ao carregar jogadores:', error);
  }

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
            Nossos Atletas
          </h2>
          <p className="text-xl text-fcbb-white/80 max-w-3xl mx-auto leading-relaxed">
            Conheça os talentos que representam o basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {playersToShow.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-fcbb-dark-gray rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-fcbb-gold/10 hover:border-fcbb-gold/30"
            >
              {/* Player Photo */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={player.photo_url || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&face=${index}`}
                  alt={`${player.first_name} ${player.last_name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fcbb-black/80 via-transparent to-transparent"></div>
                
                {/* Jersey Number */}
                <div className="absolute top-4 right-4 bg-fcbb-gold text-fcbb-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {player.jersey_number}
                </div>
                
                {/* Position Badge */}
                <div className="absolute bottom-4 left-4 bg-fcbb-gold/20 backdrop-blur-sm text-fcbb-gold px-3 py-1 rounded-full text-sm font-bold">
                  {player.position}
                </div>
              </div>

              {/* Player Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-fcbb-white mb-2 group-hover:text-fcbb-gold transition-colors">
                  {player.first_name} {player.last_name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-fcbb-white/80 text-sm">
                    <Trophy className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span>{player.club}</span>
                  </div>
                  <div className="flex items-center text-fcbb-white/80 text-sm">
                    <User className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span>{player.age} anos</span>
                  </div>
                  <div className="flex items-center text-fcbb-white/80 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span>{player.nationality === 'CV' ? 'Cabo Verde' : player.nationality}</span>
                  </div>
                </div>

                {/* Physical Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-fcbb-light-gray rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-fcbb-gold">{player.height_cm}cm</div>
                    <div className="text-xs text-fcbb-white/60">Altura</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-fcbb-gold">{player.weight_kg}kg</div>
                    <div className="text-xs text-fcbb-white/60">Peso</div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center space-x-2 text-fcbb-gold hover:text-fcbb-gold/80 transition-colors font-medium text-sm">
                  <span>Ver Perfil</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            to="/atletas"
            className="inline-flex items-center space-x-3 bg-fcbb-gold text-fcbb-black px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver Todos os Atletas</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FCBBPlayersSection;
