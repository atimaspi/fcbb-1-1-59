
import { useState, useCallback } from 'react';
import { DetailedRole } from '@/components/auth/RoleSelector';
import { supabase } from '@/integrations/supabase/client';

export const useRoleFetcher = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserRole = useCallback(async (user: any, isAdmin: boolean): Promise<DetailedRole> => {
    if (!user || isLoading) {
      return 'user';
    }

    setIsLoading(true);
    
    try {
      // Quick check by email first
      if (user.email === 'admin@fcbb.cv') {
        console.log('Admin role detected by email');
        return 'admin';
      }

      // Try to fetch from database with error handling
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!error && data && data.role) {
        console.log('Role from database:', data.role);
        return data.role as DetailedRole;
      } else {
        console.log('Using fallback role determination');
        // Fallback logic
        if (user.email === 'admin@fcbb.cv' || isAdmin) {
          return 'admin';
        } else {
          return 'user';
        }
      }
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      // Fallback logic
      if (user.email === 'admin@fcbb.cv' || isAdmin) {
        return 'admin';
      } else {
        return 'user';
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { fetchUserRole, isLoading };
};
