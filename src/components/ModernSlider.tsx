
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContentData } from '@/hooks/useContentData';

const ModernSlider = () => {
  const { heroSlidesData, isContentLoading } = useContentData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Usar dados do backend ou fallback
  const slides = heroSlidesData?.length > 0 ? heroSlidesData : [
    {
      id: 'default-1',
      title: 'FCBB - Federação Cabo-verdiana de Basquetebol',
      subtitle: 'Promovendo o basquetebol em Cabo Verde',
      description: 'Acompanhe as últimas notícias, resultados e competições do basquetebol cabo-verdiano.',
      image_url: '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png',
      cta_text: 'Ver Mais',
      cta_link: '/sobre'
    }
  ];

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isContentLoading) {
    return (
      <div className="relative h-[80vh] bg-gradient-to-r from-cv-blue to-cv-red flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slides[currentSlide]?.image_url || '/lovable-uploads/39194785-9ce8-4849-82cb-ad92f0086855.png'})`
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cv-blue/20 via-transparent to-cv-red/20" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cv-yellow/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="cv-container">
              <div className="max-w-4xl text-white">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-6"
                >
                  {slides[currentSlide]?.subtitle && (
                    <span className="inline-block px-4 py-2 bg-cv-yellow/20 backdrop-blur-sm text-cv-yellow font-bold text-sm uppercase tracking-wider rounded-full border border-cv-yellow/30 mb-4">
                      {slides[currentSlide].subtitle}
                    </span>
                  )}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-display"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {slides[currentSlide]?.title}
                </motion.h1>
                
                {slides[currentSlide]?.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200 max-w-3xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.a
                    href={slides[currentSlide]?.cta_link || '/sobre'}
                    className="group inline-flex items-center bg-gradient-to-r from-cv-yellow to-yellow-400 text-cv-blue px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-cv-yellow transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 font-display"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {slides[currentSlide]?.cta_text || 'Ver Mais'}
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "loop" 
                      }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 group"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                index === currentSlide 
                  ? 'bg-cv-yellow border-cv-yellow shadow-lg shadow-yellow-500/50' 
                  : 'bg-white/30 border-white/50 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-gradient-to-r from-cv-yellow to-yellow-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          key={currentSlide}
        />
      </div>
    </div>
  );
};

export default ModernSlider;
