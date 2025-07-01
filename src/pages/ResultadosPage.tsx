
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultadosPage = () => {
  const recentResults = [
    {
      id: 1,
      homeTeam: "CD Travadores",
      awayTeam: "Sporting CV",
      homeScore: 85,
      awayScore: 78,
      date: "2025-01-15",
      competition: "Liga Nacional",
      venue: "Pavilhão Adão Silvestre"
    },
    {
      id: 2,
      homeTeam: "Académica Mindelo",
      awayTeam: "ABC Basket",
      homeScore: 92,
      awayScore: 88,
      date: "2025-01-14",
      competition: "Liga Nacional",
      venue: "Pavilhão Adérito Sena"
    },
    {
      id: 3,
      homeTeam: "Five Stars",
      awayTeam: "Sal Rei BC",
      homeScore: 74,
      awayScore: 82,
      date: "2025-01-13",
      competition: "Taça CV",
      venue: "Pavilhão da Várzea"
    }
  ];

  return (
    <PageLayout 
      title="Resultados"
      description="Consulte todos os resultados dos jogos de basquetebol"
    >
      <div className="space-y-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-cv-red hover:bg-red-700">
            <Link to="/resultados/ao-vivo">
              <Clock className="w-4 h-4 mr-2" />
              Resultados ao Vivo
            </Link>
          </Button>
          <Button variant="outline" className="border-cv-blue text-cv-blue">
            <Calendar className="w-4 h-4 mr-2" />
            Ver Calendário
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">24</div>
              <p className="text-gray-600">Jogos Esta Semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">156</div>
              <p className="text-gray-600">Jogos Esta Época</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">2</div>
              <p className="text-gray-600">Jogos ao Vivo</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="border-cv-blue text-cv-blue">
                      {result.competition}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {new Date(result.date).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-4 mb-3">
                    <div className="text-right">
                      <div className="font-semibold">{result.homeTeam}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <span className={`text-2xl font-bold ${result.homeScore > result.awayScore ? 'text-green-600' : 'text-gray-600'}`}>
                          {result.homeScore}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className={`text-2xl font-bold ${result.awayScore > result.homeScore ? 'text-green-600' : 'text-gray-600'}`}>
                          {result.awayScore}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{result.awayTeam}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {result.venue}
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

export default ResultadosPage;
