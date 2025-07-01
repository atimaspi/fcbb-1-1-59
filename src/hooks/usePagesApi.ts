
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PageData, CreatePageData, UpdatePageData, CreateSectionData, UpdateSectionData, PageSection } from '@/components/admin/pages/types';

export const usePagesApi = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch pages with sections
  const usePages = (category?: string) => {
    return useQuery({
      queryKey: ['pages', category],
      queryFn: async (): Promise<PageData[]> => {
        let query = supabase
          .from('pages')
          .select('*')
          .order('order_index', { ascending: true });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching pages:', error);
          throw error;
        }

        // Transform the data to match PageData interface
        return (data || []).map(page => ({
          id: page.id,
          title: page.title,
          slug: page.slug,
          content: page.content || '',
          status: page.status as 'published' | 'draft' | 'archived',
          category: page.category,
          parent_id: page.parent_id || undefined,
          order_index: page.order_index || 0,
          seo_title: page.seo_title || undefined,
          seo_description: page.seo_description || undefined,
          created_at: page.created_at || '',
          updated_at: page.updated_at || '',
          created_by: page.created_by || undefined,
          updated_by: page.updated_by || undefined,
          sections: [] // We'll fetch sections separately
        }));
      }
    });
  };

  // Fetch single page with sections
  const usePage = (pageId: string) => {
    return useQuery({
      queryKey: ['pages', pageId],
      queryFn: async (): Promise<PageData> => {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', pageId)
          .single();

        if (error) {
          console.error('Error fetching page:', error);
          throw error;
        }
        
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || '',
          status: data.status as 'published' | 'draft' | 'archived',
          category: data.category,
          parent_id: data.parent_id || undefined,
          order_index: data.order_index || 0,
          seo_title: data.seo_title || undefined,
          seo_description: data.seo_description || undefined,
          created_at: data.created_at || '',
          updated_at: data.updated_at || '',
          created_by: data.created_by || undefined,
          updated_by: data.updated_by || undefined,
          sections: []
        };
      },
      enabled: !!pageId
    });
  };

  // Fetch sections for a page
  const usePageSections = (pageId: string) => {
    return useQuery({
      queryKey: ['page_sections', pageId],
      queryFn: async (): Promise<PageSection[]> => {
        const { data, error } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_id', pageId)
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Error fetching page sections:', error);
          throw error;
        }

        // Transform the data to match PageSection interface with proper type casting
        return (data || []).map(section => ({
          id: section.id,
          page_id: section.page_id,
          type: section.type as PageSection['type'],
          title: section.title,
          content: (section.content && typeof section.content === 'object' && !Array.isArray(section.content)) 
            ? section.content as Record<string, any>
            : {},
          order_index: section.order_index || 0,
          visible: section.visible || false,
          created_at: section.created_at || '',
          updated_at: section.updated_at || ''
        }));
      },
      enabled: !!pageId
    });
  };

  // Create page
  const useCreatePage = () => {
    return useMutation({
      mutationFn: async (pageData: CreatePageData): Promise<PageData> => {
        const { data, error } = await supabase
          .from('pages')
          .insert([{
            ...pageData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (error) {
          console.error('Error creating page:', error);
          throw error;
        }
        
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || '',
          status: data.status as 'published' | 'draft' | 'archived',
          category: data.category,
          parent_id: data.parent_id || undefined,
          order_index: data.order_index || 0,
          seo_title: data.seo_title || undefined,
          seo_description: data.seo_description || undefined,
          created_at: data.created_at || '',
          updated_at: data.updated_at || '',
          created_by: data.created_by || undefined,
          updated_by: data.updated_by || undefined,
          sections: []
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pages'] });
        toast({
          title: "Sucesso",
          description: "Página criada com sucesso",
        });
      },
      onError: (error: any) => {
        console.error('Create page error:', error);
        toast({
          title: "Erro",
          description: "Erro ao criar página: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Update page
  const useUpdatePage = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Partial<UpdatePageData> }) => {
        const { data: updatedData, error } = await supabase
          .from('pages')
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Error updating page:', error);
          throw error;
        }

        return updatedData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pages'] });
        toast({
          title: "Sucesso",
          description: "Página atualizada com sucesso",
        });
      },
      onError: (error: any) => {
        console.error('Update page error:', error);
        toast({
          title: "Erro",
          description: "Erro ao atualizar página: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Delete page
  const useDeletePage = () => {
    return useMutation({
      mutationFn: async (pageId: string) => {
        const { error } = await supabase
          .from('pages')
          .delete()
          .eq('id', pageId);

        if (error) {
          console.error('Error deleting page:', error);
          throw error;
        }

        return pageId;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pages'] });
        toast({
          title: "Sucesso",
          description: "Página eliminada com sucesso",
        });
      },
      onError: (error: any) => {
        console.error('Delete page error:', error);
        toast({
          title: "Erro",
          description: "Erro ao eliminar página: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Create section
  const useCreateSection = () => {
    return useMutation({
      mutationFn: async (sectionData: CreateSectionData): Promise<PageSection> => {
        const { data, error } = await supabase
          .from('page_sections')
          .insert([sectionData])
          .select()
          .single();

        if (error) {
          console.error('Error creating section:', error);
          throw error;
        }
        
        return {
          id: data.id,
          page_id: data.page_id,
          type: data.type as PageSection['type'],
          title: data.title,
          content: (data.content && typeof data.content === 'object' && !Array.isArray(data.content)) 
            ? data.content as Record<string, any>
            : {},
          order_index: data.order_index || 0,
          visible: data.visible || false,
          created_at: data.created_at || '',
          updated_at: data.updated_at || ''
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['page_sections'] });
        toast({
          title: "Sucesso",
          description: "Seção criada com sucesso",
        });
      },
      onError: (error: any) => {
        console.error('Create section error:', error);
        toast({
          title: "Erro",
          description: "Erro ao criar seção: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Update section
  const useUpdateSection = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateSectionData> }) => {
        const { data: updatedData, error } = await supabase
          .from('page_sections')
          .update(data)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Error updating section:', error);
          throw error;
        }

        return updatedData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['page_sections'] });
        toast({
          title: "Sucesso",
          description: "Seção atualizada com sucesso",
        });
      },
      onError: (error: any) => {
        console.error('Update section error:', error);
        toast({
          title: "Erro",
          description: "Erro ao atualizar seção: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  // Delete section
  const useDeleteSection = () => {
    return useMutation({
      mutationFn: async (sectionId: string) => {
        const { error } = await supabase
          .from('page_sections')
          .delete()
          .eq('id', sectionId);

        if (error) {
          console.error('Error deleting section:', error);
          throw error;
        }

        return sectionId;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['page_sections'] });
        toast({
          title: "Sucesso",
          description: "Seção eliminada com sucesso",
        });
      },
      onError: (error: any) => {
        console.error('Delete section error:', error);
        toast({
          title: "Erro",
          description: "Erro ao eliminar seção: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  return {
    // Queries
    usePages,
    usePage,
    usePageSections,
    
    // Mutations
    useCreatePage,
    useUpdatePage,
    useDeletePage,
    useCreateSection,
    useUpdateSection,
    useDeleteSection
  };
};
