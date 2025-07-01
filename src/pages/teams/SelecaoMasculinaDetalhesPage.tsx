
import PageLayout from '../PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Calendar, MapPin, Phone, Mail, Download } from 'lucide-react';

const SelecaoMasculinaDetalhesPage = () => {
  const technicalStaff = {
    headCoach: {
      name: "José Maria Silva",
      experience: "15 anos",
      achievements: "Campeão Nacional 2019, 2021",
      phone: "+238 123 456 789",
      email: "jose.silva@fcbb.cv"
    },
    assistantCoach: {
      name: "Pedro Santos",
      experience: "8 anos",
      specialization: "Defesa e Estratégia"
    },
    physicalTrainer: {
      name: "Ana Tavares",
      certification: "UEFA Pro License",
      specialization: "Preparação Física"
    }
  };

  const currentSquad = [
    { name: "João Monteiro", position: "Base", height: "1.85m", weight: "78kg", team: "Sporting CV", caps: 45, points: 312 },
    { name: "Carlos Silva", position: "Extremo", height: "1.92m", weight: "85kg", team: "CD Travadores", caps: 38, points: 245 },
    { name: "Pedro Lima", position: "Poste", height: "2.08m", weight: "98kg", team: "Académica", caps: 52, points: 428 },
    { name: "António Santos", position: "Ala", height: "1.98m", weight: "88kg", team: "Mindelense", caps: 29, points: 178 },
    { name: "Miguel Rodrigues", position: "Base", height: "1.80m", weight: "75kg", team: "ABC Basket", caps: 15, points: 89 },
    { name: "Rui Pereira", position: "Ala-Pivô", height: "2.02m", weight: "92kg", team: "Sporting CV", caps: 33, points: 201 },
    { name: "Fernando Costa", position: "Extremo", height: "1.89m", weight: "82kg", team: "Boavista", caps: 22, points: 134 },
    { name: "Manuel Gonçalves", position: "Poste", height: "2.05m", weight: "95kg", team: "Mindelense", caps: 41, points: 356 }
  ];

  const upcomingFixtures = [
    { opponent: "Angola", date: "2025-02-15", venue: "Luanda", competition: "AfroBasket Qualif.", time: "18:00" },
    { opponent: "Moçambique", date: "2025-02-18", venue: "Praia", competition: "AfroBasket Qualif.", time: "16:00" },
    { opponent: "Senegal", date: "2025-03-12", venue: "Dakar", competition: "Amigável", time: "20:00" }
  ];

  const recentResults = [
    { opponent: "Senegal", result: "78-82", date: "2024-11-15", venue: "Praia", competition: "AfroBasket Qualif." },
    { opponent: "Guiné-Bissau", result: "89-76", date: "2024-11-18", venue: "Bissau", competition: "AfroBasket Qualif." },
    { opponent: "Mali", result: "71-85", date: "2024-10-12", venue: "Bamako", competition: "Amigável" }
  ];

  return (
    <PageLayout 
      title="Seleção Nacional Masculina Sénior"
      description="Informações detalhadas sobre a seleção nacional masculina de basquetebol de Cabo Verde"
    >
      <div className="space-y-8">
        {/* Header com estatísticas */}
        <div className="bg-gradient-to-r from-cv-blue to-cv-red text-white rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Seleção Nacional Masculina</h1>
              <p className="text-lg opacity-90">Representando Cabo Verde no basquetebol mundial</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold">68º</div>
                <div className="text-sm opacity-80">Ranking FIBA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">147</div>
                <div className="text-sm opacity-80">Jogos Oficiais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm opacity-80">AfroBasket</div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipa Técnica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-cv-blue" />
              Equipa Técnica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Treinador Principal</h4>
                <div className="space-y-2">
                  <div className="font-medium">{technicalStaff.headCoach.name}</div>
                  <div className="text-sm text-gray-600">Experiência: {technicalStaff.headCoach.experience}</div>
                  <div className="text-sm text-gray-600">{technicalStaff.headCoach.achievements}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-1" />
                    {technicalStaff.headCoach.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-1" />
                    {technicalStaff.headCoach.email}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Treinador Adjunto</h4>
                <div className="space-y-2">
                  <div className="font-medium">{technicalStaff.assistantCoach.name}</div>
                  <div className="text-sm text-gray-600">Experiência: {technicalStaff.assistantCoach.experience}</div>
                  <div className="text-sm text-gray-600">{technicalStaff.assistantCoach.specialization}</div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Preparador Físico</h4>
                <div className="space-y-2">
                  <div className="font-medium">{technicalStaff.physicalTrainer.name}</div>
                  <div className="text-sm text-gray-600">{technicalStaff.physicalTrainer.certification}</div>
                  <div className="text-sm text-gray-600">{technicalStaff.physicalTrainer.specialization}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plantel Atual */}
        <Card>
          <CardHeader>
            <CardTitle>Plantel Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Jogador</th>
                    <th className="text-left py-2">Posição</th>
                    <th className="text-left py-2">Altura/Peso</th>
                    <th className="text-left py-2">Clube</th>
                    <th className="text-center py-2">Jogos</th>
                    <th className="text-center py-2">Pontos</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSquad.map((player, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{player.name}</td>
                      <td className="py-3">
                        <Badge variant="outline">{player.position}</Badge>
                      </td>
                      <td className="py-3 text-sm">{player.height} / {player.weight}</td>
                      <td className="py-3">{player.team}</td>
                      <td className="py-3 text-center">{player.caps}</td>
                      <td className="py-3 text-center font-semibold">{player.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Próximos Jogos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-cv-blue" />
                Próximos Jogos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingFixtures.map((game, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <div>
                      <div className="font-medium">vs {game.opponent}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {game.venue}
                      </div>
                      <div className="text-xs text-gray-500">{game.competition}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{game.date}</div>
                      <div className="text-sm text-gray-600">{game.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resultados Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-cv-blue" />
                Resultados Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((game, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">vs {game.opponent}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {game.venue}
                      </div>
                      <div className="text-xs text-gray-500">{game.competition}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{game.result}</div>
                      <div className="text-sm text-gray-600">{game.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Downloads e Recursos */}
        <Card>
          <CardHeader>
            <CardTitle>Recursos e Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Ficha Técnica (PDF)
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Estatísticas Completas
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Calendário 2025
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SelecaoMasculinaDetalhesPage;
