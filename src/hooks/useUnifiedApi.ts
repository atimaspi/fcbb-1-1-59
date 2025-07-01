
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useMemo } from 'react';

interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  select?: string;
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending: boolean };
  limit?: number;
}

export const useUnifiedApi = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchData = useCallback(async (
    table: string, 
    options: QueryOptions = {}
  ) => {
    try {
      console.log(`🔍 Fetching data from table: ${table}`, options);
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
      
      console.log(`✅ Successfully fetched ${data?.length || 0} records from ${table}`);
      return data || [];
    } catch (error: any) {
      console.error(`💥 Fetch error for ${table}:`, error);
      throw error;
    }
  }, []);

  const useOptimizedFetch = (
    table: string, 
    options: QueryOptions = {}
  ) => {
    const { enabled = true, staleTime = 1 * 60 * 1000 } = options; // 1 minute for faster updates
    
    const queryKey = useMemo(() => [table, options], [table, options]);
    
    return useQuery({
      queryKey,
      queryFn: () => fetchData(table, options),
      enabled,
      staleTime,
      gcTime: 3 * 60 * 1000, // 3 minutes garbage collection
      refetchOnWindowFocus: true,
      refetchInterval: 15000, // Auto-refetch every 15 seconds for real-time updates
      retry: (failureCount, error: any) => {
        if (error?.message?.includes('infinite recursion') || 
            error?.message?.includes('policy') ||
            error?.code === '42P17') {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(300 * 2 ** attemptIndex, 3000) // Faster retry
    });
  };

  const useOptimizedCreate = (table: string) => {
    return useMutation({
      mutationFn: async (data: any) => {
        try {
          console.log(`➕ Creating record in ${table}:`, data);
          
          // Ensure all required fields are present
          const createData = {
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { data: result, error } = await (supabase as any)
            .from(table)
            .insert(createData)
            .select()
            .single();
          
          if (error) {
            console.error(`❌ Create error for ${table}:`, error);
            throw new Error(`Erro ao criar item: ${error.message}`);
          }
          
          console.log(`✅ Successfully created record in ${table}:`, result);
          return result;
        } catch (error: any) {
          console.error(`💥 Create mutation error for ${table}:`, error);
          throw error;
        }
      },
      onSuccess: (data) => {
        // Immediate cache updates with multiple strategies
        queryClient.invalidateQueries({ queryKey: [table] });
        queryClient.refetchQueries({ queryKey: [table] });
        
        // Also invalidate any related tables for referential integrity
        if (table === 'clubs') {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
          queryClient.refetchQueries({ queryKey: ['teams'] });
        }
        if (table === 'teams') {
          queryClient.invalidateQueries({ queryKey: ['players'] });
          queryClient.refetchQueries({ queryKey: ['players'] });
        }
        if (table === 'championships') {
          queryClient.invalidateQueries({ queryKey: ['games'] });
          queryClient.refetchQueries({ queryKey: ['games'] });
        }
        
        toast({
          title: "✅ Sucesso",
          description: `Item criado com sucesso em ${table}.`,
        });
        console.log(`🔄 Cache invalidated and refetched for ${table}`);
      },
      onError: (error: any) => {
        console.error(`❌ Create error:`, error);
        toast({
          title: "❌ Erro",
          description: error.message || `Erro ao criar item em ${table}`,
          variant: "destructive",
        });
      },
    });
  };

  const useOptimizedUpdate = (table: string) => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        try {
          console.log(`📝 Updating record in ${table}:`, { id, data });
          
          // Ensure updated_at is set
          const updateData = {
            ...data,
            updated_at: new Date().toISOString()
          };

          const { data: result, error } = await (supabase as any)
            .from(table)
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
          
          if (error) {
            console.error(`❌ Update error for ${table}:`, error);
            throw new Error(`Erro ao atualizar item: ${error.message}`);
          }
          
          console.log(`✅ Successfully updated record in ${table}:`, result);
          return result;
        } catch (error: any) {
          console.error(`💥 Update mutation error for ${table}:`, error);
          throw error;
        }
      },
      onSuccess: (data) => {
        // Immediate cache updates
        queryClient.invalidateQueries({ queryKey: [table] });
        queryClient.refetchQueries({ queryKey: [table] });
        
        // Also update related tables
        if (table === 'clubs') {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }
        if (table === 'teams') {
          queryClient.invalidateQueries({ queryKey: ['players'] });
        }
        
        toast({
          title: "✅ Sucesso",
          description: `Item atualizado com sucesso em ${table}.`,
        });
        console.log(`🔄 Cache invalidated for ${table} after update`);
      },
      onError: (error: any) => {
        console.error(`❌ Update error:`, error);
        toast({
          title: "❌ Erro",
          description: error.message || `Erro ao atualizar item em ${table}`,
          variant: "destructive",
        });
      },
    });
  };

  const useOptimizedDelete = (table: string) => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          console.log(`🗑️ Deleting record from ${table}:`, id);
          
          const { error } = await (supabase as any)
            .from(table)
            .delete()
            .eq('id', id);
          
          if (error) {
            console.error(`❌ Delete error for ${table}:`, error);
            throw new Error(`Erro ao eliminar item: ${error.message}`);
          }
          
          console.log(`✅ Successfully deleted record from ${table}`);
          return { id };
        } catch (error: any) {
          console.error(`💥 Delete mutation error for ${table}:`, error);
          throw error;
        }
      },
      onSuccess: () => {
        // Immediate cache updates
        queryClient.invalidateQueries({ queryKey: [table] });
        queryClient.refetchQueries({ queryKey: [table] });
        
        // Also update related tables
        if (table === 'clubs') {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }
        if (table === 'teams') {
          queryClient.invalidateQueries({ queryKey: ['players'] });
        }
        
        toast({
          title: "✅ Sucesso",
          description: `Item eliminado com sucesso de ${table}.`,
        });
        console.log(`🔄 Cache invalidated for ${table} after delete`);
      },
      onError: (error: any) => {
        console.error(`❌ Delete error:`, error);
        toast({
          title: "❌ Erro",
          description: error.message || `Erro ao eliminar item de ${table}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useOptimizedFetch,
    useOptimizedCreate,
    useOptimizedUpdate,
    useOptimizedDelete,
    fetchData
  };
};
