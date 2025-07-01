
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 85
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // Convert to WebP if supported and not already WebP
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    if (supportsWebP() && !src.includes('.webp')) {
      // In a real implementation, you would convert images server-side
      // For now, we'll use the original image
      setImageSrc(src);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setImageSrc('/placeholder.svg'); // Fallback image
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          error && "opacity-50"
        )}
      />
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
