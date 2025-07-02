
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, MoreHorizontal, Trophy, Users, Calendar, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CompetitionForm from './CompetitionForm';
import CompetitionDetails from './CompetitionDetails';

interface Competition {
  id: string;
  name: string;
  type: string;
  status: string;
  season: string;
  start_date: string;
  end_date: string;
  description: string;
  venue: string;
  logo_url?: string;
  created_at: string;
}

const CompetitionsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [viewingCompetition, setViewingCompetition] = useState<Competition | null>(null);

  // Fetch competitions
  const { data: competitions = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-competitions'],
    queryFn: async (): Promise<Competition[]> => {
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  // Delete competition mutation
  const deleteCompetitionMutation = useMutation({
    mutationFn: async (competitionId: string) => {
      const { error } = await supabase
        .from('championships')
        .delete()
        .eq('id', competitionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-competitions'] });
      toast({
        title: "Sucesso",
        description: "Competição eliminada com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: "Erro ao eliminar competição: " + error.message,
        variant: "destructive",
      });
    }
  });

  // Filter competitions
  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || competition.type === filterType;
    const matchesStatus = filterStatus === 'all' || competition.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'upcoming': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'upcoming': return 'Próxima';
      case 'completed': return 'Finalizada';
      default: return 'Desconhecido';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'championship': return 'Campeonato';
      case 'cup': return 'Taça';
      case 'tournament': return 'Torneio';
      default: return type;
    }
  };

  const handleDelete = async (competition: Competition) => {
    if (confirm(`Tem certeza que deseja eliminar a competição "${competition.name}"?`)) {
      deleteCompetitionMutation.mutate(competition.id);
    }
  };

  const handleFormSuccess = () => {
    setIsCreateDialogOpen(false);
    setEditingCompetition(null);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Competições</h2>
          <p className="text-gray-600">Gerir todas as competições de basquetebol da FCBB</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Competição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Competição</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova competição
              </DialogDescription>
            </DialogHeader>
            <CompetitionForm onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Competições</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competições Ativas</CardTitle>
            <div className="h-4 w-4 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {competitions.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Competições</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {competitions.filter(c => c.status === 'upcoming').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competições Finalizadas</CardTitle>
            <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {competitions.filter(c => c.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Procurar competições..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="championship">Campeonatos</SelectItem>
                  <SelectItem value="cup">Taças</SelectItem>
                  <SelectItem value="tournament">Torneios</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Estados</SelectItem>
                  <SelectItem value="active">Ativas</SelectItem>
                  <SelectItem value="upcoming">Próximas</SelectItem>
                  <SelectItem value="completed">Finalizadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge variant="outline" className="px-3 py-1">
              {filteredCompetitions.length} competiç{filteredCompetitions.length !== 1 ? 'ões' : 'ão'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Competitions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Época</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompetitions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-gray-500">
                      {competitions.length === 0 
                        ? 'Nenhuma competição registada' 
                        : 'Nenhuma competição encontrada'
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompetitions.map((competition) => (
                  <TableRow key={competition.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {competition.logo_url ? (
                          <img 
                            src={competition.logo_url} 
                            alt={competition.name}
                            className="w-8 h-8 object-contain rounded"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-cv-blue rounded flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{competition.name}</p>
                          {competition.description && (
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {competition.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTypeLabel(competition.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(competition.status)} text-white`}>
                        {getStatusLabel(competition.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{competition.season}</TableCell>
                    <TableCell>
                      {competition.start_date 
                        ? new Date(competition.start_date).toLocaleDateString('pt-PT')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      {competition.venue ? (
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-sm truncate max-w-xs">{competition.venue}</span>
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setViewingCompetition(competition)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingCompetition(competition)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(competition)}
                          disabled={deleteCompetitionMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingCompetition} onOpenChange={() => setEditingCompetition(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Competição</DialogTitle>
            <DialogDescription>
              Editar dados da competição "{editingCompetition?.name}"
            </DialogDescription>
          </DialogHeader>
          {editingCompetition && (
            <CompetitionForm 
              competition={editingCompetition}
              onSuccess={handleFormSuccess} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewingCompetition} onOpenChange={() => setViewingCompetition(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Competição</DialogTitle>
            <DialogDescription>
              Informações completas da competição "{viewingCompetition?.name}"
            </DialogDescription>
          </DialogHeader>
          {viewingCompetition && (
            <CompetitionDetails competition={viewingCompetition} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompetitionsManager;
