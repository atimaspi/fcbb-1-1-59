
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Medal, Award, Trophy, Handshake, Star, ExternalLink } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website?: string;
  tier: 'platinum' | 'gold' | 'silver';
}

// Partner data with real logos - simulating CMS integration
const partnersData: Partner[] = [
  // Platinum Partners
  {
    id: 1,
    name: "FIBA",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=100&fit=crop",
    description: "Federação Internacional de Basquetebol",
    website: "https://www.fiba.basketball",
    tier: "platinum"
  },
  {
    id: 2,
    name: "Governo de Cabo Verde",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=100&fit=crop",
    description: "Apoio institucional governamental",
    tier: "platinum"
  },
  {
    id: 3,
    name: "Comité Olímpico CV",
    logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=200&h=100&fit=crop",
    description: "Comité Olímpico Cabo-verdiano",
    tier: "platinum"
  },
  
  // Gold Partners
  {
    id: 4,
    name: "CV Telecom",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&h=100&fit=crop",
    description: "Telecomunicações de Cabo Verde",
    tier: "gold"
  },
  {
    id: 5,
    name: "Cabo Verde Airlines",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&h=100&fit=crop",
    description: "Companhia aérea nacional",
    tier: "gold"
  },
  {
    id: 6,
    name: "Banco Interatlântico",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=200&h=100&fit=crop",
    description: "Parceiro financeiro oficial",
    tier: "gold"
  },
  {
    id: 7,
    name: "ENACOL",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200&h=100&fit=crop",
    description: "Energia e combustíveis",
    tier: "gold"
  },
  
  // Silver Partners
  {
    id: 8,
    name: "Molten",
    logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&h=100&fit=crop",
    description: "Equipamentos desportivos oficiais",
    tier: "silver"
  },
  {
    id: 9,
    name: "Spalding",
    logo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=200&h=100&fit=crop",
    description: "Bolas oficiais da FCBB",
    tier: "silver"
  },
  {
    id: 10,
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&h=100&fit=crop",
    description: "Vestuário desportivo",
    tier: "silver"
  },
  {
    id: 11,
    name: "Under Armour",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=200&h=100&fit=crop",
    description: "Performance gear",
    tier: "silver"
  },
  {
    id: 12,
    name: "Gatorade",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=100&fit=crop",
    description: "Hidratação oficial",
    tier: "silver"
  }
];

interface TierConfig {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  glowColor: string;
  medal: string;
}

const tierConfigs: Record<string, TierConfig> = {
  platinum: {
    title: "Parceiros Platina",
    icon: Trophy,
    color: "from-gray-200 via-white to-gray-300",
    borderColor: "border-gray-300",
    glowColor: "shadow-gray-300/30",
    medal: "🥇"
  },
  gold: {
    title: "Parceiros Ouro",
    icon: Medal,
    color: "from-amber-400 via-yellow-300 to-amber-500",
    borderColor: "border-amber-400",
    glowColor: "shadow-amber-400/30",
    medal: "🥈"
  },
  silver: {
    title: "Parceiros Prata",
    icon: Award,
    color: "from-slate-400 via-gray-300 to-slate-500",
    borderColor: "border-slate-400",
    glowColor: "shadow-slate-400/30",
    medal: "🥉"
  }
};

