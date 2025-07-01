
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, Mail } from 'lucide-react';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';

const RealClubsSection = () => {
  const { clubs, loading, error } = useRealFCBBData();

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="cv-container">
          <div className="text-center mb-12">
            <div className="fcbb-skeleton h-12 w-64 mx-auto mb-4"></div>
            <div className="fcbb-skeleton h-6 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="fcbb-skeleton h-96 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="cv-container">
          <div className="text-center text-red-600">
            <p>Erro ao carregar clubes: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="clubes" className="py-20 bg-white">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-cv-blue mb-6">
            Clubes Filiados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conheça os clubes que fazem parte da família FCBB
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Logo do Clube */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={club.logo_url || "https://images.unsplash.com/photo-1546519638-68e109498ffc"}
                    alt={`Logo ${club.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-cv-blue mb-2 group-hover:text-blue-700 transition-colors">
                  {club.name}
                </h3>
              </div>

              {/* Informações do Clube */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-cv-red" />
                  <span className="font-medium">{club.island}</span>
                </div>
                
                {club.founded_year && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-cv-yellow" />
                    <span>Fundado em {club.founded_year}</span>
                  </div>
                )}

                <p className="text-gray-600 text-sm leading-relaxed">
                  {club.description}
                </p>
              </div>

              {/* Links e Contactos */}
              <div className="space-y-3 border-t border-gray-100 pt-6">
                {club.contact_email && (
                  <a
                    href={`mailto:${club.contact_email}`}
                    className="flex items-center text-cv-blue hover:text-blue-700 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contactar Clube
                  </a>
                )}
                
                {club.website && (
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-cv-blue hover:text-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visitar Website
                  </a>
                )}
              </div>

              {/* Bottom Accent */}
              <div className="h-1 bg-gradient-to-r from-cv-blue via-cv-yellow to-cv-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-6 rounded-full" />
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
            href="/clubes"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-cv-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl group font-display"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Ver Todos os Clubes</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default RealClubsSection;
