
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Trophy, Users } from 'lucide-react';

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cv-blue via-cv-red to-cv-yellow opacity-90"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-32 h-32 bg-cv-yellow/20 rounded-full blur-2xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-16 h-16 bg-cv-red/30 rounded-full blur-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
          Época 2023/24 • Liga Nacional
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 hero-text-shadow">
          <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Federação Cabo-verdiana
          </span>
          <br />
          <span className="bg-gradient-to-r from-cv-yellow to-yellow-300 bg-clip-text text-transparent">
            de Basquetebol
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Promovendo o desenvolvimento do basquetebol em Cabo Verde através da 
          excelência desportiva, formação e integração comunitária.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-cv-blue hover:bg-gray-100 shadow-2xl px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
            <Play className="mr-2 h-5 w-5" />
            Ver Jogos ao Vivo
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cv-blue backdrop-blur-sm px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
            <Trophy className="mr-2 h-5 w-5" />
            Classificações
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 text-center backdrop-blur-md bg-white/10 border border-white/20">
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="text-sm text-gray-200">Equipas Liga Nacional</div>
          </div>
          <div className="glass-card p-6 text-center backdrop-blur-md bg-white/10 border border-white/20">
            <div className="text-3xl font-bold mb-2">38</div>
            <div className="text-sm text-gray-200">Equipas Regionais</div>
          </div>
          <div className="glass-card p-6 text-center backdrop-blur-md bg-white/10 border border-white/20">
            <div className="text-3xl font-bold mb-2">240+</div>
            <div className="text-sm text-gray-200">Jogadores Federados</div>
          </div>
          <div className="glass-card p-6 text-center backdrop-blur-md bg-white/10 border border-white/20">
            <div className="text-3xl font-bold mb-2">9</div>
            <div className="text-sm text-gray-200">Ilhas Participantes</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