const PremiumPartnersSection = () => {
  const [visiblePartners, setVisiblePartners] = useState<Set<number>>(new Set());

  // Group partners by tier
  const partnersByTier = {
    platinum: partnersData.filter(p => p.tier === 'platinum'),
    gold: partnersData.filter(p => p.tier === 'gold'),
    silver: partnersData.filter(p => p.tier === 'silver')
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const partnerId = parseInt(entry.target.getAttribute('data-partner-id') || '0');
            setVisiblePartners(prev => new Set(prev).add(partnerId));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const partnerElements = document.querySelectorAll('[data-partner-id]');
    partnerElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const PartnerCard = ({ partner, index }: { partner: Partner; index: number }) => {
    const config = tierConfigs[partner.tier];
    const isVisible = visiblePartners.has(partner.id);

    return (
      <motion.figure
        data-partner-id={partner.id}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={isVisible ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: index * 0.1,
            duration: 0.6,
            ease: "easeOut"
          }
        } : {}}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
        }}
        className="group cursor-pointer"
      >
        <div className={`bg-white/10 backdrop-blur-xl border-2 ${config.borderColor} hover:bg-white/20 transition-all duration-500 rounded-2xl p-6 h-32 shadow-xl hover:${config.glowColor} hover:shadow-2xl relative overflow-hidden`}>
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Logo container */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <img 
              src={partner.logo} 
              alt={`${partner.name} - ${partner.description}`}
              className="max-h-20 max-w-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Partner info tooltip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-2xl">
            <h4 className="font-semibold text-sm">{partner.name}</h4>
            <p className="text-xs text-gray-300 mt-1">{partner.description}</p>
            {partner.website && (
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-cv-yellow text-xs mt-2 hover:underline"
              >
                Visitar site <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
          </div>
        </div>
        <figcaption className="sr-only">
          {partner.name} - {partner.description}
        </figcaption>
      </motion.figure>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white overflow-hidden">
      {/* Cultural Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {/* Cabo Verde Flag Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cv-yellow via-cv-red to-cv-blue"></div>
        
        {/* Traditional wave pattern */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="url(#wave-gradient)" opacity="0.1"/>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#003893" />
              <stop offset="50%" stopColor="#CF2027" />
              <stop offset="100%" stopColor="#F7D116" />
            </linearGradient>
          </defs>
        </svg>

        {/* Basketball court lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <line x1="0" y1="400" x2="1200" y2="400" stroke="white" strokeWidth="2"/>
          <circle cx="300" cy="400" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="900" cy="400" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="600" cy="400" r="120" fill="none" stroke="white" strokeWidth="3"/>
        </svg>
      </div>

      <div className="cv-container relative z-10">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 font-display"
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
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Organizações que apoiam o desenvolvimento do basquetebol cabo-verdiano e fortalecem nossa identidade desportiva nacional
          </motion.p>
        </motion.header>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {Object.entries(partnersByTier).map(([tier, partners], tierIndex) => {
            const config = tierConfigs[tier];
            
            return (
              <motion.article
                key={tier}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: tierIndex * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
                role="region"
                aria-labelledby={`${tier}-heading`}
              >
                {/* Tier Header */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-8"
                >
                  <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${config.color} text-slate-900 shadow-2xl mb-6`}>
                    <span className="text-2xl" role="img" aria-label={`${config.title} medal`}>
                      {config.medal}
                    </span>
                    <config.icon className="w-6 h-6" aria-hidden="true" />
                    <h2 id={`${tier}-heading`} className="text-lg font-bold font-display">
                      {config.title}
                    </h2>
                  </div>
                </motion.div>

                {/* Partner Cards */}
                <div className="space-y-6">
                  {partners.map((partner, index) => (
                    <PartnerCard key={partner.id} partner={partner} index={index} />
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 max-w-3xl mx-auto border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="url(#cta-gradient)" />
                <defs>
                  <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
              <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto font-body">
                Junte-se ao desenvolvimento do basquetebol cabo-verdiano e faça parte da nossa história desportiva. 
                Construamos juntos o futuro do basquetebol nacional.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(247, 209, 22, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  background: [
                    "linear-gradient(45deg, #003893, #CF2027, #F7D116)",
                    "linear-gradient(45deg, #CF2027, #F7D116, #003893)",
                    "linear-gradient(45deg, #F7D116, #003893, #CF2027)",
                    "linear-gradient(45deg, #003893, #CF2027, #F7D116)"
                  ]
                }}
                transition={{
                  background: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="px-10 py-5 rounded-2xl font-bold text-xl text-white shadow-xl font-display transform transition-all duration-500"
                aria-label="Contactar para ser parceiro"
              >
                Seja Nosso Parceiro – Contactar-nos
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cv-blue/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cv-red/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-cv-yellow/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default PremiumPartnersSection;
