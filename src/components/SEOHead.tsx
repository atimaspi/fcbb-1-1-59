
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const SEOHead = ({ 
  title = 'Federação Cabo-verdiana de Basquetebol - FCBB',
  description = 'Site oficial da Federação Cabo-verdiana de Basquetebol com notícias, competições, seleções e mais informações sobre o basquetebol em Cabo Verde.',
  keywords = 'basquetebol, cabo verde, fcbb, federação, competições, seleções, liga nacional, desporto',
  image = '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png',
  type = 'website',
  noIndex = false
}: SEOHeadProps) => {
  const location = useLocation();
  const fullUrl = `https://fcbb.cv${location.pathname}`;
  const fullImage = image.startsWith('http') ? image : `https://fcbb.cv${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="FCBB - Federação Cabo-verdiana de Basquetebol" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#003893" />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}
      
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="FCBB" />
      <meta property="og:locale" content="pt_CV" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          "name": "Federação Cabo-verdiana de Basquetebol",
          "alternateName": "FCBB",
          "url": fullUrl,
          "logo": fullImage,
          "description": description,
          "sport": "Basketball",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CV"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
