
import { DetailedRole } from '@/components/auth/RoleSelector';
import { Permission } from './types';
import { DETAILED_ROLE_PERMISSIONS } from './constants';

export const checkPermission = (
  role: DetailedRole,
  resource: string,
  action: string,
  userEmail?: string
): boolean => {
  console.log('Checking permission:', { resource, action, role, userEmail });
  
  const permissions = DETAILED_ROLE_PERMISSIONS[role] || [];
  
  const hasAccess = permissions.some(
    permission => permission.resource === resource && permission.action === action
  );
  
  console.log('Permission granted:', hasAccess);
  return hasAccess;
};

export const checkAnyPermission = (
  role: DetailedRole,
  permissions: Permission[],
  userEmail?: string
): boolean => {
  return permissions.some(permission => 
    checkPermission(role, permission.resource, permission.action, userEmail)
  );
};

export const checkAllPermissions = (
  role: DetailedRole,
  permissions: Permission[],
  userEmail?: string
): boolean => {
  return permissions.every(permission => 
    checkPermission(role, permission.resource, permission.action, userEmail)
  );
};

export const determineUserRole = (
  user: any,
  isAdmin: boolean,
  dbRole?: DetailedRole
): DetailedRole => {
  // Use multiple fallback strategies
  if (user?.email === 'admin@fcbb.cv' || isAdmin) {
    return 'admin';
  }
  return dbRole || 'user';
};
