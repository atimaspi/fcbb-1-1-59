
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Gavel, Shield, Award } from 'lucide-react';

const OrgaosSociaisPage = () => {
  const assembleia = [
    { nome: "Dr. Manuel Veiga", cargo: "Presidente da Mesa", mandato: "2020-2024" },
    { nome: "Eng. Sofia Lima", cargo: "Vice-Presidente", mandato: "2020-2024" },
    { nome: "Dr. Pedro Santos", cargo: "Secretário", mandato: "2020-2024" }
  ];

  const conselhoFiscal = [
    { nome: "Dra. Isabel Monteiro", cargo: "Presidente", mandato: "2020-2024" },
    { nome: "Dr. Carlos Pereira", cargo: "Vogal", mandato: "2020-2024" },
    { nome: "Dra. Ana Silva", cargo: "Vogal", mandato: "2020-2024" }
  ];

  const tribunalArbitragem = [
    { nome: "Dr. João Tavares", cargo: "Presidente", mandato: "2020-2024" },
    { nome: "Dr. Miguel Santos", cargo: "Vogal", mandato: "2020-2024" },
    { nome: "Dra. Maria Rodrigues", cargo: "Vogal", mandato: "2020-2024" }
  ];

  const conselhoEtica = [
    { nome: "Prof. António Correia", cargo: "Presidente", mandato: "2020-2024" },
    { nome: "Dr. Luis Fernandes", cargo: "Vogal", mandato: "2020-2024" },
    { nome: "Dra. Carla Mendes", cargo: "Vogal", mandato: "2020-2024" }
  ];

  const competencias = {
    assembleia: [
      "Eleger e destituir os órgãos da federação",
      "Aprovar e alterar os estatutos",
      "Aprovar o plano de atividades e orçamento",
      "Aprovar o relatório de atividades e contas",
      "Deliberar sobre a dissolução da federação"
    ],
    fiscal: [
      "Fiscalizar a administração da federação",
      "Verificar a regularidade dos livros e documentos",
      "Elaborar parecer sobre o relatório e contas",
      "Solicitar informações à direção",
      "Assistir às reuniões da direção quando necessário"
    ],
    tribunal: [
      "Julgar infrações disciplinares",
      "Aplicar sanções disciplinares",
      "Resolver conflitos entre membros",
      "Interpretar regulamentos desportivos",
      "Decidir sobre recursos e apelações"
    ],
    etica: [
      "Promover os valores éticos no desporto",
      "Investigar casos de conduta inadequada",
      "Propor medidas preventivas",
      "Emitir pareceres sobre questões éticas",
      "Organizar formações sobre fair-play"
    ]
  };

  return (
    <PageLayout title="Órgãos Sociais">
      <div className="space-y-8">
        {/* Assembleia Geral */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-cv-blue" />
              <CardTitle className="text-cv-blue">Assembleia Geral</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Mesa da Assembleia</h3>
                <div className="space-y-3">
                  {assembleia.map((membro, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{membro.nome}</p>
                        <p className="text-sm text-gray-600">{membro.cargo}</p>
                      </div>
                      <Badge variant="outline">{membro.mandato}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Competências</h3>
                <ul className="space-y-2">
                  {competencias.assembleia.map((comp, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-cv-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conselho Fiscal */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-cv-blue" />
              <CardTitle className="text-cv-blue">Conselho Fiscal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Membros</h3>
                <div className="space-y-3">
                  {conselhoFiscal.map((membro, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{membro.nome}</p>
                        <p className="text-sm text-gray-600">{membro.cargo}</p>
                      </div>
                      <Badge variant="outline">{membro.mandato}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Competências</h3>
                <ul className="space-y-2">
                  {competencias.fiscal.map((comp, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-cv-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tribunal de Arbitragem */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Gavel className="w-8 h-8 text-cv-blue" />
              <CardTitle className="text-cv-blue">Tribunal de Arbitragem Desportiva</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Membros</h3>
                <div className="space-y-3">
                  {tribunalArbitragem.map((membro, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{membro.nome}</p>
                        <p className="text-sm text-gray-600">{membro.cargo}</p>
                      </div>
                      <Badge variant="outline">{membro.mandato}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Competências</h3>
                <ul className="space-y-2">
                  {competencias.tribunal.map((comp, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-cv-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conselho de Ética */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-cv-blue" />
              <CardTitle className="text-cv-blue">Conselho de Ética</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Membros</h3>
                <div className="space-y-3">
                  {conselhoEtica.map((membro, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{membro.nome}</p>
                        <p className="text-sm text-gray-600">{membro.cargo}</p>
                      </div>
                      <Badge variant="outline">{membro.mandato}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Competências</h3>
                <ul className="space-y-2">
                  {competencias.etica.map((comp, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-cv-blue rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {comp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informação Adicional */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Duração do Mandato:</span> 4 anos (2020-2024)
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Próximas Eleições:</span> Previstas para 2024
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Contacto:</span> Para questões relacionadas com os órgãos sociais, 
                contacte a secretaria geral através do email: secretaria@fcbb.cv
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrgaosSociaisPage;
