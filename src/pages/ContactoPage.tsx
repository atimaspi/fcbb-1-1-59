
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactoPage = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Morada",
      details: [
        "Sede da FCBB",
        "Praia, Santiago",
        "Cabo Verde"
      ]
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Telefone",
      details: [
        "+238 123 456 789",
        "+238 987 654 321"
      ]
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: [
        "geral@fcbb.cv",
        "secretaria@fcbb.cv",
        "competicoes@fcbb.cv"
      ]
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Horário",
      details: [
        "Segunda a Sexta: 08:00 - 17:00",
        "Sábado: 08:00 - 12:00",
        "Domingo: Encerrado"
      ]
    }
  ];

  const departments = [
    {
      name: "Secretaria Geral",
      email: "secretaria@fcbb.cv",
      phone: "+238 123 456 789",
      responsible: "Maria Santos"
    },
    {
      name: "Competições",
      email: "competicoes@fcbb.cv", 
      phone: "+238 123 456 790",
      responsible: "João Silva"
    },
    {
      name: "Arbitragem",
      email: "arbitragem@fcbb.cv",
      phone: "+238 123 456 791",
      responsible: "António Costa"
    },
    {
      name: "Formação",
      email: "formacao@fcbb.cv",
      phone: "+238 123 456 792",
      responsible: "Ana Pereira"
    }
  ];

  return (
    <PageLayout 
      title="Contacto"
      description="Entre em contacto connosco. Estamos aqui para ajudar."
    >
      <div className="space-y-8">
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4 text-cv-blue">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-cv-blue mb-3">{info.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {info.details.map((detail, idx) => (
                    <div key={idx}>{detail}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Enviar Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="O seu nome" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="+238 123 456 789" />
                </div>
                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Assunto da mensagem" />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Escreva aqui a sua mensagem..."
                    rows={6}
                  />
                </div>
                <Button className="w-full bg-cv-blue hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Departments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-cv-blue">Departamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="border-l-4 border-cv-blue pl-4">
                    <h4 className="font-semibold text-cv-blue">{dept.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">Responsável: {dept.responsible}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-cv-blue" />
                        <a href={`mailto:${dept.email}`} className="text-cv-blue hover:underline">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-cv-blue" />
                        <a href={`tel:${dept.phone}`} className="text-cv-blue hover:underline">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Localização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Mapa da localização da sede da FCBB</p>
                <p className="text-sm">Praia, Santiago, Cabo Verde</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ContactoPage;
