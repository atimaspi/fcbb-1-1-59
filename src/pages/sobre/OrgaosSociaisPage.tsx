
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Gavel, Users, FileText } from 'lucide-react';

const OrgaosSociaisPage = () => {
  const orgaos = [
    {
      nome: "Assembleia Geral",
      icon: Users,
      presidente: "Dr. Manuel Correia Pereira",
      funcoes: [
        "Aprovar o relatório e contas anuais",
        "Eleger e destituir os corpos gerentes",
        "Aprovar alterações aos estatutos",
        "Definir as grandes orientações da federação"
      ],
      composicao: "Representantes de todos os clubes filiados",
      reunioes: "Ordinária anual e extraordinárias quando necessário"
    },
    {
      nome: "Conselho de Direção",
      icon: Building,
      presidente: "João Silva Santos",
      funcoes: [
        "Dirigir e administrar a federação",
        "Organizar e supervisionar as competições",
        "Representar a FCBB nacional e internacionalmente",
        "Implementar as decisões da Assembleia Geral"
      ],
      composicao: "Presidente, Vice-Presidente, Secretário-Geral e Tesoureiro",
      reunioes: "Mensais ou quando necessário"
    },
    {
      nome: "Conselho Fiscal",
      icon: FileText,
      presidente: "Dra. Ana Paula Monteiro",
      funcoes: [
        "Fiscalizar a gestão financeira",
        "Examinar as contas e documentos",
        "Emitir pareceres sobre o relatório e contas",
        "Supervisionar o cumprimento dos estatutos"
      ],
      composicao: "3 membros efetivos e 1 suplente",
      reunioes: "Trimestrais e sempre que necessário"
    },
    {
      nome: "Conselho de Justiça",
      icon: Gavel,
      presidente: "Dr. Pedro Almada Silva",
      funcoes: [
        "Julgar infrações disciplinares",
        "Aplicar sanções disciplinares",
        "Decidir recursos e apelações",
        "Garantir o fair-play nas competições"
      ],
      composicao: "3 membros efetivos e 2 suplentes",
      reunioes: "Conforme necessidades disciplinares"
    }
  ];

  return (
    <PageLayout 
      title="Órgãos Sociais da FCBB"
      description="Estrutura organizacional e órgãos de governação da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            A FCBB é gerida por diversos órgãos sociais que garantem o bom funcionamento, 
            transparência e desenvolvimento sustentável da federação e do basquetebol nacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orgaos.map((orgao, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-cv-blue to-cv-red text-white">
                <div className="flex items-center space-x-3">
                  <orgao.icon size={32} />
                  <div>
                    <CardTitle className="text-xl">{orgao.nome}</CardTitle>
                    <p className="text-cv-yellow font-semibold">
                      Presidente: {orgao.presidente}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-bold text-cv-blue mb-3 flex items-center">
                    <FileText size={20} className="mr-2" />
                    Principais Funções
                  </h4>
                  <ul className="space-y-2">
                    {orgao.funcoes.map((funcao, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-cv-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600">{funcao}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-cv-blue mb-2">Composição</h4>
                  <p className="text-gray-600">{orgao.composicao}</p>
                </div>

                <div>
                  <h4 className="font-bold text-cv-blue mb-2">Reuniões</h4>
                  <Badge variant="outline" className="text-gray-600">
                    {orgao.reunioes}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red text-white">
          <CardContent className="p-8 text-center">
            <Building size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Transparência e Governação</h3>
            <p className="mb-6 max-w-3xl mx-auto">
              Todos os órgãos sociais da FCBB funcionam de acordo com os estatutos aprovados 
              em Assembleia Geral, garantindo transparência, responsabilidade e boa governação 
              no desenvolvimento do basquetebol cabo-verdiano.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/sobre/estatutos"
                className="bg-cv-yellow text-cv-blue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Ver Estatutos
              </a>
              <a 
                href="/sobre/contactos"
                className="bg-white/10 border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Contactar Órgãos
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrgaosSociaisPage;
