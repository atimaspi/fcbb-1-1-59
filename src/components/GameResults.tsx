
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, Users } from 'lucide-react';

const GameResults = () => {
  const { gamesData, isLoading } = useOptimizedDataFetching();

  // Usar dados reais ou fallback
  const recentGames = gamesData?.length > 0 ? gamesData.slice(0, 4) : [
    {
      id: 1,
      home_team: "ABC Praia",
      away_team: "Sporting São Vicente",
      home_score: 78,
      away_score: 72,
      status: "completed",
      scheduled_date: "2025-03-22T20:00:00Z",
      venue: "Pavilhão Nacional",
      competition: "Liga Nacional"
    },
    {
      id: 2,
      home_team: "FC Porto Novo",
      away_team: "Benfica Mindelo",
      home_score: 65,
      away_score: 68,
      status: "completed",
      scheduled_date: "2025-03-21T19:30:00Z",
      venue: "Pavilhão São Vicente",
      competition: "Liga Nacional"
    },
    {
      id: 3,
      home_team: "Académica Sal",
      away_team: "Barreirense",
      home_score: 0,
      away_score: 0,
      status: "live",
      scheduled_date: "2025-03-23T18:00:00Z",
      venue: "Pavilhão Sal",
      competition: "Liga Nacional"
    },
    {
      id: 4,
      home_team: "Boavista Fogo",
      away_team: "CD Travadores",
      home_score: 0,
      away_score: 0,
      status: "scheduled",
      scheduled_date: "2025-03-24T20:00:00Z",
      venue: "Pavilhão Fogo",
      competition: "Liga Nacional"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <Badge className="bg-red-500 text-white animate-pulse border-0 text-xs font-bold">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-ping" />
            AO VIVO
          </Badge>
        );
      case 'completed':
        return <Badge className="bg-green-500 text-white border-0 text-xs font-semibold">TERMINADO</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500 text-white border-0 text-xs font-semibold">AGENDADO</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white border-0 text-xs font-semibold">DESCONHECIDO</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Hoje, ${date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString('pt-PT', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold font-display text-cv-blue mb-4">Resultados Recentes</h2>
        <p className="text-gray-600 text-lg">Acompanhe os últimos jogos das competições nacionais</p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="fcbb-skeleton h-48 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold font-display text-cv-blue mb-4">Resultados Recentes</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Acompanhe os últimos jogos das competições nacionais e fique a par de todos os resultados
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="overflow-hidden h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-gradient-to-r from-cv-blue to-cv-red p-4 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold text-sm">{game.competition || 'Liga Nacional'}</span>
                    </div>
                    {getStatusBadge(game.status)}
                  </div>
                </div>

                {/* Game Content */}
                <div className="p-6">
                  {/* Teams and Score */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 text-center">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-cv-blue transition-colors">
                        {game.home_team}
                      </h3>
                      <div className="text-3xl font-bold font-display text-cv-blue">
                        {game.status === 'completed' || game.status === 'live' ? game.home_score : '-'}
                      </div>
                    </div>

                    <div className="px-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cv-yellow to-yellow-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="font-bold text-cv-blue text-sm">VS</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-cv-blue transition-colors">
                        {game.away_team}
                      </h3>
                      <div className="text-3xl font-bold font-display text-cv-blue">
                        {game.status === 'completed' || game.status === 'live' ? game.away_score : '-'}
                      </div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-cv-blue" />
                        <span>{formatDate(game.scheduled_date)}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-cv-red" />
                        <span>{game.venue || 'Pavilhão'}</span>
                      </div>
                    </div>

                    {game.status === 'live' && (
                      <div className="flex items-center justify-center space-x-1 text-red-600 font-semibold">
                        <Clock className="w-4 h-4" />
                        <span>Jogo em curso</span>
                      </div>
                    )}
                  </div>

                  {/* Winner Indicator */}
                  {game.status === 'completed' && (
                    <div className="mt-4 text-center">
                      <Badge 
                        className={`${
                          game.home_score > game.away_score 
                            ? 'bg-green-100 text-green-800' 
                            : game.away_score > game.home_score
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        } border-0 text-xs font-semibold`}
                      >
                        {game.home_score > game.away_score 
                          ? `Vitória ${game.home_team}` 
                          : game.away_score > game.home_score
                          ? `Vitória ${game.away_team}`
                          : 'Empate'
                        }
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-cv-blue via-cv-yellow to-cv-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <a 
          href="/resultados"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-cv-blue hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
        >
          <Users className="w-5 h-5" />
          <span>Ver Todos os Resultados</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
};

export default GameResults;
