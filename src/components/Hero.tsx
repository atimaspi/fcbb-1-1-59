
import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import SlideItem from '@/components/ui/SlideItem';
import SlideNavigation from '@/components/ui/SlideNavigation';

const Hero = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { startRenderMeasure, endRenderMeasure } = usePerformanceMonitor();

  const slides = useMemo(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
      title: "Seleção Nacional conquista histórica vitória no AfroBasket",
      subtitle: "Cabo Verde marca presença no cenário internacional",
      description: "A nossa seleção nacional masculina alcança novo patamar competitivo com performance exemplar no AfroBasket 2024.",
      cta: "Ver Resultados",
      link: "/resultados"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
      title: "Liga Nacional 2024/25 arranca em grande",
      subtitle: "12 equipas disputam o título nacional",
      description: "A nova época da Liga Nacional promete ser emocionante com clubes renovados e jovens talentos em destaque.",
      cta: "Classificações",
      link: "/competicoes/classificacoes"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552847661-dddc6d9e71ba",
      title: "Desenvolvimento do Basquetebol Feminino",
      subtitle: "Programa especial de formação",
      description: "FCBB lança programa inovador para promover e desenvolver o basquetebol feminino em todas as ilhas.",
      cta: "Saber Mais",
      link: "/selecoes/senior-feminina"
    }
  ], []);

  const nextSlide = useCallback(() => {
    startRenderMeasure();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    endRenderMeasure();
  }, [slides.length, startRenderMeasure, endRenderMeasure]);

  const prevSlide = useCallback(() => {
    startRenderMeasure();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    endRenderMeasure();
  }, [slides.length, startRenderMeasure, endRenderMeasure]);

  const goToSlide = useCallback((index: number) => {
    startRenderMeasure();
    setCurrentSlide(index);
    endRenderMeasure();
  }, [startRenderMeasure, endRenderMeasure]);

  // Auto-slide with performance consideration
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    const preloadImages = () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      
      [slides[nextIndex], slides[prevIndex]].forEach(slide => {
        const img = new Image();
        img.src = slide.image;
      });
    };
    
    preloadImages();
  }, [currentSlide, slides]);

  return (
    <section className="relative">
      {/* Main Hero Slider */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
            index={index}
            currentSlide={currentSlide}
          />
        ))}

        <SlideNavigation
          slides={slides}
          currentSlide={currentSlide}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
          onGoToSlide={goToSlide}
        />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
