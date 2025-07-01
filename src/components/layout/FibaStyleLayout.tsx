
import EnhancedFibaStyleHeader from '@/components/header/EnhancedFibaStyleHeader';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

interface FibaStyleLayoutProps {
  title?: string;
  children: React.ReactNode;
  description?: string;
  keywords?: string;
  image?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const FibaStyleLayout = ({ 
  title, 
  children, 
  description, 
  keywords, 
  image,
  showHeader = true,
  showFooter = true
}: FibaStyleLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-red-50">
      {title && (
        <SEO 
          title={title}
          description={description}
          keywords={keywords}
          image={image}
          url={typeof window !== 'undefined' ? window.location.pathname : '/'}
        />
      )}
      
      {showHeader && <EnhancedFibaStyleHeader />}
      
      <main className={`flex-grow ${showHeader ? 'pt-0' : ''}`}>
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default FibaStyleLayout;
