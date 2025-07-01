
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useFederationData = () => {
  const { data: federationData, isLoading: federationLoading, error: federationError } = useQuery({
    queryKey: ['federation'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('federations')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['basketball-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('basketball_stats')
        .select('*')
        .eq('active', true)
        .order('order_index');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: siteSettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  return {
    federationData,
    federationLoading,
    federationError,
    statsData,
    statsLoading,
    siteSettings,
    settingsLoading,
    isLoading: federationLoading || statsLoading || settingsLoading
  };
};
