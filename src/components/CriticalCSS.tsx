
import { memo } from 'react';

const CriticalCSS = memo(() => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS ultra-otimizado para performance */
        .cv-container {
          max-width: 1280px;
          padding: 0 1rem;
          margin: 0 auto;
        }
        
        /* Core colors - inline para evitar FOUC */
        .text-cv-blue { color: #003893; }
        .text-cv-red { color: #CF2027; }
        .text-cv-yellow { color: #F7D116; }
        .bg-cv-blue { background-color: #003893; }
        .bg-cv-red { background-color: #CF2027; }
        
        /* Layout essencial */
        .hero-gradient {
          background: linear-gradient(135deg, #003893 0%, #CF2027 50%, #F7D116 100%);
        }
        
        /* Loading otimizado com GPU acceleration */
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          will-change: background-position;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        /* Typography crítica */
        .section-title {
          font-size: clamp(1.25rem, 4vw, 1.875rem);
          font-weight: 700;
          color: #003893;
          border-bottom: 3px solid #F7D116;
          padding-bottom: 0.25rem;
          margin-bottom: 1rem;
        }
        
        /* Performance otimizada */
        img[width][height] {
          height: auto;
        }
        
        /* Prevent layout shift */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* GPU acceleration para transições */
        .hover-lift {
          transition: transform 0.2s ease-out;
          will-change: transform;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        
        /* Botões otimizados */
        .btn-primary {
          background-color: #003893;
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: background-color 0.2s ease;
          will-change: background-color;
        }
        
        .btn-primary:hover {
          background-color: #002766;
        }
        
        /* Reduce motion for accessibility and performance */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `
    }} />
  );
});

CriticalCSS.displayName = 'CriticalCSS';

export default CriticalCSS;
