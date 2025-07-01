
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Calendar, User } from 'lucide-react';

const EstatutosPage = () => {
  const capitulos = [
    {
      titulo: "Capítulo I - Disposições Gerais",
      artigos: [
        { numero: "1º", titulo: "Denominação e Sede", descricao: "Define a denominação oficial e localização da sede da FCBB" },
        { numero: "2º", titulo: "Natureza Jurídica", descricao: "Estabelece a natureza jurídica como associação sem fins lucrativos" },
        { numero: "3º", titulo: "Duração", descricao: "A federação constitui-se por tempo indeterminado" }
      ]
    },
    {
      titulo: "Capítulo II - Fins e Objetivos",
      artigos: [
        { numero: "4º", titulo: "Objeto", descricao: "Promover, desenvolver e organizar o basquetebol em Cabo Verde" },
        { numero: "5º", titulo: "Atribuições", descricao: "Lista das principais atribuições da federação" },
        { numero: "6º", titulo: "Competências", descricao: "Competências específicas no âmbito desportivo nacional" }
      ]
    },
    {
      titulo: "Capítulo III - Associados",
      artigos: [
        { numero: "7º", titulo: "Categorias", descricao: "Define as categorias de associados (clubes, associações regionais)" },
        { numero: "8º", titulo: "Admissão", descricao: "Processo e critérios para admissão de novos associados" },
        { numero: "9º", titulo: "Direitos e Deveres", descricao: "Direitos e deveres dos associados" }
      ]
    },
    {
      titulo: "Capítulo IV - Órgãos Sociais",
      artigos: [
        { numero: "10º", titulo: "Assembleia Geral", descricao: "Composição e competências da Assembleia Geral" },
        { numero: "11º", titulo: "Direção", descricao: "Composição e competências da Direção" },
        { numero: "12º", titulo: "Conselho Fiscal", descricao: "Composição e competências do Conselho Fiscal" }
      ]
    }
  ];

  const documentos = [
    {
      nome: "Estatutos da FCBB",
      tipo: "PDF",
      tamanho: "2.3 MB",
      versao: "Versão aprovada em 2020",
      data: "15/03/2020"
    },
    {
      nome: "Regulamento Geral",
      tipo: "PDF", 
      tamanho: "1.8 MB",
      versao: "Atualização 2023",
      data: "10/01/2023"
    },
    {
      nome: "Regulamento de Competições",
      tipo: "PDF",
      tamanho: "3.1 MB", 
      versao: "Época 2023/24",
      data: "01/09/2023"
    },
    {
      nome: "Regulamento Disciplinar",
      tipo: "PDF",
      tamanho: "1.5 MB",
      versao: "Versão 2022",
      data: "20/06/2022"
    }
  ];

  const alteracoes = [
    {
      data: "15/03/2020",
      descricao: "Aprovação dos novos estatutos pela Assembleia Geral",
      tipo: "Aprovação"
    },
    {
      data: "10/01/2023", 
      descricao: "Atualização do Regulamento Geral - Adequação às normas FIBA",
      tipo: "Atualização"
    },
    {
      data: "01/09/2023",
      descricao: "Novo Regulamento de Competições para época 2023/24",
      tipo: "Novo"
    }
  ];

  return (
    <PageLayout title="Estatutos e Regulamentos">
      <div className="space-y-8">
        {/* Downloads */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue flex items-center">
              <Download className="w-6 h-6 mr-2" />
              Documentos para Download
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentos.map((doc, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-red-500 mr-3" />
                      <div>
                        <h3 className="font-semibold text-cv-blue">{doc.nome}</h3>
                        <p className="text-sm text-gray-600">{doc.versao}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{doc.tipo}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <p>{doc.tamanho} • {doc.data}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo dos Estatutos */}
        <Tabs defaultValue="resumo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="capitulos">Capítulos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue">Resumo dos Estatutos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Os Estatutos da Federação Cabo-verdiana de Basquetebol, aprovados em Assembleia Geral 
                    de 15 de março de 2020, estabelecem as normas fundamentais de organização e funcionamento 
                    da federação, definindo os seus fins, objetivos, estrutura organizacional e procedimentos.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <User className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                      <div className="text-2xl font-bold text-cv-blue">47</div>
                      <p className="text-sm text-gray-600">Artigos</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <FileText className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                      <div className="text-2xl font-bold text-cv-blue">8</div>
                      <p className="text-sm text-gray-600">Capítulos</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-cv-blue mx-auto mb-2" />
                      <div className="text-2xl font-bold text-cv-blue">2020</div>
                      <p className="text-sm text-gray-600">Última Revisão</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="capitulos" className="space-y-6">
            {capitulos.map((capitulo, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-cv-blue text-lg">{capitulo.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {capitulo.artigos.map((artigo, idx) => (
                      <div key={idx} className="border-l-4 border-cv-red pl-4 py-2">
                        <h4 className="font-semibold text-cv-blue">
                          Artigo {artigo.numero} - {artigo.titulo}
                        </h4>
                        <p className="text-gray-700 text-sm mt-1">{artigo.descricao}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="historico" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-cv-blue">Histórico de Alterações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alteracoes.map((alteracao, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border-l-4 border-cv-blue bg-gray-50 rounded-r">
                      <div className="flex-shrink-0">
                        <Badge className={`${alteracao.tipo === 'Aprovação' ? 'bg-green-500' : 
                                         alteracao.tipo === 'Novo' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                          {alteracao.tipo}
                        </Badge>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm text-gray-600 mb-1">{alteracao.data}</p>
                        <p className="text-gray-700">{alteracao.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default EstatutosPage;
