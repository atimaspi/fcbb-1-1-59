
import { ReactNode } from 'react';
import DynamicFCBBHeader from './DynamicFCBBHeader';
import FCBBFooter from './FCBBFooter';
import SEO from '@/components/SEO';

interface FCBBLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const FCBBLayout = ({ children, title, description, keywords, image }: FCBBLayoutProps) => {
  return (
    <div className="min-h-screen bg-fcbb-black">
      {title && (
        <SEO 
          title={title}
          description={description}
          keywords={keywords}
          image={image}
          url={typeof window !== 'undefined' ? window.location.pathname : '/'}
        />
      )}
      <DynamicFCBBHeader />
      <main className="pt-20">
        {children}
      </main>
      <FCBBFooter />
    </div>
  );
};

export default FCBBLayout;
