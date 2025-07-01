
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDynamicNavigation } from '@/hooks/useDynamicNavigation';

const DynamicFCBBHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { navItems, loading } = useDynamicNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-fcbb-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png"
                alt="FCBB Logo"
                className="h-12 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold font-display text-fcbb-gold">FCBB</h1>
                <p className="text-xs text-fcbb-white/80 font-medium">
                  Federação Cabo-verdiana de Basquetebol
                </p>
              </div>
            </div>
            <div className="animate-pulse bg-fcbb-gold/20 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

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
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex items-center space-x-2 px-4 py-3 text-fcbb-white hover:text-fcbb-gold transition-all duration-300 font-medium text-sm border-b-2 border-transparent hover:border-fcbb-gold group"
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className="flex items-center space-x-2 px-4 py-3 text-fcbb-white hover:text-fcbb-gold transition-all duration-300 font-medium text-sm border-b-2 border-transparent hover:border-fcbb-gold group"
                  >
                    <span>{item.label}</span>
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-fcbb-dark-gray rounded-xl shadow-2xl border border-fcbb-gold/20 overflow-hidden max-h-96 overflow-y-auto"
                      >
                        {item.submenu.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.id}
                            to={dropdownItem.href || '#'}
                            className="block px-6 py-3 text-fcbb-white hover:text-fcbb-gold hover:bg-fcbb-gold/10 transition-all duration-200 border-b border-fcbb-gold/10 last:border-b-0 text-sm"
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
              to="/area-reservada"
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
            className="lg:hidden bg-fcbb-dark-gray border-t border-fcbb-gold/20 max-h-96 overflow-y-auto"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-fcbb-white hover:text-fcbb-gold hover:bg-fcbb-gold/10 rounded-lg transition-all duration-200"
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 px-4 py-3 text-fcbb-gold font-semibold">
                        <span>{item.label}</span>
                      </div>
                      {item.submenu && (
                        <div className="ml-8 space-y-1">
                          {item.submenu.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.id}
                              to={dropdownItem.href || '#'}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-2 text-fcbb-white hover:text-fcbb-gold transition-colors text-sm"
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
                  to="/area-reservada"
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

export default DynamicFCBBHeader;
