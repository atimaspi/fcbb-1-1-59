
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
  author_id?: string;
  reviewer_id?: string;
  created_at: string;
  updated_at: string;
  scheduled_publish_at?: string;
}

const VALID_CONTENT_TYPES = [
  'news', 'championships', 'clubs', 'games', 'national_teams', 
  'referees', 'training_programs', 'gallery', 'broadcasts', 
  'federation_members', 'documents'
] as const;

type ValidContentType = typeof VALID_CONTENT_TYPES[number];

export const useContentWorkflow = (contentType: string) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('redator');
  const { user } = useAuth();
  const { toast } = useToast();

  // Validate content type
  const isValidContentType = (type: string): type is ValidContentType => {
    return VALID_CONTENT_TYPES.includes(type as ValidContentType);
  };

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
    if (!isValidContentType(contentType)) {
      console.error(`Invalid content type: ${contentType}`);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Use type assertion to handle dynamic table names safely
      let query = (supabase as any)
        .from(contentType)
        .select('*')
        .order('created_at', { ascending: false });

      // Filter based on user role
      if (userRole === 'redator') {
        query = query.eq('author_id', user?.id);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform data to match ContentItem interface with safe property access
      const transformedData = (data || []).map((item: any) => ({
        id: item.id,
        title: item.title || item.name || 'Sem título',
        status: item.status || item.status_publicacao || 'rascunho' as ContentStatus,
        author_id: item.author_id || item.created_by,
        reviewer_id: item.reviewer_id,
        created_at: item.created_at,
        updated_at: item.updated_at || item.created_at,
        scheduled_publish_at: item.scheduled_publish_at
      }));

      setItems(transformedData);
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
    if (!isValidContentType(contentType)) return;

    try {
      const { error } = await (supabase as any)
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
    if (!isValidContentType(contentType)) return;

    try {
      const { error } = await (supabase as any)
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
    if (!isValidContentType(contentType)) return;

    try {
      const { error } = await (supabase as any)
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
    if (!isValidContentType(contentType)) return;

    try {
      const { error } = await (supabase as any)
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
