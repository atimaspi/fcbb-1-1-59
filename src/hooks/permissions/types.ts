
import { DetailedRole } from '@/components/auth/RoleSelector';

export type UserRole = 'admin' | 'user' | 'moderator' | 'editor';

export interface Permission {
  resource: string;
  action: string;
}

export interface PermissionHookReturn {
  user: any;
  userRole: DetailedRole;
  isLoading: boolean;
  hasPermission: (resource: string, action: string) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAccessAdminArea: () => boolean;
  canManageUsers: () => boolean;
  canManageNews: () => boolean;
  canManageEvents: () => boolean;
}
