
import { Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompactTopBar = () => {
  return (
    <div className="bg-cv-blue text-white py-1">
      <div className="cv-container">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">FIBA: #52 (M) | #78 (F)</span>
          <div className="flex items-center space-x-4">
            <button className="hover:text-cv-yellow p-1 flex items-center gap-1" aria-label="Pesquisar">
              <Search size={14} />
              <span>Pesquisar</span>
            </button>
            <Link to="?lang=pt" className="hover:text-cv-yellow font-medium px-2">PT</Link>
            <Link to="?lang=en" className="hover:text-cv-yellow font-medium px-2">EN</Link>
            <Link to="/area-reservada" className="flex items-center gap-1 hover:text-cv-yellow font-medium">
              <Lock size={14} />
              <span>Área Reservada</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactTopBar;
