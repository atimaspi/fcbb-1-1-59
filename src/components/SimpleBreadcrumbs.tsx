
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const SimpleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    'competicoes': 'Competições',
    'regionais': 'Competições Regionais',
    'masculino': 'Nacional Masculino',
    'feminino': 'Nacional Feminino',
    'taca': 'Taça de Cabo Verde',
    'classificacoes': 'Classificações',
    'resultados': 'Resultados',
    'clubes': 'Clubes',
    'noticias': 'Notícias',
    'galeria': 'Galeria',
    'documentos': 'Documentos',
    'sobre': 'Sobre',
    'contacto': 'Contacto'
  };

  return (
    <nav className="bg-gray-50 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-cv-blue transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Início</span>
            </Link>
          </li>
          
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[name] || name;

            return (
              <li key={name} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {isLast ? (
                  <span className="text-gray-700 font-medium" aria-current="page">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 hover:text-cv-blue transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default SimpleBreadcrumbs;
