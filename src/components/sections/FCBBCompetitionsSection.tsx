
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';
import { useBackendData } from '@/hooks/useBackendData';
import { Link } from 'react-router-dom';

const FCBBCompetitionsSection = () => {
  const { competitions, isLoading } = useBackendData();

  if (isLoading) {
    return (
      <section className="py-20 bg-fcbb-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-fcbb-light-gray h-64 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Mostrar apenas competições ativas ou programadas
  const activeCompetitions = competitions.filter(comp => 
    comp.status === 'active' || comp.status === 'upcoming'
  ).slice(0, 4);

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
            Competições
          </h2>
          <p className="text-xl text-fcbb-white/80 max-w-3xl mx-auto leading-relaxed">
            Acompanhe as principais competições do basquetebol cabo-verdiano
          </p>
        </motion.div>

        {activeCompetitions.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-fcbb-gold/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-fcbb-white mb-2">
              Nenhuma competição ativa
            </h3>
            <p className="text-fcbb-white/60">
              As competições serão exibidas aqui quando estiverem disponíveis
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeCompetitions.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-fcbb-light-gray rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-fcbb-gold/10 hover:border-fcbb-gold/30 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-fcbb-gold/20 rounded-full p-3 group-hover:bg-fcbb-gold/30 transition-colors">
                    <Trophy className="w-8 h-8 text-fcbb-gold" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    competition.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-fcbb-gold/20 text-fcbb-gold'
                  }`}>
                    {competition.status === 'active' ? 'Ativa' : 'Programada'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-fcbb-white mb-3 group-hover:text-fcbb-gold transition-colors">
                  {competition.name}
                </h3>

                <p className="text-fcbb-white/80 mb-6 leading-relaxed">
                  {competition.description || 'Descrição não disponível'}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-fcbb-white/60">
                    <Calendar className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span className="text-sm">Temporada: {competition.season || 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-fcbb-white/60">
                    <Users className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span className="text-sm">Tipo: {competition.type}</span>
                  </div>
                </div>

                <button className="flex items-center text-fcbb-gold hover:text-fcbb-gold/80 transition-colors font-medium">
                  <span>Ver Mais</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
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
            to="/competicoes"
            className="inline-flex items-center space-x-3 bg-fcbb-gold text-fcbb-black px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver Todas as Competições</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FCBBCompetitionsSection;
