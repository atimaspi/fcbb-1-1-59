
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  BarChart3, 
  Users, 
  Target, 
  Timer, 
  TrendingUp,
  Wifi,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface GameStats {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: string;
  isLive: boolean;
  homeStats: TeamStats;
  awayStats: TeamStats;
}

interface TeamStats {
  fieldGoals: string;
  threePointers: string;
  freeThrows: string;
  rebounds: number;
  assists: number;
  turnovers: number;
  fouls: number;
}

const FibaLiveStats = ({ gameId }: { gameId?: string }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState<GameStats | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Dados simulados do FIBA LiveStats
  const mockGameData: GameStats = {
    gameId: 'CV-2025-001',
    homeTeam: 'ABC Basquete',
    awayTeam: 'Sporting CP',
    homeScore: 68,
    awayScore: 72,
    quarter: 3,
    timeRemaining: '05:42',
    isLive: true,
    homeStats: {
      fieldGoals: '25/52 (48%)',
      threePointers: '8/18 (44%)',
      freeThrows: '10/12 (83%)',
      rebounds: 32,
      assists: 15,
      turnovers: 8,
      fouls: 12
    },
    awayStats: {
      fieldGoals: '28/55 (51%)',
      threePointers: '6/15 (40%)',
      freeThrows: '10/14 (71%)',
      rebounds: 29,
      assists: 18,
      turnovers: 6,
      fouls: 10
    }
  };

  useEffect(() => {
    // Simular conexão com FIBA LiveStats
    const connectToFiba = () => {
      setIsConnected(true);
      setGameData(mockGameData);
    };

    const timer = setTimeout(connectToFiba, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!autoRefresh || !isConnected) return;

    const interval = setInterval(() => {
      // Simular atualizações em tempo real
      setGameData(prev => {
        if (!prev) return prev;
        
        const scoreDelta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 3) : 0;
        const teamToScore = Math.random() > 0.5;
        
        return {
          ...prev,
          homeScore: teamToScore ? prev.homeScore + scoreDelta : prev.homeScore,
          awayScore: !teamToScore ? prev.awayScore + scoreDelta : prev.awayScore,
          timeRemaining: updateGameTime(prev.timeRemaining)
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, isConnected]);

  const updateGameTime = (currentTime: string): string => {
    const [minutes, seconds] = currentTime.split(':').map(Number);
    let totalSeconds = minutes * 60 + seconds;
    totalSeconds = Math.max(0, totalSeconds - Math.floor(Math.random() * 15));
    
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    return `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const refreshData = () => {
    setGameData(mockGameData);
  };

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span>Conectando ao FIBA LiveStats...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!gameData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Activity className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600">Nenhum jogo ativo no momento</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho com controlos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Wifi className="h-5 w-5 text-orange-500" />
                <span className="text-orange-500 font-bold">FIBA LiveStats</span>
              </div>
              {gameData.isLive && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  AO VIVO
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAutoRefresh}
                className={autoRefresh ? 'bg-green-100' : ''}
              >
                {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {autoRefresh ? 'Pausar' : 'Retomar'}
              </Button>
              <Button variant="outline" size="sm" onClick={refreshData}>
                <RotateCcw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Placar Principal */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <Badge variant="outline" className="mb-2">
              {gameData.quarter}º Período • {gameData.timeRemaining}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">{gameData.homeTeam}</h3>
              <div className="text-4xl font-bold text-cv-blue">{gameData.homeScore}</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">VS</div>
              {gameData.isLive && (
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  <span className="text-xs text-red-500">LIVE</span>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">{gameData.awayTeam}</h3>
              <div className="text-4xl font-bold text-cv-blue">{gameData.awayScore}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Detalhadas */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="plays">Jogadas</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Estatísticas das Equipas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-center">{gameData.homeTeam}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cestos de Campo:</span>
                      <span className="font-medium">{gameData.homeStats.fieldGoals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Triplos:</span>
                      <span className="font-medium">{gameData.homeStats.threePointers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lances Livres:</span>
                      <span className="font-medium">{gameData.homeStats.freeThrows}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ressaltos:</span>
                      <span className="font-medium">{gameData.homeStats.rebounds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assistências:</span>
                      <span className="font-medium">{gameData.homeStats.assists}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Perdas de Bola:</span>
                      <span className="font-medium">{gameData.homeStats.turnovers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Faltas:</span>
                      <span className="font-medium">{gameData.homeStats.fouls}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-center">{gameData.awayTeam}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cestos de Campo:</span>
                      <span className="font-medium">{gameData.awayStats.fieldGoals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Triplos:</span>
                      <span className="font-medium">{gameData.awayStats.threePointers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lances Livres:</span>
                      <span className="font-medium">{gameData.awayStats.freeThrows}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ressaltos:</span>
                      <span className="font-medium">{gameData.awayStats.rebounds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assistências:</span>
                      <span className="font-medium">{gameData.awayStats.assists}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Perdas de Bola:</span>
                      <span className="font-medium">{gameData.awayStats.turnovers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Faltas:</span>
                      <span className="font-medium">{gameData.awayStats.fouls}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plays">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Últimas Jogadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span>05:42 - 3º Período</span>
                  <span className="font-medium">Miguel Costa marca triplo para {gameData.awayTeam}</span>
                  <Badge className="bg-green-500 text-white">+3</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <span>06:15 - 3º Período</span>
                  <span className="font-medium">André Silva marca dois pontos para {gameData.homeTeam}</span>
                  <Badge className="bg-blue-500 text-white">+2</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                  <span>06:42 - 3º Período</span>
                  <span className="font-medium">Falta de Pedro Santos ({gameData.awayTeam})</span>
                  <Badge variant="outline">Falta</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span>07:18 - 3º Período</span>
                  <span className="font-medium">Carlos Tavares marca lance livre para {gameData.homeTeam}</span>
                  <Badge className="bg-green-500 text-white">+1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Análise Gráfica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Percentagem de Acerto nos Cestos de Campo</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{gameData.homeTeam}</span>
                        <span>48%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cv-blue h-2 rounded-full" style={{ width: '48%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{gameData.awayTeam}</span>
                        <span>51%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cv-red h-2 rounded-full" style={{ width: '51%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Ressaltos</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{gameData.homeTeam}</span>
                        <span>{gameData.homeStats.rebounds}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cv-blue h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{gameData.awayTeam}</span>
                        <span>{gameData.awayStats.rebounds}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-cv-red h-2 rounded-full" style={{ width: '48%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FibaLiveStats;
