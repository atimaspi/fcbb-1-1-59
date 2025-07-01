
import React from 'react';
import { usePermissions, Permission } from '@/hooks/usePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: {
    resource: string;
    action: string;
  };
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  showError?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  permissions = [],
  requireAll = false,
  fallback,
  showError = true,
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission.resource, permission.action);
  } else if (permissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showError) {
      return (
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Não tem permissões suficientes para aceder a esta funcionalidade.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
