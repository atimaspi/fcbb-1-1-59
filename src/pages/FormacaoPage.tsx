
import PageLayout from './PageLayout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { GraduationCap, Users, Calendar, Award } from 'lucide-react';

const FormacaoPage = () => {
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [participantPhone, setParticipantPhone] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Curso de Treinadores Nível I',
      description: 'Curso básico para futuros treinadores de basquetebol',
      date: '15-20 Junho 2025',
      duration: '40 horas',
      location: 'Centro de Formação FCBB',
      price: '15.000 CVE',
      maxParticipants: 20,
      enrolled: 12,
      category: 'treinadores'
    },
    {
      id: 2,
      title: 'Workshop de Arbitragem',
      description: 'Atualização de regras e mecânica de arbitragem',
      date: '8 Junho 2025',
      duration: '8 horas',
      location: 'Online',
      price: 'Gratuito',
      maxParticipants: 30,
      enrolled: 18,
      category: 'arbitros'
    },
    {
      id: 3,
      title: 'Curso de Preparação Física',
      description: 'Métodos modernos de preparação física no basquetebol',
      date: '22-24 Junho 2025',
      duration: '24 horas',
      location: 'Universidade de Cabo Verde',
      price: '8.000 CVE',
      maxParticipants: 15,
      enrolled: 8,
      category: 'preparadores'
    },
    {
      id: 4,
      title: 'Seminário de Psicologia Desportiva',
      description: 'Aspectos psicológicos no desenvolvimento de atletas',
      date: '30 Junho 2025',
      duration: '6 horas',
      location: 'Centro de Formação FCBB',
      price: '5.000 CVE',
      maxParticipants: 25,
      enrolled: 15,
      category: 'geral'
    }
  ];

  const certificates = [
    { id: 1, participant: 'João Silva', course: 'Treinadores Nível I', date: '20/04/2025', status: 'Aprovado' },
    { id: 2, participant: 'Maria Santos', course: 'Arbitragem', date: '15/04/2025', status: 'Aprovado' },
    { id: 3, participant: 'Pedro Costa', course: 'Preparação Física', date: '10/04/2025', status: 'Aprovado' },
    { id: 4, participant: 'Ana Pereira', course: 'Psicologia Desportiva', date: '05/04/2025', status: 'Reprovado' },
  ];

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment:', { selectedCourse, participantName, participantEmail, participantPhone });
    setShowEnrollDialog(false);
    // Reset form
    setSelectedCourse('');
    setParticipantName('');
    setParticipantEmail('');
    setParticipantPhone('');
    alert('Inscrição realizada com sucesso!');
  };

  const openEnrollDialog = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setShowEnrollDialog(true);
  };

  return (
    <PageLayout title="Formação">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Disponíveis</CardTitle>
            <GraduationCap className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes</CardTitle>
            <Users className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">120</div>
            <p className="text-xs text-gray-600">Este ano</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Cursos</CardTitle>
            <Calendar className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">4</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <Award className="h-4 w-4 text-cv-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">85</div>
            <p className="text-xs text-gray-600">Emitidos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cursos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cursos">Cursos Disponíveis</TabsTrigger>
          <TabsTrigger value="certificados">Certificados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cursos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-cv-blue">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{course.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Data:</span>
                      <span>{course.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duração:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Local:</span>
                      <span>{course.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Preço:</span>
                      <span className="font-bold">{course.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Vagas:</span>
                      <span>{course.enrolled}/{course.maxParticipants}</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cv-blue h-2 rounded-full" 
                      style={{ width: `${(course.enrolled / course.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    className="w-full bg-cv-blue hover:bg-blue-700"
                    onClick={() => openEnrollDialog(course.title)}
                    disabled={course.enrolled >= course.maxParticipants}
                  >
                    {course.enrolled >= course.maxParticipants ? 'Esgotado' : 'Inscrever-se'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="certificados" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-cv-blue mb-4">Certificados Emitidos</h3>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-lg">{cert.participant}</h4>
                    <p className="text-gray-600">{cert.course}</p>
                    <p className="text-sm text-gray-500">Concluído em {cert.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      cert.status === 'Aprovado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cert.status}
                    </span>
                    {cert.status === 'Aprovado' && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          Download Certificado
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Inscrição no Curso</DialogTitle>
            <DialogDescription>
              {selectedCourse && `Inscreva-se no curso: ${selectedCourse}`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnroll}>
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
              
              <div className="grid gap-2">
                <label htmlFor="participantPhone" className="text-sm font-medium">
                  Telefone
                </label>
                <input
                  id="participantPhone"
                  value={participantPhone}
                  onChange={(e) => setParticipantPhone(e.target.value)}
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

export default FormacaoPage;
