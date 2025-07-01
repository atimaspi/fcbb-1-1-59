
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Trophy, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoriaPage = () => {
  const timeline = [
    {
      year: "1977",
      title: "Fundação da FCBB",
      description: "Criação oficial da Federação Cabo-verdiana de Basquetebol com o objetivo de organizar e promover o basquetebol no arquipélago.",
      icon: <Star className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      year: "1980",
      title: "Primeira Liga Nacional",
      description: "Início da primeira edição do Campeonato Nacional de Basquetebol, reunindo equipas de diferentes ilhas.",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      year: "1985",
      title: "Filiação à FIBA África",
      description: "Cabo Verde torna-se membro oficial da FIBA África, permitindo participação em competições continentais.",
      icon: <Users className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      year: "1992",
      title: "Primeira Participação Internacional",
      description: "Debut da seleção nacional cabo-verdiana em competições internacionais oficiais.",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-orange-500"
    },
    {
      year: "1995",
      title: "AfroBasket Debut",
      description: "Primeira participação de Cabo Verde no AfroBasket, marcando presença no cenário continental.",
      icon: <Star className="w-5 h-5" />,
      color: "bg-red-500"
    },
    {
      year: "2000",
      title: "Desenvolvimento da Base",
      description: "Implementação de programas estruturados de formação para jovens atletas.",
      icon: <Users className="w-5 h-5" />,
      color: "bg-indigo-500"
    },
    {
      year: "2010",
      title: "Liga Feminina",
      description: "Criação oficial da Liga Nacional Feminina, promovendo a igualdade de género no desporto.",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-pink-500"
    },
    {
      year: "2015",
      title: "Modernização Estrutural",
      description: "Implementação de novas tecnologias e sistemas de gestão para melhorar a organização das competições.",
      icon: <Star className="w-5 h-5" />,
      color: "bg-teal-500"
    },
    {
      year: "2020",
      title: "Era Digital",
      description: "Digitalização completa dos processos e criação de plataformas online para acompanhamento das competições.",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-cyan-500"
    },
    {
      year: "2024",
      title: "Novo Patamar",
      description: "Cabo Verde alcança novos recordes de participação e reconhecimento internacional no basquetebol.",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-yellow-500"
    }
  ];

  const achievements = [
    { title: "50+ Clubes Filiados", description: "Presença em todas as ilhas do arquipélago" },
    { title: "2.000+ Atletas", description: "Federados ativos em competições nacionais" },
    { title: "15 Participações", description: "Em competições internacionais desde 1995" },
    { title: "9 Ilhas", description: "Representadas nas competições nacionais" }
  ];

  return (
    <PageLayout 
      title="História da FCBB"
      description="Conheça a rica história da Federação Cabo-verdiana de Basquetebol desde a sua fundação até aos dias de hoje"
    >
      <div className="space-y-8">
        {/* Introdução */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Uma Jornada de Excelência</h2>
              <p className="text-lg text-blue-800 leading-relaxed mb-4">
                A história da Federação Cabo-verdiana de Basquetebol é uma narrativa de perseverança, crescimento 
                e paixão pelo desporto. Desde a sua fundação em 1977, a FCBB tem sido o motor do desenvolvimento 
                do basquetebol no arquipélago cabo-verdiano.
              </p>
              <p className="text-blue-700 leading-relaxed">
                Com mais de quatro décadas de existência, a federação transformou-se numa instituição sólida 
                que promove não apenas a prática desportiva, mas também valores como a disciplina, o trabalho 
                em equipa e a excelência.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Linha do Tempo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Calendar className="w-6 h-6 mr-2" />
                Linha do Tempo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`${event.color} text-white p-2 rounded-full shrink-0`}>
                      {event.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline" className="font-semibold">
                          {event.year}
                        </Badge>
                        <h3 className="font-bold text-gray-900">{event.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                      {index < timeline.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conquistas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Trophy className="w-6 h-6 mr-2" />
                Principais Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg"
                  >
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-blue-700 text-sm">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Legado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O Nosso Legado</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                A FCBB não é apenas uma federação desportiva - é uma instituição que molda vidas e constrói 
                sonhos. Ao longo dos anos, temos sido testemunhas do crescimento de atletas que começaram 
                nas nossas competições de base e alcançaram reconhecimento internacional.
              </p>
              <p className="text-gray-700 leading-relaxed">
                O nosso compromisso continua a ser o desenvolvimento do basquetebol cabo-verdiano, 
                promovendo valores de excelência, integridade e inclusão que transcendem o desporto 
                e contribuem para o desenvolvimento da sociedade cabo-verdiana.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default HistoriaPage;
