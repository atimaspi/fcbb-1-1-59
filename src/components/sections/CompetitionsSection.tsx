
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, ArrowRight, Filter, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

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

interface CompetitionStats {
  total_competitions: number;
  active_competitions: number;
  upcoming_competitions: number;
  total_teams: number;
  total_games: number;
}

const CompetitionsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch competitions
  const { data: competitions = [], isLoading: competitionsLoading } = useQuery({
    queryKey: ['competitions'],
    queryFn: async (): Promise<Competition[]> => {
      const { data, error } = await supabase
        .from('championships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    }
  });

  // Fetch competition statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['competition-stats'],
    queryFn: async (): Promise<CompetitionStats> => {
      const [competitionsRes, clubsRes, gamesRes] = await Promise.all([
        supabase.from('championships').select('*'),
        supabase.from('clubs').select('*').eq('active', true),
        supabase.from('games').select('*')
      ]);

      const competitions = competitionsRes.data || [];
      const activeCompetitions = competitions.filter(c => c.status === 'active').length;
      const upcomingCompetitions = competitions.filter(c => c.status === 'upcoming').length;

      return {
        total_competitions: competitions.length,
        active_competitions: activeCompetitions,
        upcoming_competitions: upcomingCompetitions,
        total_teams: clubsRes.data?.length || 0,
        total_games: gamesRes.data?.length || 0
      };
    }
  });

  // Filter competitions
  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.description?.toLowerCase().includes(searchTerm.toLowerCase());
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

  if (competitionsLoading || statsLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="cv-container">
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="cv-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Competições FCBB
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe todas as competições de basquetebol organizadas pela FCBB
          </p>
        </motion.div>

        {/* Statistics Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-cv-blue">{stats.total_competitions}</div>
                <div className="text-sm text-gray-600">Competições</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-8 w-8 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.active_competitions}</div>
                <div className="text-sm text-gray-600">Ativas</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{stats.total_teams}</div>
                <div className="text-sm text-gray-600">Equipas</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{stats.total_games}</div>
                <div className="text-sm text-gray-600">Jogos</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-8 w-8 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.upcoming_competitions}</div>
                <div className="text-sm text-gray-600">Próximas</div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-6 shadow-sm mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filtros:</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 flex-1 max-w-2xl">
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
          </div>
        </motion.div>

        {/* Competitions Grid */}
        {filteredCompetitions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              {competitions.length === 0 ? 'Nenhuma competição registada' : 'Nenhuma competição encontrada'}
            </h3>
            <p className="text-gray-400 mb-6">
              {competitions.length === 0 
                ? 'Adicione competições através do Painel Administrativo FCBB'
                : 'Tente ajustar os filtros para encontrar competições'
              }
            </p>
            {competitions.length === 0 && (
              <Button asChild className="bg-cv-blue hover:bg-cv-blue/90">
                <Link to="/admin">Ir para Painel Admin</Link>
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {competition.logo_url ? (
                          <img 
                            src={competition.logo_url} 
                            alt={competition.name}
                            className="w-12 h-12 object-contain rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-cv-blue rounded flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div>
                          <Badge className={`${getStatusColor(competition.status)} text-white`}>
                            {getStatusLabel(competition.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{competition.name}</CardTitle>
                    <CardDescription>
                      {getTypeLabel(competition.type)} • Época {competition.season}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {competition.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {competition.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      {competition.start_date && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            Início: {new Date(competition.start_date).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      )}
                      {competition.venue && (
                        <div className="flex items-center">
                          <div className="w-4 h-4 mr-2 flex items-center justify-center">
                            📍
                          </div>
                          <span>{competition.venue}</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-cv-blue hover:bg-cv-blue/90" 
                      asChild
                    >
                      <Link to={`/competicoes/${competition.id}`}>
                        Ver Competição
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-cv-blue rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Sistema Completo de Competições
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              A FCBB organiza um sistema completo de competições que abrange desde os campeonatos regionais 
              até às competições nacionais, promovendo o desenvolvimento do basquetebol em todo o arquipélago.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Button variant="secondary" asChild>
                <Link to="/resultados">Ver Resultados</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/classificacoes">Ver Classificações</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/calendario">Ver Calendário</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
