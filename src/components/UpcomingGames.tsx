
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBackendData } from '@/hooks/useBackendData';
import { isValid, format } from 'date-fns';
import { pt } from 'date-fns/locale';

const UpcomingGames = () => {
  const { upcomingGames } = useBackendData();
  
  // Fallback static data in case backend data is not available
  const staticUpcomingGames = [
    {
      id: 1,
      date: "Hoje",
      time: "20:00",
      competition: "Liga Nacional Masculina",
      homeTeam: "Benfica",
      awayTeam: "Five Stars",
      venue: "Pavilhão João Serra",
      city: "Praia"
    },
    {
      id: 2,
      date: "Amanhã", 
      time: "19:30",
      competition: "Liga Nacional Feminina",
      homeTeam: "Estrelas",
      awayTeam: "Unidos Feminino",
      venue: "Pavilhão Vavá Duarte",
      city: "Praia"
    },
    {
      id: 3,
      date: "Sábado",
      time: "18:00", 
      competition: "Liga Nacional Masculina",
      homeTeam: "ABC",
      awayTeam: "Seven Stars",
      venue: "Pavilhão Adão Adão",
      city: "Mindelo"
    }
  ];

  const formatGameDate = (dateString: string) => {
    if (!dateString) return 'Data inválida';
    
    const date = new Date(dateString);
    if (!isValid(date)) return dateString; // Return original if it's a relative date like "Hoje"
    
    return format(date, 'dd/MM', { locale: pt });
  };

  // Use backend data if available, otherwise use static data
  const gamesToDisplay = upcomingGames && upcomingGames.length > 0 
    ? upcomingGames.slice(0, 3).map(game => ({
        id: game.id,
        date: formatGameDate(game.scheduled_date),
        time: game.scheduled_date ? new Date(game.scheduled_date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }) : '--:--',
        competition: "Liga Nacional",
        homeTeam: game.home_team_id || "Equipa Casa",
        awayTeam: game.away_team_id || "Equipa Fora", 
        venue: game.venue || "Pavilhão",
        city: "Cabo Verde"
      }))
    : staticUpcomingGames;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-cv-red text-white px-4 py-3">
        <h3 className="font-bold flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Próximos Jogos
        </h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {gamesToDisplay.map((game) => (
            <div key={game.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-cv-yellow text-cv-dark px-2 py-1 rounded font-medium">
                  {game.date}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {game.time}
                </span>
              </div>
              
              <div className="text-xs text-gray-600 mb-2">{game.competition}</div>
              
              <div className="font-medium text-sm mb-2">
                <div className="flex justify-between items-center">
                  <span>{game.homeTeam}</span>
                  <span className="text-gray-400">vs</span>
                  <span>{game.awayTeam}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {game.venue}, {game.city}
              </div>
            </div>
          ))}
        </div>

        <Link 
          to="/competicoes/calendario" 
          className="block mt-4 text-center bg-cv-red text-white py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Ver Calendário Completo
        </Link>
      </div>
    </div>
  );
};

export default UpcomingGames;
