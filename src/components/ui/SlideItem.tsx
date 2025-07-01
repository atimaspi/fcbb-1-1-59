
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedImage from '@/components/ui/advanced-image';

interface SlideItemProps {
  slide: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    link: string;
  };
  isActive: boolean;
  index: number;
  currentSlide: number;
}

const SlideItem = ({ slide, isActive, index, currentSlide }: SlideItemProps) => {
  return (
    <div
      className={`absolute inset-0 transition-transform duration-700 ease-out ${
        index === currentSlide ? 'translate-x-0' : 
        index < currentSlide ? '-translate-x-full' : 'translate-x-full'
      }`}
    >
      <div className="relative h-full">
        <AdvancedImage
          src={slide.image}
          alt={slide.title}
          className="w-full h-full"
          width={1920}
          height={1080}
          priority={index === 0}
          quality={85}
          lazy={index !== 0}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="cv-container">
            <div className="max-w-2xl text-white">
              <span className="inline-block px-3 py-1 bg-cv-red text-sm font-medium rounded-full mb-4 animate-fade-in-up">
                {slide.subtitle}
              </span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fade-in-up animation-delay-200">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-200 animate-fade-in-up animation-delay-400">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up animation-delay-600">
                <Button size="lg" className="bg-cv-blue hover:bg-blue-700 transform hover:scale-105 transition-all duration-200" asChild>
                  <Link to={slide.link}>{slide.cta}</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cv-dark transform hover:scale-105 transition-all duration-200">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Vídeo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
