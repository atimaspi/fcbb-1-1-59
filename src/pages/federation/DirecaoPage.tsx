import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar } from 'lucide-react';

const DirecaoPage = () => {
  const diretores = [
    {
      nome: "António Silva",
      cargo: "Presidente",
      mandato: "2020-2024",
      email: "presidente@fcbb.cv",
      telefone: "+238 261 22 34",
      experiencia: "Ex-jogador internacional, treinador licenciado FIBA",
      foto: "/lovable-uploads/placeholder-person.jpg"
    },
    {
      nome: "Maria Santos",
      cargo: "Vice-Presidente",
      mandato: "2020-2024",
      email: "vice.presidente@fcbb.cv",
      telefone: "+238 261 22 35",
      experiencia: "Gestora desportiva, especialista em desenvolvimento feminino",
      foto: "/lovable-uploads/placeholder-person.jpg"
    },
    {
      nome: "Carlos Tavares",
      cargo: "Secretário-Geral",
      mandato: "2020-2024",
      email: "secretario@fcbb.cv",
      telefone: "+238 261 22 36",
      experiencia: "Administração desportiva, ex-árbitro internacional",
      foto: "/lovable-uploads/placeholder-person.jpg"
    },
    {
      nome: "Ana Pereira",
      cargo: "Tesoureira",
      mandato: "2020-2024",
      email: "tesouraria@fcbb.cv",
      telefone: "+238 261 22 37",
      experiencia: "Contabilista certificada, gestão financeira desportiva",
      foto: "/lovable-uploads/placeholder-person.jpg"
    },
    {
      nome: "João Monteiro",
      cargo: "Diretor Técnico",
      mandato: "2020-2024",
      email: "tecnico@fcbb.cv",
      telefone: "+238 261 22 38",
      experiencia: "Treinador Nível 3 FIBA, formação de quadros técnicos",
      foto: "/lovable-uploads/placeholder-person.jpg"
    },
    {
      nome: "Luisa Rodrigues",
      cargo: "Diretora de Desenvolvimento",
      mandato: "2020-2024",
      email: "desenvolvimento@fcbb.cv",
      telefone: "+238 261 22 39",
      experiencia: "Pedagogia desportiva, programas de base",
      foto: "/lovable-uploads/placeholder-person.jpg"
    }
  ];

  const departamentos = [
    {
      nome: "Departamento Técnico",
      responsavel: "João Monteiro",
      funcoes: ["Formação de treinadores", "Desenvolvimento técnico", "Seleções nacionais", "Métodos de treino"]
    },
    {
      nome: "Departamento de Competições",
      responsavel: "Carlos Tavares",
      funcoes: ["Organização de campeonatos", "Calendário desportivo", "Regulamentos", "Arbitragem"]
    },
    {
      nome: "Departamento de Desenvolvimento",
      responsavel: "Luisa Rodrigues",
      funcoes: ["Basquetebol de base", "Programas escolares", "Formação de massa", "Infraestruturas"]
    },
    {
      nome: "Departamento Administrativo",
      responsavel: "Ana Pereira",
      funcoes: ["Gestão financeira", "Recursos humanos", "Licenciamento", "Documentação"]
    }
  ];

  return (
    <PageLayout 
      title="Direção da FCBB"
      description="Conheça os membros da direção da FCBB, departamentos organizacionais e estrutura administrativa da federação para o mandato 2020-2024."
      keywords="direção fcbb, presidente fcbb, vice-presidente, departamentos fcbb, estrutura organizacional, contactos direção"
    >
      <div className="space-y-8">
        {/* Membros da Direção */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Membros da Direção</CardTitle>
            <p className="text-gray-600">Mandato 2020-2024</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diretores.map((diretor, index) => (
                <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="w-24 h-24 bg-cv-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {diretor.nome.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-cv-blue mb-1">{diretor.nome}</h3>
                    <Badge className="bg-cv-red mb-3">{diretor.cargo}</Badge>
                    <p className="text-sm text-gray-600 mb-3">{diretor.experiencia}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-cv-blue" />
                        <span>{diretor.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-cv-blue" />
                        <span>{diretor.telefone}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-cv-blue" />
                        <span>Mandato: {diretor.mandato}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Departamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Estrutura Organizacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departamentos.map((dept, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold text-cv-blue mb-2">{dept.nome}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Responsável:</span> {dept.responsavel}
                  </p>
                  <div>
                    <span className="font-medium text-gray-700">Funções:</span>
                    <ul className="mt-2 space-y-1">
                      {dept.funcoes.map((funcao, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-cv-red rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {funcao}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cv-blue">Contactar a Direção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Sede da FCBB</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Av. Cidade de Lisboa, CP 540</p>
                  <p>Praia, Ilha de Santiago</p>
                  <p>Cabo Verde</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-cv-blue mb-3">Horário de Funcionamento</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Segunda a Sexta:</span> 08:00 - 17:00</p>
                  <p><span className="font-medium">Sábado:</span> 08:00 - 12:00</p>
                  <p><span className="font-medium">Domingo:</span> Encerrado</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DirecaoPage;
