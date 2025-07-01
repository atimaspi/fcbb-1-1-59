
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { supabase } from '@/integrations/supabase/client';

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url: string;
  cta_text?: string;
  cta_link?: string;
  order_index: number;
  active: boolean;
}

const HeroSection = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const fetchHeroSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <section className="relative h-96 bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue"></div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-96 bg-gradient-to-r from-cv-blue to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Federação Cabo-verdiana de Basquetebol</h1>
          <p className="text-xl mb-6">Adicione slides através do Painel Administrativo</p>
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={slide.image_url}
          alt={slide.title}
          className="w-full h-full object-cover"
          width={1920}
          height={500}
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="cv-container">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <h2 className="text-xl md:text-2xl mb-4 text-gray-200">
                {slide.subtitle}
              </h2>
            )}
            {slide.description && (
              <p className="text-lg mb-6 text-gray-200">
                {slide.description}
              </p>
            )}
            {slide.cta_text && slide.cta_link && (
              <Button
                size="lg"
                className="bg-cv-blue hover:bg-blue-700 text-white px-8 py-3 text-lg"
                asChild
              >
                <a href={slide.cta_link}>{slide.cta_text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
