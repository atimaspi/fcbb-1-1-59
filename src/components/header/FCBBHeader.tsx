
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import ReservedAreaButton from './ReservedAreaButton';
import { createNavItems } from './navData';

const FCBBHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navItems = createNavItems(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-gradient-to-r from-cv-blue via-cv-blue to-cv-red shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="cv-container">
        <div className="flex items-center justify-between h-20">
          <Logo isScrolled={isScrolled} />

          <div className="flex items-center space-x-4">
            <DesktopNavigation
              navItems={navItems}
              activeDropdown={activeDropdown}
              isScrolled={isScrolled}
              onToggleDropdown={toggleDropdown}
              onCloseDropdowns={closeDropdowns}
            />
            
            <ReservedAreaButton isScrolled={isScrolled} />

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-3 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5' : 'text-white hover:text-cv-yellow'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <MobileNavigation
          isOpen={isMobileMenuOpen}
          navItems={navItems}
          activeDropdown={activeDropdown}
          onToggleDropdown={toggleDropdown}
          onClose={closeMobileMenu}
        />
        
        {isMobileMenuOpen && (
          <ReservedAreaButton 
            isScrolled={isScrolled} 
            isMobile 
            onClose={closeMobileMenu} 
          />
        )}
      </div>
    </motion.header>
  );
};

export default FCBBHeader;
