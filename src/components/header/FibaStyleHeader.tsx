
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EnhancedNavigation from './EnhancedNavigation';

const FibaStyleHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-[#002868] shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center space-x-4 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              to="/" 
              className="flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2 rounded-lg"
              aria-label="Página inicial da FCBB"
            >
              <motion.img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="Logótipo da Federação Cabo-verdiana de Basquetebol" 
                className="h-12 w-auto"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="hidden sm:flex flex-col">
                <h1 className={`text-xl font-bold font-display leading-tight ${
                  isScrolled ? 'text-cv-blue' : 'text-white'
                }`}>
                  FCBB
                </h1>
                <p className={`text-xs leading-tight font-medium ${
                  isScrolled ? 'text-cv-red' : 'text-[#FDB927]'
                }`}>
                  FEDERAÇÃO CABO-VERDIANA DE BASQUETEBOL
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <EnhancedNavigation isScrolled={isScrolled} />

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className={`hidden lg:flex items-center space-x-2 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <Globe size={16} aria-hidden="true" />
              <span className="text-sm font-medium">PT</span>
            </div>

            {/* Área Reservada Button */}
            <Link
              to="/area-reservada"
              className={`hidden lg:flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isScrolled
                  ? 'bg-cv-blue text-white hover:bg-cv-blue/90 focus:ring-cv-blue'
                  : 'bg-[#FDB927] text-[#002868] hover:bg-yellow-400 focus:ring-[#FDB927]'
              }`}
              aria-label="Aceder à área reservada"
            >
              <Lock size={16} aria-hidden="true" />
              <span>Área Reservada</span>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`lg:hidden p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isScrolled
                  ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/10 focus:ring-cv-blue'
                  : 'text-white hover:text-[#FDB927] hover:bg-white/10 focus:ring-[#FDB927]'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <EnhancedNavigation 
              isScrolled={isScrolled} 
              isMobile={true} 
              onCloseMenu={closeMobileMenu} 
            />
            
            {/* Mobile Language & Área Reservada */}
            <div className="lg:hidden border-t border-gray-200 pt-4 mt-4 space-y-2 bg-white/95 backdrop-blur-md px-6 pb-6">
              <div className="flex items-center space-x-2 px-4 py-2 text-gray-700">
                <Globe size={16} aria-hidden="true" />
                <span className="text-sm font-medium">Português</span>
              </div>
              <Link
                to="/area-reservada"
                className="flex items-center space-x-2 px-4 py-3 mx-2 bg-cv-blue text-white rounded-md font-semibold hover:bg-cv-blue/90 transition-colors focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2"
                onClick={closeMobileMenu}
                aria-label="Aceder à área reservada"
              >
                <Lock size={16} aria-hidden="true" />
                <span>Área Reservada</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default FibaStyleHeader;
