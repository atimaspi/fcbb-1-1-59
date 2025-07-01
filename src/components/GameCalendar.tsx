
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useOptimizedDataFetching } from '@/hooks/useOptimizedDataFetching';
import { format, isToday, isTomorrow, parseISO, isValid } from 'date-fns';
import { pt } from 'date-fns/locale';

const GameCalendar = () => {
  const { gamesData, isLoading } = useOptimizedDataFetching();
  const [upcomingGames, setUpcomingGames] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  useEffect(() => {
    if (gamesData && gamesData.length > 0) {
      const upcoming = gamesData
        .filter((game: any) => 
          game.status === 'scheduled' || 
          game.status === 'upcoming' ||
          (!game.status && game.scheduled_date)
        )
        .sort((a: any, b: any) => 
          new Date(a.scheduled_date || 0).getTime() - new Date(b.scheduled_date || 0).getTime()
        )
        .slice(0, 12);
      
      setUpcomingGames(upcoming);
    }
  }, [gamesData]);

  const formatGameDate = (dateString: string) => {
    if (!dateString) return 'Data a definir';
    
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return 'Data inválida';
      
      if (isToday(date)) return 'Hoje';
      if (isTomorrow(date)) return 'Amanhã';
      
      return format(date, 'dd/MM/yyyy', { locale: pt });
    } catch {
      return 'Data inválida';
    }
  };

  const formatGameTime = (dateString: string) => {
    if (!dateString) return '--:--';
    
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return '--:--';
      
      return format(date, 'HH:mm', { locale: pt });
    } catch {
      return '--:--';
    }
  };

  const getGamesByPeriod = () => {
    const now = new Date();
    
    return upcomingGames.filter((game) => {
      if (!game.scheduled_date) return false;
      
      const gameDate = parseISO(game.scheduled_date);
      if (!isValid(gameDate)) return false;
      
      switch (selectedPeriod) {
        case 'today':
          return isToday(gameDate);
        case 'week':
          const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          return gameDate >= now && gameDate <= weekFromNow;
        case 'month':
          const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
          return gameDate >= now && gameDate <= monthFromNow;
        default:
          return true;
      }
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredGames = getGamesByPeriod();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-blue-600" />
            Calendário de Jogos
          </h2>
          
          <div className="flex space-x-2">
            <Button
              variant={selectedPeriod === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('today')}
              className={selectedPeriod === 'today' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              Hoje
            </Button>
            <Button
              variant={selectedPeriod === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('week')}
              className={selectedPeriod === 'week' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              Esta Semana
            </Button>
            <Button
              variant={selectedPeriod === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('month')}
              className={selectedPeriod === 'month' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              Este Mês
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <Card key={game.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-xs">
                      {game.competition || 'Liga Nacional'}
                    </Badge>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatGameDate(game.scheduled_date)}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatGameTime(game.scheduled_date)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="font-semibold text-sm mb-1 text-gray-800">
                      {game.home_team || 'Equipa Casa'}
                    </div>
                    <div className="text-2xl font-bold text-gray-400 my-2">VS</div>
                    <div className="font-semibold text-sm text-gray-800">
                      {game.away_team || 'Equipa Fora'}
                    </div>
                  </div>
                  
                  {game.venue && (
                    <div className="flex items-center justify-center text-xs text-gray-500 mb-3">
                      <MapPin className="w-3 h-3 mr-1" />
                      {game.venue}
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      Agendado
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum jogo agendado
              </h3>
              <p className="text-gray-700">
                {selectedPeriod === 'today' 
                  ? 'Não há jogos agendados para hoje'
                  : selectedPeriod === 'week'
                  ? 'Não há jogos agendados para esta semana'
                  : 'Não há jogos agendados para este mês'
                }
              </p>
            </div>
          )}
        </div>
        
        {filteredGames.length > 0 && (
          <div className="text-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Ver Calendário Completo
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GameCalendar;
