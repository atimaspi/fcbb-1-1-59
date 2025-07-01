
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBackendData } from '@/hooks/useBackendData';

const FibaInspiredHero = () => {
  const { teams, clubs, competitions, games } = useBackendData();

  const totalTeams = teams?.length || 16;
  const totalClubs = clubs?.length || 24;
  const totalCompetitions = competitions?.length || 5;

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2990"
          alt="Basketball court background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 cv-container text-center text-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-cv-red text-white border-none px-6 py-2 text-sm font-semibold">
            ÉPOCA 2024/25 • LIGA NACIONAL
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-display">
            FCBB
            <span className="block text-cv-yellow">BASQUETEBOL</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Federação Cabo-verdiana de Basquetebol
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-cv-red hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/resultados/ao-vivo">
                <Play className="mr-2 h-5 w-5" />
                JOGOS AO VIVO
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-cv-yellow mb-2">{totalTeams}</div>
              <div className="text-sm text-gray-300">EQUIPAS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cv-yellow mb-2">{totalCompetitions}</div>
              <div className="text-sm text-gray-300">COMPETIÇÕES</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cv-yellow mb-2">{totalClubs}</div>
              <div className="text-sm text-gray-300">CLUBES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FibaInspiredHero;
