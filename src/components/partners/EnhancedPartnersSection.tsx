
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Medal, Award, Trophy, Handshake, Star, Users } from 'lucide-react';

const EnhancedPartnersSection = () => {
  const partnersByCategory = {
    platinum: {
      title: "Parceiros Platina",
      icon: Trophy,
      color: "from-gray-300 via-gray-200 to-gray-400",
      borderColor: "border-gray-300",
      glowColor: "shadow-gray-300/20",
      medal: "🥇",
      partners: [
        { 
          name: "FIBA", 
          logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=100&fit=crop",
          description: "Federação Internacional de Basquetebol"
        },
        { 
          name: "Governo de Cabo Verde", 
          logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop",
          description: "Apoio institucional governamental"
        },
        { 
          name: "Comité Olímpico", 
          logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=200&h=100&fit=crop",
          description: "Comité Olímpico Cabo-verdiano"
        }
      ]
    },
    gold: {
      title: "Parceiros Ouro",
      icon: Medal,
      color: "from-yellow-400 via-yellow-300 to-yellow-600",
      borderColor: "border-yellow-400",
      glowColor: "shadow-yellow-400/20",
      medal: "🥈",
      partners: [
        { 
          name: "TCL", 
          logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&h=100&fit=crop",
          description: "Telecomunicações de Cabo Verde"
        },
        { 
          name: "Cabo Verde Airlines", 
          logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&h=100&fit=crop",
          description: "Companhia aérea nacional"
        },
        { 
          name: "Banco Interatlântico", 
          logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=200&h=100&fit=crop",
          description: "Parceiro financeiro oficial"
        },
        { 
          name: "Smart Cabo Verde", 
          logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200&h=100&fit=crop",
          description: "Tecnologia e inovação"
        }
      ]
    },
    silver: {
      title: "Parceiros Prata",
      icon: Award,
      color: "from-orange-400 via-orange-300 to-orange-600",
      borderColor: "border-orange-400",
      glowColor: "shadow-orange-400/20",
      medal: "🥉",
      partners: [
        { 
          name: "Molten", 
          logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=100&fit=crop",
          description: "Equipamentos desportivos"
        },
        { 
          name: "Spalding", 
          logo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=200&h=100&fit=crop",
          description: "Bolas oficiais"
        },
        { 
          name: "Nike", 
          logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&h=100&fit=crop",
          description: "Vestuário desportivo"
        },
        { 
          name: "Adidas", 
          logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=200&h=100&fit=crop",
          description: "Calçado e equipamentos"
        },
        { 
          name: "Under Armour", 
          logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=100&fit=crop",
          description: "Performance gear"
        }
      ]
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      {/* Cabo Verde Flag Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cv-yellow via-cv-red to-cv-blue"></div>
        
        {/* 10 Stars pattern */}
        <div className="absolute top-10 left-10">
          {[...Array(10)].map((_, i) => (
            <Star 
              key={i}
              className="absolute w-4 h-4 text-cv-yellow"
              style={{
                left: `${(i % 5) * 30}px`,
                top: `${Math.floor(i / 5) * 20}px`,
                transform: `rotate(${i * 36}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Basketball court pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white/10 rounded-full"></div>
        
        {/* Court lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <line x1="0" y1="400" x2="1200" y2="400" stroke="white" strokeOpacity="0.1" strokeWidth="2"/>
          <circle cx="300" cy="400" r="100" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2"/>
          <circle cx="900" cy="400" r="100" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2"/>
        </svg>
      </div>

      {/* Player silhouette */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="200" height="300" viewBox="0 0 200 300" className="fill-current text-white">
          <path d="M100 50 C120 50 140 70 140 90 C140 110 120 130 100 130 C80 130 60 110 60 90 C60 70 80 50 100 50 Z M100 140 L80 160 L80 220 L60 250 L60 300 L80 300 L80 280 L90 260 L90 240 L110 240 L110 260 L120 280 L120 300 L140 300 L140 250 L120 220 L120 160 Z"/>
        </svg>
      </div>

      <div className="cv-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 font-display"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: 'linear-gradient(135deg, #F7D116 0%, #FFFFFF 50%, #003893 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            JUNTOS PELO BASQUETEBOL DE CABO VERDE
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Organizações que apoiam o desenvolvimento do basquetebol cabo-verdiano e fortalecem nossa identidade desportiva nacional
          </motion.p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {Object.entries(partnersByCategory).map(([key, category], categoryIndex) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
              role="region"
              aria-labelledby={`${key}-heading`}
            >
              {/* Category Header */}
              <motion.header
                whileHover={{ scale: 1.05 }}
                className="mb-8"
              >
                <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${category.color} text-slate-900 shadow-2xl mb-4`}>
                  <span className="text-2xl" role="img" aria-label={`${category.title} medal`}>
                    {category.medal}
                  </span>
                  <category.icon className="w-6 h-6" aria-hidden="true" />
                  <h2 id={`${key}-heading`} className="text-lg font-bold font-display">
                    {category.title}
                  </h2>
                </div>
              </motion.header>

              {/* Partner Cards */}
              <div className="space-y-4">
                {category.partners.map((partner, index) => (
                  <motion.figure
                    key={partner.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: `0 20px 40px rgba(255,255,255,0.2)`,
                    }}
                    className="group cursor-pointer logo-card"
                  >
                    <Card className={`bg-white/10 backdrop-blur-xl border-2 ${category.borderColor} hover:bg-white/20 transition-all duration-500 h-24 shadow-2xl hover:${category.glowColor} hover:shadow-3xl`}>
                      <CardContent className="p-4 h-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} - ${partner.description}`}
                          className="max-h-16 max-w-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                    <figcaption className="sr-only">
                      {partner.name} - {partner.description}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 max-w-3xl mx-auto border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Animated background waves */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="url(#wave-gradient)" />
                <defs>
                  <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#003893" />
                    <stop offset="50%" stopColor="#CF2027" />
                    <stop offset="100%" stopColor="#F7D116" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Handshake className="w-12 h-12 text-cv-yellow" />
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-white font-display">
                Seja Nosso Parceiro
              </h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Junte-se ao desenvolvimento do basquetebol cabo-verdiano e faça parte da nossa história desportiva. 
                Construamos juntos o futuro do basquetebol nacional.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(247, 209, 22, 0.4)",
                  background: "linear-gradient(45deg, #003893, #CF2027, #F7D116, #003893)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="relative px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 shadow-xl font-display text-white overflow-hidden"
                style={{
                  background: "linear-gradient(45deg, #003893, #CF2027, #F7D116, #003893)",
                  backgroundSize: "300% 300%"
                }}
                aria-label="Contactar para ser parceiro"
              >
                <span className="relative z-10">
                  Seja Nosso Parceiro – Contactar-nos
                </span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cv-blue/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cv-red/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-cv-yellow/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default EnhancedPartnersSection;
