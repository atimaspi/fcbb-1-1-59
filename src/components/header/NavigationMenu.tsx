
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navItems } from './navigationData';

interface NavigationMenuProps {
  activeDropdown: string | null;
  focusedItemIndex: number;
  onToggleDropdown: (dropdown: string) => void;
  onCloseDropdown: () => void;
}

const NavigationMenu = ({ 
  activeDropdown, 
  focusedItemIndex, 
  onToggleDropdown, 
  onCloseDropdown 
}: NavigationMenuProps) => {
  return (
    <nav className="hidden lg:block border-t border-gray-200" role="navigation" aria-label="Menu principal">
      <ul className="flex">
        <li>
          <Link 
            to="/" 
            className="block px-3 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white font-medium border-r border-gray-200 focus-visible-cv transition-colors"
            aria-label="Ir para a página inicial"
          >
            Início
          </Link>
        </li>
        {navItems.map((item) => (
          <li key={item.title} className="relative group border-r border-gray-200">
            <div>
              <button 
                onClick={() => onToggleDropdown(item.key || "")}
                className="flex items-center px-3 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white font-medium focus-visible-cv transition-colors w-full"
                aria-expanded={activeDropdown === item.key}
                aria-haspopup="menu"
                aria-label={item.ariaLabel}
              >
                {item.title} 
                <ChevronDown 
                  className={`ml-1 w-3 h-3 transition-transform duration-200 ${activeDropdown === item.key ? 'rotate-180' : ''}`} 
                  aria-hidden="true"
                />
              </button>
              <div 
                className={`absolute left-0 top-full w-60 bg-white shadow-xl border border-gray-200 z-50 transition-all duration-200
                          ${activeDropdown === item.key ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                role="menu"
                aria-label={`Submenu ${item.title}`}
              >
                <div className="py-1">
                  {item.items?.map((subItem, index) => (
                    <Link 
                      key={subItem.name} 
                      to={subItem.path}
                      className={`block px-3 py-2 text-sm text-cv-dark hover:bg-cv-blue hover:text-white border-b border-gray-100 last:border-0 focus-visible-cv transition-colors ${
                        focusedItemIndex === index ? 'bg-cv-blue text-white' : ''
                      }`}
                      onClick={onCloseDropdown}
                      aria-label={subItem.description}
                      role="menuitem"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
