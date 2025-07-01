
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useRealFCBBData } from '@/hooks/useRealFCBBData';

const FCBBPartnersSection = () => {
  const { partners, loading, error } = useRealFCBBData();

  // Fallback partners para quando não há dados
  const fallbackPartners = [
    {
      id: '1',
      name: "Governo de Cabo Verde",
      logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      category: "Institucional",
      website_url: "https://www.governo.cv",
      description: "Apoio institucional ao desenvolvimento do desporto"
    },
    {
      id: '2',
      name: "Comité Olímpico CV",
      logo_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
      category: "Desportivo",
      website_url: "#",
      description: "Parceria no desenvolvimento desportivo nacional"
    },
    {
      id: '3',
      name: "FIBA Africa",
      logo_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop",
      category: "Internacional",
      website_url: "https://www.fiba.basketball",
      description: "Organização continental de basquetebol"
    },
    {
      id: '4',
      name: "Banco Comercial do Atlântico",
      logo_url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=200&fit=crop",
      category: "Patrocinador",
      website_url: "#",
      description: "Parceiro financeiro oficial"
    },
    {
      id: '5',
      name: "CV Telecom",
      logo_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
      category: "Patrocinador",
      website_url: "#",
      description: "Parceiro de telecomunicações"
    },
    {
      id: '6',
      name: "Enacol",
      logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      category: "Patrocinador",
      website_url: "#",
      description: "Parceiro energético"
    }
  ];

  const partnersToShow = partners.length > 0 ? partners : fallbackPartners;

  if (loading) {
    return (
      <section className="py-20 bg-fcbb-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse bg-fcbb-dark-gray h-12 w-64 mx-auto mb-4 rounded"></div>
            <div className="animate-pulse bg-fcbb-dark-gray h-6 w-96 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-fcbb-dark-gray h-32 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Erro ao carregar parceiros:', error);
  }

  return (
    <section className="py-20 bg-fcbb-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-fcbb-white mb-6">
            Nossos Parceiros
          </h2>
          <p className="text-xl text-fcbb-white/80 max-w-3xl mx-auto leading-relaxed">
            Empresas e instituições que apoiam o desenvolvimento do basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partnersToShow.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-fcbb-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-fcbb-gold/10 hover:border-fcbb-gold/30 group-hover:scale-105 relative overflow-hidden">
                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-fcbb-gold/20 text-fcbb-gold px-2 py-1 rounded-full text-xs font-bold">
                    {partner.category}
                  </span>
                </div>
                
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                <h3 className="text-sm font-bold text-fcbb-black text-center mb-2 line-clamp-2">
                  {partner.name}
                </h3>
                
                {partner.description && (
                  <p className="text-xs text-fcbb-black/60 text-center mb-3 line-clamp-2">
                    {partner.description}
                  </p>
                )}
                
                {partner.website_url && partner.website_url !== '#' && (
                  <div className="text-center">
                    <a
                      href={partner.website_url}
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
          <p className="text-fcbb-white/80 mb-4">
            Interessado em apoiar o basquetebol cabo-verdiano?
          </p>
          <button className="bg-fcbb-gold text-fcbb-black px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105">
            Seja Nosso Parceiro
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FCBBPartnersSection;
