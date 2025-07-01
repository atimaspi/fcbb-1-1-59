
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ui/theme-toggle';

const CompactMainHeader = () => {
  return (
    <div className="cv-container py-3">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center focus-visible-cv" aria-label="FCBB">
          <img 
            src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
            alt="FCBB" 
            className="h-8 w-auto mr-3"
            loading="eager"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-cv-blue leading-tight font-display">FCBB</h1>
            <p className="text-sm text-cv-dark font-medium leading-none">Federação Cabo-verdiana de Basquetebol</p>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle />
          <Link 
            to="/resultados/fiba-livestats"
            className="px-4 py-2 border border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white rounded-lg transition-all duration-300 font-medium glass-effect hover:shadow-lg transform hover:scale-105"
          >
            FIBA LiveStats
          </Link>
          <Link 
            to="/contacto"
            className="px-4 py-2 bg-cv-blue text-white hover:bg-blue-700 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contactos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompactMainHeader;
