
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Users, Trophy, Calendar, FileText, Image, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FCBBHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      label: 'Início',
      href: '/',
      icon: Home
    },
    {
      label: 'Sobre a FCBB',
      icon: Users,
      dropdown: [
        { label: 'História', href: '/sobre/historia' },
        { label: 'Direção', href: '/sobre/direcao' },
        { label: 'Associações Regionais', href: '/sobre/associacoes' },
        { label: 'Contactos', href: '/sobre/contactos' }
      ]
    },
    {
      label: 'Competições',
      icon: Trophy,
      dropdown: [
        { label: 'Nacional Masculino', href: '/competicoes/masculino' },
        { label: 'Nacional Feminino', href: '/competicoes/feminino' },
        { label: 'Sub-18 / Sub-16', href: '/competicoes/formacao' },
        { label: 'Regionais', href: '/competicoes/regionais' }
      ]
    },
    {
      label: 'Resultados',
      href: '/resultados',
      icon: Calendar
    },
    {
      label: 'Atletas & Clubes',
      icon: Users,
      dropdown: [
        { label: 'Atletas', href: '/atletas' },
        { label: 'Clubes', href: '/clubes' },
        { label: 'Estatísticas', href: '/estatisticas' }
      ]
    },
    {
      label: 'Notícias',
      href: '/noticias',
      icon: FileText
    },
    {
      label: 'Multimédia',
      icon: Image,
      dropdown: [
        { label: 'Galeria de Fotos', href: '/multimedia/fotos' },
        { label: 'Vídeos', href: '/multimedia/videos' }
      ]
    },
    {
      label: 'Documentos',
      href: '/documentos',
      icon: FileText
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-fcbb-black/95 backdrop-blur-lg shadow-2xl border-b border-fcbb-gold/20' 
          : 'bg-fcbb-black/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
                alt="FCBB Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-fcbb-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold font-display text-fcbb-gold">FCBB</h1>
              <p className="text-xs text-fcbb-white/80 font-medium">
                Federação Cabo-verdiana de Basquetebol
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex items-center space-x-2 px-4 py-3 text-fcbb-white hover:text-fcbb-gold transition-all duration-300 font-medium text-sm border-b-2 border-transparent hover:border-fcbb-gold group"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className="flex items-center space-x-2 px-4 py-3 text-fcbb-white hover:text-fcbb-gold transition-all duration-300 font-medium text-sm border-b-2 border-transparent hover:border-fcbb-gold group"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-fcbb-dark-gray rounded-xl shadow-2xl border border-fcbb-gold/20 overflow-hidden"
                      >
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.href}
                            className="block px-6 py-4 text-fcbb-white hover:text-fcbb-gold hover:bg-fcbb-gold/10 transition-all duration-200 border-b border-fcbb-gold/10 last:border-b-0"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-fcbb-gold text-fcbb-black px-6 py-3 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300 transform hover:scale-105"
            >
              <User className="w-4 h-4" />
              <span>Área Reservada</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-fcbb-white hover:text-fcbb-gold transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-fcbb-dark-gray border-t border-fcbb-gold/20"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-fcbb-white hover:text-fcbb-gold hover:bg-fcbb-gold/10 rounded-lg transition-all duration-200"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 text-fcbb-gold font-semibold">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.dropdown && (
                        <div className="ml-8 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              to={dropdownItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-fcbb-white hover:text-fcbb-gold transition-colors"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-fcbb-gold/20">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-fcbb-gold text-fcbb-black px-6 py-3 rounded-lg font-bold hover:bg-fcbb-gold/90 transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Área Reservada</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default FCBBHeader;
