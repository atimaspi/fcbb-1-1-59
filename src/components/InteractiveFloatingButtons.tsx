
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Trophy, Users, MessageCircle, ChevronUp, Gamepad2, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InteractiveFloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: Calendar,
      label: "Próximos Jogos",
      color: "bg-gradient-to-r from-cv-blue to-blue-600",
      shadowColor: "hover:shadow-blue-500/50",
      link: "/resultados"
    },
    {
      icon: Trophy,
      label: "Classificações",
      color: "bg-gradient-to-r from-cv-red to-red-600",
      shadowColor: "hover:shadow-red-500/50",
      link: "/classificacoes"
    },
    {
      icon: Gamepad2,
      label: "Ao Vivo",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      shadowColor: "hover:shadow-green-500/50",
      link: "/resultados/ao-vivo"
    },
    {
      icon: TrendingUp,
      label: "Estatísticas",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      shadowColor: "hover:shadow-purple-500/50",
      link: "/estatisticas"
    },
    {
      icon: Users,
      label: "Equipas",
      color: "bg-gradient-to-r from-cv-yellow to-yellow-500 text-cv-blue",
      shadowColor: "hover:shadow-yellow-500/50",
      link: "/clubes"
    },
    {
      icon: MessageCircle,
      label: "Contacto",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      shadowColor: "hover:shadow-orange-500/50",
      link: "/contacto"
    }
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {/* Action Buttons */}
        <div className={`flex flex-col gap-4 transition-all duration-500 ease-out ${
          isExpanded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
        }`}>
          {actions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={`
                    relative w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 
                    ${action.color} ${action.shadowColor}
                    transform hover:scale-125 hover:rotate-12 active:scale-110
                    backdrop-blur-sm border border-white/20
                    ${activeButton === index ? 'scale-125 rotate-12' : ''}
                  `}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: isExpanded ? `translateY(0) scale(${activeButton === index ? 1.25 : 1}) rotate(${activeButton === index ? 12 : 0}deg)` : 'translateY(20px) scale(0.8)'
                  }}
                  onMouseEnter={() => setActiveButton(index)}
                  onMouseLeave={() => setActiveButton(null)}
                  asChild
                >
                  <Link to={action.link}>
                    <action.icon className="h-6 w-6" />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-black/90 text-white border-white/20">
                <p className="font-semibold">{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main Toggle Button */}
        <Button
          size="sm"
          className={`
            relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-500
            bg-gradient-to-r from-cv-blue via-cv-red to-cv-yellow
            hover:from-cv-red hover:via-cv-yellow hover:to-cv-blue
            transform hover:scale-110 active:scale-95
            ${isExpanded ? 'rotate-45 scale-110' : 'rotate-0 scale-100'}
            backdrop-blur-sm border-2 border-white/30
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`transition-all duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
            {isExpanded ? (
              <span className="text-2xl font-bold text-white">×</span>
            ) : (
              <span className="text-2xl font-bold text-white">+</span>
            )}
          </div>
          
          <div className="absolute inset-0 rounded-2xl border-2 border-white/50 animate-ping"></div>
          <div className="absolute inset-0 rounded-2xl bg-white/10"></div>
        </Button>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                className="
                  w-12 h-12 rounded-xl shadow-2xl transition-all duration-300
                  bg-white/10 backdrop-blur-xl border border-white/20
                  hover:bg-white/20 hover:scale-110 hover:shadow-white/30
                  transform active:scale-95
                "
                onClick={scrollToTop}
              >
                <ChevronUp className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-cv-blue/20 to-transparent"></div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-black/90 text-white border-white/20">
              <p>Voltar ao Topo</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default InteractiveFloatingButtons;
