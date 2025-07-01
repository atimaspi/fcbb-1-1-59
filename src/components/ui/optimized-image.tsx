
import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
  lazy?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
  sizes = "100vw",
  quality = 75,
  lazy = true
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(!lazy);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    const currentImg = imgRef.current;
    if (currentImg) {
      observer.observe(currentImg);
    }

    return () => {
      if (currentImg) {
        observer.unobserve(currentImg);
      }
    };
  }, [lazy, priority, isIntersecting]);

  // Generate optimized sources with WebP and AVIF
  const generateSources = useCallback(() => {
    if (!src.includes('unsplash.com') && !src.includes('images.')) {
      return { webp: src, avif: src, original: src };
    }

    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    
    // Aggressive optimization for performance
    params.set('auto', 'format,compress');
    params.set('q', Math.min(quality, 75).toString()); // Max quality 75 for performance
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('fit', 'crop');
    params.set('dpr', '2'); // Support retina displays

    // WebP version (smaller than JPEG)
    params.set('fm', 'webp');
    const webpSrc = `${baseUrl}?${params.toString()}`;
    
    // AVIF version (smallest, most modern)
    params.set('fm', 'avif');
    const avifSrc = `${baseUrl}?${params.toString()}`;
    
    return { webp: webpSrc, avif: avifSrc, original: src };
  }, [src, width, height, quality]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const sources = generateSources();

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500 text-sm',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Erro ao carregar imagem: ${alt}`}
      >
        <span className="text-xs">Imagem indisponível</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" ref={imgRef}>
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 bg-gray-200 animate-shimmer',
            className
          )}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      
      {(isIntersecting || priority) && (
        <picture>
          {/* AVIF format for maximum compression */}
          <source 
            srcSet={sources.avif} 
            type="image/avif"
            sizes={sizes}
          />
          
          {/* WebP format for good compression */}
          <source 
            srcSet={sources.webp} 
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback */}
          <img
            src={sources.original}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes={sizes}
            fetchPriority={priority ? 'high' : 'low'}
          />
        </picture>
      )}
    </div>
  );
};

export { OptimizedImage };
