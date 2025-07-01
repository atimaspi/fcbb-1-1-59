
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdvancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const AdvancedImage: React.FC<AdvancedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  blur = true,
  lazy = true,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before visible
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Generate optimized image URL
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', quality.toString());
      params.set('fm', 'webp');
      params.set('auto', 'compress');
      
      return `${originalSrc}?${params.toString()}`;
    }
    return originalSrc;
  }, [width, height, quality]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate blur placeholder
  const generateBlurPlaceholder = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 10, 10);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 10, 10);
    }
    return canvas.toDataURL();
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center text-gray-500 text-sm",
          className
        )}
        style={{ width, height }}
      >
        Imagem não disponível
      </div>
    );
  }

  return (
    <div 
      ref={placeholderRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {blur && !isLoaded && isInView && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${generateBlurPlaceholder()})`,
            backgroundSize: 'cover',
            filter: 'blur(5px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      
      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            "w-full h-full object-cover"
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}
    </div>
  );
};

export default AdvancedImage;
