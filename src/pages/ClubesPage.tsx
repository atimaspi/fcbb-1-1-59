
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Trophy, Calendar } from 'lucide-react';

const ClubesPage = () => {
  const clubs = [
    {
      id: 1,
      name: "CD Travadores",
      city: "Praia",
      island: "Santiago",
      founded: 1975,
      venue: "Pavilhão Adão Silvestre",
      titles: 12,
      players: 15,
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    },
    {
      id: 2,
      name: "Sporting Clube da Praia",
      city: "Praia",
      island: "Santiago",
      founded: 1923,
      venue: "Pavilhão Nacional",
      titles: 8,
      players: 14,
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    },
    {
      id: 3,
      name: "Académica do Mindelo",
      city: "Mindelo",
      island: "São Vicente",
      founded: 1917,
      venue: "Pavilhão Adérito Sena",
      titles: 15,
      players: 16,
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    },
    {
      id: 4,
      name: "ABC Basquetebol",
      city: "Assomada",
      island: "Santiago",
      founded: 1985,
      venue: "Pavilhão Municipal",
      titles: 3,
      players: 13,
      logo: "/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
    }
  ];

  const stats = [
    { label: "Clubes Federados", value: "38", icon: <Trophy className="w-5 h-5" /> },
    { label: "Ilhas Representadas", value: "6", icon: <MapPin className="w-5 h-5" /> },
    { label: "Atletas Registados", value: "450+", icon: <Users className="w-5 h-5" /> },
    { label: "Anos de História", value: "100+", icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <PageLayout 
      title="Clubes"
      description="Conheça todos os clubes de basquetebol filiados na FCBB"
    >
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-t-4 border-cv-blue">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2 text-cv-blue">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-cv-blue">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <img 
                    src={club.logo} 
                    alt={club.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <CardTitle className="text-lg text-cv-blue">{club.name}</CardTitle>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {club.city}, {club.island}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Fundado:</span>
                    <div className="font-semibold">{club.founded}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Títulos:</span>
                    <div className="font-semibold flex items-center">
                      <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                      {club.titles}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 text-sm">Pavilhão:</span>
                  <div className="font-semibold text-sm">{club.venue}</div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <Badge variant="outline" className="text-xs">
                    {club.players} jogadores
                  </Badge>
                  <Button size="sm" variant="outline" className="border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle>Sobre os Clubes da FCBB</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              A Federação Cabo-verdiana de Basquetebol conta com clubes de todas as ilhas do arquipélago, 
              criando uma rede nacional que promove o desenvolvimento do basquetebol em todo o país.
            </p>
            <p>
              Desde clubes centenários com rica história até novas organizações, todos partilham a paixão 
              pelo basquetebol e contribuem para o crescimento da modalidade em Cabo Verde.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ClubesPage;
