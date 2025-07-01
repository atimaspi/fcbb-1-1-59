
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Users, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBackendData } from '@/hooks/useBackendData';

const FibaStyleHero = () => {
  const { teams, clubs, competitions, games } = useBackendData();

  // Calculate dynamic stats
  const totalTeams = teams?.length || 16;
  const totalClubs = clubs?.length || 0;
  const totalCompetitions = competitions?.length || 5;
  const totalPlayers = 240; // Can be calculated from players data when available

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cv-blue/90 via-cv-blue/70 to-cv-red/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990"
          alt="Basketball court background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 cv-container text-center text-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-cv-yellow text-cv-blue border-none px-4 py-2 text-sm font-semibold">
            ÉPOCA 2023/24 • LIGA NACIONAL
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            O Basquetebol
            <span className="block text-cv-yellow">Cabo-verdiano</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Acompanhe todas as competições, resultados e estatísticas do basquetebol nacional
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-cv-red hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <Link to="/resultados/ao-vivo">
                <Play className="mr-2 h-5 w-5" />
                Jogos ao Vivo
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-cv-blue px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              asChild
            >
              <Link to="/resultados/classificacoes">
                <Trophy className="mr-2 h-5 w-5" />
                Classificações
              </Link>
            </Button>
          </div>

          {/* Dynamic Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cv-yellow mb-2">{totalTeams}</div>
              <div className="text-sm md:text-base text-gray-200">Equipas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cv-yellow mb-2">{totalCompetitions}</div>
              <div className="text-sm md:text-base text-gray-200">Competições</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cv-yellow mb-2">{totalPlayers}+</div>
              <div className="text-sm md:text-base text-gray-200">Jogadores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cv-yellow mb-2">{totalClubs}</div>
              <div className="text-sm md:text-base text-gray-200">Clubes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default FibaStyleHero;
