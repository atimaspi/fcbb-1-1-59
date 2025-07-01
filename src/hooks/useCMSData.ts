
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Menu, Category, Post, Document, Media, AuditLog, Backup } from '@/types/cms';
import { useToast } from '@/hooks/use-toast';

// Hook para Menus
export const useMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as Menu[];
    }
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (menu: Omit<Menu, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('menus')
        .insert(menu)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      toast({ title: "Menu criado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao criar menu", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Menu> & { id: string }) => {
      const { data, error } = await supabase
        .from('menus')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      toast({ title: "Menu atualizado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao atualizar menu", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('menus')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      toast({ title: "Menu eliminado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao eliminar menu", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};

// Hook para Categorias
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as Category[];
    }
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: "Categoria criada com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao criar categoria", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};

// Hook para Posts
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    }
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({ title: "Post criado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao criar post", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};

// Hook para Documentos
export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Document[];
    }
  });
};

// Hook para Media
export const useMedia = () => {
  return useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Media[];
    }
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, title, description, category_id, folder_path = '/' }: {
      file: File;
      title: string;
      description?: string;
      category_id?: string;
      folder_path?: string;
    }) => {
      // Upload file to storage
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${folder_path}${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('fcbb-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('fcbb-media')
        .getPublicUrl(filePath);

      // Create media record
      const mediaData = {
        title,
        description,
        file_url: publicUrl,
        file_name: fileName,
        original_filename: file.name,
        file_type: file.type.startsWith('image/') ? 'image' : 
                  file.type.startsWith('video/') ? 'video' :
                  file.type.startsWith('audio/') ? 'audio' : 'document',
        mime_type: file.type,
        file_size: file.size,
        category_id,
        folder_path
      };

      const { data, error } = await supabase
        .from('media')
        .insert(mediaData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({ title: "Media carregado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao carregar media", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};

// Hook para Audit Logs
export const useAuditLogs = () => {
  return useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data as AuditLog[];
    }
  });
};

// Hook para Backups
export const useBackups = () => {
  return useQuery({
    queryKey: ['backups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('backups')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Backup[];
    }
  });
};

export const useCreateBackup = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (backupName: string) => {
      const { data, error } = await supabase.rpc('create_automatic_backup');
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backups'] });
      toast({ title: "Backup criado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Erro ao criar backup", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });
};
