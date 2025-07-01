
import PageLayout from '@/pages/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Trophy, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const MissaoVisaoPage = () => {
  const valores = [
    {
      title: "Excelência",
      description: "Buscamos sempre os mais altos padrões de qualidade em todas as nossas atividades, desde a organização de competições até à formação de atletas.",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Integridade",
      description: "Mantemos os princípios éticos mais rigorosos, promovendo o fair-play e a transparência em todas as nossas ações.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Inclusão",
      description: "Garantimos que o basquetebol seja acessível a todos, independentemente da idade, género, origem social ou ilha de residência.",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Inovação",
      description: "Abraçamos novas tecnologias e metodologias para melhorar continuamente a experiência desportiva e administrativa.",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Desenvolvimento",
      description: "Investimos na formação contínua de atletas, treinadores, árbitros e dirigentes para elevar o nível do basquetebol nacional.",
      icon: <Target className="w-8 h-8" />,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Transparência",
      description: "Mantemos uma comunicação aberta e clara com todos os stakeholders, promovendo a confiança e a prestação de contas.",
      icon: <Eye className="w-8 h-8" />,
      color: "from-gray-500 to-slate-500"
    }
  ];

  const objetivos = [
    "Promover o desenvolvimento do basquetebol em todas as ilhas de Cabo Verde",
    "Organizar competições de alta qualidade que inspirem e motivem os atletas",
    "Formar atletas capazes de competir ao mais alto nível internacional",
    "Desenvolver programas de formação para treinadores e árbitros",
    "Fomentar a prática do basquetebol como ferramenta de inclusão social",
    "Estabelecer parcerias estratégicas para o crescimento do desporto nacional",
    "Implementar tecnologias modernas na gestão e organização desportiva",
    "Promover a igualdade de género no basquetebol cabo-verdiano"
  ];

  return (
    <PageLayout 
      title="Missão e Visão"
      description="Conheça a missão, visão e valores que orientam a Federação Cabo-verdiana de Basquetebol"
    >
      <div className="space-y-8">
        {/* Missão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900 text-2xl">
                <Target className="w-8 h-8 mr-3" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-blue-800 leading-relaxed">
                <strong>Promover, organizar e desenvolver o basquetebol em Cabo Verde</strong>, garantindo a prática 
                desportiva de qualidade em todos os níveis, desde a formação de base até ao alto rendimento, 
                contribuindo para o desenvolvimento humano e social do país.
              </p>
              <p className="text-blue-700 leading-relaxed">
                A nossa missão engloba não apenas a organização de competições, mas também a formação integral 
                de atletas, treinadores e dirigentes, sempre com foco na excelência, inclusão e desenvolvimento 
                sustentável do basquetebol cabo-verdiano.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-900 text-2xl">
                <Eye className="w-8 h-8 mr-3" />
                Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-purple-800 leading-relaxed">
                <strong>Ser uma federação de referência em África</strong>, reconhecida pela excelência na organização 
                de competições, formação de atletas e promoção do basquetebol como ferramenta de desenvolvimento 
                social e cultural em Cabo Verde.
              </p>
              <p className="text-purple-700 leading-relaxed">
                Almejamos que o basquetebol cabo-verdiano seja sinónimo de qualidade, inovação e inclusão, 
                inspirando outras nações e contribuindo para o prestígio desportivo internacional de Cabo Verde.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 text-2xl">
                <Heart className="w-8 h-8 mr-3" />
                Nossos Valores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {valores.map((valor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                      <CardContent className="p-6">
                        <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${valor.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          {valor.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{valor.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{valor.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Objetivos Estratégicos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-900 text-2xl">
                <Target className="w-8 h-8 mr-3" />
                Objetivos Estratégicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {objetivos.map((objetivo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{objetivo}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compromisso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nosso Compromisso</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                A FCBB compromete-se a trabalhar incansavelmente para que estes valores e objetivos se traduzam 
                em ações concretas que beneficiem toda a comunidade do basquetebol cabo-verdiano. Acreditamos 
                que através do desporto podemos construir uma sociedade mais justa, inclusiva e próspera.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default MissaoVisaoPage;
