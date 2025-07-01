
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Activity, Wifi, BarChart3, Play } from 'lucide-react';
import FibaLiveStats from './FibaLiveStats';

const LiveResultsWidget = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const liveGames = [
    {
      id: 'game-1',
      competition: "Liga Nacional Masculina",
      homeTeam: "ABC Basquete",
      awayTeam: "Sporting CP", 
      homeScore: 68,
      awayScore: 72,
      quarter: "3º Período",
      time: "05:42",
      fibaLiveStats: true,
      livestream: true
    },
    {
      id: 'game-2',
      competition: "Liga Nacional Feminina",
      homeTeam: "Five Stars Feminino",
      awayTeam: "Unidos Feminino",
      homeScore: 45,
      awayScore: 41,
      quarter: "2º Período", 
      time: "02:15",
      fibaLiveStats: true,
      livestream: false
    }
  ];

  const recentResults = [
    {
      id: 'result-1',
      competition: "Liga Nacional Masculina",
      homeTeam: "CD Travadores",
      awayTeam: "Académica",
      homeScore: 85,
      awayScore: 72,
      status: "Final",
      date: "Ontem",
      fibaLiveStats: true
    },
    {
      id: 'result-2',
      competition: "Taça de Cabo Verde",
      homeTeam: "Benfica CV",
      awayTeam: "FC Porto CV",
      homeScore: 78,
      awayScore: 83,
      status: "Final",
      date: "Domingo",
      fibaLiveStats: true
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-cv-blue text-white px-4 py-3">
        <h3 className="font-bold flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Resultados ao Vivo
        </h3>
      </div>
      
      <div className="p-4">
        {/* Jogos ao Vivo */}
        {liveGames.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              AO VIVO
            </h4>
            <div className="space-y-3">
              {liveGames.map((game) => (
                <div key={game.id} className="border border-red-200 bg-red-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-red-600 font-medium">{game.competition}</span>
                    <div className="flex items-center space-x-1">
                      <Badge className="bg-red-500 text-white animate-pulse">
                        {game.quarter} • {game.time}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-2 mb-3">
                    <div className="text-right">
                      <p className="font-medium text-sm">{game.homeTeam}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg font-bold text-cv-blue">{game.homeScore}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-lg font-bold text-cv-blue">{game.awayScore}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{game.awayTeam}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    {game.fibaLiveStats && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => setSelectedGame(game.id)}
                          >
                            <Wifi className="h-3 w-3 mr-1" />
                            FIBA LiveStats
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Wifi className="h-5 w-5 text-orange-500" />
                              <span>FIBA LiveStats - {game.homeTeam} vs {game.awayTeam}</span>
                            </DialogTitle>
                          </DialogHeader>
                          <FibaLiveStats gameId={game.id} />
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {game.livestream && (
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        <Play className="h-3 w-3 mr-1" />
                        Ver Stream
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resultados Recentes */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">RESULTADOS RECENTES</h4>
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-600">{result.competition}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">{result.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {result.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 items-center gap-2 mb-2">
                  <div className="text-right">
                    <p className="font-medium text-sm">{result.homeTeam}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg font-bold text-cv-blue">{result.homeScore}</span>
                      <span className="text-gray-400">-</span>
                      <span className="text-lg font-bold text-cv-blue">{result.awayScore}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{result.awayTeam}</p>
                  </div>
                </div>
                
                {result.fibaLiveStats && (
                  <div className="flex justify-center">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-orange-600 border-orange-300 hover:bg-orange-50"
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Ver Estatísticas
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            className="w-full border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white"
          >
            Ver Todos os Resultados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveResultsWidget;
