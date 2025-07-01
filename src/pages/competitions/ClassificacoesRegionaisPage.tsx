
import React, { useState } from 'react';
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, MapPin, Users, Crown } from 'lucide-react';

const ClassificacoesRegionaisPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('santiago');

  const regionalChampionships = {
    santiago: {
      name: 'Santiago',
      season: '2024/25',
      teams: [
        { position: 1, team: 'Sporting Clube da Praia', played: 8, wins: 7, losses: 1, points: 14 },
        { position: 2, team: 'Tchadense', played: 8, wins: 6, losses: 2, points: 12 },
        { position: 3, team: 'Praia Basket', played: 8, wins: 5, losses: 3, points: 10 },
        { position: 4, team: 'Unidos de Santiago', played: 8, wins: 3, losses: 5, points: 6 },
        { position: 5, team: 'Estrela Vermelha', played: 8, wins: 2, losses: 6, points: 4 },
        { position: 6, team: 'Assomada BC', played: 8, wins: 1, losses: 7, points: 2 }
      ]
    },
    saovicente: {
      name: 'São Vicente',
      season: '2024/25',
      teams: [
        { position: 1, team: 'Académica do Mindelo', played: 6, wins: 6, losses: 0, points: 12 },
        { position: 2, team: 'Mindelense', played: 6, wins: 4, losses: 2, points: 8 },
        { position: 3, team: 'Batuque', played: 6, wins: 3, losses: 3, points: 6 },
        { position: 4, team: 'Mindelo Stars', played: 6, wins: 1, losses: 5, points: 2 },
        { position: 5, team: 'São Vicente BC', played: 6, wins: 0, losses: 6, points: 0 }
      ]
    },
    sal: {
      name: 'Sal',
      season: '2024/25',
      teams: [
        { position: 1, team: 'Boavista FC', played: 4, wins: 4, losses: 0, points: 8 },
        { position: 2, team: 'Espargos United', played: 4, wins: 2, losses: 2, points: 4 },
        { position: 3, team: 'Sal Basket', played: 4, wins: 0, losses: 4, points: 0 }
      ]
    },
    boavista: {
      name: 'Boa Vista',
      season: '2024/25',
      teams: [
        { position: 1, team: 'Sal Rei', played: 4, wins: 3, losses: 1, points: 6 },
        { position: 2, team: 'Boa Vista United', played: 4, wins: 2, losses: 2, points: 4 },
        { position: 3, team: 'Rabil BC', played: 4, wins: 1, losses: 3, points: 2 }
      ]
    }
  };

  const regions = [
    { key: 'santiago', name: 'Santiago', teams: 6, games: 48 },
    { key: 'saovicente', name: 'São Vicente', teams: 5, games: 30 },
    { key: 'sal', name: 'Sal', teams: 3, games: 12 },
    { key: 'boavista', name: 'Boa Vista', teams: 3, games: 12 }
  ];

  const currentRegion = regionalChampionships[selectedRegion as keyof typeof regionalChampionships];

  return (
    <PageLayout 
      title="Classificações Regionais"
      description="Acompanhe as classificações dos campeonatos regionais de basquetebol"
    >
      <div className="space-y-8">
        {/* Seletor de Região */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Campeonatos Regionais 2024/25
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regions.map((region) => (
                <Button
                  key={region.key}
                  variant={selectedRegion === region.key ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col items-center gap-2 ${
                    selectedRegion === region.key ? 'bg-cv-blue hover:bg-cv-blue/90' : ''
                  }`}
                  onClick={() => setSelectedRegion(region.key)}
                >
                  <div className="font-semibold">{region.name}</div>
                  <div className="text-xs text-gray-500">
                    {region.teams} equipas • {region.games} jogos
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas da Região */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue mb-2">
                {currentRegion.teams.length}
              </div>
              <div className="text-sm text-gray-600">Equipas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue mb-2">
                {currentRegion.teams.reduce((sum, team) => sum + team.played, 0)}
              </div>
              <div className="text-sm text-gray-600">Jogos Disputados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue mb-2">
                {currentRegion.teams[0]?.team.split(' ')[0] || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Líder</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cv-blue mb-2">
                {currentRegion.teams[0]?.points || 0}
              </div>
              <div className="text-sm text-gray-600">Pontos do Líder</div>
            </CardContent>
          </Card>
        </div>

        {/* Classificação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Classificação - {currentRegion.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Pos</th>
                    <th className="text-left py-3">Equipa</th>
                    <th className="text-center py-3">J</th>
                    <th className="text-center py-3">V</th>
                    <th className="text-center py-3">D</th>
                    <th className="text-center py-3">Pts</th>
                    <th className="text-center py-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRegion.teams.map((team) => (
                    <tr key={team.position} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{team.position}</span>
                          {team.position === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </td>
                      <td className="py-4 font-medium">{team.team}</td>
                      <td className="py-4 text-center">{team.played}</td>
                      <td className="py-4 text-center text-green-600 font-semibold">{team.wins}</td>
                      <td className="py-4 text-center text-red-600 font-semibold">{team.losses}</td>
                      <td className="py-4 text-center font-bold text-cv-blue">{team.points}</td>
                      <td className="py-4 text-center">
                        {team.position === 1 && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Campeão Regional
                          </Badge>
                        )}
                        {team.position === 2 && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Qualificado
                          </Badge>
                        )}
                        {team.position > 2 && team.position <= 3 && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            Repescagem
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legenda */}
        <Card>
          <CardHeader>
            <CardTitle>Legenda de Qualificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-l-4 border-green-500"></div>
                <span className="text-sm">1º Lugar: Campeão Regional + Qualificação Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-500"></div>
                <span className="text-sm">2º Lugar: Qualificação Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border-l-4 border-yellow-500"></div>
                <span className="text-sm">3º Lugar: Repescagem</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações dos Campeonatos Regionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-cv-blue pl-4">
                <h3 className="font-semibold text-lg mb-2">Formato</h3>
                <p className="text-gray-600">
                  Cada região organiza o seu campeonato com todas as equipas a jogarem entre si em sistema de pontos. 
                  O campeão regional qualifica-se automaticamente para o campeonato nacional.
                </p>
              </div>
              <div className="border-l-4 border-cv-blue pl-4">
                <h3 className="font-semibold text-lg mb-2">Qualificação Nacional</h3>
                <p className="text-gray-600">
                  Os campeões regionais e as melhores equipas classificadas formam o campeonato nacional, 
                  representando todas as regiões de Cabo Verde.
                </p>
              </div>
              <div className="border-l-4 border-cv-blue pl-4">
                <h3 className="font-semibold text-lg mb-2">Desenvolvimento Regional</h3>
                <p className="text-gray-600">
                  Os campeonatos regionais são essenciais para o desenvolvimento do basquetebol em cada ilha, 
                  promovendo a competição local e a formação de jovens atletas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ClassificacoesRegionaisPage;
