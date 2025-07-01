
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO = ({ 
  title = 'Federação Cabo-verdiana de Basquetebol - FCBB',
  description = 'Site oficial da Federação Cabo-verdiana de Basquetebol com notícias, competições, seleções e mais informações sobre o basquetebol em Cabo Verde.',
  keywords = 'basquetebol, cabo verde, fcbb, federação, competições, seleções, liga nacional',
  image = '/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png',
  url = 'https://fcbb.cv',
  type = 'website'
}: SEOProps) => {
  const fullTitle = title.includes('FCBB') ? title : `${title} | FCBB`;
  const fullUrl = url.startsWith('http') ? url : `https://fcbb.cv${url}`;
  const fullImage = image.startsWith('http') ? image : `https://fcbb.cv${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="FCBB - Federação Cabo-verdiana de Basquetebol" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="FCBB - Federação Cabo-verdiana de Basquetebol" />
      <meta property="og:locale" content="pt_CV" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fcbb_oficial" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
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
            "addressCountry": "CV",
            "addressLocality": "Praia"
          },
          "sameAs": [
            "https://www.facebook.com/fcbb.oficial",
            "https://www.instagram.com/fcbb_oficial"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
