
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Phone } from 'lucide-react';

const DirecaoPage = () => {
  const direcao = [
    {
      nome: "João Silva Santos",
      cargo: "Presidente",
      email: "presidente@fcbb.cv",
      telefone: "+238 260 12 34",
      bio: "Presidente da FCBB desde 2020, com vasta experiência no desenvolvimento do basquetebol nacional."
    },
    {
      nome: "Maria Fernandes Costa",
      cargo: "Vice-Presidente",
      email: "vice.presidente@fcbb.cv",
      telefone: "+238 260 12 35",
      bio: "Responsável pelo desenvolvimento do basquetebol feminino e programas de formação."
    },
    {
      nome: "António Rodrigues Lima",
      cargo: "Secretário-Geral",
      email: "secretario@fcbb.cv",
      telefone: "+238 260 12 36",
      bio: "Coordena as atividades administrativas e operacionais da federação."
    },
    {
      nome: "Carlos Mendes Tavares",
      cargo: "Tesoureiro",
      email: "tesoureiro@fcbb.cv",
      telefone: "+238 260 12 37",
      bio: "Responsável pela gestão financeira e planeamento orçamental da FCBB."
    }
  ];

  return (
    <PageLayout 
      title="Direção da FCBB"
      description="Conheça os membros da direção da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A direção da FCBB é composta por profissionais dedicados ao desenvolvimento 
            e promoção do basquetebol em Cabo Verde.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {direcao.map((membro, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-cv-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {membro.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cv-blue mb-2">{membro.nome}</h3>
                    <Badge variant="secondary" className="mb-3">{membro.cargo}</Badge>
                    
                    <p className="text-gray-600 mb-4">{membro.bio}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail size={16} className="mr-2" />
                        {membro.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone size={16} className="mr-2" />
                        {membro.telefone}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-cv-blue text-white">
          <CardContent className="p-8 text-center">
            <Users size={48} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Contacte a Direção</h3>
            <p className="mb-6">
              Para questões institucionais ou parcerias, entre em contacto diretamente 
              com os membros da nossa direção.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:direcao@fcbb.cv"
                className="bg-cv-yellow text-cv-blue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Email Geral da Direção
              </a>
              <a 
                href="tel:+2382601234"
                className="bg-white/10 border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Telefone Principal
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DirecaoPage;
