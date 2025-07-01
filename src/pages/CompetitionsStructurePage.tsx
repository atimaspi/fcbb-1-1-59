
import PageLayout from './PageLayout';
import CompetitionsStructure from '@/components/competitions/CompetitionsStructure';
import NationalTeamsSection from '@/components/competitions/NationalTeamsSection';
import RegionalCompetitions from '@/components/competitions/RegionalCompetitions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Globe, MapPin, Star } from 'lucide-react';

const CompetitionsStructurePage = () => {
  return (
    <PageLayout 
      title="Estrutura Competitiva"
      description="Organização completa do basquetebol cabo-verdiano - das competições regionais à representação internacional"
    >
      <div className="space-y-8">
        {/* Introdução */}
        <Card className="bg-gradient-to-r from-cv-blue to-cv-blue/80 text-white">
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Estrutura Competitiva do Basquetebol Cabo-verdiano
              </h1>
              <p className="text-xl leading-relaxed mb-6">
                Cabo Verde possui uma estrutura organizada que vai desde as competições regionais 
                em cada ilha até à prestigiada representação internacional, com destaque para a 
                participação histórica no Mundial FIBA 2023.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">9</div>
                  <p className="text-sm">Ilhas com Competições</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm">Competições Ativas</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">64º</div>
                  <p className="text-sm">Ranking Mundial FIBA</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navegação por Níveis */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="regional">Regionais</TabsTrigger>
            <TabsTrigger value="national">Nacionais</TabsTrigger>
            <TabsTrigger value="international">Internacional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <CompetitionsStructure />
          </TabsContent>
          
          <TabsContent value="regional" className="space-y-8">
            <RegionalCompetitions />
          </TabsContent>
          
          <TabsContent value="national" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-cv-blue" />
                    <span>Campeonato Nacional Masculino</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Principal competição nacional que reúne os campeões regionais de cada ilha. 
                    Realizado anualmente, é o ponto alto do basquetebol nacional.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Participantes:</span>
                      <span className="font-semibold">8 equipas (campeões regionais)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Formato:</span>
                      <span className="font-semibold">Fase de grupos + Eliminatórias</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duração:</span>
                      <span className="font-semibold">15 dias (Junho-Julho)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Atual Campeão:</span>
                      <span className="font-semibold text-cv-blue">ABC Basquete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span>Taça de Cabo Verde</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Competição eliminatória nacional que acontece com menos regularidade, 
                    mas mantém grande prestígio no basquetebol cabo-verdiano.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Participantes:</span>
                      <span className="font-semibold">16 equipas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Formato:</span>
                      <span className="font-semibold">Eliminação direta</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frequência:</span>
                      <span className="font-semibold">Irregular</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local da Final:</span>
                      <span className="font-semibold text-cv-blue">Pavilhão Nacional, Praia</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="international" className="space-y-8">
            <NationalTeamsSection />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CompetitionsStructurePage;
