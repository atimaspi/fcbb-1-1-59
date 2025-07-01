import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Globe } from 'lucide-react';

const HistoriaPage = () => {
  const milestones = [
    {
      year: "1986",
      title: "Fundação da FCBB",
      description: "A Federação Cabo-verdiana de Basquetebol é oficialmente fundada, marcando o início da organização do basquetebol nacional.",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "1988",
      title: "Primeiro Campeonato Nacional",
      description: "Realização do primeiro Campeonato Nacional de Basquetebol, com participação de equipas de várias ilhas.",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      year: "1992",
      title: "Filiação à FIBA",
      description: "Cabo Verde torna-se membro oficial da FIBA (Federação Internacional de Basquetebol).",
      icon: <Globe className="w-6 h-6" />
    },
    {
      year: "1995",
      title: "Primeira Participação Internacional",
      description: "A Seleção Nacional participa no seu primeiro torneio internacional oficial.",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      year: "2001",
      title: "Liga Nacional Feminina",
      description: "Criação da Liga Nacional Feminina, promovendo o basquetebol feminino no país.",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "2010",
      title: "Modernização das Infraestruturas",
      description: "Início do programa de modernização dos pavilhões e infraestruturas desportivas.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      year: "2018",
      title: "Melhor Classificação FIBA",
      description: "Cabo Verde atinge a sua melhor classificação no ranking mundial da FIBA.",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Nova Era Digital",
      description: "Lançamento da nova plataforma digital e sistema de gestão modernizado.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const presidents = [
    { name: "João Monteiro", period: "1986-1992", achievements: "Fundação e primeiros campeonatos" },
    { name: "Maria Santos", period: "1992-2000", achievements: "Filiação à FIBA e internacionalização" },
    { name: "Carlos Tavares", period: "2000-2012", achievements: "Expansão do basquetebol feminino" },
    { name: "António Silva", period: "2012-presente", achievements: "Modernização e desenvolvimento" }
  ];

  return (
    <PageLayout 
      title="História da FCBB"
      description="Descubra a rica história da Federação Cabo-verdiana de Basquetebol desde a sua fundação em 1986, marcos históricos, presidentes e conquistas ao longo de mais de três décadas."
      keywords="história fcbb, fundação 1986, basquetebol cabo verde, marcos históricos, presidentes fcbb, desenvolvimento desportivo"
    >
      <div className="space-y-8">
        {/* Introdução */}
        <Card>
          <CardContent className="p-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              A Federação Cabo-verdiana de Basquetebol (FCBB) foi fundada em 1986 com o objetivo de promover, 
              desenvolver e organizar o basquetebol em todo o arquipélago cabo-verdiano. Ao longo de mais de 
              três décadas, a FCBB tem sido o pilar central do desenvolvimento desta modalidade no país.
            </p>
          </CardContent>
        </Card>

        {/* Timeline de Marcos Históricos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Marcos Históricos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border-l-4 border-cv-blue bg-gray-50 rounded-r">
                  <div className="flex-shrink-0 bg-cv-blue text-white p-2 rounded">
                    {milestone.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className="bg-cv-red">{milestone.year}</Badge>
                      <h3 className="text-lg font-semibold text-cv-blue">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Presidentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Presidentes da FCBB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presidents.map((president, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                  <h3 className="text-lg font-semibold text-cv-blue mb-2">{president.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{president.period}</p>
                  <p className="text-gray-700">{president.achievements}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conquistas e Números */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-cv-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-cv-blue">38</div>
              <p className="text-gray-600">Anos de História</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-cv-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-cv-blue">150+</div>
              <p className="text-gray-600">Clubes Afiliados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-cv-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-cv-blue">10</div>
              <p className="text-gray-600">Ilhas Representadas</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default HistoriaPage;
