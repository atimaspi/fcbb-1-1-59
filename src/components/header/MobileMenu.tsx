
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AccessibleButton } from '@/components/ui/accessible-button';
import ExternalLink from '@/components/ExternalLink';
import { navItems } from './navigationData';

interface MobileMenuProps {
  isOpen: boolean;
  activeDropdown: string | null;
  onToggleDropdown: (dropdown: string) => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, activeDropdown, onToggleDropdown, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="lg:hidden bg-white border-t animate-slide-in-right" 
      role="navigation" 
      aria-label="Menu móvel"
    >
      <div className="cv-container py-2">
        <ul>
          <li className="py-2">
            <Link 
              to="/" 
              className="block py-2 px-4 text-cv-dark font-medium focus-visible-cv transition-colors" 
              onClick={onClose}
              aria-label="Ir para a página inicial"
            >
              Início
            </Link>
          </li>
          {navItems.map((item) => (
            <li key={item.title} className="py-2">
              <div>
                <button 
                  onClick={() => onToggleDropdown(item.key || "")}
                  className="w-full text-left flex justify-between items-center py-2 px-4 text-cv-dark font-medium focus-visible-cv transition-colors"
                  aria-expanded={activeDropdown === item.key}
                  aria-haspopup="menu"
                  aria-label={item.ariaLabel}
                >
                  {item.title}
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.key ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                </button>
                {activeDropdown === item.key && (
                  <div 
                    className="pl-4 bg-gray-50 animate-fade-in" 
                    role="menu" 
                    aria-label={`Submenu ${item.title}`}
                  >
                    {item.items?.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        to={subItem.path}
                        className="block py-2 px-4 text-sm text-cv-dark focus-visible-cv transition-colors hover:bg-cv-blue hover:text-white"
                        onClick={() => {
                          onToggleDropdown("");
                          onClose();
                        }}
                        aria-label={subItem.description}
                        role="menuitem"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
          <li className="pt-4 border-t mt-2 flex space-x-4 px-4">
            <AccessibleButton 
              variant="outline" 
              size="sm" 
              className="border-cv-red text-cv-red hover:bg-cv-red hover:text-white"
              asChild
            >
              <ExternalLink 
                href="/resultados/fiba-livestats"
                showIcon={false}
                onClick={onClose}
                ariaLabel="FIBA LiveStats - Estatísticas em tempo real"
              >
                FIBA LiveStats
              </ExternalLink>
            </AccessibleButton>
            <AccessibleButton 
              size="sm" 
              className="bg-cv-red hover:bg-red-700" 
              asChild
            >
              <Link 
                to="/contacto" 
                onClick={onClose}
                aria-label="Contactar a FCBB"
              >
                Contactos
              </Link>
            </AccessibleButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
