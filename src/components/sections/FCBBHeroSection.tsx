
import { motion } from 'framer-motion';
import { Play, ArrowRight, Trophy, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FCBBHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-fcbb-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-fcbb-black via-fcbb-dark-gray to-fcbb-black"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 border border-fcbb-gold rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 border border-fcbb-gold rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-fcbb-gold/30 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-fcbb-gold/20 text-fcbb-gold px-4 py-2 rounded-full font-medium text-sm border border-fcbb-gold/30"
            >
              <Trophy className="w-4 h-4" />
              <span>Federação Oficial de Basquetebol</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-6xl lg:text-7xl font-bold font-display leading-tight">
                <span className="text-fcbb-white">FCBB</span>
                <br />
                <span className="text-fcbb-gold">Cabo Verde</span>
              </h1>
              <p className="text-xl lg:text-2xl text-fcbb-white/80 leading-relaxed max-w-2xl">
                Promovendo e desenvolvendo o basquetebol em Cabo Verde desde 1986. 
                Unidos pela paixão, crescendo com excelência.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-fcbb-gold mb-1">38</div>
                <div className="text-sm text-fcbb-white/60">Anos de História</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fcbb-gold mb-1">10</div>
                <div className="text-sm text-fcbb-white/60">Ilhas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fcbb-gold mb-1">50+</div>
                <div className="text-sm text-fcbb-white/60">Clubes Filiados</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/competicoes"
                className="inline-flex items-center space-x-3 bg-fcbb-gold text-fcbb-black px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105 group"
              >
                <Trophy className="w-5 h-5" />
                <span>Ver Competições</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/noticias"
                className="inline-flex items-center space-x-3 border-2 border-fcbb-gold text-fcbb-gold px-8 py-4 rounded-lg font-bold hover:bg-fcbb-gold hover:text-fcbb-black transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                <span>Últimas Notícias</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-fcbb-dark-gray border-4 border-fcbb-gold/30">
                <img
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=600&fit=crop"
                  alt="Basquetebol Cabo Verde"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fcbb-black/50 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-6 -left-6 bg-fcbb-gold rounded-2xl p-4 shadow-2xl border-4 border-fcbb-white"
              >
                <img 
                  src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
                  alt="FCBB Logo"
                  className="w-16 h-16"
                />
              </motion.div>

              {/* Play Button Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button className="bg-fcbb-gold/90 backdrop-blur-sm text-fcbb-black rounded-full w-20 h-20 flex items-center justify-center hover:bg-fcbb-gold transition-all duration-300 transform hover:scale-110 shadow-2xl">
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </button>
              </motion.div>
            </div>

            {/* Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -right-6 bg-fcbb-white rounded-2xl p-6 shadow-2xl border border-fcbb-gold/20 max-w-xs"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-fcbb-gold rounded-full p-2">
                  <Users className="w-5 h-5 text-fcbb-black" />
                </div>
                <div>
                  <div className="text-sm font-bold text-fcbb-black">Próximo Jogo</div>
                  <div className="text-xs text-fcbb-black/60">Liga Nacional</div>
                </div>
              </div>
              <div className="text-fcbb-black">
                <div className="font-bold">ABC vs Sporting</div>
                <div className="text-sm text-fcbb-black/60">Sábado, 20:00h</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-fcbb-dark-gray" viewBox="0 0 1200 120" fill="currentColor">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default FCBBHeroSection;
