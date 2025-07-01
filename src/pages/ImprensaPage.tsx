
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Users, Calendar, Mail, Phone, Camera } from 'lucide-react';

const ImprensaPage = () => {
  const comunicados = [
    {
      id: 1,
      title: "Convocatória da Seleção Nacional para o AfroBasket 2025",
      date: "20/05/2025",
      type: "Convocatória",
      summary: "Lista dos 15 jogadores convocados para a preparação do AfroBasket 2025.",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Calendário Oficial da Liga Nacional 2024/25 - Fase Final",
      date: "18/05/2025",
      type: "Calendário",
      summary: "Datas e horários dos jogos da fase final da Liga Nacional.",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Protocolo de Cooperação FCBB - FIBA África",
      date: "15/05/2025",
      type: "Protocolo",
      summary: "Assinatura de acordo para desenvolvimento do basquetebol feminino.",
      downloadUrl: "#"
    }
  ];

  const kitsImprensa = [
    {
      title: "Kit Imprensa - Liga Nacional 2024/25",
      description: "Logos, regulamentos, calendários e informações técnicas.",
      files: 12,
      size: "25.6 MB",
      downloadUrl: "#"
    },
    {
      title: "Kit Imprensa - Seleções Nacionais",
      description: "Fotografias oficiais, convocatórias e estatísticas.",
      files: 18,
      size: "42.1 MB", 
      downloadUrl: "#"
    },
    {
      title: "Kit Imprensa - FCBB Institucional",
      description: "Logos, estatutos, organograma e contactos oficiais.",
      files: 8,
      size: "15.3 MB",
      downloadUrl: "#"
    }
  ];

  const contactosImprensa = [
    {
      name: "Carlos Mendes",
      role: "Diretor de Comunicação",
      email: "comunicacao@fcbb.cv",
      phone: "+238 262 1234",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Ana Santos",
      role: "Assessora de Imprensa",
      email: "imprensa@fcbb.cv", 
      phone: "+238 262 5678",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b1db?auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  const acreditacoes = [
    {
      evento: "Final da Liga Nacional Masculina",
      data: "30/06/2025",
      local: "Pavilhão Nacional, Praia",
      prazo: "25/06/2025",
      status: "aberto"
    },
    {
      evento: "Taça de Cabo Verde - Final",
      data: "15/07/2025", 
      local: "Pavilhão Vavá Duarte, Praia",
      prazo: "10/07/2025",
      status: "aberto"
    }
  ];

  return (
    <PageLayout title="Área de Imprensa">
      <Tabs defaultValue="comunicados" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comunicados">Comunicados</TabsTrigger>
          <TabsTrigger value="kits">Kits de Imprensa</TabsTrigger>
          <TabsTrigger value="acreditacoes">Acreditações</TabsTrigger>
          <TabsTrigger value="contactos">Contactos</TabsTrigger>
        </TabsList>

        <TabsContent value="comunicados" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <FileText className="mr-2 h-5 w-5" />
                Comunicados Oficiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comunicados.map((comunicado) => (
                  <Card key={comunicado.id} className="border hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-cv-blue text-white">
                              {comunicado.type}
                            </Badge>
                            <span className="text-sm text-gray-500">{comunicado.date}</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{comunicado.title}</h3>
                          <p className="text-gray-600 text-sm">{comunicado.summary}</p>
                        </div>
                        <Button size="sm" className="ml-4">
                          <Download className="w-4 h-4 mr-2" />
                          Descarregar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Camera className="mr-2 h-5 w-5" />
                Kits de Imprensa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kitsImprensa.map((kit, index) => (
                  <Card key={index} className="border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-cv-blue text-white rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{kit.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{kit.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>{kit.files} ficheiros</span>
                        <span>{kit.size}</span>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descarregar Kit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acreditacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Users className="mr-2 h-5 w-5" />
                Acreditações para Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {acreditacoes.map((acreditacao, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{acreditacao.evento}</h3>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {acreditacao.data}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {acreditacao.local}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Prazo de inscrição: {acreditacao.prazo}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${acreditacao.status === 'aberto' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {acreditacao.status === 'aberto' ? 'Inscrições Abertas' : 'Encerrado'}
                          </Badge>
                          {acreditacao.status === 'aberto' && (
                            <Button size="sm">
                              Inscrever-se
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instruções para Acreditação</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <ol className="space-y-2">
                <li>Preencha o formulário de acreditação até ao prazo indicado</li>
                <li>Anexe cópia do cartão de jornalista ou credencial profissional</li>
                <li>Indique o meio de comunicação que representa</li>
                <li>Aguarde confirmação por email em 48 horas</li>
                <li>Levante a acreditação 1 hora antes do evento</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contactos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-cv-blue">
                <Phone className="mr-2 h-5 w-5" />
                Contactos de Imprensa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactosImprensa.map((contacto, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={contacto.photo} 
                          alt={contacto.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{contacto.name}</h3>
                          <p className="text-cv-blue font-medium">{contacto.role}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="w-4 h-4 mr-2 text-gray-400" />
                              <a href={`mailto:${contacto.email}`} className="hover:text-cv-blue">
                                {contacto.email}
                              </a>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{contacto.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários de Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Durante a Semana</h4>
                  <p className="text-gray-600">Segunda a Sexta: 09:00 - 17:00</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Fim de Semana</h4>
                  <p className="text-gray-600">Apenas para eventos oficiais</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <ul className="space-y-2">
                <li>Para entrevistas com dirigentes, agendar com 48h de antecedência</li>
                <li>Fotografias oficiais disponíveis mediante pedido</li>
                <li>Declarações oficiais apenas através dos porta-vozes designados</li>
                <li>Material audiovisual disponível para parceiros de media</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ImprensaPage;
