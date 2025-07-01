
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Target, TrendingUp, Award, MapPin, Zap } from 'lucide-react';
import { useState } from 'react';

const InteractiveStatsCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      icon: Trophy,
      title: "Competições Ativas",
      value: "5",
      description: "Liga Nacional, Taça CV, Regionais",
      trend: "+2 vs ano anterior",
      color: "text-cv-blue",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      icon: Users,
      title: "Jogadores Federados",
      value: "240+",
      description: "Em todas as categorias",
      trend: "+15% este ano",
      color: "text-cv-red",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800"
    },
    {
      icon: MapPin,
      title: "Ilhas Representadas",
      value: "9",
      description: "Cobertura nacional completa",
      trend: "100% das ilhas",
      color: "text-cv-yellow",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800"
    },
    {
      icon: Calendar,
      title: "Jogos esta Época",
      value: "180+",
      description: "Todas as competições",
      trend: "+20 jogos vs 2022/23",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      icon: Award,
      title: "Árbitros Certificados",
      value: "45",
      description: "Níveis regional e nacional",
      trend: "+8 novos este ano",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      icon: Zap,
      title: "Média de Pontos",
      value: "85.2",
      description: "Por jogo na Liga Nacional",
      trend: "+3.5 vs época passada",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="cv-container">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-cv-blue text-white">
            Estatísticas da Época 2023/24
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-cv-blue dark:text-blue-400 mb-4">
            Basquetebol em Números
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Acompanhe o crescimento e desenvolvimento do basquetebol cabo-verdiano
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`
                cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                ${stat.bgColor} ${stat.borderColor} border-2
                ${hoveredCard === index ? 'scale-105 shadow-2xl' : ''}
                glass-card
              `}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {stat.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>

                {hoveredCard === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Atualizado recentemente</span>
                      <span>●</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <Target className="h-4 w-4 text-cv-blue" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Estatísticas em tempo real
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveStatsCards;
