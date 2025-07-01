
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface EnhancedBreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const EnhancedBreadcrumbs = ({ items, className }: EnhancedBreadcrumbsProps) => {
  const location = useLocation();
  
  const defaultBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(Boolean);
    
    const breadcrumbMap: Record<string, string> = {
      'competicoes': 'Competições',
      'regionais': 'Regionais',
      'masculino': 'Masculino',
      'feminino': 'Feminino',
      'taca': 'Taça',
      'classificacoes': 'Classificações',
      'resultados': 'Resultados',
      'clubes': 'Clubes',
      'noticias': 'Notícias',
      'galeria': 'Galeria',
      'documentos': 'Documentos',
      'sobre': 'Sobre',
      'contacto': 'Contacto',
      'admin': 'Administração'
    };

    return pathnames.map((pathname, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = breadcrumbMap[pathname] || pathname;
      const current = index === pathnames.length - 1;
      
      return { label, href, current };
    });
  };

  const breadcrumbs = items || defaultBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav 
      className={cn("bg-gray-50 py-3 border-b", className)}
      aria-label="Breadcrumb"
    >
      <div className="cv-container">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-cv-blue transition-colors"
              aria-label="Ir para a página inicial"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Início</span>
            </Link>
          </li>
          
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              {item.current ? (
                <span 
                  className="text-gray-700 font-medium" 
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-gray-500 hover:text-cv-blue transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default EnhancedBreadcrumbs;
