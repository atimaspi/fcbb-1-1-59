
import { useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface CacheConfig {
  maxAge: number;
  maxSize: number;
  preloadStrategy: 'lazy' | 'eager' | 'predictive';
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

export const useAdvancedCache = <T>(config: CacheConfig = {
  maxAge: 5 * 60 * 1000, // 5 minutes
  maxSize: 100,
  preloadStrategy: 'predictive'
}) => {
  const queryClient = useQueryClient();
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    size: 0
  });

  // Advanced cache cleanup with LRU strategy
  const cleanupCache = useCallback(() => {
    const now = Date.now();
    const cache = cacheRef.current;
    const entries = Array.from(cache.entries());

    // Remove expired entries
    const validEntries = entries.filter(([_, entry]) => 
      now - entry.timestamp < config.maxAge
    );

    // If still over limit, remove least recently used
    if (validEntries.length > config.maxSize) {
      validEntries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
      validEntries.splice(0, validEntries.length - config.maxSize);
    }

    // Rebuild cache
    cache.clear();
    validEntries.forEach(([key, entry]) => cache.set(key, entry));

    setCacheStats(prev => ({ ...prev, size: cache.size }));
  }, [config.maxAge, config.maxSize]);

  // Smart prefetching based on user behavior
  const predictivePreload = useCallback((currentPath: string) => {
    const predictions = {
      '/': ['/noticias', '/competicoes', '/selecoes'],
      '/noticias': ['/noticias/', '/multimedia'],
      '/competicoes': ['/competicoes/classificacoes', '/resultados'],
      '/selecoes': ['/selecoes/senior-masculina', '/selecoes/senior-feminina']
    };

    const pathsToPreload = predictions[currentPath as keyof typeof predictions];
    if (pathsToPreload && config.preloadStrategy === 'predictive') {
      pathsToPreload.forEach(path => {
        queryClient.prefetchQuery({
          queryKey: ['page-data', path],
          queryFn: () => fetch(`/api/page-data${path}`).then(r => r.json()),
          staleTime: config.maxAge
        });
      });
    }
  }, [queryClient, config.preloadStrategy, config.maxAge]);

  // Get from cache with statistics
  const getFromCache = useCallback((key: string): T | null => {
    const entry = cacheRef.current.get(key);
    
    if (entry && Date.now() - entry.timestamp < config.maxAge) {
      entry.accessCount++;
      entry.lastAccessed = Date.now();
      cacheRef.current.set(key, entry);
      
      setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
      return entry.data;
    }
    
    setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
    return null;
  }, [config.maxAge]);

  // Set to cache
  const setToCache = useCallback((key: string, data: T) => {
    cacheRef.current.set(key, {
      data,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now()
    });
    
    setCacheStats(prev => ({ ...prev, size: cacheRef.current.size }));
    
    // Cleanup if needed
    if (cacheRef.current.size > config.maxSize) {
      cleanupCache();
    }
  }, [config.maxSize, cleanupCache]);

  // Periodic cleanup
  useEffect(() => {
    const interval = setInterval(cleanupCache, 60000); // Every minute
    return () => clearInterval(interval);
  }, [cleanupCache]);

  return {
    getFromCache,
    setToCache,
    predictivePreload,
    cacheStats,
    clearCache: () => {
      cacheRef.current.clear();
      setCacheStats({ hits: 0, misses: 0, size: 0 });
    }
  };
};
