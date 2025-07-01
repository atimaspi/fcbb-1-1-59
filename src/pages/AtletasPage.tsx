
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, MapPin, Trophy, Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  jersey_number: number;
  age: number;
  height_cm: number;
  weight_kg: number;
  nationality: string;
  club: string;
  photo_url?: string;
  status: string;
}

const AtletasPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [clubFilter, setClubFilter] = useState('all');

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [players, searchTerm, positionFilter, clubFilter]);

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('active', true)
        .order('last_name');

      if (error) throw error;
      setPlayers(data || []);
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
      // Dados de exemplo se não houver na BD
      setPlayers([
        {
          id: '1',
          first_name: 'João',
          last_name: 'Silva',
          position: 'Base',
          jersey_number: 10,
          age: 25,
          height_cm: 185,
          weight_kg: 80,
          nationality: 'CV',
          club: 'ABC Praia',
          status: 'active'
        },
        {
          id: '2',
          first_name: 'Maria',
          last_name: 'Santos',
          position: 'Extremo',
          jersey_number: 12,
          age: 23,
          height_cm: 175,
          weight_kg: 65,
          nationality: 'CV',
          club: 'Sporting Mindelo',
          status: 'active'
        },
        {
          id: '3',
          first_name: 'Carlos',
          last_name: 'Monteiro',
          position: 'Poste',
          jersey_number: 15,
          age: 28,
          height_cm: 205,
          weight_kg: 95,
          nationality: 'CV',
          club: 'Tchadense',
          status: 'active'
        },
        {
          id: '4',
          first_name: 'Ana',
          last_name: 'Pereira',
          position: 'Ala',
          jersey_number: 8,
          age: 22,
          height_cm: 170,
          weight_kg: 60,
          nationality: 'CV',
          club: 'Bairro Praia',
          status: 'active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterPlayers = () => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(player =>
        `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.club.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (positionFilter !== 'all') {
      filtered = filtered.filter(player => player.position === positionFilter);
    }

    if (clubFilter !== 'all') {
      filtered = filtered.filter(player => player.club === clubFilter);
    }

    setFilteredPlayers(filtered);
  };

  const getUniquePositions = () => {
    return [...new Set(players.map(p => p.position))].filter(Boolean);
  };

  const getUniqueClubs = () => {
    return [...new Set(players.map(p => p.club))].filter(Boolean);
  };

  if (loading) {
    return (
      <PageLayout title="Atletas" description="Atletas registados na FCBB">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cv-blue"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Atletas" 
      description="Conheça todos os atletas registados na Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-6">
        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-cv-blue" />
              Filtros de Pesquisa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquisar por nome ou clube..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Posição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as posições</SelectItem>
                  {getUniquePositions().map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={clubFilter} onValueChange={setClubFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Clube" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clubes</SelectItem>
                  {getUniqueClubs().map((club) => (
                    <SelectItem key={club} value={club}>
                      {club}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue">{players.length}</div>
              <div className="text-sm text-gray-600">Total de Atletas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue">{getUniqueClubs().length}</div>
              <div className="text-sm text-gray-600">Clubes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue">{getUniquePositions().length}</div>
              <div className="text-sm text-gray-600">Posições</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue">
                {Math.round(players.reduce((acc, p) => acc + (p.age || 0), 0) / players.length) || 0}
              </div>
              <div className="text-sm text-gray-600">Idade Média</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Atletas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  {player.photo_url ? (
                    <img
                      src={player.photo_url}
                      alt={`${player.first_name} ${player.last_name}`}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  <h3 className="font-bold text-lg mt-3">
                    {player.first_name} {player.last_name}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Badge variant="secondary">#{player.jersey_number}</Badge>
                    <Badge variant="outline">{player.position}</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Clube:</span>
                    <span className="font-medium">{player.club}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Idade:</span>
                    <span className="font-medium">{player.age} anos</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Altura:</span>
                    <span className="font-medium">{player.height_cm} cm</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Peso:</span>
                    <span className="font-medium">{player.weight_kg} kg</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nacionalidade:</span>
                    <span className="font-medium">
                      {player.nationality === 'CV' ? 'Cabo Verde' : player.nationality}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum atleta encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros de pesquisa.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default AtletasPage;
