
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Scale } from 'lucide-react';

const EstatutosPage = () => {
  const capitulos = [
    {
      numero: "I",
      titulo: "Disposições Gerais",
      artigos: ["Denominação e Sede", "Fins e Objetivos", "Duração", "Símbolos"]
    },
    {
      numero: "II", 
      titulo: "Filiação e Associados",
      artigos: ["Condições de Filiação", "Direitos dos Associados", "Deveres dos Associados", "Perda da Qualidade"]
    },
    {
      numero: "III",
      titulo: "Órgãos Sociais",
      artigos: ["Assembleia Geral", "Conselho de Direção", "Conselho Fiscal", "Conselho de Justiça"]
    },
    {
      numero: "IV",
      titulo: "Gestão Financeira", 
      artigos: ["Recursos Financeiros", "Orçamento e Contas", "Fiscalização", "Exercício Económico"]
    },
    {
      numero: "V",
      titulo: "Competições e Regulamentos",
      artigos: ["Organização de Competições", "Regulamentos Técnicos", "Disciplina Desportiva", "Arbitragem"]
    },
    {
      numero: "VI",
      titulo: "Disposições Finais",
      artigos: ["Alteração dos Estatutos", "Dissolução", "Casos Omissos", "Entrada em Vigor"]
    }
  ];

  const historico = [
    {
      data: "2023-03-15",
      versao: "Versão 3.0",
      descricao: "Última revisão aprovada em Assembleia Geral Extraordinária",
      status: "Vigente"
    },
    {
      data: "2020-02-10", 
      versao: "Versão 2.1",
      descricao: "Alterações relacionadas com a estrutura organizacional",
      status: "Revogada"
    },
    {
      data: "2018-01-20",
      versao: "Versão 2.0", 
      descricao: "Revisão geral dos estatutos",
      status: "Revogada"
    }
  ];

  return (
    <PageLayout 
      title="Estatutos da FCBB"
      description="Estatutos oficiais da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Os estatutos da FCBB definem a estrutura organizacional, objetivos, direitos e deveres 
            que regem o funcionamento da federação e suas relações com os clubes filiados.
          </p>
        </div>

        {/* Documento Principal */}
        <Card className="bg-gradient-to-r from-cv-blue to-cv-red text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <FileText size={48} />
                <div>
                  <h3 className="text-2xl font-bold">Estatutos da FCBB</h3>
                  <p className="text-cv-yellow">Versão 3.0 - Março 2023</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-cv-yellow text-cv-blue">
                Vigente
              </Badge>
            </div>
            
            <p className="mb-6">
              Documento oficial aprovado em Assembleia Geral que estabelece as normas 
              de funcionamento da Federação Cabo-verdiana de Basquetebol.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-cv-yellow text-cv-blue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center">
                <Download size={20} className="mr-2" />
                Baixar PDF (2.1 MB)
              </button>
              <button className="bg-white/10 border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                Ver Online
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Estrutura dos Estatutos */}
        <div>
          <h3 className="text-2xl font-bold text-cv-blue mb-6 flex items-center">
            <Scale size={24} className="mr-3" />
            Estrutura dos Estatutos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capitulos.map((capitulo, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-cv-blue/5">
                  <CardTitle className="text-cv-blue">
                    Capítulo {capitulo.numero}
                  </CardTitle>
                  <p className="font-semibold text-gray-700">{capitulo.titulo}</p>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {capitulo.artigos.map((artigo, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-cv-yellow rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-600">{artigo}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Histórico de Versões */}
        <div>
          <h3 className="text-2xl font-bold text-cv-blue mb-6 flex items-center">
            <Calendar size={24} className="mr-3" />
            Histórico de Versões
          </h3>
          
          <div className="space-y-4">
            {historico.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-cv-blue/10 rounded-full flex items-center justify-center">
                        <FileText size={24} className="text-cv-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cv-blue">{item.versao}</h4>
                        <p className="text-gray-600">{item.descricao}</p>
                        <p className="text-sm text-gray-500">{item.data}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={item.status === 'Vigente' ? 'default' : 'secondary'}
                      className={item.status === 'Vigente' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações Legais */}
        <Card className="bg-gray-50">
          <CardContent className="p-8 text-center">
            <Scale size={48} className="mx-auto mb-4 text-cv-blue" />
            <h3 className="text-2xl font-bold text-cv-blue mb-4">Informações Legais</h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              Os estatutos da FCBB foram elaborados em conformidade com a legislação cabo-verdiana 
              sobre associações desportivas e estão registados nas entidades competentes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-cv-blue mb-2">Registo Legal</h4>
                <p className="text-sm text-gray-600">
                  Registado na Conservatória dos Registos sob o nº 123/FCBB/2023
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-cv-blue mb-2">Aprovação</h4>
                <p className="text-sm text-gray-600">
                  Aprovado em Assembleia Geral de 15 de Março de 2023
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EstatutosPage;
