
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NavItem } from './types';

interface MobileNavigationProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeDropdown: string | null;
  onToggleDropdown: (itemId: string) => void;
  onClose: () => void;
}

const MobileNavigation = ({ 
  isOpen, 
  navItems, 
  activeDropdown, 
  onToggleDropdown, 
  onClose 
}: MobileNavigationProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg:hidden bg-white border-t border-gray-200 rounded-b-2xl shadow-2xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-6 space-y-2 max-h-96 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`block px-6 py-3 font-semibold font-display rounded-lg mx-3 transition-all ${
                      item.isActive 
                        ? 'text-cv-blue bg-cv-blue/10 border-l-4 border-cv-blue'
                        : 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => onToggleDropdown(item.id)}
                    className={`block w-full text-left px-6 py-3 font-semibold font-display rounded-lg mx-3 transition-all ${
                      item.isActive 
                        ? 'text-cv-blue bg-cv-blue/10 border-l-4 border-cv-blue'
                        : 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5'
                    }`}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      <motion.div
                        animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
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
                    className="pl-6 bg-gray-50 rounded-lg ml-6 mr-3 mt-2 overflow-hidden"
                  >
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.link}
                        className="block px-4 py-3 text-sm text-gray-600 hover:text-cv-blue hover:bg-white transition-colors rounded font-medium"
                        onClick={onClose}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
