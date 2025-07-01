
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useBackendData } from '@/hooks/useBackendData';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ClubForm from './ClubForm';
import CompetitionForm from './CompetitionForm';
import GameForm from './GameForm';
import PlayerForm from './PlayerForm';
import NewsForm from './NewsForm';
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  UserCheck,
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';

const DataManagement = () => {
  const {
    teams,
    competitions,
    games,
    players,
    news,
    referees,
    coaches,
    operations,
    isLoading,
    teamsLoading,
    competitionsLoading,
    gamesLoading,
    playersLoading,
    newsLoading
  } = useBackendData();

  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('teams');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any, type: string) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await operations[type].update.mutateAsync({ id: editingItem.id, data });
        toast({ title: "Sucesso", description: `${type} atualizado com sucesso!` });
      } else {
        await operations[type].create.mutateAsync(data);
        toast({ title: "Sucesso", description: `${type} criado com sucesso!` });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao salvar: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este item?')) {
      try {
        await operations[type].delete.mutateAsync(id);
        toast({ title: "Sucesso", description: "Item eliminado com sucesso!" });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: `Erro ao eliminar: ${error.message}`,
          variant: "destructive",
        });
      }
    }
  };

  const openDialog = (item: any = null, type: string) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-cv-blue mr-2" />
        <span>Carregando dados...</span>
      </div>
    );
  }

  const renderTeamsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Clubes ({teams.length})</h3>
        <Button onClick={() => openDialog(null, 'teams')} disabled={teamsLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Clube
        </Button>
      </div>
      
      {teamsLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Divisão</TableHead>
              <TableHead>Data Criação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team: any) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>{team.category}</TableCell>
                <TableCell>{team.division || 'N/A'}</TableCell>
                <TableCell>{new Date(team.created_at).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(team, 'teams')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(team.id, 'teams')}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderCompetitionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Competições ({competitions.length})</h3>
        <Button onClick={() => openDialog(null, 'competitions')} disabled={competitionsLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Competição
        </Button>
      </div>
      
      {competitionsLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Época</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Início</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitions.map((competition: any) => (
              <TableRow key={competition.id}>
                <TableCell className="font-medium">{competition.name}</TableCell>
                <TableCell>{competition.type}</TableCell>
                <TableCell>{competition.season}</TableCell>
                <TableCell>
                  <Badge variant={competition.status === 'active' ? 'default' : 'secondary'}>
                    {competition.status}
                  </Badge>
                </TableCell>
                <TableCell>{competition.start_date ? new Date(competition.start_date).toLocaleDateString('pt-PT') : 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(competition, 'competitions')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(competition.id, 'competitions')}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderGamesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Jogos ({games.length})</h3>
        <Button onClick={() => openDialog(null, 'games')} disabled={gamesLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Jogo
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Jogos Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">
              {games.filter((g: any) => g.status === 'scheduled').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Jogos Finalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">
              {games.filter((g: any) => g.status === 'finished').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Jogos ao Vivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">
              {games.filter((g: any) => g.status === 'live').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {gamesLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Jogo</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game: any) => (
              <TableRow key={game.id}>
                <TableCell>{new Date(game.scheduled_date).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Casa vs Visitante</div>
                    <div className="text-gray-500 text-xs">{game.round || 'Jornada'}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {game.home_score !== null && game.away_score !== null 
                    ? `${game.home_score} - ${game.away_score}` 
                    : '-'
                  }
                </TableCell>
                <TableCell>{game.venue || 'A definir'}</TableCell>
                <TableCell>
                  <Badge variant={game.status === 'live' ? 'default' : game.status === 'finished' ? 'secondary' : 'outline'}>
                    {game.status === 'live' ? 'AO VIVO' : 
                     game.status === 'finished' ? 'FINALIZADO' : 'AGENDADO'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(game, 'games')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(game.id, 'games')}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderPlayersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Jogadores ({players.length})</h3>
        <Button onClick={() => openDialog(null, 'players')} disabled={playersLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Jogador
        </Button>
      </div>
      
      {playersLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Clube</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player: any) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">
                  {player.first_name} {player.last_name}
                </TableCell>
                <TableCell>{player.position || 'N/A'}</TableCell>
                <TableCell>{player.jersey_number || 'N/A'}</TableCell>
                <TableCell>{player.club || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={player.active ? 'default' : 'secondary'}>
                    {player.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(player, 'players')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(player.id, 'players')}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderNewsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Notícias ({news.length})</h3>
        <Button onClick={() => openDialog(null, 'news')} disabled={newsLoading}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Notícia
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Publicadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">
              {news.filter((n: any) => n.status === 'published').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rascunhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">
              {news.filter((n: any) => n.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">{news.length}</div>
          </CardContent>
        </Card>
      </div>

      {newsLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((article: any) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                    {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(article.created_at).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openDialog(article, 'news')}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(article.id, 'news')}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderOfficialsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Árbitros ({referees.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" onClick={() => openDialog(null, 'referees')}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Árbitro
              </Button>
              <div className="text-center">
                <div className="text-3xl font-bold text-cv-blue">{referees.length}</div>
                <p className="text-gray-600">Árbitros Registados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Treinadores ({coaches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" onClick={() => openDialog(null, 'coaches')}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Treinador
              </Button>
              <div className="text-center">
                <div className="text-3xl font-bold text-cv-blue">{coaches.length}</div>
                <p className="text-gray-600">Treinadores Licenciados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">Gestão de Dados FCBB</h2>
        <p className="text-gray-600">Sistema completo de gestão backend - Dados sincronizados em tempo real</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Clubes
          </TabsTrigger>
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Competições
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Jogos
          </TabsTrigger>
          <TabsTrigger value="players" className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Jogadores
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Notícias
          </TabsTrigger>
          <TabsTrigger value="officials" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Oficiais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {renderTeamsTab()}
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          {renderCompetitionsTab()}
        </TabsContent>

        <TabsContent value="games" className="space-y-6">
          {renderGamesTab()}
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          {renderPlayersTab()}
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          {renderNewsTab()}
        </TabsContent>

        <TabsContent value="officials" className="space-y-6">
          {renderOfficialsTab()}
        </TabsContent>
      </Tabs>

      {/* Dialog for Forms */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar' : 'Criar'} {
                activeTab === 'teams' ? 'Clube' :
                activeTab === 'competitions' ? 'Competição' :
                activeTab === 'games' ? 'Jogo' :
                activeTab === 'players' ? 'Jogador' :
                activeTab === 'news' ? 'Notícia' : 'Item'
              }
            </DialogTitle>
          </DialogHeader>
          {activeTab === 'teams' && (
            <ClubForm
              onSubmit={(data) => handleSubmit(data, 'teams')}
              initialData={editingItem}
              onCancel={() => setIsDialogOpen(false)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataManagement;
