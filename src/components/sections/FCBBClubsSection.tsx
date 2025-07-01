
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';
import { Link } from 'react-router-dom';

const FCBBClubsSection = () => {
  const { clubs, loading, error } = useRealFCBBData();

  // Fallback clubs
  const fallbackClubs = [
    {
      id: '1',
      name: "ABC Praia",
      island: "Santiago",
      founded_year: 1995,
      logo_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
      description: "Clube tradicional da capital, conhecido pelos seus sucessos nacionais e formação de jovens talentos.",
      contact_email: "abc@praia.cv",
      website: "https://abcpraia.cv"
    },
    {
      id: '2',
      name: "Sporting Clube do Mindelo",
      island: "São Vicente",
      founded_year: 1922,
      logo_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
      description: "O mais antigo clube de basquetebol de Cabo Verde, berço de grandes craques nacionais.",
      contact_email: "sporting@mindelo.cv",
      website: "https://sportingmindelo.cv"
    },
    {
      id: '3',
      name: "Tchadense",
      island: "Santiago",
      founded_year: 1985,
      logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      description: "Clube de grande tradição no basquetebol masculino cabo-verdiano.",
      contact_email: "tchadense@santiago.cv",
      website: "#"
    },
    {
      id: '4',
      name: "Bairro Praia",
      island: "Santiago",
      founded_year: 1998,
      logo_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop",
      description: "Clube jovem mas com grande potencial, focado no desenvolvimento da modalidade.",
      contact_email: "bairro@praia.cv",
      website: "#"
    }
  ];

  const clubsToShow = clubs.length > 0 ? clubs.slice(0, 4) : fallbackClubs;

  if (loading) {
    return (
      <section className="py-20 bg-fcbb-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-fcbb-light-gray h-12 w-64 mx-auto mb-4 rounded"></div>
            <div className="animate-pulse bg-fcbb-light-gray h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-fcbb-light-gray h-96 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Erro ao carregar clubes:', error);
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
            Nossos Clubes
          </h2>
          <p className="text-xl text-fcbb-white/80 max-w-3xl mx-auto leading-relaxed">
            Conheça os clubes que fazem a história do basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {clubsToShow.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-fcbb-light-gray rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-fcbb-gold/10 hover:border-fcbb-gold/30"
            >
              {/* Club Logo */}
              <div className="relative p-8 bg-fcbb-white">
                <div className="aspect-square mx-auto max-w-24 overflow-hidden rounded-full bg-fcbb-dark-gray">
                  <img
                    src={club.logo_url}
                    alt={`${club.name} Logo`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Island Badge */}
                <div className="absolute top-4 right-4 bg-fcbb-gold text-fcbb-black px-3 py-1 rounded-full text-xs font-bold">
                  {club.island}
                </div>
              </div>

              {/* Club Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-fcbb-white mb-2 group-hover:text-fcbb-gold transition-colors text-center">
                  {club.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center text-fcbb-white/80 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span>{club.island}</span>
                  </div>
                  <div className="flex items-center justify-center text-fcbb-white/80 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-fcbb-gold" />
                    <span>Fundado em {club.founded_year}</span>
                  </div>
                </div>

                <p className="text-fcbb-white/80 text-sm mb-6 text-center line-clamp-3">
                  {club.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-2 mb-6">
                  {club.contact_email && (
                    <div className="text-center">
                      <a
                        href={`mailto:${club.contact_email}`}
                        className="text-fcbb-gold hover:text-fcbb-gold/80 transition-colors text-xs"
                      >
                        {club.contact_email}
                      </a>
                    </div>
                  )}
                  
                  {club.website && club.website !== '#' && (
                    <div className="text-center">
                      <a
                        href={club.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-fcbb-gold hover:text-fcbb-gold/80 transition-colors text-xs"
                      >
                        <span>Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <button className="w-full flex items-center justify-center space-x-2 text-fcbb-gold hover:text-fcbb-gold/80 transition-colors font-medium text-sm border border-fcbb-gold/30 rounded-lg py-2 hover:bg-fcbb-gold/10">
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
            to="/clubes"
            className="inline-flex items-center space-x-3 bg-fcbb-gold text-fcbb-black px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver Todos os Clubes</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FCBBClubsSection;
