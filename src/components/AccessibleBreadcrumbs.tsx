
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

const AccessibleBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'federacao': 'Federação',
    'sobre': 'Sobre a FCBB',
    'historia': 'História',
    'missao-visao': 'Missão e Visão',
    'direcao': 'Direção',
    'orgaos-sociais': 'Órgãos Sociais',
    'estatutos': 'Estatutos',
    'contactos': 'Contactos',
    'competicoes': 'Competições',
    'liga-nacional': 'Liga Nacional',
    'nacional-masculino': 'Nacional Masculino',
    'taca-de-cabo-verde': 'Taça de Cabo Verde',
    'taca-cabo-verde': 'Taça de Cabo Verde',
    'super-taca': 'Super Taça',
    'competicoes-regionais': 'Competições Regionais',
    'calendario': 'Calendário',
    'classificacoes': 'Classificações',
    'resultados': 'Resultados',
    'selecoes': 'Seleções',
    'masculina': 'Masculina',
    'senior-masculina': 'Sénior Masculina',
    'feminina': 'Feminina',
    'senior-feminina': 'Sénior Feminina',
    'jovens': 'Jovens',
    'sub-18-masculina': 'Sub-18 Masculina',
    'sub-18-feminina': 'Sub-18 Feminina',
    'sub-16-masculina': 'Sub-16 Masculina',
    'sub-16-feminina': 'Sub-16 Feminina',
    'estatisticas': 'Estatísticas',
    'arbitragem': 'Arbitragem',
    'clubes': 'Clubes',
    'formacao': 'Formação',
    'eventos': 'Eventos',
    'transmissoes': 'Transmissões',
    'transferencias': 'Transferências',
    'fiba-livestats': 'FIBA LiveStats',
    'videos': 'Vídeos',
    'imprensa': 'Imprensa',
    'media': 'Media',
    'noticias': 'Notícias',
    'galeria': 'Galeria',
    'area-reservada': 'Área Reservada',
    'contacto': 'Contacto',
    'ao-vivo': 'Ao Vivo'
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Navegação estrutural" className="cv-container py-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link 
                to="/" 
                className="flex items-center focus-visible-cv transition-colors hover:text-cv-blue"
                aria-label="Voltar à página inicial"
                title="Página inicial"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator aria-hidden="true" />
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const name = breadcrumbNameMap[pathname] || pathname;

            return (
              <React.Fragment key={routeTo}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage aria-current="page">{name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={routeTo}
                        className="focus-visible-cv transition-colors hover:text-cv-blue"
                        title={`Navegar para ${name}`}
                        aria-label={`Ir para ${name}`}
                      >
                        {name}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator aria-hidden="true" />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default AccessibleBreadcrumbs;
