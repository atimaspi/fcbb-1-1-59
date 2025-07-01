
import FCBBLayout from '@/components/layout/FCBBLayout';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Trophy, Users, Globe } from 'lucide-react';

const MissaoVisaoPage = () => {
  return (
    <FCBBLayout 
      title="Missão e Visão - FCBB"
      description="Conheça a missão, visão e valores da Federação Cabo-verdiana de Basquetebol"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/40">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-cv-blue to-cv-red text-white">
          <div className="cv-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6 font-display">
                Missão e Visão
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Os pilares que orientam o desenvolvimento do basquetebol cabo-verdiano
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="cv-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cv-blue to-cv-red rounded-full flex items-center justify-center mr-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">Nossa Missão</h2>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Promover, desenvolver e regulamentar o basquetebol em Cabo Verde, 
                  criando oportunidades para atletas de todas as idades e níveis, 
                  fortalecendo o desporto nacional e internacional.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Heart className="w-6 h-6 text-cv-red mr-3 mt-1" />
                    <span className="text-gray-700">Desenvolver o talento cabo-verdiano</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-6 h-6 text-cv-blue mr-3 mt-1" />
                    <span className="text-gray-700">Criar oportunidades para todos</span>
                  </div>
                  <div className="flex items-start">
                    <Trophy className="w-6 h-6 text-cv-yellow mr-3 mt-1" />
                    <span className="text-gray-700">Alcançar a excelência desportiva</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800"
                  alt="Basquetebol em ação"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cv-blue/20 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-white">
          <div className="cv-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=800"
                  alt="Visão do futuro"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cv-red/20 to-transparent rounded-2xl"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cv-red to-cv-yellow rounded-full flex items-center justify-center mr-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">Nossa Visão</h2>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Ser reconhecida como uma federação modelo em África, 
                  com o basquetebol cabo-verdiano competindo ao mais alto nível internacional, 
                  servindo de inspiração para as futuras gerações.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Globe className="w-6 h-6 text-cv-blue mr-3 mt-1" />
                    <span className="text-gray-700">Reconhecimento internacional</span>
                  </div>
                  <div className="flex items-start">
                    <Trophy className="w-6 h-6 text-cv-red mr-3 mt-1" />
                    <span className="text-gray-700">Competir ao mais alto nível</span>
                  </div>
                  <div className="flex items-start">
                    <Heart className="w-6 h-6 text-cv-yellow mr-3 mt-1" />
                    <span className="text-gray-700">Inspirar futuras gerações</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="cv-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 font-display">Nossos Valores</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Os princípios que guiam todas as nossas ações e decisões
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Integridade', desc: 'Transparência em todas as ações', icon: Heart },
                { title: 'Excelência', desc: 'Busca constante pela qualidade', icon: Trophy },
                { title: 'Inclusão', desc: 'Oportunidades para todos', icon: Users },
                { title: 'Inovação', desc: 'Crescimento e modernização', icon: Target }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cv-yellow to-cv-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </FCBBLayout>
  );
};

export default MissaoVisaoPage;
