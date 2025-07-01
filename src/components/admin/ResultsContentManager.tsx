
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Save, Eye, Upload } from 'lucide-react';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';

interface GameResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'live' | 'finished';
}

const ResultsContentManager = () => {
  const { games, competitions, teams, operations } = useBackendData();
  const { toast } = useToast();
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  
  const [newResult, setNewResult] = useState({
    homeTeam: '',
    awayTeam: '',
    homeScore: 0,
    awayScore: 0,
    date: '',
    venue: '',
    competition: '',
    status: 'finished' as const
  });

  const handleAddResult = async () => {
    if (!newResult.homeTeam || !newResult.awayTeam) {
      toast({
        title: "Erro",
        description: "Por favor, selecione as equipas.",
        variant: "destructive"
      });
      return;
    }

    const result: GameResult = {
      id: Date.now().toString(),
      ...newResult
    };

    setGameResults([...gameResults, result]);
    
    // Reset form
    setNewResult({
      homeTeam: '',
      awayTeam: '',
      homeScore: 0,
      awayScore: 0,
      date: '',
      venue: '',
      competition: '',
      status: 'finished'
    });

    toast({
      title: "Resultado adicionado",
      description: "Novo resultado foi registado com sucesso.",
    });
  };

  const handleDeleteResult = (id: string) => {
    setGameResults(gameResults.filter(r => r.id !== id));
    toast({
      title: "Resultado removido",
      description: "Resultado foi removido com sucesso.",
    });
  };

  const handleUpdateScore = (id: string, homeScore: number, awayScore: number) => {
    setGameResults(gameResults.map(r => 
      r.id === id ? { ...r, homeScore, awayScore } : r
    ));
  };

  const liveResults = gameResults.filter(r => r.status === 'live');
  const finishedResults = gameResults.filter(r => r.status === 'finished');
  const scheduledResults = gameResults.filter(r => r.status === 'scheduled');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestão de Resultados</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importar Resultados
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Resultado
          </Button>
        </div>
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">Ao Vivo ({liveResults.length})</TabsTrigger>
          <TabsTrigger value="results">Resultados ({finishedResults.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Agendados ({scheduledResults.length})</TabsTrigger>
          <TabsTrigger value="add">Adicionar</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jogos Ao Vivo</CardTitle>
            </CardHeader>
            <CardContent>
              {liveResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum jogo ao vivo no momento.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {liveResults.map((result) => (
                    <Card key={result.id} className="border-l-4 border-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="bg-red-500 animate-pulse">AO VIVO</Badge>
                              <span className="text-sm text-gray-600">{result.competition}</span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold">{result.homeTeam}</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <Input
                                    type="number"
                                    value={result.homeScore}
                                    onChange={(e) => handleUpdateScore(result.id, parseInt(e.target.value), result.awayScore)}
                                    className="w-16 text-center"
                                  />
                                  <span>-</span>
                                  <Input
                                    type="number"
                                    value={result.awayScore}
                                    onChange={(e) => handleUpdateScore(result.id, result.homeScore, parseInt(e.target.value))}
                                    className="w-16 text-center"
                                  />
                                </div>
                              </div>
                              <div className="text-left">
                                <p className="font-semibold">{result.awayTeam}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              Finalizar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resultados Finais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {finishedResults.map((result) => (
                  <Card key={result.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{result.date}</span>
                            <Badge variant="outline">{result.competition}</Badge>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold">{result.homeTeam}</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                <span className={result.homeScore > result.awayScore ? 'text-green-600' : 'text-gray-600'}>
                                  {result.homeScore}
                                </span>
                                <span className="mx-2">-</span>
                                <span className={result.awayScore > result.homeScore ? 'text-green-600' : 'text-gray-600'}>
                                  {result.awayScore}
                                </span>
                              </div>
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">{result.awayTeam}</p>
                            </div>
                          </div>
                          <div className="text-center text-sm text-gray-600 mt-2">
                            {result.venue}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteResult(result.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jogos Agendados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledResults.map((result) => (
                  <Card key={result.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{result.date}</span>
                            <Badge variant="outline">{result.competition}</Badge>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold">{result.homeTeam}</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-400">VS</div>
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">{result.awayTeam}</p>
                            </div>
                          </div>
                          <div className="text-center text-sm text-gray-600 mt-2">
                            {result.venue}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Iniciar Jogo
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Resultado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Competição</Label>
                  <Select value={newResult.competition} onValueChange={(value) => setNewResult({...newResult, competition: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar competição" />
                    </SelectTrigger>
                    <SelectContent>
                      {competitions.map((comp) => (
                        <SelectItem key={comp.id} value={comp.name}>
                          {comp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Data</Label>
                  <Input
                    type="datetime-local"
                    value={newResult.date}
                    onChange={(e) => setNewResult({...newResult, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Equipa Casa</Label>
                  <Select value={newResult.homeTeam} onValueChange={(value) => setNewResult({...newResult, homeTeam: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.name}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Equipa Visitante</Label>
                  <Select value={newResult.awayTeam} onValueChange={(value) => setNewResult({...newResult, awayTeam: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar equipa" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.name}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Resultado Casa</Label>
                  <Input
                    type="number"
                    value={newResult.homeScore}
                    onChange={(e) => setNewResult({...newResult, homeScore: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Resultado Visitante</Label>
                  <Input
                    type="number"
                    value={newResult.awayScore}
                    onChange={(e) => setNewResult({...newResult, awayScore: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Local</Label>
                  <Input
                    value={newResult.venue}
                    onChange={(e) => setNewResult({...newResult, venue: e.target.value})}
                    placeholder="Local do jogo"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={newResult.status} onValueChange={(value) => setNewResult({...newResult, status: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                      <SelectItem value="live">Ao Vivo</SelectItem>
                      <SelectItem value="finished">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleAddResult} className="w-full">
                Adicionar Resultado
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsContentManager;
