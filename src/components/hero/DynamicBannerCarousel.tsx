
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&h=1080&fit=crop",
    title: "FCBB - Federação Cabo-verdiana de Basquetebol",
    subtitle: "Excelência Desportiva Nacional",
    description: "Promovendo o desenvolvimento do basquetebol em todas as ilhas de Cabo Verde",
    ctaText: "Conhecer a FCBB",
    ctaLink: "/sobre"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1920&h=1080&fit=crop",
    title: "Seleções Nacionais",
    subtitle: "Orgulho Cabo-verdiano",
    description: "Representando Cabo Verde nas competições internacionais com determinação e talento",
    ctaText: "Ver Seleções",
    ctaLink: "/selecoes"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&h=1080&fit=crop",
    title: "Competições Nacionais",
    subtitle: "Liga Nacional 2024",
    description: "Acompanhe as melhores equipas de Cabo Verde na temporada mais emocionante",
    ctaText: "Ver Calendário",
    ctaLink: "/competicoes"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1920&h=1080&fit=crop",
    title: "Desenvolvimento Jovem",
    subtitle: "Futuro do Basquetebol",
    description: "Investindo na formação dos jovens talentos cabo-verdianos",
    ctaText: "Programas de Formação",
    ctaLink: "/formacao"
  }
];

const DynamicBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, nextSlide, prevSlide]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % bannerSlides.length;
    const img = new Image();
    img.src = bannerSlides[nextIndex].image;
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const contentVariants = {
    enter: {
      y: 50,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="banner"
      aria-label="Carousel de banner principal"
    >
      {/* Background Pattern - Cabo Verde Flag Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cv-yellow via-cv-red to-cv-blue"></div>
        
        {/* 10 Stars pattern */}
        <div className="absolute top-10 right-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cv-yellow transform rotate-45"
              style={{
                left: `${(i % 5) * 15}px`,
                top: `${Math.floor(i / 5) * 10}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Basketball Court Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="400" x2="1200" y2="400" stroke="white" strokeWidth="2"/>
          <circle cx="600" cy="400" r="100" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="150" cy="400" r="80" fill="none" stroke="white" strokeWidth="2"/>
          <circle cx="1050" cy="400" r="80" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      {/* Slide Container */}
      <div className="relative h-full">
        <AnimatePresence mode="wait" custom={currentSlide}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={bannerSlides[currentSlide].image}
                alt={bannerSlides[currentSlide].title}
                className="w-full h-full object-cover"
                loading={currentSlide === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <motion.div
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 h-full flex items-center"
            >
              <div className="cv-container">
                <div className="max-w-3xl text-white">
                  <motion.span 
                    className="inline-block px-4 py-2 bg-cv-red text-sm font-medium rounded-full mb-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.span>
                  
                  <motion.h1 
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-display"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    {bannerSlides[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
                      asChild
                    >
                      <a href={bannerSlides[currentSlide].ctaLink}>
                        {bannerSlides[currentSlide].ctaText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Ver Vídeo
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 z-20"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 z-20"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide 
                ? 'w-12 h-4 bg-gradient-to-r from-cv-blue to-cv-red rounded-full' 
                : 'w-4 h-4 bg-white/50 rounded-full hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
        aria-label={isPlaying ? "Pausar slideshow" : "Reproduzir slideshow"}
      >
        {isPlaying ? (
          <div className="w-4 h-4 flex space-x-1">
            <div className="w-1 h-4 bg-white"></div>
            <div className="w-1 h-4 bg-white"></div>
          </div>
        ) : (
          <Play className="h-4 w-4" />
        )}
      </button>
    </section>
  );
};

export default DynamicBannerCarousel;
