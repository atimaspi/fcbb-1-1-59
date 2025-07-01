
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface ReservedAreaButtonProps {
  isScrolled: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

const ReservedAreaButton = ({ isScrolled, isMobile = false, onClose }: ReservedAreaButtonProps) => {
  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 mt-4">
        <Link
          to="/area-reservada"
          className="flex items-center space-x-3 px-6 py-3 font-semibold font-display text-cv-blue hover:bg-cv-blue/5 rounded-lg mx-3 transition-all border-2 border-cv-blue"
          onClick={onClose}
        >
          <Lock size={20} />
          <span>Área Reservada</span>
        </Link>
      </div>
    );
  }

  return (
    <Link
      to="/area-reservada"
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold font-display transition-all duration-300 border-2 ml-4 ${
        isScrolled 
          ? 'border-cv-blue text-cv-blue hover:bg-cv-blue hover:text-white' 
          : 'border-cv-yellow text-cv-yellow hover:bg-cv-yellow hover:text-cv-blue'
      }`}
    >
      <Lock size={18} />
      <span>Área Reservada</span>
    </Link>
  );
};

export default ReservedAreaButton;
