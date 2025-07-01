import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Award, Users, Globe } from 'lucide-react';

const MissaoVisaoPage = () => {
  const valores = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Paixão",
      description: "Promover o amor pelo basquetebol em todas as idades e níveis de competição."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Inclusão",
      description: "Garantir oportunidades iguais para todos, independentemente da origem ou condição social."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excelência",
      description: "Buscar sempre os mais altos padrões de qualidade na organização e desenvolvimento."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Integridade",
      description: "Atuar com transparência, ética e responsabilidade em todas as nossas ações."
    }
  ];

  const objetivos = [
    "Desenvolver o basquetebol em todas as ilhas de Cabo Verde",
    "Formar jogadores, treinadores e árbitros de alta qualidade",
    "Organizar competições nacionais e regionais regulares",
    "Promover a participação internacional das seleções nacionais",
    "Modernizar as infraestruturas desportivas do país",
    "Fomentar o basquetebol feminino e jovem",
    "Estabelecer parcerias estratégicas nacionais e internacionais",
    "Implementar programas de desenvolvimento comunitário"
  ];

  return (
    <PageLayout 
      title="Missão e Visão" 
      description="Conheça a missão, visão e valores da Federação Cabo-verdiana de Basquetebol (FCBB), nossos objetivos estratégicos e compromisso com o desenvolvimento do basquetebol em Cabo Verde."
      keywords="missão fcbb, visão fcbb, valores basquetebol cabo verde, objetivos estratégicos, desenvolvimento desportivo"
    >
      <div className="space-y-8">
        {/* Missão */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-cv-blue" />
              <CardTitle className="text-2xl text-cv-blue">Nossa Missão</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed">
              Promover, desenvolver e organizar o basquetebol em Cabo Verde, criando oportunidades 
              para todos os cidadãos praticarem esta modalidade, desde o nível recreativo até ao 
              alto rendimento, contribuindo para o desenvolvimento social, cultural e desportivo 
              do país.
            </p>
          </CardContent>
        </Card>

        {/* Visão */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-cv-blue" />
              <CardTitle className="text-2xl text-cv-blue">Nossa Visão</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ser reconhecida como uma federação de referência em África, destacando-se pela 
              qualidade da organização, pelo desenvolvimento sustentável do basquetebol e pela 
              formação de atletas que representem Cabo Verde com distinção no cenário internacional.
            </p>
          </CardContent>
        </Card>

        {/* Valores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-cv-blue">Nossos Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valores.map((valor, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-cv-blue flex-shrink-0">
                    {valor.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-cv-blue mb-2">{valor.title}</h3>
                    <p className="text-gray-700">{valor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objetivos Estratégicos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-cv-blue">Objetivos Estratégicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objetivos.map((objetivo, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border-l-4 border-cv-red bg-gray-50 rounded-r">
                  <div className="w-6 h-6 bg-cv-blue text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{objetivo}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compromisso */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-cv-blue">Nosso Compromisso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-cv-blue to-cv-red text-white p-6 rounded-lg">
              <p className="text-lg leading-relaxed">
                A FCBB compromete-se a trabalhar incansavelmente para o desenvolvimento do basquetebol 
                cabo-verdiano, mantendo sempre os mais altos padrões de integridade, transparência e 
                dedicação ao serviço da comunidade desportiva nacional.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MissaoVisaoPage;
