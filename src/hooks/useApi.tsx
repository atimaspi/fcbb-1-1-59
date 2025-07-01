
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Simplified type approach to avoid infinite type instantiation
type TableName = string;

// Generic API hook for CRUD operations
export const useApi = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generic fetch function
  const fetchData = async (table: TableName, filters?: Record<string, any>) => {
    let query = supabase.from(table as any).select('*');
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  };

  // Generic create function
  const createData = async (table: TableName, data: any) => {
    const { data: result, error } = await supabase
      .from(table as any)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  };

  // Generic update function
  const updateData = async (table: TableName, id: string, data: any) => {
    const { data: result, error } = await supabase
      .from(table as any)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  };

  // Generic delete function
  const deleteData = async (table: TableName, id: string) => {
    const { error } = await supabase
      .from(table as any)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  };

  // Hook for fetching data - fixed to separate cache config from query filters
  const useFetch = (table: TableName, filters?: Record<string, any>) => {
    return useQuery({
      queryKey: [table, filters],
      queryFn: () => fetchData(table, filters),
      staleTime: 30 * 1000, // 30 seconds
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 60 * 1000, // Refetch every minute
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      retry: 1,
    });
  };

  // Hook for creating data with immediate cache invalidation
  const useCreate = (table: TableName) => {
    return useMutation({
      mutationFn: (data: any) => createData(table, data),
      onSuccess: () => {
        // Invalidar todas as queries relacionadas
        queryClient.invalidateQueries({ queryKey: [table] });
        // Forçar refetch imediato
        queryClient.refetchQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item criado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao criar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // Hook for updating data with immediate cache invalidation
  const useUpdate = (table: TableName) => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => updateData(table, id, data),
      onSuccess: () => {
        // Invalidar todas as queries relacionadas
        queryClient.invalidateQueries({ queryKey: [table] });
        // Forçar refetch imediato
        queryClient.refetchQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item atualizado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao atualizar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  // Hook for deleting data with immediate cache invalidation
  const useDelete = (table: TableName) => {
    return useMutation({
      mutationFn: (id: string) => deleteData(table, id),
      onSuccess: () => {
        // Invalidar todas as queries relacionadas
        queryClient.invalidateQueries({ queryKey: [table] });
        // Forçar refetch imediato
        queryClient.refetchQueries({ queryKey: [table] });
        toast({
          title: "Sucesso",
          description: "Item eliminado com sucesso.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro",
          description: `Erro ao eliminar item: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    useFetch,
    useCreate,
    useUpdate,
    useDelete,
    fetchData,
    createData,
    updateData,
    deleteData
  };
};
