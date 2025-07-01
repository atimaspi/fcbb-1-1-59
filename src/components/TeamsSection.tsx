
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Trophy, Calendar, X } from 'lucide-react';
import { useClubsData } from '@/hooks/useClubsData';

const TeamsSection = () => {
  const { clubs, loading, error } = useClubsData();
  const [selectedClub, setSelectedClub] = useState<any>(null);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" aria-label="Carregando equipas">
        <div className="cv-container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cv-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando equipas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" aria-label="Erro ao carregar equipas">
        <div className="cv-container">
          <div className="text-center text-red-600">
            <p>Erro ao carregar equipas: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const openClubModal = (club: any) => {
    setSelectedClub(club);
    document.body.style.overflow = 'hidden';
  };

  const closeClubModal = () => {
    setSelectedClub(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section 
        id="equipas" 
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
        aria-labelledby="equipas-heading"
      >
        <div className="cv-container">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              id="equipas-heading"
              className="text-4xl md:text-5xl font-bold text-cv-blue mb-6 font-display"
            >
              Nossas Equipas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conheça os clubes que fazem parte da família do basquetebol cabo-verdiano
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubs.map((club, index) => (
              <motion.article
                key={club.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openClubModal(club)}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalhes de ${club.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openClubModal(club);
                  }
                }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                  <div className="text-center">
                    <div className="mb-4 relative">
                      <img
                        src={club.logo}
                        alt={`Logótipo de ${club.name}`}
                        className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-cv-blue/20 group-hover:border-cv-blue transition-colors duration-300"
                        loading="lazy"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-cv-blue mb-2 group-hover:text-cv-red transition-colors duration-300">
                      {club.name}
                    </h3>
                    
                    <div className="flex items-center justify-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span className="text-sm">{club.island}</span>
                    </div>
                    
                    <div className="flex items-center justify-center text-cv-yellow mb-4">
                      <Trophy className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span className="text-sm font-medium">{club.championships} títulos</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                      {club.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal do Clube */}
      {selectedClub && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeClubModal}
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedClub.logo}
                  alt={`Logótipo de ${selectedClub.name}`}
                  className="w-16 h-16 rounded-full object-cover border-4 border-cv-blue/20"
                />
                <div>
                  <h2 id="modal-title" className="text-2xl font-bold text-cv-blue">
                    {selectedClub.name}
                  </h2>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span>{selectedClub.island}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeClubModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div id="modal-description" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sobre o Clube</h3>
                <p className="text-gray-600 leading-relaxed">{selectedClub.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cv-blue/5 rounded-lg p-4">
                  <div className="flex items-center text-cv-blue mb-2">
                    <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span className="font-semibold">Fundado</span>
                  </div>
                  <p className="text-gray-700">{selectedClub.founded}</p>
                </div>

                <div className="bg-cv-yellow/10 rounded-lg p-4">
                  <div className="flex items-center text-cv-yellow mb-2">
                    <Trophy className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span className="font-semibold">Títulos</span>
                  </div>
                  <p className="text-gray-700">{selectedClub.championships} campeonatos</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={selectedClub.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-cv-blue text-white rounded-lg hover:bg-cv-blue/90 transition-colors focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2"
                  aria-label={`Visitar site oficial de ${selectedClub.name} (abre numa nova janela)`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  Site Oficial
                </a>
                
                <a
                  href={selectedClub.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  aria-label={`Visitar Facebook de ${selectedClub.name} (abre numa nova janela)`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  Facebook
                </a>
                
                <a
                  href={selectedClub.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2"
                  aria-label={`Visitar Instagram de ${selectedClub.name} (abre numa nova janela)`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default TeamsSection;
