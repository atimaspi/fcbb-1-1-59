
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Building, User } from 'lucide-react';

const ContactosPage = () => {
  const departamentos = [
    {
      nome: "Presidência",
      responsavel: "António Silva",
      email: "presidente@fcbb.cv",
      telefone: "+238 261 22 34",
      ext: "101"
    },
    {
      nome: "Secretaria Geral",
      responsavel: "Carlos Tavares", 
      email: "secretario@fcbb.cv",
      telefone: "+238 261 22 36",
      ext: "102"
    },
    {
      nome: "Departamento Técnico",
      responsavel: "João Monteiro",
      email: "tecnico@fcbb.cv",
      telefone: "+238 261 22 38", 
      ext: "103"
    },
    {
      nome: "Competições",
      responsavel: "Ana Pereira",
      email: "competicoes@fcbb.cv",
      telefone: "+238 261 22 40",
      ext: "104"
    },
    {
      nome: "Imprensa",
      responsavel: "Maria Santos",
      email: "imprensa@fcbb.cv",
      telefone: "+238 261 22 41",
      ext: "105"
    }
  ];

  const associacoesRegionais = [
    {
      ilha: "Santiago",
      nome: "Associação Regional de Santiago",
      responsavel: "Carlos Mendes",
      email: "santiago@fcbb.cv",
      telefone: "+238 262 11 22"
    },
    {
      ilha: "São Vicente", 
      nome: "Associação Regional de São Vicente",
      responsavel: "João Silva",
      email: "saovicente@fcbb.cv",
      telefone: "+238 232 15 30"
    },
    {
      ilha: "Sal",
      nome: "Associação Regional do Sal",
      responsavel: "Ana Tavares",
      email: "sal@fcbb.cv", 
      telefone: "+238 241 12 45"
    },
    {
      ilha: "Fogo",
      nome: "Associação Regional do Fogo",
      responsavel: "Pedro Santos",
      email: "fogo@fcbb.cv",
      telefone: "+238 281 18 90"
    }
  ];

  return (
    <PageLayout title="Contactos">
      <div className="space-y-8">
        {/* Informações Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sede Principal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue flex items-center">
                <Building className="w-6 h-6 mr-2" />
                Sede Principal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cv-red mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-gray-600">
                    Av. Cidade de Lisboa, CP 540<br />
                    Praia, Ilha de Santiago<br />
                    Cabo Verde
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cv-red" />
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-gray-600">(+238) 261 22 34</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-cv-red" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">geral@fcbb.cv</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-cv-red mt-1" />
                <div>
                  <p className="font-semibold">Horário</p>
                  <div className="text-gray-600 text-sm">
                    <p>Segunda a Sexta: 08:00 - 17:00</p>
                    <p>Sábado: 08:00 - 12:00</p>
                    <p>Domingo: Encerrado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Envie-nos uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <Input placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Assunto</label>
                  <Input placeholder="Assunto da mensagem" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mensagem</label>
                  <Textarea 
                    placeholder="Escreva sua mensagem aqui..." 
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-cv-blue hover:bg-blue-700">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Departamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Departamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departamentos.map((dept, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-cv-blue mb-2">{dept.nome}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{dept.responsavel}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <a href={`mailto:${dept.email}`} className="text-cv-blue hover:underline">
                        {dept.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{dept.telefone} (ext. {dept.ext})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Associações Regionais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Associações Regionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {associacoesRegionais.map((assoc, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-cv-red mr-2" />
                    <h3 className="font-semibold text-cv-blue">{assoc.ilha}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{assoc.nome}</p>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{assoc.responsavel}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <a href={`mailto:${assoc.email}`} className="text-cv-blue hover:underline">
                        {assoc.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{assoc.telefone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mapa (placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Localização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Mapa da localização da sede</p>
                <p className="text-sm">Av. Cidade de Lisboa, Praia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ContactosPage;
