
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NavItem } from './types';

interface DesktopNavigationProps {
  navItems: NavItem[];
  activeDropdown: string | null;
  isScrolled: boolean;
  onToggleDropdown: (itemId: string) => void;
  onCloseDropdowns: () => void;
}

const DesktopNavigation = ({ 
  navItems, 
  activeDropdown, 
  isScrolled, 
  onToggleDropdown, 
  onCloseDropdowns 
}: DesktopNavigationProps) => {
  return (
    <nav className="hidden lg:flex items-center space-x-2">
      {navItems.map((item) => (
        <div key={item.id} className="relative group">
          {item.href ? (
            <Link
              to={item.href}
              className={`px-4 py-3 rounded-lg font-semibold font-display transition-all duration-300 flex items-center relative border-b-2 border-transparent ${
                item.isActive
                  ? isScrolled 
                    ? 'text-cv-blue bg-cv-yellow/10 border-cv-yellow' 
                    : 'text-cv-yellow bg-white/10 border-cv-yellow'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5 hover:border-cv-yellow' 
                    : 'text-white hover:text-cv-yellow hover:bg-white/10 hover:border-cv-yellow'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <motion.button
              onClick={() => onToggleDropdown(item.id)}
              className={`px-4 py-3 rounded-lg font-semibold font-display transition-all duration-300 flex items-center relative border-b-2 border-transparent cursor-pointer ${
                item.isActive
                  ? isScrolled 
                    ? 'text-cv-blue bg-cv-yellow/10 border-cv-yellow' 
                    : 'text-cv-yellow bg-white/10 border-cv-yellow'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5 hover:border-cv-yellow' 
                    : 'text-white hover:text-cv-yellow hover:bg-white/10 hover:border-cv-yellow'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.label}
              <motion.div
                className="ml-2"
                animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
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
                  className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 mt-2"
                  onMouseLeave={onCloseDropdowns}
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
                        className="block px-6 py-3 text-gray-700 hover:bg-cv-blue/5 hover:text-cv-blue transition-all duration-200 font-medium border-b border-gray-50 last:border-b-0"
                        onClick={onCloseDropdowns}
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
  );
};

export default DesktopNavigation;
