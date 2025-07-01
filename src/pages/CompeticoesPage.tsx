
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Users, MapPin, Calendar, ArrowRight } from 'lucide-react';

const CompeticoesPage = () => {
  const competitions = [
    {
      title: 'Nacional Masculino',
      description: 'Principal competição do basquetebol masculino cabo-verdiano',
      href: '/competicoes/masculino',
      icon: Trophy,
      color: 'bg-cv-blue',
      stats: { teams: 12, games: 132, season: '2024/25' }
    },
    {
      title: 'Nacional Feminino', 
      description: 'Campeonato nacional de basquetebol feminino',
      href: '/competicoes/feminino',
      icon: Trophy,
      color: 'bg-cv-red',
      stats: { teams: 8, games: 56, season: '2024/25' }
    },
    {
      title: 'Taça de Cabo Verde',
      description: 'Competição eliminatória nacional',
      href: '/competicoes/taca',
      icon: Trophy,
      color: 'bg-cv-yellow',
      stats: { teams: 16, phase: 'Quartos de Final', season: '2025' }
    },
    {
      title: 'Competições Regionais',
      description: 'Campeonatos organizados pelas associações regionais',
      href: '/competicoes/regionais',
      icon: MapPin,
      color: 'bg-green-600', 
      stats: { regions: 6, teams: 38, competitions: 18 }
    }
  ];

  return (
    <PageLayout 
      title="Competições"
      description="Todas as competições de basquetebol organizadas pela FCBB"
    >
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">4</div>
              <p className="text-gray-600">Competições Ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">54</div>
              <p className="text-gray-600">Equipas Participantes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">200+</div>
              <p className="text-gray-600">Jogos por Época</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-cv-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-cv-blue mb-2">6</div>
              <p className="text-gray-600">Regiões</p>
            </CardContent>
          </Card>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {competitions.map((competition, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className={`${competition.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <competition.icon className="h-8 w-8" />
                    <CardTitle className="text-xl">{competition.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    2024/25
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{competition.description}</p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {Object.entries(competition.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-bold text-lg">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                <Link to={competition.href}>
                  <Button className="w-full">
                    Ver Competição
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sistema de Competições da FCBB</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              A Federação Cabo-verdiana de Basquetebol organiza um sistema completo de competições 
              que abrange desde os campeonatos regionais até às competições nacionais, promovendo 
              o desenvolvimento do basquetebol em todo o arquipélago.
            </p>
            <p>
              As competições são estruturadas de forma hierárquica, permitindo que as melhores equipas 
              regionais acedam às competições nacionais, criando um ambiente competitivo e de 
              desenvolvimento contínuo para atletas e equipas.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CompeticoesPage;
