import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Zap, Calendar, FileText, Users } from 'lucide-react';

const ArbitragemPage = () => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [gameReport, setGameReport] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [finalScore, setFinalScore] = useState('');

  const upcomingGames = [
    { id: 1, date: '25/05/2025', time: '18:00', home: 'ABC Basquete', away: 'Sporting CP', venue: 'Pavilhão Municipal', referee: 'João Arbítro' },
    { id: 2, date: '26/05/2025', time: '20:00', home: 'FC Porto', away: 'Benfica', venue: 'Dragão Arena', referee: 'Maria Silva' },
    { id: 3, date: '27/05/2025', time: '19:00', home: 'CD Travadores', away: 'Académica', venue: 'Pavilhão Central', referee: 'Pedro Costa' },
  ];

  const refereesRanking = [
    { rank: 1, name: 'João Arbítro', games: 45, category: 'Nacional', rating: 9.2 },
    { rank: 2, name: 'Maria Silva', games: 42, category: 'Nacional', rating: 9.0 },
    { rank: 3, name: 'Pedro Costa', games: 38, category: 'Nacional', rating: 8.8 },
    { rank: 4, name: 'Ana Santos', games: 35, category: 'Regional', rating: 8.6 },
    { rank: 5, name: 'Carlos Mendes', games: 32, category: 'Regional', rating: 8.4 },
  ];

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Game report submitted:', { homeTeam, awayTeam, finalScore, gameReport });
    setShowReportDialog(false);
    // Reset form
    setHomeTeam('');
    setAwayTeam('');
    setFinalScore('');
    setGameReport('');
    alert('Relatório enviado com sucesso!');
  };

  return (
    <PageLayout title="Arbitragem">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Árbitros Ativos</CardTitle>
            <Users className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jogos Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Pendentes</CardTitle>
            <FileText className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Disponíveis</CardTitle>
            <Zap className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">2</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nomeacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nomeacoes">Nomeações</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="formacao">Formação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nomeacoes" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Próximas Nomeações</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Jogo</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Árbitro Principal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>{game.date}</TableCell>
                    <TableCell>{game.time}</TableCell>
                    <TableCell className="font-medium">{game.home} vs {game.away}</TableCell>
                    <TableCell>{game.venue}</TableCell>
                    <TableCell>{game.referee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="relatorios" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-cv-blue">Relatórios de Jogo</h3>
              <Button 
                className="bg-cv-blue hover:bg-blue-700"
                onClick={() => setShowReportDialog(true)}
              >
                Novo Relatório
              </Button>
            </div>
            <p className="text-gray-600 mb-4">
              Os árbitros devem submeter os relatórios de jogo até 24 horas após o término da partida.
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">ABC Basquete vs Sporting CP</p>
                <p className="text-sm text-gray-600">23/05/2025 - Relatório enviado</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="font-medium">FC Porto vs Benfica</p>
                <p className="text-sm text-gray-600">22/05/2025 - Pendente</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">CD Travadores vs Académica</p>
                <p className="text-sm text-gray-600">21/05/2025 - Relatório enviado</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ranking" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Ranking de Árbitros</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-center">Jogos</TableHead>
                  <TableHead className="text-center">Categoria</TableHead>
                  <TableHead className="text-center">Avaliação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refereesRanking.map((referee) => (
                  <TableRow key={referee.rank}>
                    <TableCell className="font-medium">{referee.rank}</TableCell>
                    <TableCell className="font-medium">{referee.name}</TableCell>
                    <TableCell className="text-center">{referee.games}</TableCell>
                    <TableCell className="text-center">{referee.category}</TableCell>
                    <TableCell className="text-center font-bold">{referee.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="formacao" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-cv-blue mb-3">Curso de Arbitragem Nível I</h3>
              <p className="text-gray-600 mb-4">Curso básico para novos árbitros. Inclui regras fundamentais e mecânica de arbitragem.</p>
              <div className="space-y-2 text-sm">
                <p><strong>Data:</strong> 15-17 Junho 2025</p>
                <p><strong>Local:</strong> Centro de Formação FCBB</p>
                <p><strong>Duração:</strong> 20 horas</p>
                <p><strong>Vagas:</strong> 15 disponíveis</p>
              </div>
              <Button className="w-full mt-4 bg-cv-blue hover:bg-blue-700">
                Inscrever-se
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-cv-blue mb-3">Workshop de Atualização</h3>
              <p className="text-gray-600 mb-4">Atualização sobre novas regras e interpretações para árbitros ativos.</p>
              <div className="space-y-2 text-sm">
                <p><strong>Data:</strong> 8 Junho 2025</p>
                <p><strong>Local:</strong> Online</p>
                <p><strong>Duração:</strong> 4 horas</p>
                <p><strong>Vagas:</strong> 30 disponíveis</p>
              </div>
              <Button className="w-full mt-4 bg-cv-blue hover:bg-blue-700">
                Inscrever-se
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Game Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Relatório de Jogo</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do jogo e submeta o relatório.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReport}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="homeTeam" className="text-sm font-medium">
                    Equipa Casa
                  </label>
                  <input
                    id="homeTeam"
                    value={homeTeam}
                    onChange={(e) => setHomeTeam(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="awayTeam" className="text-sm font-medium">
                    Equipa Visitante
                  </label>
                  <input
                    id="awayTeam"
                    value={awayTeam}
                    onChange={(e) => setAwayTeam(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="finalScore" className="text-sm font-medium">
                  Resultado Final
                </label>
                <input
                  id="finalScore"
                  value={finalScore}
                  onChange={(e) => setFinalScore(e.target.value)}
                  placeholder="Ex: 85-72"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="gameReport" className="text-sm font-medium">
                  Relatório
                </label>
                <textarea
                  id="gameReport"
                  value={gameReport}
                  onChange={(e) => setGameReport(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md h-32"
                  placeholder="Descreva eventos importantes, faltas técnicas, etc."
                  required
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-cv-blue">Enviar Relatório</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ArbitragemPage;
