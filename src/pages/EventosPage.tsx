
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

const EventosPage = () => {
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Final Four Liga Nacional',
      description: 'Fases finais da Liga Nacional de Basquetebol',
      date: '15-17 Junho 2025',
      time: '18:00',
      location: 'Pavilhão Nacional, Praia',
      participants: 150,
      maxParticipants: 200,
      price: 'Gratuito',
      category: 'competicao'
    },
    {
      id: 2,
      title: 'Workshop Técnico Internacional',
      description: 'Workshop com treinadores internacionais',
      date: '22 Junho 2025',
      time: '09:00',
      location: 'Centro de Formação FCBB',
      participants: 45,
      maxParticipants: 60,
      price: '2.500 CVE',
      category: 'formacao'
    },
    {
      id: 3,
      title: 'Torneio de Veteranos',
      description: 'Torneio para jogadores com mais de 35 anos',
      date: '29 Junho 2025',
      time: '14:00',
      location: 'Mindelo, São Vicente',
      participants: 80,
      maxParticipants: 120,
      price: '1.000 CVE',
      category: 'social'
    },
    {
      id: 4,
      title: 'Assembleia Geral da FCBB',
      description: 'Reunião anual de todos os clubes filiados',
      date: '5 Julho 2025',
      time: '10:00',
      location: 'Sede da FCBB, Praia',
      participants: 25,
      maxParticipants: 50,
      price: 'Restrito',
      category: 'institucional'
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: 'Taça de Cabo Verde 2024',
      date: '20 Abril 2025',
      description: 'Final da Taça Nacional',
      participants: 300
    },
    {
      id: 2,
      title: 'Curso de Arbitragem',
      date: '15 Abril 2025',
      description: 'Formação para novos árbitros',
      participants: 25
    },
    {
      id: 3,
      title: 'Clinic de Basquetebol Feminino',
      date: '10 Abril 2025',
      description: 'Promoção do basquetebol feminino',
      participants: 40
    }
  ];

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event registration:', { selectedEvent, participantName, participantEmail });
    setShowRegistrationDialog(false);
    setSelectedEvent('');
    setParticipantName('');
    setParticipantEmail('');
    alert('Inscrição realizada com sucesso!');
  };

  const openRegistrationDialog = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setShowRegistrationDialog(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'competicao': return 'bg-red-100 text-red-800';
      case 'formacao': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-green-100 text-green-800';
      case 'institucional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'competicao': return 'Competição';
      case 'formacao': return 'Formação';
      case 'social': return 'Social';
      case 'institucional': return 'Institucional';
      default: return 'Outro';
    }
  };

  return (
    <PageLayout title="Eventos">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">4</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Inscritos</CardTitle>
            <Users className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">300</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Este Ano</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Localidades</CardTitle>
            <MapPin className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">6</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-cv-blue">{event.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(event.category)}`}>
                      {getCategoryName(event.category)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-cv-blue" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-cv-blue" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-cv-blue" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-cv-blue" />
                      <span>{event.participants}/{event.maxParticipants} participantes</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cv-blue h-2 rounded-full" 
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-cv-blue">{event.price}</span>
                    <Button 
                      className="bg-cv-blue hover:bg-blue-700"
                      onClick={() => openRegistrationDialog(event.title)}
                      disabled={event.participants >= event.maxParticipants || event.price === 'Restrito'}
                    >
                      {event.price === 'Restrito' ? 'Restrito' : 
                       event.participants >= event.maxParticipants ? 'Esgotado' : 'Inscrever-se'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cv-blue mb-6">Eventos Anteriores</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-cv-blue pl-4 py-2">
                  <h3 className="font-medium text-lg">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{event.date}</span>
                    <span className="text-sm text-cv-blue font-medium">
                      {event.participants} participantes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Inscrição no Evento</DialogTitle>
            <DialogDescription>
              {selectedEvent && `Inscreva-se no evento: ${selectedEvent}`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegistration}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="participantName" className="text-sm font-medium">
                  Nome Completo
                </label>
                <input
                  id="participantName"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="participantEmail" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="participantEmail"
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-cv-blue">Confirmar Inscrição</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default EventosPage;
