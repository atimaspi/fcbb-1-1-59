
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "FCBB",
      subtitle: "BASQUETEBOL",
      description: "Federação Cabo-verdiana de Basquetebol - Promovendo o basquetebol nacional",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990",
      badge: "ÉPOCA 2024/25 • LIGA NACIONAL",
      ctaText: "JOGOS AO VIVO",
      ctaLink: "/resultados/ao-vivo"
    },
    {
      id: 2,
      title: "LIGA NACIONAL",
      subtitle: "2024/25",
      description: "Acompanhe a emoção da liga nacional com os melhores jogos e estatísticas",
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=2990",
      badge: "16 EQUIPAS • 5 COMPETIÇÕES",
      ctaText: "VER CLASSIFICAÇÕES",
      ctaLink: "/resultados/classificacoes"
    },
    {
      id: 3,
      title: "SELEÇÕES",
      subtitle: "NACIONAIS",
      description: "Apoie as nossas seleções rumo aos grandes torneios internacionais",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2990",
      badge: "AFROBASKET 2025",
      ctaText: "CONHECER SELEÇÕES",
      ctaLink: "/selecoes"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-cv-blue/80 to-cv-red/70 z-10"></div>
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 cv-container h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-3xl text-white"
            >
              <Badge className="mb-4 bg-cv-yellow text-cv-blue border-none px-4 py-2 text-xs font-bold">
                {slides[currentSlide].badge}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-display">
                {slides[currentSlide].title}
                <span className="block text-cv-yellow">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-2xl leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-cv-red hover:bg-red-700 text-white px-6 py-3 text-base font-semibold shadow-xl"
                  asChild
                >
                  <Link to={slides[currentSlide].ctaLink}>
                    <Play className="mr-2 h-4 w-4" />
                    {slides[currentSlide].ctaText}
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-cv-blue px-6 py-3 text-base font-semibold backdrop-blur-sm"
                  asChild
                >
                  <Link to="/noticias">
                    <Trophy className="mr-2 h-4 w-4" />
                    Últimas Notícias
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-3">
        <button
          onClick={prevSlide}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-cv-yellow' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Stats Overlay - Compacto */}
      <div className="absolute bottom-6 right-6 z-30 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-xl font-bold text-cv-yellow">16</div>
              <div className="text-xs">Equipas</div>
            </div>
            <div>
              <div className="text-xl font-bold text-cv-yellow">5</div>
              <div className="text-xs">Competições</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicHeroSlider;
