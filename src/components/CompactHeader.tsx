
import CompactTopBar from './header/CompactTopBar';
import CompactMainHeader from './header/CompactMainHeader';
import CompactNavigation from './header/CompactNavigation';

const CompactHeader = () => {
  return (
    <header className="bg-white shadow-sm relative z-50 h-20">
      <a 
        href="#main-content" 
        className="skip-nav focus:top-0"
        aria-label="Saltar para o conteúdo principal"
      >
        Saltar para o conteúdo principal
      </a>
      
      <CompactTopBar />
      <CompactMainHeader />
      <CompactNavigation />
    </header>
  );
};

export default CompactHeader;
