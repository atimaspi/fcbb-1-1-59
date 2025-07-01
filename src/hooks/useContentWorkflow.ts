
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export type ContentStatus = 'rascunho' | 'em_analise' | 'publicado' | 'rejeitado';
export type UserRole = 'redator' | 'revisor' | 'admin';

interface ContentItem {
  id: string;
  title: string;
  status: ContentStatus;
  author_id: string;
  reviewer_id?: string;
  created_at: string;
  updated_at: string;
  scheduled_publish_at?: string;
}

export const useContentWorkflow = (contentType: string) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('redator');
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (data && !error) {
        setUserRole(data.role as UserRole);
      }
    };

    fetchUserRole();
  }, [user]);

  // Fetch content items
  const fetchItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(contentType)
        .select('*')
        .order('created_at', { ascending: false });

      // Filter based on user role
      if (userRole === 'redator') {
        query = query.eq('author_id', user?.id);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Erro ao carregar ${contentType}: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit for review
  const submitForReview = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from(contentType)
        .update({ 
          status: 'em_analise',
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      // Create notification for reviewers
      await createNotification(
        'content_pending',
        `Novo conteúdo para revisão: ${contentType}`,
        `Um novo item foi submetido para revisão.`,
        itemId
      );

      toast({
        title: "Sucesso",
        description: "Conteúdo enviado para revisão!",
      });

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Approve content
  const approveContent = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from(contentType)
        .update({
          status: 'publicado',
          reviewer_id: user?.id,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Conteúdo aprovado e publicado!",
      });

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Reject content
  const rejectContent = async (itemId: string, reason: string) => {
    try {
      const { error } = await supabase
        .from(contentType)
        .update({
          status: 'rejeitado',
          reviewer_id: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      // Create notification for author
      await createNotification(
        'content_rejected',
        'Conteúdo rejeitado',
        `Seu conteúdo foi rejeitado. Motivo: ${reason}`,
        itemId
      );

      toast({
        title: "Conteúdo rejeitado",
        description: "Notificação enviada ao autor.",
      });

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Create notification
  const createNotification = async (
    type: string,
    title: string,
    message: string,
    contentId: string
  ) => {
    const { error } = await supabase.rpc('create_notification', {
      p_user_id: user?.id,
      p_title: title,
      p_message: message,
      p_type: type,
      p_content_type: contentType,
      p_content_id: contentId
    });

    if (error) {
      console.error('Error creating notification:', error);
    }
  };

  // Schedule publication
  const schedulePublication = async (itemId: string, scheduledDate: string) => {
    try {
      const { error } = await supabase
        .from(contentType)
        .update({
          scheduled_publish_at: scheduledDate,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);

      if (error) throw error;

      // Add to scheduled publications
      await supabase
        .from('scheduled_publications')
        .insert({
          content_type: contentType,
          content_id: itemId,
          scheduled_date: scheduledDate,
          created_by: user?.id
        });

      toast({
        title: "Sucesso",
        description: "Publicação agendada!",
      });

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user && userRole) {
      fetchItems();
    }
  }, [user, userRole, contentType]);

  return {
    items,
    loading,
    userRole,
    fetchItems,
    submitForReview,
    approveContent,
    rejectContent,
    schedulePublication
  };
};
