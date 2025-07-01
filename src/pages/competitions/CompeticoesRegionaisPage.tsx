
import React from 'react';
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Trophy, Calendar, Download, ExternalLink } from 'lucide-react';

const CompeticoesRegionaisPage = () => {
  const regions = [
    {
      name: "Santiago Norte",
      island: "Santiago",
      teams: 8,
      champion: "Sporting Praia",
      associations: "ABDESN",
      contact: "abdesn@fcbb.cv",
      competitions: ["Liga Regional", "Taça Regional", "Super Taça Regional"],
      season: "2023/24",
      venue: "Pavilhão Vavá Duarte"
    },
    {
      name: "Santiago Sul", 
      island: "Santiago",
      teams: 6,
      champion: "ABC Basquete",
      associations: "ABDESS",
      contact: "abdess@fcbb.cv",
      competitions: ["Liga Regional", "Taça Regional"],
      season: "2023/24",
      venue: "Pavilhão Nacional"
    },
    {
      name: "São Vicente",
      island: "São Vicente",
      teams: 10,
      champion: "Seven Stars",
      associations: "ABDSV", 
      contact: "abdsv@fcbb.cv",
      competitions: ["Liga Regional", "Taça Regional", "Torneio de Abertura"],
      season: "2023/24",
      venue: "Pavilhão Adérito Sena"
    },
    {
      name: "Santo Antão",
      island: "Santo Antão",
      teams: 4,
      champion: "Inter Porto Novo",
      associations: "ABDSA",
      contact: "abdsa@fcbb.cv", 
      competitions: ["Liga Regional", "Taça Regional"],
      season: "2023/24",
      venue: "Pavilhão Municipal"
    },
    {
      name: "Sal",
      island: "Sal",
      teams: 6,
      champion: "Académica do Sal",
      associations: "ABDS",
      contact: "abds@fcbb.cv",
      competitions: ["Liga Regional", "Taça Regional"],
      season: "2023/24", 
      venue: "Pavilhão da Juventude"
    },
    {
      name: "Fogo",
      island: "Fogo",
      teams: 4,
      champion: "Vulcânicos FC",
      associations: "ABDF",
      contact: "abdf@fcbb.cv",
      competitions: ["Liga Regional"],
      season: "2023/24",
      venue: "Complexo Desportivo"
    }
  ];

  const upcomingEvents = [
    {
      region: "São Vicente",
      event: "Final da Taça Regional",
      date: "28 Jul 2024",
      teams: "Seven Stars vs Mindelense",
      venue: "Pavilhão Adérito Sena"
    },
    {
      region: "Santiago Norte", 
      event: "Liga Regional - Jornada 15",
      date: "30 Jul 2024",
      teams: "Sporting Praia vs Unidos",
      venue: "Pavilhão Vavá Duarte"
    },
    {
      region: "Sal",
      event: "Inauguração da época",
      date: "15 Ago 2024", 
      teams: "Torneio de Apresentação",
      venue: "Pavilhão da Juventude"
    }
  ];

  const statistics = [
    { label: "Regiões Ativas", value: "6", icon: MapPin },
    { label: "Equipas Filiadas", value: "38", icon: Users },
    { label: "Competições Anuais", value: "18", icon: Trophy },
    { label: "Jogos por Época", value: "200+", icon: Calendar }
  ];

  return (
    <PageLayout title="Competições Regionais">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-cv-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-cv-blue mb-2">{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Sistema de Competições Regionais</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p>
              As competições regionais constituem a base do basquetebol cabo-verdiano, organizadas pelas 
              Associações Regionais sob a supervisão da FCBB. Cada região desenvolve as suas competições 
              locais, servindo como trampolim para as competições nacionais.
            </p>
            <p>
              Os vencedores das competições regionais garantem vaga na Taça de Cabo Verde e têm 
              possibilidade de acesso às competições nacionais através de play-offs promocionais.
            </p>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="regions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="regions">Regiões</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="regulations">Regulamentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regions.map((region, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{region.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {region.island}
                        </div>
                      </div>
                      <Badge className="bg-cv-blue text-white">{region.season}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Equipas:</span>
                        <div className="font-semibold">{region.teams}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Campeão:</span>
                        <div className="font-semibold">{region.champion}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Associação:</span>
                      <div className="font-semibold">{region.associations}</div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Principal Pavilhão:</span>
                      <div className="font-semibold">{region.venue}</div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 text-sm">Competições:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.competitions.map((comp, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{comp}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Competições
                      </Button>
                      <div className="text-xs text-gray-500 text-center">
                        Contacto: {region.contact}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Próximos Eventos Regionais</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Calendário Completo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{event.event}</h3>
                          <Badge variant="outline" className="mt-1">{event.region}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-cv-blue">{event.date}</div>
                          <div className="text-sm text-gray-600">{event.venue}</div>
                        </div>
                      </div>
                      <div className="text-gray-700">{event.teams}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calendário da Época 2024/25</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4>1ª Fase - Ligas Regionais</h4>
                    <ul>
                      <li><strong>Setembro:</strong> Início das competições</li>
                      <li><strong>Outubro-Dezembro:</strong> Fase regular</li>
                      <li><strong>Janeiro:</strong> Playoffs regionais</li>
                    </ul>
                  </div>
                  <div>
                    <h4>2ª Fase - Taças Regionais</h4>
                    <ul>
                      <li><strong>Fevereiro:</strong> Início das eliminatórias</li>
                      <li><strong>Março:</strong> Quartos e meias-finais</li>
                      <li><strong>Abril:</strong> Finais regionais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regulations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulamentos das Competições Regionais</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h4>Organização</h4>
                <ul>
                  <li>Competições organizadas pelas Associações Regionais</li>
                  <li>Supervisão técnica da FCBB</li>
                  <li>Arbitragem certificada pela Comissão de Arbitragem da FCBB</li>
                  <li>Regulamentos baseados nas normas FIBA</li>
                </ul>
                
                <h4>Participação</h4>
                <ul>
                  <li>Equipas filiadas nas respetivas associações regionais</li>
                  <li>Licenciamento de jogadores obrigatório</li>
                  <li>Seguro desportivo em vigor</li>
                  <li>Cumprimento dos regulamentos técnicos e disciplinares</li>
                </ul>
                
                <h4>Apuramento para Competições Nacionais</h4>
                <ul>
                  <li>Campeões regionais: Vaga direta na Taça de Cabo Verde</li>
                  <li>Vice-campeões: Play-off de acesso à Liga Nacional</li>
                  <li>Vencedores das Taças Regionais: Vaga na Taça de Cabo Verde</li>
                </ul>
                
                <h4>Apoios da FCBB</h4>
                <ul>
                  <li>Formação de árbitros regionais</li>
                  <li>Material desportivo e técnico</li>
                  <li>Supervisão técnica das competições</li>
                  <li>Programas de desenvolvimento juvenil</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CompeticoesRegionaisPage;
