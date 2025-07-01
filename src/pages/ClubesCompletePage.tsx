
import PageLayout from './PageLayout';
import ClubsDirectory from '@/components/ClubsDirectory';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, CreditCard, Trophy, Download, Plus } from 'lucide-react';
import { useFederationData } from '@/hooks/useFederationData';

const ClubesCompletePage = () => {
  const { federationData } = useFederationData();

  const registrationSteps = [
    {
      step: 1,
      title: "Preparação da Documentação",
      description: "Reunir todos os documentos necessários para a filiação",
      documents: ["Estatutos do clube", "Ata de constituição", "Lista de dirigentes", "Comprovativo de sede"]
    },
    {
      step: 2,
      title: "Preenchimento do Formulário",
      description: "Completar o formulário oficial de filiação da FCBB",
      documents: ["Formulário de filiação", "Declaração de compromisso", "Lista de atletas"]
    },
    {
      step: 3,
      title: "Pagamento das Taxas",
      description: "Efetuar o pagamento das taxas de filiação e licenciamento",
      documents: ["Comprovativo de pagamento", "Recibo da FCBB"]
    },
    {
      step: 4,
      title: "Análise e Aprovação",
      description: "Aguardar análise da documentação pela FCBB",
      documents: ["Parecer técnico", "Certificado de filiação"]
    }
  ];

  const fees = [
    { type: "Filiação de Novo Clube", amount: "15.000 CVE", validity: "Única" },
    { type: "Renovação Anual", amount: "8.000 CVE", validity: "1 ano" },
    { type: "Licenciamento de Atleta Sénior", amount: "500 CVE", validity: "1 época" },
    { type: "Licenciamento de Atleta Jovem (Sub-18)", amount: "300 CVE", validity: "1 época" },
    { type: "Transferência de Atleta", amount: "1.000 CVE", validity: "Por transferência" }
  ];

  const benefits = [
    "Participação em todas as competições oficiais da FCBB",
    "Acesso a programas de formação e desenvolvimento",
    "Apoio técnico e logístico para eventos",
    "Representação nos órgãos da FCBB",
    "Acesso a seguros desportivos",
    "Participação em workshops e seminários",
    "Apoio na captação de patrocínios",
    "Acesso à área restrita do website da FCBB"
  ];

  return (
    <PageLayout 
      title="Clubes Filiados"
      description="Diretório de clubes, processos de filiação e informações para associados"
    >
      <div className="space-y-8">
        <ClubsDirectory />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-cv-blue" />
              Como Filiar o seu Clube à FCBB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {registrationSteps.map((step, index) => (
                <Card key={index} className="border-2 border-gray-200">
                  <CardHeader className="text-center pb-3">
                    <div className="w-12 h-12 bg-cv-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                    <div className="space-y-1">
                      {step.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="text-xs text-gray-500 flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {doc}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Documentos Necessários</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Documentos do Clube:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Estatutos aprovados em Assembleia Geral</li>
                    <li>• Ata de constituição do clube</li>
                    <li>• Lista atualizada dos órgãos sociais</li>
                    <li>• Comprovativo de sede social</li>
                    <li>• Número de Identificação Fiscal (NIF)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Documentos dos Dirigentes:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Cópias do Bilhete de Identidade</li>
                    <li>• Certificados de registo criminal</li>
                    <li>• Declarações de aceitação de cargos</li>
                    <li>• Fotografias tipo passe recentes</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-cv-blue" />
              Taxas e Emolumentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Tipo de Taxa</th>
                    <th className="text-right p-3 font-medium">Valor</th>
                    <th className="text-center p-3 font-medium">Validade</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">{fee.type}</td>
                      <td className="p-3 text-right font-semibold">{fee.amount}</td>
                      <td className="p-3 text-center">
                        <Badge variant="outline">{fee.validity}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Formas de Pagamento:</h5>
              <p className="text-sm text-gray-600">
                • Transferência bancária • Depósito em conta da FCBB • Pagamento presencial na sede
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
              Benefícios da Filiação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cv-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cv-blue" />
              Formulários e Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Formulário de Filiação", type: "PDF", size: "245 KB" },
                { name: "Formulário de Licenciamento", type: "PDF", size: "180 KB" },
                { name: "Formulário de Transferência", type: "PDF", size: "165 KB" },
                { name: "Modelo de Estatutos", type: "DOCX", size: "95 KB" },
                { name: "Regulamento de Clubes", type: "PDF", size: "320 KB" },
                { name: "Manual do Dirigente", type: "PDF", size: "1.2 MB" }
              ].map((doc, index) => (
                <Card key={index} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cv-blue text-white">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Precisa de Ajuda com a Filiação?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Departamento de Clubes</h4>
                <p className="text-sm opacity-90">
                  Telefone: {federationData?.contact_phone || '+238 261 12 34'}
                </p>
                <p className="text-sm opacity-90">
                  Email: {federationData?.contact_email || 'clubes@fcbb.cv'}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Horário de Atendimento</h4>
                <p className="text-sm opacity-90">Segunda a Sexta: 9h00 - 17h00</p>
                <p className="text-sm opacity-90">Sábado: 9h00 - 12h00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ClubesCompletePage;
