
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { navItems } from './navigationData';

interface EnhancedNavigationProps {
  isScrolled: boolean;
  isMobile?: boolean;
  onCloseMenu?: () => void;
}

const EnhancedNavigation = ({ isScrolled, isMobile = false, onCloseMenu }: EnhancedNavigationProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { scrollToSection } = useSmoothScroll();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleItemClick = (item: any) => {
    if (item.sectionId) {
      scrollToSection(item.sectionId);
      if (onCloseMenu) onCloseMenu();
    }
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  if (isMobile) {
    return (
      <nav className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-2xl shadow-2xl mt-2">
        <div className="py-6 space-y-2 max-h-96 overflow-y-auto">
          <Link
            to="/"
            className={`block px-6 py-3 font-semibold rounded-lg mx-3 transition-all duration-300 ${
              location.pathname === '/'
                ? 'text-cv-blue bg-cv-blue/10 border-l-4 border-cv-blue'
                : 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5'
            }`}
            onClick={onCloseMenu}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Início
          </Link>
          
          {navItems.map((item) => (
            <div key={item.key}>
              {item.dropdown && item.items ? (
                <button
                  onClick={() => toggleDropdown(item.key || "")}
                  className="block w-full text-left px-6 py-3 font-semibold rounded-lg mx-3 text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5 transition-all duration-300"
                  aria-expanded={activeDropdown === item.key}
                  aria-haspopup="true"
                >
                  <div className="flex items-center justify-between">
                    {item.title}
                    <motion.div
                      animate={{ rotate: activeDropdown === item.key ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                </button>
              ) : (
                <Link
                  to="/"
                  className="block px-6 py-3 font-semibold rounded-lg mx-3 text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5 transition-all duration-300"
                  onClick={onCloseMenu}
                >
                  {item.title}
                </Link>
              )}
              
              {item.dropdown && item.items && activeDropdown === item.key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 bg-gray-50 rounded-lg ml-6 mr-3 mt-2 overflow-hidden"
                >
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="block px-4 py-3 text-sm text-gray-600 hover:text-cv-blue hover:bg-white transition-colors rounded font-medium focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2"
                      onClick={onCloseMenu}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="hidden lg:flex items-center space-x-2">
      <Link
        to="/"
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
          location.pathname === '/'
            ? isScrolled 
              ? 'text-cv-blue after:scale-x-100' 
              : 'text-cv-yellow after:scale-x-100'
            : isScrolled 
              ? 'text-gray-700 hover:text-cv-blue' 
              : 'text-white hover:text-cv-yellow'
        } after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
        aria-current={location.pathname === '/' ? 'page' : undefined}
      >
        Início
      </Link>
      
      {navItems.map((item) => (
        <div key={item.key} className="relative group">
          {item.dropdown && item.items ? (
            <button
              onMouseEnter={() => setActiveDropdown(item.key || "")}
              onMouseLeave={() => setActiveDropdown(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-1 relative ${
                isActive(item.items[0]?.path || "")
                  ? isScrolled 
                    ? 'text-cv-blue after:scale-x-100' 
                    : 'text-cv-yellow after:scale-x-100'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-cv-blue' 
                    : 'text-white hover:text-cv-yellow'
              } after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2`}
              aria-expanded={activeDropdown === item.key}
              aria-haspopup="true"
            >
              <span>{item.title}</span>
              <motion.div
                animate={{ rotate: activeDropdown === item.key ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
          ) : (
            <button
              onClick={() => handleItemClick(item)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
                isScrolled 
                  ? 'text-gray-700 hover:text-cv-blue' 
                  : 'text-white hover:text-cv-yellow'
              } after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-current after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2`}
            >
              {item.title}
            </button>
          )}
          
          {item.dropdown && item.items && (
            <motion.div
              className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-2xl border border-gray-100 py-2 z-50 mt-2"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ 
                opacity: activeDropdown === item.key ? 1 : 0,
                y: activeDropdown === item.key ? 0 : -10,
                scale: activeDropdown === item.key ? 1 : 0.95,
                display: activeDropdown === item.key ? 'block' : 'none'
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveDropdown(item.key || "")}
              onMouseLeave={() => setActiveDropdown(null)}
              role="menu"
              aria-label={`Submenu ${item.title}`}
            >
              {item.items.map((subItem, index) => (
                <motion.div
                  key={subItem.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={subItem.path}
                    className={`block px-4 py-3 transition-all duration-200 font-medium border-b border-gray-100 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-cv-blue focus:ring-offset-2 ${
                      isActive(subItem.path)
                        ? 'bg-cv-blue/10 text-cv-blue'
                        : 'text-gray-700 hover:bg-cv-blue/5 hover:text-cv-blue'
                    }`}
                    role="menuitem"
                  >
                    {subItem.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default EnhancedNavigation;
