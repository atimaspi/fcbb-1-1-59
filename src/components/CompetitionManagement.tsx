
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Calendar, Users, Target } from 'lucide-react';

const CompetitionManagement = () => {
  const classifications = [
    { position: 1, team: "Sporting CV", games: 18, wins: 15, losses: 3, points: 33 },
    { position: 2, team: "CD Travadores", games: 18, wins: 14, losses: 4, points: 32 },
    { position: 3, team: "Académica Porto Novo", games: 18, wins: 12, losses: 6, points: 30 },
    { position: 4, team: "CS Mindelense", games: 18, wins: 11, losses: 7, points: 29 },
    { position: 5, team: "Barreirense", games: 18, wins: 10, losses: 8, points: 28 },
    { position: 6, team: "ABC Basket", games: 18, wins: 9, losses: 9, points: 27 }
  ];

  const topScorers = [
    { name: "João Silva", team: "Sporting CV", points: 24.5, games: 18 },
    { name: "Pedro Santos", team: "CD Travadores", points: 22.8, games: 17 },
    { name: "Carlos Mendes", team: "Académica", points: 21.3, games: 18 },
    { name: "António Lima", team: "Mindelense", points: 20.1, games: 16 }
  ];

  const competitions = [
    {
      name: "Liga Nacional Masculina",
      status: "Em Curso",
      teams: 12,
      games: 132,
      startDate: "2024-10-15"
    },
    {
      name: "Liga Nacional Feminina", 
      status: "Em Curso",
      teams: 8,
      games: 56,
      startDate: "2024-11-01"
    },
    {
      name: "Taça de Cabo Verde",
      status: "Fase Final",
      teams: 4,
      games: 32,
      startDate: "2024-12-01"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitions.map((comp, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{comp.name}</span>
                <Badge variant={comp.status === "Em Curso" ? "default" : "secondary"}>
                  {comp.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{comp.teams} equipas</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{comp.games} jogos</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Início: {comp.startDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="classifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="classifications">Classificações</TabsTrigger>
          <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="classifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                Liga Nacional Masculina - Classificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Pos.</TableHead>
                    <TableHead>Equipa</TableHead>
                    <TableHead className="text-center">J</TableHead>
                    <TableHead className="text-center">V</TableHead>
                    <TableHead className="text-center">D</TableHead>
                    <TableHead className="text-center">Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classifications.map((team) => (
                    <TableRow key={team.position}>
                      <TableCell className="font-medium">{team.position}</TableCell>
                      <TableCell className="font-medium">{team.team}</TableCell>
                      <TableCell className="text-center">{team.games}</TableCell>
                      <TableCell className="text-center">{team.wins}</TableCell>
                      <TableCell className="text-center">{team.losses}</TableCell>
                      <TableCell className="text-center font-bold">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-cv-blue" />
                Melhores Marcadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jogador</TableHead>
                    <TableHead>Equipa</TableHead>
                    <TableHead className="text-center">Média/Jogo</TableHead>
                    <TableHead className="text-center">Jogos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topScorers.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.team}</TableCell>
                      <TableCell className="text-center font-bold">{player.points}</TableCell>
                      <TableCell className="text-center">{player.games}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitionManagement;
