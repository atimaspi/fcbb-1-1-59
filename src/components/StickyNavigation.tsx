
import { useState, useEffect } from 'react';
import { Menu, X, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const StickyNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const navItems = [
    { 
      id: 'hero', 
      label: 'Início',
      href: '/'
    },
    { 
      id: 'sobre', 
      label: 'Sobre a FCBB', 
      submenu: [
        { label: 'História', link: '/sobre/historia' },
        { label: 'Missão e Visão', link: '/sobre/missao-visao' },
        { label: 'Direção', link: '/sobre/direcao' },
        { label: 'Órgãos Sociais', link: '/sobre/orgaos-sociais' },
        { label: 'Estatutos', link: '/sobre/estatutos' },
        { label: 'Contactos', link: '/sobre/contactos' }
      ]
    },
    { 
      id: 'competicoes', 
      label: 'Competições', 
      submenu: [
        { label: 'Liga Nacional', link: '/competicoes/liga-nacional' },
        { label: 'Taça de Cabo Verde', link: '/competicoes/taca-cabo-verde' },
        { label: 'Super Taça', link: '/competicoes/super-taca' },
        { label: 'Nacional Masculino', link: '/competicoes/nacional-masculino' },
        { label: 'Competições Regionais', link: '/competicoes/competicoes-regionais' },
        { label: 'Calendário', link: '/competicoes/calendario' },
        { label: 'Classificações', link: '/competicoes/classificacoes' }
      ]
    },
    { 
      id: 'resultados', 
      label: 'Resultados', 
      submenu: [
        { label: 'Resultados Recentes', link: '/resultados' },
        { label: 'Ao Vivo', link: '/resultados/ao-vivo' },
        { label: 'Classificações', link: '/resultados/classificacoes' },
        { label: 'Estatísticas', link: '/estatisticas' },
        { label: 'FIBA LiveStats', link: '/resultados/fiba-livestats' }
      ]
    },
    { 
      id: 'selecoes', 
      label: 'Seleções Nacionais', 
      submenu: [
        { label: 'Seleção Masculina', link: '/selecoes/senior-masculina' },
        { label: 'Seleção Feminina', link: '/selecoes/senior-feminina' },
        { label: 'Sub-18 Masculina', link: '/selecoes/sub-18-masculina' },
        { label: 'Sub-18 Feminina', link: '/selecoes/sub-18-feminina' },
        { label: 'Sub-16 Masculina', link: '/selecoes/sub-16-masculina' },
        { label: 'Sub-16 Feminina', link: '/selecoes/sub-16-feminina' }
      ]
    },
    { 
      id: 'clubes', 
      label: 'Clubes', 
      submenu: [
        { label: 'Diretório de Clubes', link: '/clubes' },
        { label: 'Lista Completa', link: '/clubes/completo' },
        { label: 'Transferências', link: '/transferencias' },
        { label: 'Formação', link: '/formacao' },
        { label: 'Arbitragem', link: '/arbitragem' }
      ]
    },
    { 
      id: 'multimedia', 
      label: 'Multimédia', 
      submenu: [
        { label: 'Notícias', link: '/noticias' },
        { label: 'Galeria', link: '/galeria' },
        { label: 'Vídeos', link: '/videos' },
        { label: 'Transmissões', link: '/transmissoes' },
        { label: 'Área de Imprensa', link: '/imprensa' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-r from-blue-900 to-blue-800 shadow-xl'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-width-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB" 
                className="h-14 w-auto"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex flex-col">
                <h1 className={`text-2xl font-bold leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-blue-900' : 'text-white'
                }`}>
                  FCBB
                </h1>
                <p className={`text-sm leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-blue-100'
                }`}>
                  Federação Cabo-verdiana de Basquetebol
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white hover:text-yellow-300 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => item.submenu ? toggleDropdown(item.id) : scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white hover:text-yellow-300 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {item.submenu && (
                      <motion.div
                        className="ml-1"
                        animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▼
                      </motion.div>
                    )}
                  </motion.button>
                )}
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50"
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={subItem.link}
                              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            {/* Área Reservada */}
            <div className="ml-4 flex items-center space-x-2">
              {user ? (
                <div className="relative group">
                  <motion.button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white hover:text-yellow-300 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <User size={18} />
                    <span>Conta</span>
                  </motion.button>
                  
                  <div className="absolute top-full right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/area-reservada"
                      className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border-b border-gray-100"
                    >
                      <Lock size={16} className="inline mr-2" />
                      Área Reservada
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/area-reservada"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 ${
                    isScrolled 
                      ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                      : 'border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-blue-900'
                  }`}
                >
                  <Lock size={18} />
                  <span>Área Reservada</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-gray-200 rounded-b-2xl shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-1 max-h-96 overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="block px-4 py-3 font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg mx-2 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => item.submenu ? toggleDropdown(item.id) : scrollToSection(item.id)}
                        className="block w-full text-left px-4 py-3 font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg mx-2 transition-all"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.button>
                    )}
                    
                    {/* Mobile Submenu */}
                    {item.submenu && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 bg-gray-50 rounded-lg ml-4 mt-2 overflow-hidden"
                      >
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.link}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white transition-colors rounded"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Área Reservada */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {user ? (
                    <div>
                      <Link
                        to="/area-reservada"
                        className="flex items-center space-x-2 px-4 py-3 font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg mx-2 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Lock size={18} />
                        <span>Área Reservada</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-3 font-medium text-red-600 hover:bg-red-50 rounded-lg mx-2 transition-all w-full text-left"
                      >
                        <span>Sair</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/area-reservada"
                      className="flex items-center space-x-2 px-4 py-3 font-medium text-blue-600 hover:bg-blue-50 rounded-lg mx-2 transition-all border-2 border-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Lock size={18} />
                      <span>Área Reservada</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default StickyNavigation;
