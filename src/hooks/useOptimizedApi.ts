
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  totalPages: number;
}

interface ApiOptions {
  page?: number;
  limit?: number;
  cache?: boolean;
  staleTime?: number;
}

export const useOptimizedApi = () => {
  // Optimized fetch with compression and caching
  const optimizedFetch = useCallback(async (
    endpoint: string, 
    options: ApiOptions = {}
  ) => {
    const { page = 1, limit = 20, cache = true } = options;
    
    const url = new URL(`/api/${endpoint}`, window.location.origin);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());
    
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, br',
        'Cache-Control': cache ? 'max-age=300' : 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }, []);

  // Paginated query hook with infinite scroll support
  const usePaginatedQuery = <T>(
    endpoint: string,
    options: ApiOptions & { enabled?: boolean } = {}
  ) => {
    const { enabled = true, staleTime = 5 * 60 * 1000 } = options;
    
    return useInfiniteQuery({
      queryKey: [endpoint, options],
      queryFn: ({ pageParam = 1 }) => 
        optimizedFetch(endpoint, { ...options, page: pageParam as number }),
      getNextPageParam: (lastPage: PaginatedResponse<T>) => {
        return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
      },
      initialPageParam: 1,
      enabled,
      staleTime,
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 2
    });
  };

  // Simple optimized query
  const useOptimizedQuery = <T>(
    endpoint: string,
    options: ApiOptions & { enabled?: boolean } = {}
  ) => {
    const { enabled = true, staleTime = 5 * 60 * 1000 } = options;
    
    return useQuery({
      queryKey: [endpoint, options],
      queryFn: () => optimizedFetch(endpoint, options),
      enabled,
      staleTime,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2
    });
  };

  return {
    usePaginatedQuery,
    useOptimizedQuery,
    optimizedFetch
  };
};
