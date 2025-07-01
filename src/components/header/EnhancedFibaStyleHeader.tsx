
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Lock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/contexts/InternationalizationContext';
import LanguageSelector from './LanguageSelector';
import AccessibilityToolbar from './AccessibilityToolbar';
import { createNavItems } from './navData';

const EnhancedFibaStyleHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const headerRef = useRef<HTMLElement>(null);

  const navItems = createNavItems(location.pathname);

  // Sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
        setSearchOpen(false);
      } else if (event.key === 'Tab' && activeDropdown) {
        // Handle tab navigation in dropdowns
        const dropdownElement = document.querySelector(`[data-dropdown="${activeDropdown}"]`);
        if (dropdownElement) {
          const focusableElements = dropdownElement.querySelectorAll('a, button');
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown]);

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cv-blue text-white px-4 py-2 rounded-md z-50 font-medium"
      >
        {t('accessibility.skipToMain')}
      </a>

      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSticky 
            ? 'bg-[#002868]/95 backdrop-blur-md shadow-xl' 
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
                className="flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue rounded-lg p-1"
                aria-label="FCBB - Página inicial"
              >
                <motion.img 
                  src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                  alt="FCBB Logo" 
                  className="h-12 w-auto"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="hidden sm:flex flex-col">
                  <h1 className="text-xl font-bold font-display leading-tight text-white">
                    FCBB
                  </h1>
                  <p className="text-xs leading-tight text-[#FDB927] font-medium">
                    FEDERAÇÃO CABO-VERDIANA DE BASQUETEBOL
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Menu principal">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue ${
                        item.isActive
                          ? 'text-[#FDB927] bg-white/10' 
                          : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                      }`}
                      aria-current={item.isActive ? 'page' : undefined}
                    >
                      <span>{t(`nav.${item.id}`) || item.label}</span>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.id);
                      }}
                      className={`px-4 py-2 rounded-md font-medium transition-all duration-300 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue ${
                        item.isActive
                          ? 'text-[#FDB927] bg-white/10' 
                          : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-expanded={activeDropdown === item.id}
                      aria-haspopup="menu"
                      aria-label={`${t(`nav.${item.id}`) || item.label} - expandir menu`}
                    >
                      <span>{t(`nav.${item.id}`) || item.label}</span>
                      <motion.div
                        animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                  )}
                  
                  {/* Enhanced Dropdown Menu */}
                  {item.submenu && (
                    <AnimatePresence>
                      {activeDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50 mt-1"
                          onClick={(e) => e.stopPropagation()}
                          data-dropdown={item.id}
                          role="menu"
                          aria-label={`Submenu ${t(`nav.${item.id}`) || item.label}`}
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
                                className="block px-4 py-3 text-gray-700 hover:bg-[#002868]/5 hover:text-[#002868] transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-[#002868]/10 focus:text-[#002868]"
                                onClick={closeDropdowns}
                                role="menuitem"
                                tabIndex={0}
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
            </nav>

            {/* Right Side Items */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden lg:flex p-2 rounded-md text-white hover:text-[#FDB927] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Pesquisar"
              >
                <Search size={18} />
              </motion.button>

              {/* Accessibility Toolbar */}
              <div className="hidden lg:block">
                <AccessibilityToolbar />
              </div>

              {/* Language Selector */}
              <div className="hidden lg:block">
                <LanguageSelector />
              </div>

              {/* Reserved Area Button */}
              <Link
                to="/area-reservada"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-[#FDB927] text-[#002868] rounded-md font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-cv-blue"
                aria-label={t('nav.areaReservada')}
              >
                <Lock size={16} />
                <span>{t('nav.areaReservada')}</span>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-white hover:text-[#FDB927] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden bg-[#002868] border-t border-white/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                role="navigation"
                aria-label="Menu móvel"
              >
                <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {item.href ? (
                        <Link
                          to={item.href}
                          className={`block px-4 py-3 font-medium rounded-md mx-2 transition-all focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue ${
                            item.isActive 
                              ? 'text-[#FDB927] bg-white/10'
                              : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                          }`}
                          onClick={closeMobileMenu}
                          aria-current={item.isActive ? 'page' : undefined}
                        >
                          {t(`nav.${item.id}`) || item.label}
                        </Link>
                      ) : (
                        <motion.button
                          onClick={() => toggleDropdown(item.id)}
                          className={`block w-full text-left px-4 py-3 font-medium rounded-md mx-2 transition-all focus:outline-none focus:ring-2 focus:ring-cv-yellow focus:ring-offset-2 focus:ring-offset-cv-blue ${
                            item.isActive 
                              ? 'text-[#FDB927] bg-white/10'
                              : 'text-white hover:text-[#FDB927] hover:bg-white/10'
                          }`}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                          aria-expanded={activeDropdown === item.id}
                          aria-haspopup="menu"
                        >
                          <div className="flex items-center justify-between">
                            {t(`nav.${item.id}`) || item.label}
                            <motion.div
                              animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </motion.div>
                          </div>
                        </motion.button>
                      )}
                      
                      {/* Mobile Submenu */}
                      {item.submenu && activeDropdown === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 bg-white/5 rounded-lg ml-4 mr-2 mt-2 overflow-hidden"
                          role="menu"
                          aria-label={`Submenu ${t(`nav.${item.id}`) || item.label}`}
                        >
                          {item.submenu.map((subItem, index) => (
                            <Link
                              key={index}
                              to={subItem.link}
                              className="block px-4 py-3 text-sm text-white/80 hover:text-[#FDB927] hover:bg-white/10 transition-colors rounded font-medium focus:outline-none focus:bg-white/10 focus:text-[#FDB927]"
                              onClick={closeMobileMenu}
                              role="menuitem"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile Accessibility & Language */}
                  <LanguageSelector isMobile onClose={closeMobileMenu} />
                  
                  <div className="border-t border-white/20 pt-4 mt-4">
                    <Link
                      to="/area-reservada"
                      className="flex items-center space-x-2 px-4 py-3 mx-2 bg-[#FDB927] text-[#002868] rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-cv-blue"
                      onClick={closeMobileMenu}
                    >
                      <Lock size={16} />
                      <span>{t('nav.areaReservada')}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main content spacer */}
      <div className="h-16" id="main-content" />
    </>
  );
};

export default EnhancedFibaStyleHeader;
