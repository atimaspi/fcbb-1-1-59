
import React from 'react';
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, MapPin, Award } from 'lucide-react';

const TacaPage = () => {
  const quarterFinals = [
    { homeTeam: 'Sporting Praia', awayTeam: 'Boavista FC', date: '2025-02-15', status: 'Agendado' },
    { homeTeam: 'Académica Mindelo', awayTeam: 'Sal Rei', date: '2025-02-15', status: 'Agendado' },
    { homeTeam: 'Tchadense', awayTeam: 'Mindelense', date: '2025-02-16', status: 'Agendado' },
    { homeTeam: 'Travadores', awayTeam: 'Espargos', date: '2025-02-16', status: 'Agendado' },
  ];

  const previousWinners = [
    { year: 2023, winner: 'Sporting Clube da Praia', runnerUp: 'Académica do Mindelo' },
    { year: 2022, winner: 'Académica do Mindelo', runnerUp: 'Tchadense' },
    { year: 2021, winner: 'Sporting Clube da Praia', runnerUp: 'Boavista FC' },
    { year: 2020, winner: 'Tchadense', runnerUp: 'Sporting Clube da Praia' },
  ];

  return (
    <PageLayout 
      title="Taça de Cabo Verde"
      description="A principal competição eliminatória do basquetebol cabo-verdiano"
    >
      <div className="space-y-8">
        {/* Informações da Competição */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-cv-yellow" />
              Taça de Cabo Verde 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-yellow">16</div>
                <div className="text-sm text-gray-600">Equipas Participantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-yellow">4</div>
                <div className="text-sm text-gray-600">Rondas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-yellow">8</div>
                <div className="text-sm text-gray-600">Equipas Restantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cv-yellow">15/03</div>
                <div className="text-sm text-gray-600">Data da Final</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quartos de Final */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Quartos de Final
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quarterFinals.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      {new Date(match.date).toLocaleDateString('pt-PT')}
                    </div>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      {match.status}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formato da Competição */}
        <Card>
          <CardHeader>
            <CardTitle>Formato da Competição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-cv-yellow pl-4">
                <h3 className="font-semibold text-lg">Eliminação Direta</h3>
                <p className="text-gray-600">
                  Todas as eliminatórias são disputadas em jogo único, com eliminação direta. 
                  O vencedor avança para a ronda seguinte até à grande final.
                </p>
              </div>
              <div className="border-l-4 border-cv-yellow pl-4">
                <h3 className="font-semibold text-lg">Participação</h3>
                <p className="text-gray-600">
                  Participam todas as equipas dos campeonatos regionais e nacionais, 
                  num total de 16 equipas distribuídas por sorteio.
                </p>
              </div>
              <div className="border-l-4 border-cv-yellow pl-4">
                <h3 className="font-semibold text-lg">Final</h3>
                <p className="text-gray-600">
                  A final realiza-se em campo neutro, tradicionalmente no Pavilhão Nacional da Praia, 
                  com transmissão televisiva em direto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vencedores Anteriores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Vencedores Anteriores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {previousWinners.map((winner, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold text-cv-yellow">{winner.year}</div>
                    <div>
                      <div className="font-semibold">{winner.winner}</div>
                      <div className="text-sm text-gray-600">Campeão</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{winner.runnerUp}</div>
                    <div className="text-sm text-gray-600">Vice-Campeão</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TacaPage;
