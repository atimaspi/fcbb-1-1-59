
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Trophy, Table, Calendar, BarChart3 } from 'lucide-react';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';

interface StandingEntry {
  id: string;
  team_name: string;
  position: number;
  games: number;
  wins: number;
  losses: number;
  points: number;
  form: string[];
}

const CompetitionsContentManager = () => {
  const { competitions, teams, games, operations } = useBackendData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');
  const [standings, setStandings] = useState<StandingEntry[]>([]);

  const [newStanding, setNewStanding] = useState({
    team_name: '',
    position: 1,
    games: 0,
    wins: 0,
    losses: 0,
    points: 0,
    form: ['']
  });

  const handleAddStanding = () => {
    const standing: StandingEntry = {
      id: Date.now().toString(),
      ...newStanding,
      form: newStanding.form.filter(f => f.trim() !== '')
    };
    setStandings([...standings, standing]);
    setNewStanding({
      team_name: '',
      position: standings.length + 2,
      games: 0,
      wins: 0,
      losses: 0,
      points: 0,
      form: ['']
    });
    toast({
      title: "Classificação adicionada",
      description: "Nova entrada na classificação foi criada com sucesso.",
    });
  };

  const handleDeleteStanding = (id: string) => {
    setStandings(standings.filter(s => s.id !== id));
    toast({
      title: "Classificação removida",
      description: "Entrada removida da classificação.",
    });
  };

  const handleFormChange = (index: number, value: string) => {
    const newForm = [...newStanding.form];
    newForm[index] = value;
    setNewStanding({ ...newStanding, form: newForm });
  };

  const addFormResult = () => {
    setNewStanding({
      ...newStanding,
      form: [...newStanding.form, '']
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestão de Competições</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Competição
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="standings" className="flex items-center gap-2">
            <Table className="w-4 h-4" />
            Classificações
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Estatísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competições Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competitions.map((competition) => (
                  <Card key={competition.id} className="border-l-4 border-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{competition.name}</h3>
                        <Badge variant={competition.status === 'active' ? 'default' : 'secondary'}>
                          {competition.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{competition.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Table className="w-3 h-3 mr-1" />
                          Classificação
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Classificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="competition-select">Selecionar Competição</Label>
                <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma competição" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((comp) => (
                      <SelectItem key={comp.id} value={comp.id}>
                        {comp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-4">Adicionar Nova Classificação</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label>Equipa</Label>
                    <Input
                      value={newStanding.team_name}
                      onChange={(e) => setNewStanding({...newStanding, team_name: e.target.value})}
                      placeholder="Nome da equipa"
                    />
                  </div>
                  <div>
                    <Label>Posição</Label>
                    <Input
                      type="number"
                      value={newStanding.position}
                      onChange={(e) => setNewStanding({...newStanding, position: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Jogos</Label>
                    <Input
                      type="number"
                      value={newStanding.games}
                      onChange={(e) => setNewStanding({...newStanding, games: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Vitórias</Label>
                    <Input
                      type="number"
                      value={newStanding.wins}
                      onChange={(e) => setNewStanding({...newStanding, wins: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Derrotas</Label>
                    <Input
                      type="number"
                      value={newStanding.losses}
                      onChange={(e) => setNewStanding({...newStanding, losses: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label>Pontos</Label>
                    <Input
                      type="number"
                      value={newStanding.points}
                      onChange={(e) => setNewStanding({...newStanding, points: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Forma Recente</Label>
                  <div className="flex gap-2 items-center">
                    {newStanding.form.map((result, index) => (
                      <Select key={index} value={result} onValueChange={(value) => handleFormChange(index, value)}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="W">V</SelectItem>
                          <SelectItem value="L">D</SelectItem>
                        </SelectContent>
                      </Select>
                    ))}
                    <Button size="sm" variant="outline" onClick={addFormResult}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <Button onClick={handleAddStanding} className="w-full">
                  Adicionar à Classificação
                </Button>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Classificação Atual</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Pos</th>
                        <th className="border border-gray-300 p-2">Equipa</th>
                        <th className="border border-gray-300 p-2">J</th>
                        <th className="border border-gray-300 p-2">V</th>
                        <th className="border border-gray-300 p-2">D</th>
                        <th className="border border-gray-300 p-2">Pts</th>
                        <th className="border border-gray-300 p-2">Forma</th>
                        <th className="border border-gray-300 p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.sort((a, b) => a.position - b.position).map((standing) => (
                        <tr key={standing.id}>
                          <td className="border border-gray-300 p-2 text-center">{standing.position}</td>
                          <td className="border border-gray-300 p-2">{standing.team_name}</td>
                          <td className="border border-gray-300 p-2 text-center">{standing.games}</td>
                          <td className="border border-gray-300 p-2 text-center">{standing.wins}</td>
                          <td className="border border-gray-300 p-2 text-center">{standing.losses}</td>
                          <td className="border border-gray-300 p-2 text-center font-bold">{standing.points}</td>
                          <td className="border border-gray-300 p-2">
                            <div className="flex gap-1">
                              {standing.form.map((result, index) => (
                                <Badge
                                  key={index}
                                  variant={result === 'W' ? 'default' : 'destructive'}
                                  className="w-6 h-6 p-0 text-xs"
                                >
                                  {result}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteStanding(standing.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {games.slice(0, 10).map((game) => (
                    <Card key={game.id} className="border-l-4 border-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{game.status}</Badge>
                          <span className="text-sm text-gray-600">{game.round}</span>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">Equipa Casa vs Equipa Visitante</p>
                          <p className="text-sm text-gray-600">{new Date(game.scheduled_date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{game.venue}</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">Editar</Button>
                          <Button size="sm" variant="outline">Resultados</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">176</div>
                    <p className="text-sm text-gray-600">Jogos Realizados</p>
                    <Button size="sm" variant="outline" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">156.8</div>
                    <p className="text-sm text-gray-600">Pontos/Jogo (Média)</p>
                    <Button size="sm" variant="outline" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">45,000</div>
                    <p className="text-sm text-gray-600">Espectadores Total</p>
                    <Button size="sm" variant="outline" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <p className="text-sm text-gray-600">Equipas Participantes</p>
                    <Button size="sm" variant="outline" className="mt-2">Editar</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitionsContentManager;
