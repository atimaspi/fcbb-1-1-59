
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  slides: any[];
  currentSlide: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
}

const SlideNavigation = ({ 
  slides, 
  currentSlide, 
  onPrevSlide, 
  onNextSlide, 
  onGoToSlide 
}: SlideNavigationProps) => {
  return (
    <>
      {/* Navigation arrows */}
      <button
        onClick={onPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </button>
      <button
        onClick={onNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white rounded-full' 
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default SlideNavigation;
