
import { Link } from 'react-router-dom';
import { AccessibleButton } from '@/components/ui/accessible-button';
import ExternalLink from '@/components/ExternalLink';

const MainHeader = () => {
  return (
    <div className="cv-container">
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center">
          <Link to="/" className="flex items-center focus-visible-cv" aria-label="Página inicial da FCBB">
            <img 
              src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
              alt="Logótipo da Federação Cabo-verdiana de Basquetebol" 
              className="h-6 w-auto mr-2"
              width="24"
              height="24"
              loading="eager"
            />
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-cv-blue">FCBB</h1>
              <p className="text-xs text-cv-dark">Federação Cabo-verdiana de Basquetebol</p>
            </div>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4">
          <AccessibleButton 
            variant="outline" 
            size="sm" 
            className="border-cv-red text-cv-red hover:bg-cv-red hover:text-white text-xs px-3 py-1"
            asChild
          >
            <ExternalLink 
              href="/resultados/fiba-livestats"
              showIcon={false}
              ariaLabel="FIBA LiveStats - Estatísticas em tempo real"
            >
              FIBA LiveStats
            </ExternalLink>
          </AccessibleButton>
          <AccessibleButton 
            size="sm" 
            className="bg-cv-red hover:bg-red-700 text-xs px-3 py-1" 
            asChild
          >
            <Link 
              to="/contacto"
              aria-label="Contactar a FCBB"
            >
              Contactos
            </Link>
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
