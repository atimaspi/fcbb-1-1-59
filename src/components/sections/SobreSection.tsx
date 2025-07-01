
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users, Globe, Heart, Loader2 } from 'lucide-react';
import { useFederationData } from '@/hooks/useFederationData';
import { useBackendData } from '@/hooks/useBackendData';

const SobreSection = () => {
  const { federationData, federationLoading, statsData } = useFederationData();
  const { clubs, players, teams, news } = useBackendData();

  const features = [
    {
      icon: Target,
      title: "Nossa Missão",
      description: "Promover, desenvolver e regular o basquetebol em Cabo Verde, criando oportunidades para atletas de todas as idades e níveis.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Eye,
      title: "Nossa Visão", 
      description: "Ser reconhecida como a federação líder no desenvolvimento do basquetebol africano, com presença forte no cenário internacional.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Comprometidos com os mais altos padrões de qualidade na organização de competições e formação de atletas.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Users,
      title: "Inclusão", 
      description: "Promovemos o basquetebol para todos, independentemente de género, idade ou origem social, em todas as ilhas do arquipélago.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Globe,
      title: "Representação",
      description: "Levamos o nome de Cabo Verde às competições internacionais, representando com orgulho a nossa bandeira.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Heart,
      title: "Paixão",
      description: "O basquetebol é mais que um desporto - é uma paixão que une o povo cabo-verdiano em torno de valores comuns.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const foundationYear = federationData?.foundation_date ? new Date(federationData.foundation_date).getFullYear() : 1977;
  const yearsOfHistory = new Date().getFullYear() - foundationYear;

  if (federationLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="cv-container text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cv-blue mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="cv-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold font-display text-cv-blue mb-6">
            Sobre a FCBB
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {federationData ? (
              `Desde ${foundationYear}, a ${federationData.name || 'Federação Cabo-verdiana de Basquetebol'} tem sido o motor do desenvolvimento 
              do basquetebol nacional, promovendo valores de excelência, inclusão e paixão pelo desporto.`
            ) : (
              `Desde 1986, a Federação Cabo-verdiana de Basquetebol tem sido o motor do desenvolvimento 
              do basquetebol nacional, promovendo valores de excelência, inclusão e paixão pelo desporto.`
            )}
          </p>
          
          {/* Stats Summary com dados reais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-cv-blue font-display">{yearsOfHistory}</div>
              <div className="text-sm text-gray-600 font-semibold">Anos de História</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cv-red font-display">9</div>
              <div className="text-sm text-gray-600 font-semibold">Ilhas Abrangidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cv-yellow font-display">{clubs?.length || 24}+</div>
              <div className="text-sm text-gray-600 font-semibold">Clubes Filiados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cv-blue font-display">{players?.length || 1250}+</div>
              <div className="text-sm text-gray-600 font-semibold">Atletas Federados</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300`} />
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-gray-800 mb-4 group-hover:text-cv-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-500 mx-auto rounded-full`} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red text-white overflow-hidden">
            <CardContent className="p-12 relative">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-display mb-4">
                  Junte-se à Família do Basquetebol Cabo-verdiano
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                  Descubra como pode fazer parte desta jornada de crescimento e paixão pelo basquetebol nacional
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/sobre/historia"
                    className="px-8 py-4 bg-cv-yellow text-cv-blue font-bold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Conheça Nossa História
                  </motion.a>
                  <motion.a
                    href="/sobre/contactos"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Fale Connosco
                  </motion.a>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cv-yellow/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreSection;
