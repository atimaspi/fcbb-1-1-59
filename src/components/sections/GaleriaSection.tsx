
import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GaleriaSection = () => {
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      src: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Final da Liga Nacional 2024",
      description: "Momentos épicos da final"
    },
    {
      id: 2,
      type: 'video',
      src: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Melhores jogadas da época",
      description: "Compilação dos melhores momentos"
    },
    {
      id: 3,
      type: 'image',
      src: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Seleção Nacional em ação",
      description: "AfroBasket 2024"
    },
    {
      id: 4,
      type: 'image',
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      title: "Formação de jovens talentos",
      description: "Campus de basquetebol"
    },
    {
      id: 5,
      type: 'video',
      src: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Entrevista com o treinador",
      description: "Preparação para nova época"
    },
    {
      id: 6,
      type: 'image',
      src: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Cerimónia de entrega de prémios",
      description: "Gala do basquetebol 2024"
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-gray-50">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cv-primary mb-4 font-display">
            Galeria Multimédia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reviva os melhores momentos do basquetebol cabo-verdiano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === 'video' ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="bg-cv-accent text-white p-4 rounded-full hover:bg-cv-accent/90 transition-colors cursor-pointer"
                      >
                        <Play className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="bg-cv-primary text-white p-4 rounded-full hover:bg-cv-primary/90 transition-colors cursor-pointer"
                      >
                        <Eye className="h-6 w-6" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Type indicator */}
                <div className="absolute top-4 right-4">
                  {item.type === 'video' && (
                    <span className="bg-cv-accent text-white px-2 py-1 text-xs font-medium rounded-full flex items-center">
                      <Play className="h-3 w-3 mr-1" />
                      Vídeo
                    </span>
                  )}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm opacity-90">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-cv-primary text-cv-primary hover:bg-cv-primary hover:text-white px-8 py-4 font-semibold transform hover:scale-105 transition-all duration-300"
          >
            Ver Galeria Completa
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GaleriaSection;
