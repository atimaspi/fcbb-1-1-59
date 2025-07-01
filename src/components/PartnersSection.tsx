
import { motion } from 'framer-motion';
import { useContentData } from '@/hooks/useContentData';

const PartnersSection = () => {
  const { partnersData, isContentLoading } = useContentData();

  if (isContentLoading) {
    return (
      <div className="fcbb-section">
        <div className="fcbb-container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cv-blue mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!partnersData || partnersData.length === 0) {
    return (
      <div className="fcbb-section">
        <div className="fcbb-container">
          <div className="text-center">
            <h2 className="fcbb-title text-3xl mb-4">Nossos Parceiros</h2>
            <p className="text-gray-600">Nenhum parceiro cadastrado no momento.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="fcbb-section">
      <div className="fcbb-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="fcbb-title text-3xl mb-4">
            Nossos Parceiros
          </h2>
          <p className="fcbb-subtitle max-w-2xl mx-auto">
            Organizações que apoiam e promovem o desenvolvimento do basquetebol em Cabo Verde
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {partnersData.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center">
                {partner.website_url ? (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full flex flex-col items-center justify-center"
                  >
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-16 max-w-full object-contain mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-cv-blue transition-colors">
                      {partner.name}
                    </h3>
                    {partner.description && (
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {partner.description}
                      </p>
                    )}
                  </a>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-16 max-w-full object-contain mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-cv-blue transition-colors">
                      {partner.name}
                    </h3>
                    {partner.description && (
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {partner.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categorias de parceiros */}
        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(new Set(partnersData.map(p => p.category))).map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-cv-blue/10 text-cv-blue rounded-full text-sm font-medium"
              >
                {category === 'sponsor' ? 'Patrocinadores' : 
                 category === 'media' ? 'Média' : 
                 category === 'institutional' ? 'Institucionais' : 
                 category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
