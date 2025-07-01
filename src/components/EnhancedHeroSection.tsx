
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Trophy, Users, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const FloatingParticle = ({ delay, size, color }: { delay: number; size: number; color: string }) => (
    <div
      className="absolute rounded-full opacity-60 animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        animationDelay: `${delay}s`,
        filter: 'blur(1px)',
      }}
    />
  );

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(0, 56, 147, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #003893 0%, #CF2027 50%, #F7D116 100%)
        `,
      }}
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() * 8 + 4}
            color={['#FFFFFF40', '#F7D11640', '#CF202740'][Math.floor(Math.random() * 3)]}
          />
        ))}
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-cv-yellow/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cv-red/20 rounded-lg animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content with Enhanced Animations */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Badge className="mb-8 bg-gradient-to-r from-cv-yellow to-yellow-400 text-cv-dark border-none backdrop-blur-sm text-base px-6 py-2 animate-pulse">
            <Sparkles className="mr-2 h-4 w-4" />
            Época 2023/24 • Liga Nacional • Em Destaque
          </Badge>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
              Federação
            </span>
            <br />
            <span className="bg-gradient-to-r from-cv-yellow via-yellow-300 to-cv-yellow bg-clip-text text-transparent">
              Cabo-verdiana
            </span>
            <br />
            <span className="bg-gradient-to-r from-cv-red via-red-400 to-cv-red bg-clip-text text-transparent">
              de Basquetebol
            </span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light">
            Elevando o basquetebol cabo-verdiano através da 
            <span className="text-cv-yellow font-semibold"> excelência desportiva</span>, 
            formação de qualidade e 
            <span className="text-cv-red font-semibold"> integração comunitária</span>.
          </p>
        </div>

        {/* Enhanced Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-cv-red to-red-600 hover:from-red-600 hover:to-cv-red text-white shadow-2xl px-10 py-6 text-xl font-bold rounded-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-red-500/50"
            asChild
          >
            <Link to="/resultados/ao-vivo">
              <Play className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Jogos ao Vivo
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="group border-2 border-white text-white hover:bg-white hover:text-cv-blue backdrop-blur-md px-10 py-6 text-xl font-bold rounded-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-white/30"
            asChild
          >
            <Link to="/classificacoes">
              <Trophy className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              Classificações
              <Target className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Enhanced Quick Stats with 3D Effect */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { number: '12', label: 'Equipas Liga Nacional', icon: Trophy, color: 'from-cv-blue to-blue-600' },
            { number: '38', label: 'Equipas Regionais', icon: Users, color: 'from-cv-red to-red-600' },
            { number: '240+', label: 'Jogadores Federados', icon: Users, color: 'from-cv-yellow to-yellow-500' },
            { number: '9', label: 'Ilhas Participantes', icon: Target, color: 'from-green-500 to-green-600' }
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:rotate-1 cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-200 font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-8 h-12 border-2 border-white/70 rounded-full flex justify-center mb-2">
            <div className="w-2 h-4 bg-white/90 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-white/70 text-sm font-medium">Scroll</span>
        </div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cv-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cv-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cv-yellow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
