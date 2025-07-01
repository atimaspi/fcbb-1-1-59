
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { DetailedRole } from '@/components/auth/RoleSelector';
import { Permission, PermissionHookReturn } from './permissions/types';
import { checkPermission, checkAnyPermission, checkAllPermissions, determineUserRole } from './permissions/utils';
import { useRoleFetcher } from './permissions/useRoleFetcher';

export type { UserRole, Permission } from './permissions/types';

export const usePermissions = (): PermissionHookReturn => {
  const { user, isAdmin } = useAuth();
  const [userRole, setUserRole] = useState<DetailedRole>('user');
  const { fetchUserRole, isLoading } = useRoleFetcher();

  useEffect(() => {
    const loadUserRole = async () => {
      if (user) {
        const role = await fetchUserRole(user, isAdmin);
        setUserRole(role);
      } else {
        setUserRole('user');
      }
    };

    loadUserRole();
  }, [user, isAdmin, fetchUserRole]);

  const getUserRole = (): DetailedRole => {
    return determineUserRole(user, isAdmin, userRole);
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    const currentRole = getUserRole();
    return checkPermission(currentRole, resource, action, user.email);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    
    const currentRole = getUserRole();
    return checkAnyPermission(currentRole, permissions, user.email);
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    
    const currentRole = getUserRole();
    return checkAllPermissions(currentRole, permissions, user.email);
  };

  const canAccessAdminArea = (): boolean => {
    const canAccess = hasPermission('dashboard', 'view');
    console.log('Can access admin area:', canAccess);
    return canAccess;
  };

  const canManageUsers = (): boolean => {
    return hasPermission('users', 'create');
  };

  const canManageNews = (): boolean => {
    return hasPermission('news', 'create');
  };

  const canManageEvents = (): boolean => {
    return hasPermission('events', 'create');
  };

  return {
    user,
    userRole: getUserRole(),
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessAdminArea,
    canManageUsers,
    canManageNews,
    canManageEvents,
  };
};
