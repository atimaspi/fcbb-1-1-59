
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Facebook, Youtube, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: 'official' | 'institutional' | 'general';
}

// Simulação de dados dos parceiros (como seria vindo do CMS)
const partnersData: Partner[] = [
  // Patrocinadores Oficiais
  {
    id: 1,
    name: "Betclic",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&h=80&fit=crop",
    category: "official"
  },
  {
    id: 2,
    name: "Skoiy",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&h=80&fit=crop",
    category: "official"
  },
  {
    id: 3,
    name: "UNA Seguros",
    logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=200&h=80&fit=crop",
    category: "official"
  },

  // Parceiros Institucionais
  {
    id: 4,
    name: "FIBA",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 5,
    name: "Anos Porretas",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 6,
    name: "IPDJ",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 7,
    name: "YIP",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 8,
    name: "Instituto Português",
    logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 9,
    name: "Comité Olímpico",
    logo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 10,
    name: "FIBA CV",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },
  {
    id: 11,
    name: "A.N.J.B.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=120&h=120&fit=crop",
    category: "institutional"
  },

  // Parceiros Gerais
  {
    id: 12,
    name: "Wilson",
    logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 13,
    name: "Dhika",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 14,
    name: "Boomfit",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 15,
    name: "Marsh",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 16,
    name: "Trust",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 17,
    name: "Inov4",
    logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 18,
    name: "Culligan",
    logo: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 19,
    name: "Swish",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 20,
    name: "Smart Fan",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 21,
    name: "Lambert",
    logo: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 22,
    name: "Zumub",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=140&h=60&fit=crop",
    category: "general"
  },
  {
    id: 23,
    name: "Sporex",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=140&h=60&fit=crop",
    category: "general"
  }
];

const FPBStylePartnersSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [visibleLogos, setVisibleLogos] = useState<Set<number>>(new Set());

  // Agrupar parceiros por categoria
  const officialSponsors = partnersData.filter(p => p.category === 'official');
  const institutionalPartners = partnersData.filter(p => p.category === 'institutional');
  const generalPartners = partnersData.filter(p => p.category === 'general');

  // Newsletter subscription handler
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribing(false);
    setEmail('');
    // Aqui você integraria com seu sistema de newsletter
    console.log('Newsletter subscription:', email);
  };

  // Intersection Observer para animações de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const logoId = parseInt(entry.target.getAttribute('data-logo-id') || '0');
            setVisibleLogos(prev => new Set(prev).add(logoId));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const logoElements = document.querySelectorAll('[data-logo-id]');
    logoElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const PartnerLogo = ({ partner, index, delay = 0 }: { partner: Partner; index: number; delay?: number }) => {
    const isVisible = visibleLogos.has(partner.id);

    return (
      <motion.div
        data-logo-id={partner.id}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? {
          opacity: 1,
          y: 0,
          transition: {
            delay: delay + index * 0.1,
            duration: 0.6,
            ease: "easeOut"
          }
        } : {}}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        className="flex items-center justify-center p-4 group cursor-pointer"
      >
        <img
          src={partner.logo}
          alt={`${partner.name} - Parceiro FCBB`}
          className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:brightness-110"
          loading="lazy"
        />
      </motion.div>
    );
  };

  return (
    <section className="bg-black text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cv-yellow via-cv-red to-cv-blue"></div>
      </div>

      <div className="cv-container relative z-10 space-y-16">
        
        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8"
        >
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 text-cv-yellow" />
            <span className="text-lg font-medium">SUBSCREVER NEWSLETTER</span>
          </div>
          
          <form onSubmit={handleNewsletterSubscription} className="flex items-center space-x-4">
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cv-yellow"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              className="bg-white text-black hover:bg-gray-200 px-6 font-medium"
            >
              {isSubscribing ? 'SUBSCREVENDO...' : 'SUBSCREVER'}
            </Button>
          </form>

          <div className="flex items-center space-x-4">
            <span className="text-sm">SEGUE-NOS</span>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-cv-blue transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <Separator className="bg-gray-800" />

        {/* Patrocinadores Oficiais */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl font-medium mb-12 tracking-wider">PATROCINADORES OFICIAIS</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 max-w-4xl mx-auto">
            {officialSponsors.map((partner, index) => (
              <PartnerLogo key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        </motion.div>

        <Separator className="bg-gray-800" />

        {/* Parceiros Institucionais */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl font-medium mb-12 tracking-wider">PARCEIROS INSTITUCIONAIS</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 max-w-6xl mx-auto">
            {institutionalPartners.map((partner, index) => (
              <PartnerLogo key={partner.id} partner={partner} index={index} delay={0.2} />
            ))}
          </div>
        </motion.div>

        <Separator className="bg-gray-800" />

        {/* Parceiros */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl font-medium mb-12 tracking-wider">PARCEIROS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
            {generalPartners.map((partner, index) => (
              <PartnerLogo key={partner.id} partner={partner} index={index} delay={0.4} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FPBStylePartnersSection;
