
import { useQuery } from '@tanstack/react-query';
import { useAdvancedCache } from './useAdvancedCache';
import { usePerformanceMonitor } from './usePerformanceMonitor';
import { supabase } from '@/integrations/supabase/client';
import { useCallback, useEffect, useRef } from 'react';

interface QueryOptions {
  select?: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending: boolean };
  limit?: number;
  enableRealtime?: boolean;
}

export const useOptimizedDataFetching = () => {
  const { getFromCache, setToCache, predictivePreload } = useAdvancedCache();
  const { startRenderMeasure, endRenderMeasure } = usePerformanceMonitor();
  const subscriptionRef = useRef<any>(null);

  // Optimized fetch function with intelligent caching
  const optimizedFetch = useCallback(async (
    table: string, 
    options: QueryOptions = {}
  ) => {
    startRenderMeasure();
    
    const cacheKey = `${table}-${JSON.stringify(options)}`;
    
    // Try cache first
    const cached = getFromCache(cacheKey);
    if (cached) {
      endRenderMeasure();
      return cached;
    }

    try {
      const { select = '*', filters, orderBy, limit } = options;
      
      let query = (supabase as any).from(table).select(select);
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending });
      }
      
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error(`❌ Error fetching ${table}:`, error);
        throw new Error(`Erro ao carregar ${table}: ${error.message}`);
      }
      
      const result = data || [];
      
      // Cache the result
      setToCache(cacheKey, result);
      
      endRenderMeasure();
      return result;
    } catch (error: any) {
      endRenderMeasure();
      throw error;
    }
  }, [getFromCache, setToCache, startRenderMeasure, endRenderMeasure]);

  // Enhanced news fetching with correct column names
  const { data: newsData, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news-optimized'],
    queryFn: () => optimizedFetch('news', {
      select: 'id, title, created_at, image_url, category, published, featured',
      orderBy: { column: 'created_at', ascending: false },
      limit: 6
    }),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2
  });

  // Enhanced teams fetching
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams-optimized'],
    queryFn: () => optimizedFetch('teams'),
    staleTime: 10 * 60 * 1000, // 10 minutes - teams don't change often
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Enhanced clubs fetching
  const { data: clubsData, isLoading: clubsLoading, error: clubsError } = useQuery({
    queryKey: ['clubs-optimized'],
    queryFn: () => optimizedFetch('clubs'),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Enhanced competitions fetching
  const { data: competitionsData, isLoading: competitionsLoading, error: competitionsError } = useQuery({
    queryKey: ['competitions-optimized'],
    queryFn: () => optimizedFetch('championships'),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Enhanced games fetching
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useQuery({
    queryKey: ['games-optimized'],
    queryFn: () => optimizedFetch('games'),
    staleTime: 1 * 60 * 1000, // 1 minute - games change frequently
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true
  });

  // Predictive preloading based on current page
  useEffect(() => {
    const currentPath = window.location.pathname;
    predictivePreload(currentPath);
  }, [predictivePreload]);

  // Real-time subscriptions for critical data - com proteção contra múltiplas subscrições
  useEffect(() => {
    // Verificar se já existe uma subscrição ativa
    if (subscriptionRef.current) {
      return;
    }

    try {
      const gamesSubscription = supabase
        .channel('games-changes-unique')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'games' },
          () => {
            // Invalidate games cache on changes
            console.log('🔄 Games data updated via real-time');
          }
        )
        .subscribe();

      subscriptionRef.current = gamesSubscription;

      return () => {
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        }
      };
    } catch (error) {
      console.error('❌ Error setting up real-time subscription:', error);
    }
  }, []);

  return {
    // Data with intelligent caching
    newsData: newsData || [],
    teamsData: teamsData || [],
    clubsData: clubsData || [],
    competitionsData: competitionsData || [],
    gamesData: gamesData || [],
    
    // Loading states
    newsLoading,
    teamsLoading,
    clubsLoading,
    competitionsLoading,
    gamesLoading,
    
    // Aggregate loading
    isLoading: newsLoading || teamsLoading || clubsLoading,
    
    // Errors
    newsError,
    teamsError,
    clubsError,
    competitionsError,
    gamesError,
    
    // Utility function
    optimizedFetch
  };
};
