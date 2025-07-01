
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Medal, Award, Trophy, Handshake, Star } from 'lucide-react';

const CompactPartnersSection = () => {
  const partnersByCategory = {
    platinum: {
      title: "Parceiros Platina",
      icon: Trophy,
      color: "from-gray-300 via-gray-200 to-gray-400",
      borderColor: "border-gray-300",
      medal: "🥇",
      partners: [
        { name: "FIBA", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Governo de Cabo Verde", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Comité Olímpico", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" }
      ]
    },
    gold: {
      title: "Parceiros Ouro",
      icon: Medal,
      color: "from-yellow-400 via-yellow-300 to-yellow-600",
      borderColor: "border-yellow-400",
      medal: "🥈",
      partners: [
        { name: "TCL", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Cabo Verde Airlines", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Banco Interatlântico", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Smart Cabo Verde", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" }
      ]
    },
    silver: {
      title: "Parceiros Prata",
      icon: Award,
      color: "from-orange-400 via-orange-300 to-orange-600",
      borderColor: "border-orange-400",
      medal: "🥉",
      partners: [
        { name: "Molten", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Spalding", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Nike", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Adidas", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" },
        { name: "Under Armour", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop" }
      ]
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      {/* Subtle basketball court background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white/10 rounded-full"></div>
      </div>

      <div className="cv-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-gradient-to-r from-cv-yellow via-white to-cv-blue bg-clip-text text-transparent">
            NOSSOS PARCEIROS
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Organizações que apoiam o desenvolvimento do basquetebol cabo-verdiano e fortalecem nossa identidade desportiva
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {Object.entries(partnersByCategory).map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Category Header */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-8"
              >
                <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${category.color} text-slate-900 shadow-2xl mb-4`}>
                  <span className="text-2xl">{category.medal}</span>
                  <category.icon className="w-6 h-6" />
                  <h3 className="text-lg font-bold font-display">{category.title}</h3>
                </div>
              </motion.div>

              {/* Partner Cards */}
              <div className="space-y-4">
                {category.partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      rotateY: 5 
                    }}
                    className="group cursor-pointer"
                  >
                    <Card className={`bg-white/10 backdrop-blur-xl border-2 ${category.borderColor} hover:bg-white/20 transition-all duration-500 h-20 shadow-2xl hover:shadow-3xl`}>
                      <CardContent className="p-4 h-full flex items-center justify-center">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-h-12 max-w-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 group-hover:scale-110"
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 max-w-2xl mx-auto border border-white/10 shadow-2xl">
            <Handshake className="w-12 h-12 mx-auto mb-4 text-cv-yellow" />
            <h3 className="text-2xl font-bold mb-4 text-white">Seja Nosso Parceiro</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Junte-se ao desenvolvimento do basquetebol cabo-verdiano e faça parte da nossa história desportiva
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(247, 209, 22, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cv-blue via-cv-red to-cv-blue bg-size-200 bg-pos-0 hover:bg-pos-100 text-cv-yellow px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-2xl font-display"
            >
              Contactar-nos
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cv-blue/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cv-red/10 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};

export default CompactPartnersSection;
