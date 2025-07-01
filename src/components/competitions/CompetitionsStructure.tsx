
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, MapPin, Globe, Calendar, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Competition {
  id: string;
  name: string;
  type: 'regional' | 'national' | 'international';
  level: string;
  status: 'active' | 'scheduled' | 'completed';
  participants: number;
  location: string;
  season: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

const CompetitionsStructure = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const competitions: Competition[] = [
    // Competições Regionais
    {
      id: 'santiago-regional',
      name: 'Campeonato Regional de Santiago',
      type: 'regional',
      level: 'Regional',
      status: 'active',
      participants: 12,
      location: 'Santiago',
      season: '2024/25',
      description: 'Principal competição da ilha de Santiago, reunindo os melhores clubes locais.',
      startDate: '2024-10-15',
      endDate: '2025-03-30'
    },
    {
      id: 'sao-vicente-regional',
      name: 'Campeonato Regional de São Vicente',
      type: 'regional',
      level: 'Regional',
      status: 'active',
      participants: 8,
      location: 'São Vicente',
      season: '2024/25',
      description: 'Competição regional da ilha de São Vicente, berço de grandes talentos.',
      startDate: '2024-11-01',
      endDate: '2025-04-15'
    },
    {
      id: 'sal-regional',
      name: 'Campeonato Regional do Sal',
      type: 'regional',
      level: 'Regional',
      status: 'scheduled',
      participants: 6,
      location: 'Sal',
      season: '2024/25',
      description: 'Competição da ilha do Sal, em crescimento constante.',
      startDate: '2025-01-15',
      endDate: '2025-05-30'
    },
    
    // Competições Nacionais
    {
      id: 'nacional-masculino',
      name: 'Campeonato Nacional Masculino',
      type: 'national',
      level: 'Nacional',
      status: 'scheduled',
      participants: 8,
      location: 'Várias Ilhas',
      season: '2024/25',
      description: 'Principal competição nacional, reunindo campeões regionais.',
      startDate: '2025-06-01',
      endDate: '2025-07-15'
    },
    {
      id: 'nacional-feminino',
      name: 'Campeonato Nacional Feminino',
      type: 'national',
      level: 'Nacional',
      status: 'scheduled',
      participants: 6,
      location: 'Várias Ilhas',
      season: '2024/25',
      description: 'Competição nacional feminina, promovendo o basquetebol feminino.',
      startDate: '2025-06-15',
      endDate: '2025-07-30'
    },
    {
      id: 'taca-cabo-verde',
      name: 'Taça de Cabo Verde',
      type: 'national',
      level: 'Nacional',
      status: 'scheduled',
      participants: 16,
      location: 'Praia',
      season: '2024/25',
      description: 'Competição eliminatória nacional, formato de copa.',
      startDate: '2025-08-01',
      endDate: '2025-08-15'
    },
    
    // Competições Internacionais
    {
      id: 'afrobasket',
      name: 'AfroBasket 2025',
      type: 'international',
      level: 'Internacional',
      status: 'scheduled',
      participants: 16,
      location: 'Angola',
      season: '2025',
      description: 'Campeonato Africano de Basquetebol - principal competição continental.',
      startDate: '2025-08-26',
      endDate: '2025-09-07'
    },
    {
      id: 'fiba-world-cup-qual',
      name: 'Eliminatórias Mundial FIBA',
      type: 'international',
      level: 'Internacional',
      status: 'completed',
      participants: 32,
      location: 'Várias',
      season: '2024',
      description: 'Eliminatórias para o Campeonato Mundial FIBA 2027.',
      startDate: '2024-02-22',
      endDate: '2024-11-25'
    }
  ];

  const filteredCompetitions = selectedLevel === 'all' 
    ? competitions 
    : competitions.filter(comp => comp.type === selectedLevel);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Em Curso';
      case 'scheduled': return 'Programado';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  const getLevelIcon = (type: string) => {
    switch (type) {
      case 'regional': return <MapPin className="w-5 h-5" />;
      case 'national': return <Trophy className="w-5 h-5" />;
      case 'international': return <Globe className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getLevelColor = (type: string) => {
    switch (type) {
      case 'regional': return 'text-green-600 bg-green-50 border-green-200';
      case 'national': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'international': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cv-blue mb-4">
          Estrutura Competitiva do Basquetebol Cabo-verdiano
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Desde as competições regionais até à representação internacional, 
          acompanhe toda a estrutura organizada do basquetebol em Cabo Verde.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex justify-center">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLevel === 'all' 
                ? 'bg-white text-cv-blue shadow-sm' 
                : 'text-gray-600 hover:text-cv-blue'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedLevel('regional')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLevel === 'regional' 
                ? 'bg-white text-cv-blue shadow-sm' 
                : 'text-gray-600 hover:text-cv-blue'
            }`}
          >
            Regionais
          </button>
          <button
            onClick={() => setSelectedLevel('national')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLevel === 'national' 
                ? 'bg-white text-cv-blue shadow-sm' 
                : 'text-gray-600 hover:text-cv-blue'
            }`}
          >
            Nacionais
          </button>
          <button
            onClick={() => setSelectedLevel('international')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLevel === 'international' 
                ? 'bg-white text-cv-blue shadow-sm' 
                : 'text-gray-600 hover:text-cv-blue'
            }`}
          >
            Internacionais
          </button>
        </div>
      </div>

      {/* Competições */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((competition, index) => (
          <motion.div
            key={competition.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getLevelIcon(competition.type)}
                    <Badge className={getLevelColor(competition.type)}>
                      {competition.level}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(competition.status)}>
                    {getStatusText(competition.status)}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {competition.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  {competition.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{competition.participants} participantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{competition.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Época {competition.season}</span>
                  </div>
                  {competition.startDate && (
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span>
                        {new Date(competition.startDate).toLocaleDateString('pt-PT')} - 
                        {competition.endDate && ` ${new Date(competition.endDate).toLocaleDateString('pt-PT')}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Estatísticas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="text-center">
          <CardContent className="p-6">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {competitions.filter(c => c.type === 'regional').length}
            </div>
            <p className="text-gray-600">Competições Regionais</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {competitions.filter(c => c.type === 'national').length}
            </div>
            <p className="text-gray-600">Competições Nacionais</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {competitions.filter(c => c.type === 'international').length}
            </div>
            <p className="text-gray-600">Competições Internacionais</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitionsStructure;
