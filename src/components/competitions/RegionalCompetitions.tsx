
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Trophy, Users, Calendar, Star } from 'lucide-react';

const RegionalCompetitions = () => {
  const [selectedIsland, setSelectedIsland] = useState('santiago');

  const islands = [
    {
      id: 'santiago',
      name: 'Santiago',
      population: '274.044',
      clubs: 12,
      activeCompetitions: 3,
      champions: ['ABC Basquete', 'Sporting Praia', 'Unidos do Tarrafal']
    },
    {
      id: 'sao-vicente',
      name: 'São Vicente',
      population: '74.016',
      clubs: 8,
      activeCompetitions: 2,
      champions: ['Seven Stars', 'CS Mindelense', 'Barreirense']
    },
    {
      id: 'sal',
      name: 'Sal',
      population: '25.779',
      clubs: 6,
      activeCompetitions: 2,
      champions: ['Académica do Sal', 'Juventude do Sal', 'Espargos FC']
    },
    {
      id: 'santo-antao',
      name: 'Santo Antão',
      population: '40.547',
      clubs: 4,
      activeCompetitions: 1,
      champions: ['Inter Porto Novo', 'Paulense FC']
    },
    {
      id: 'fogo',
      name: 'Fogo',
      population: '35.837',
      clubs: 3,
      activeCompetitions: 1,
      champions: ['Desportivo do Fogo']
    },
    {
      id: 'brava',
      name: 'Brava',
      population: '5.995',
      clubs: 2,
      activeCompetitions: 1,
      champions: ['Sporting da Brava']
    }
  ];

  const competitions = {
    santiago: [
      {
        name: 'Liga Regional de Santiago',
        status: 'active',
        participants: 12,
        format: 'Todos contra todos (2 voltas)',
        season: '2024/25',
        leader: 'ABC Basquete',
        matchesPlayed: 132,
        totalMatches: 200
      },
      {
        name: 'Taça de Santiago',
        status: 'scheduled',
        participants: 8,
        format: 'Eliminação direta',
        season: '2024/25',
        leader: 'Por definir',
        matchesPlayed: 0,
        totalMatches: 15
      }
    ],
    'sao-vicente': [
      {
        name: 'Campeonato de São Vicente',
        status: 'active',
        participants: 8,
        format: 'Fase de grupos + Playoffs',
        season: '2024/25',
        leader: 'Seven Stars',
        matchesPlayed: 45,
        totalMatches: 60
      }
    ],
    sal: [
      {
        name: 'Liga do Sal',
        status: 'scheduled',
        participants: 6,
        format: 'Todos contra todos',
        season: '2024/25',
        leader: 'Por definir',
        matchesPlayed: 0,
        totalMatches: 30
      }
    ]
  };

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

  const selectedIslandData = islands.find(island => island.id === selectedIsland);
  const islandCompetitions = competitions[selectedIsland as keyof typeof competitions] || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cv-blue mb-4">
          Competições Regionais
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          O basquetebol cabo-verdiano organiza-se por ilhas, cada uma com suas competições próprias, 
          alimentando o sonho nacional através dos campeonatos regionais.
        </p>
      </div>

      {/* Seletor de Ilhas */}
      <div className="flex flex-wrap gap-2 justify-center">
        {islands.map((island) => (
          <button
            key={island.id}
            onClick={() => setSelectedIsland(island.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedIsland === island.id
                ? 'bg-cv-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {island.name}
          </button>
        ))}
      </div>

      {/* Informações da Ilha Selecionada */}
      {selectedIslandData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-cv-blue" />
              <span>Ilha de {selectedIslandData.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-cv-blue">
                  {selectedIslandData.population}
                </div>
                <p className="text-sm text-gray-600">População</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {selectedIslandData.clubs}
                </div>
                <p className="text-sm text-gray-600">Clubes</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedIslandData.activeCompetitions}
                </div>
                <p className="text-sm text-gray-600">Competições</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedIslandData.champions.length}
                </div>
                <p className="text-sm text-gray-600">Campeões Históricos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competições da Ilha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {islandCompetitions.map((competition, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{competition.name}</CardTitle>
                <Badge className={getStatusColor(competition.status)}>
                  {getStatusText(competition.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{competition.participants} equipas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-gray-400" />
                  <span>{competition.format}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Época {competition.season}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span>Líder: {competition.leader}</span>
                </div>
              </div>
              
              {competition.status === 'active' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{competition.matchesPlayed}/{competition.totalMatches} jogos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cv-blue h-2 rounded-full" 
                      style={{ 
                        width: `${(competition.matchesPlayed / competition.totalMatches) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              <Button variant="outline" className="w-full">
                Ver Classificação
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campeões Históricos */}
      {selectedIslandData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-cv-blue" />
              <span>Campeões Históricos - {selectedIslandData.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedIslandData.champions.map((champion, index) => (
                <div key={index} className="p-4 bg-cv-blue/5 rounded-lg text-center">
                  <Trophy className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                  <h4 className="font-semibold">{champion}</h4>
                  <p className="text-sm text-gray-600">Múltiplos títulos</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegionalCompetitions;
