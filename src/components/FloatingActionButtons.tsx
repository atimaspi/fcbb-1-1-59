
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Trophy, Users, MessageCircle, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const FloatingActionButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
      color: "bg-cv-blue hover:bg-blue-700",
      action: () => window.location.href = '/resultados'
    },
    {
      icon: Trophy,
      label: "Classificações",
      color: "bg-cv-red hover:bg-red-700",
      action: () => window.location.href = '/classificacoes'
    },
    {
      icon: Users,
      label: "Equipas",
      color: "bg-cv-yellow hover:bg-yellow-600 text-black",
      action: () => window.location.href = '/equipas'
    },
    {
      icon: MessageCircle,
      label: "Contacto",
      color: "bg-green-600 hover:bg-green-700",
      action: () => window.location.href = '/contacto'
    }
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Action Buttons */}
        <div className={`flex flex-col gap-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {actions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={`w-12 h-12 rounded-full shadow-lg ${action.color} transition-all duration-300 hover:scale-110`}
                  onClick={action.action}
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main Toggle Button */}
        <Button
          size="sm"
          className={`w-14 h-14 rounded-full shadow-2xl bg-cv-blue hover:bg-blue-700 transition-all duration-300 ${isExpanded ? 'rotate-45' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-2xl">+</span>
        </Button>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="w-12 h-12 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                onClick={scrollToTop}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Voltar ao Topo</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default FloatingActionButtons;
