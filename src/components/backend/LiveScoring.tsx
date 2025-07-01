
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from "@/hooks/useBackendData";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Minus,
  Clock,
  Target,
  Users,
  RefreshCw
} from 'lucide-react';

const LiveScoring = () => {
  const { games, teams, operations, gamesLoading } = useBackendData();
  const [selectedGame, setSelectedGame] = useState('');
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [gameStatus, setGameStatus] = useState('scheduled');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState('10:00');
  const { toast } = useToast();

  useEffect(() => {
    if (selectedGame && games.length > 0) {
      const game = games.find(g => g.id === selectedGame);
      if (game) {
        setCurrentGame(game);
        setGameStatus(game.status || 'scheduled');
        setHomeScore(game.home_score || 0);
        setAwayScore(game.away_score || 0);
      }
    }
  }, [selectedGame, games]);

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'Equipa Desconhecida';
  };

  const startGame = async () => {
    if (!selectedGame) return;
    
    try {
      await operations.games.update.mutateAsync({ 
        id: selectedGame, 
        data: { 
          status: 'live',
          home_score: homeScore,
          away_score: awayScore
        }
      });

      setGameStatus('live');
      toast({
        title: "Sucesso",
        description: "Jogo iniciado com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao iniciar jogo: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const pauseGame = async () => {
    if (!selectedGame) return;
    
    try {
      await operations.games.update.mutateAsync({ 
        id: selectedGame, 
        data: { status: 'paused' }
      });

      setGameStatus('paused');
      toast({
        title: "Sucesso",
        description: "Jogo pausado!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao pausar jogo: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const endGame = async () => {
    if (!selectedGame) return;
    
    try {
      await operations.games.update.mutateAsync({ 
        id: selectedGame, 
        data: { 
          status: 'finished',
          home_score: homeScore,
          away_score: awayScore
        }
      });

      setGameStatus('finished');
      toast({
        title: "Sucesso",
        description: "Jogo finalizado!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao finalizar jogo: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const adjustScore = async (team: 'home' | 'away', points: number) => {
    if (!selectedGame) return;

    const newHomeScore = team === 'home' ? Math.max(0, homeScore + points) : homeScore;
    const newAwayScore = team === 'away' ? Math.max(0, awayScore + points) : awayScore;

    setHomeScore(newHomeScore);
    setAwayScore(newAwayScore);

    try {
      await operations.games.update.mutateAsync({
        id: selectedGame,
        data: {
          home_score: newHomeScore,
          away_score: newAwayScore
        }
      });
    } catch (error: any) {
      console.error('Erro ao atualizar pontuação:', error);
    }
  };

  const availableGames = games.filter(game => 
    game.status === 'scheduled' || game.status === 'live' || game.status === 'paused'
  );
  
  const liveGames = games.filter(game => game.status === 'live');

  if (gamesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-cv-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue mb-2">Sistema de Pontuação ao Vivo</h2>
          <p className="text-gray-600">Gestão em tempo real de jogos e estatísticas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Selecionar Jogo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="game-select">Jogo para Pontuar</Label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar jogo..." />
                </SelectTrigger>
                <SelectContent>
                  {availableGames.length === 0 ? (
                    <SelectItem value="no-games" disabled>
                      Nenhum jogo disponível
                    </SelectItem>
                  ) : (
                    availableGames.map((game) => (
                      <SelectItem key={game.id} value={game.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {getTeamName(game.home_team_id)} vs{' '}
                            {getTeamName(game.away_team_id)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(game.scheduled_date).toLocaleDateString('pt-PT')} - {game.venue || 'Local não definido'}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {selectedGame && currentGame && (
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Jogo Selecionado:</h4>
                  <div className="text-center space-y-2">
                    <div className="text-lg font-bold">
                      {getTeamName(currentGame.home_team_id)}
                    </div>
                    <div className="text-gray-500 text-sm">vs</div>
                    <div className="text-lg font-bold">
                      {getTeamName(currentGame.away_team_id)}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(currentGame.scheduled_date).toLocaleDateString('pt-PT')} - {currentGame.venue || 'Local não definido'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={startGame} 
                    disabled={gameStatus === 'live' || gameStatus === 'finished'}
                    className="flex-1"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={pauseGame}
                    disabled={gameStatus !== 'live'}
                    size="sm"
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={endGame}
                    disabled={gameStatus === 'scheduled'}
                    size="sm"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <Badge variant={
                    gameStatus === 'live' ? 'default' : 
                    gameStatus === 'finished' ? 'secondary' : 'outline'
                  }>
                    {gameStatus === 'live' ? 'AO VIVO' : 
                     gameStatus === 'finished' ? 'FINALIZADO' : 
                     gameStatus === 'paused' ? 'PAUSADO' : 'AGENDADO'}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pontuação Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedGame && currentGame ? (
              <>
                <div className="text-center space-y-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-600 mb-2 truncate">
                        {getTeamName(currentGame.home_team_id)}
                      </div>
                      <div className="text-4xl font-bold text-cv-blue">
                        {homeScore}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400">-</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-600 mb-2 truncate">
                        {getTeamName(currentGame.away_team_id)}
                      </div>
                      <div className="text-4xl font-bold text-cv-blue">
                        {awayScore}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline">{currentPeriod}º Período</Badge>
                    <span>|</span>
                    <span className="font-mono">{timeRemaining}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Equipa Casa</Label>
                    <div className="grid grid-cols-3 gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => adjustScore('home', 1)}
                        disabled={gameStatus !== 'live'}
                        className="text-xs p-1"
                      >
                        <Plus className="w-3 h-3" />1
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => adjustScore('home', 2)}
                        disabled={gameStatus !== 'live'}
                        className="text-xs p-1"
                      >
                        <Plus className="w-3 h-3" />2
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => adjustScore('home', 3)}
                        disabled={gameStatus !== 'live'}
                        className="text-xs p-1"
                      >
                        <Plus className="w-3 h-3" />3
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => adjustScore('home', -1)}
                      disabled={gameStatus !== 'live' || homeScore === 0}
                      className="w-full text-xs"
                    >
                      <Minus className="w-3 h-3 mr-1" />Corrigir
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Equipa Visitante</Label>
                    <div className="grid grid-cols-3 gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => adjustScore('away', 1)}
                        disabled={gameStatus !== 'live'}
                        className="text-xs p-1"
                      >
                        <Plus className="w-3 h-3" />1
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => adjustScore('away', 2)}
                        disabled={gameStatus !== 'live'}
                        className="text-xs p-1"
                      >
                        <Plus className="w-3 h-3" />2
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => adjustScore('away', 3)}
                        disabled={gameStatus !== 'live'}
                        className="text-xs p-1"
                      >
                        <Plus className="w-3 h-3" />3
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => adjustScore('away', -1)}
                      disabled={gameStatus !== 'live' || awayScore === 0}
                      className="w-full text-xs"
                    >
                      <Minus className="w-3 h-3 mr-1" />Corrigir
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Controlo de Tempo</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="10:00" 
                      value={timeRemaining}
                      onChange={(e) => setTimeRemaining(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={currentPeriod.toString()} onValueChange={(value) => setCurrentPeriod(parseInt(value))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1º</SelectItem>
                        <SelectItem value="2">2º</SelectItem>
                        <SelectItem value="3">3º</SelectItem>
                        <SelectItem value="4">4º</SelectItem>
                        <SelectItem value="5">Prol.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Selecione um jogo para começar</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Games Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Jogos ao Vivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {liveGames.length === 0 ? (
              <div className="text-center py-6">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum jogo ao vivo no momento</p>
              </div>
            ) : (
              <div className="space-y-3">
                {liveGames.map((game) => (
                  <div key={game.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <div className="font-medium text-xs truncate">
                          {getTeamName(game.home_team_id)} vs{' '}
                          {getTeamName(game.away_team_id)}
                        </div>
                        <div className="text-gray-500 text-lg font-bold">
                          {game.home_score || 0} - {game.away_score || 0}
                        </div>
                      </div>
                      <Badge variant="default" className="animate-pulse">AO VIVO</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveScoring;
