import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Trophy, Calendar, Target, Award, BookOpen, Loader2 } from 'lucide-react';
import { useFederationData } from '@/hooks/useFederationData';
import { useBackendData } from '@/hooks/useBackendData';

const SobreFCBBPage = () => {
  const { federationData, federationLoading, federationError, statsData } = useFederationData();
  const { clubs, news, players, teams } = useBackendData();

  if (federationLoading) {
    return (
      <PageLayout title="Sobre a FCBB">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-cv-blue" />
        </div>
      </PageLayout>
    );
  }

  if (federationError) {
    return (
      <PageLayout title="Sobre a FCBB">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-8 text-center">
            <p className="text-red-600">Erro ao carregar informações da federação.</p>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  const achievements = [
    { year: "1977", event: "Fundação da FCBB" },
    { year: "1980", event: "Primeira Liga Nacional" },
    { year: "1985", event: "Filiação à FIBA África" },
    { year: "1995", event: "Primeira participação no AfroBasket" },
    { year: "2010", event: "Criação da Liga Feminina" },
    { year: "2024", event: `${clubs?.length || 50}+ clubes filiados` }
  ];

  const values = [
    {
      title: "Excelência",
      description: "Promover a excelência desportiva em todos os níveis do basquetebol cabo-verdiano.",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      title: "Integridade", 
      description: "Manter os mais altos padrões éticos e de fair-play em todas as atividades.",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Inclusão",
      description: "Garantir que o basquetebol seja acessível a todos os cabo-verdianos.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Desenvolvimento",
      description: "Investir na formação de atletas, treinadores e árbitros de qualidade.",
      icon: <Target className="w-6 h-6" />
    }
  ];

  const leadership = [
    {
      name: "Dr. João Manuel Monteiro",
      position: "Presidente",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Eng. Maria Silva Santos", 
      position: "Vice-Presidente",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b732?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Prof. Carlos Alberto Lima",
      position: "Secretário-Geral", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Dr.ª Ana Cristina Tavares",
      position: "Tesoureira",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <PageLayout 
      title="Sobre a FCBB"
      description="Conheça a história, missão e estrutura da Federação Cabo-Verdiana de Basquetebol"
    >
      <div className="space-y-8">
        {/* História com dados da federação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-cv-blue" />
              Nossa História
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {federationData?.name ? (
                `A ${federationData.name} foi fundada em ${federationData.foundation_date ? new Date(federationData.foundation_date).getFullYear() : '1977'} com o objetivo de promover, 
                organizar e desenvolver o basquetebol em todo o arquipélago cabo-verdiano.`
              ) : (
                `A Federação Cabo-Verdiana de Basquetebol (FCBB) foi fundada em 1977 com o objetivo de promover, 
                organizar e desenvolver o basquetebol em todo o arquipélago cabo-verdiano.`
              )}
            </p>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-4 text-cv-blue">Marcos Históricos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Badge variant="outline" className="shrink-0">{achievement.year}</Badge>
                    <span className="text-sm">{achievement.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas da base de dados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">FCBB em Números</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cv-blue">{clubs?.length || 0}</div>
                <div className="text-sm text-gray-600">Clubes Filiados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cv-blue">{players?.length || 0}</div>
                <div className="text-sm text-gray-600">Atletas Registados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cv-blue">{teams?.length || 0}</div>
                <div className="text-sm text-gray-600">Equipas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cv-blue">{news?.filter(n => n.published).length || 0}</div>
                <div className="text-sm text-gray-600">Notícias Publicadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados de contacto da federação */}
        {federationData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Informações de Contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {federationData.address && (
                  <div>
                    <h4 className="font-semibold text-cv-blue mb-2">Endereço</h4>
                    <p className="text-gray-700">{federationData.address}</p>
                  </div>
                )}
                {federationData.contact_email && (
                  <div>
                    <h4 className="font-semibold text-cv-blue mb-2">Email</h4>
                    <p className="text-gray-700">{federationData.contact_email}</p>
                  </div>
                )}
                {federationData.contact_phone && (
                  <div>
                    <h4 className="font-semibold text-cv-blue mb-2">Telefone</h4>
                    <p className="text-gray-700">{federationData.contact_phone}</p>
                  </div>
                )}
                {federationData.website && (
                  <div>
                    <h4 className="font-semibold text-cv-blue mb-2">Website</h4>
                    <a href={federationData.website} target="_blank" rel="noopener noreferrer" className="text-cv-blue hover:underline">
                      {federationData.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Promover, organizar e desenvolver o basquetebol em Cabo Verde, garantindo a prática 
                desportiva de qualidade em todos os níveis, desde a formação de base até ao alto 
                rendimento, contribuindo para o desenvolvimento humano e social do país.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Ser uma federação de referência em África, reconhecida pela excelência na organização 
                de competições, formação de atletas e promoção do basquetebol como ferramenta de 
                desenvolvimento social e cultural em Cabo Verde.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Valores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Nossos Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="text-cv-blue shrink-0 mt-1">{value.icon}</div>
                  <div>
                    <h4 className="font-semibold text-cv-blue mb-2">{value.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Direção */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-6 h-6 mr-2 text-cv-blue" />
              Direção da FCBB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((leader, index) => (
                <div key={index} className="text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                  />
                  <h4 className="font-semibold text-cv-blue">{leader.name}</h4>
                  <p className="text-sm text-gray-600">{leader.position}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estrutura Organizacional */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Estrutura Organizacional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-cv-blue mb-2">Assembleia Geral</h4>
                <p className="text-gray-700 text-sm">
                  Órgão máximo da FCBB, composto por representantes de todos os clubes filiados.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-cv-blue mb-2">Direção</h4>
                <p className="text-gray-700 text-sm">
                  Órgão executivo responsável pela gestão diária e implementação das políticas da federação.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-cv-blue mb-2">Conselho Fiscal</h4>
                <p className="text-gray-700 text-sm">
                  Responsável pela fiscalização das contas e gestão financeira da federação.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-cv-blue mb-2">Conselho de Disciplina</h4>
                <p className="text-gray-700 text-sm">
                  Órgão responsável pela aplicação de medidas disciplinares e resolução de conflitos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SobreFCBBPage;
