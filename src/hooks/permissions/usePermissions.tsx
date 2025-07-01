
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DetailedRole } from '@/components/auth/RoleSelector';
import { useRoleFetcher } from './useRoleFetcher';
import { 
  checkPermission, 
  checkAnyPermission, 
  checkAllPermissions, 
  determineUserRole 
} from './utils';
import { PermissionHookReturn } from './types';

const PermissionsContext = createContext<PermissionHookReturn | undefined>(undefined);

export const usePermissions = (): PermissionHookReturn => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const { fetchUserRole, isLoading: roleLoading } = useRoleFetcher();
  const [userRole, setUserRole] = useState<DetailedRole>('user');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      if (!user) {
        setUserRole('user');
        setIsLoading(false);
        return;
      }

      try {
        const role = await fetchUserRole(user, isAdmin);
        setUserRole(role);
      } catch (error) {
        console.error('Error loading user role:', error);
        setUserRole(determineUserRole(user, isAdmin));
      } finally {
        setIsLoading(false);
      }
    };

    loadUserRole();
  }, [user, isAdmin, fetchUserRole]);

  const hasPermission = (resource: string, action: string): boolean => {
    return checkPermission(userRole, resource, action, user?.email);
  };

  const hasAnyPermission = (permissions: Array<{resource: string, action: string}>): boolean => {
    return checkAnyPermission(userRole, permissions, user?.email);
  };

  const hasAllPermissions = (permissions: Array<{resource: string, action: string}>): boolean => {
    return checkAllPermissions(userRole, permissions, user?.email);
  };

  const canAccessAdminArea = (): boolean => {
    return hasPermission('dashboard', 'view');
  };

  const canManageUsers = (): boolean => {
    return hasPermission('users', 'edit');
  };

  const canManageNews = (): boolean => {
    return hasPermission('news', 'create') || hasPermission('news', 'edit');
  };

  const canManageEvents = (): boolean => {
    return hasPermission('events', 'create') || hasPermission('events', 'edit');
  };

  const canManageContent = (contentType: string): boolean => {
    return hasPermission(contentType, 'create') || hasPermission(contentType, 'edit');
  };

  const canReviewContent = (): boolean => {
    return userRole === 'admin' || userRole === 'revisor';
  };

  const canPublishContent = (): boolean => {
    return userRole === 'admin' || userRole === 'revisor';
  };

  const isContentAuthor = (authorId: string): boolean => {
    return user?.id === authorId;
  };

  const value: PermissionHookReturn = {
    user,
    userRole,
    isLoading: isLoading || roleLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdminArea,
    canManageUsers,
    canManageNews,
    canManageEvents,
    canManageContent,
    canReviewContent,
    canPublishContent,
    isContentAuthor
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};
