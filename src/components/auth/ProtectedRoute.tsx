
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions, Permission } from '@/hooks/usePermissions';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import AuthForm from './AuthForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  permission?: {
    resource: string;
    action: string;
  };
  permissions?: Permission[];
  requireAll?: boolean;
  fallbackComponent?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  permission,
  permissions = [],
  requireAll = false,
  fallbackComponent
}) => {
  const { user, loading } = useAuth();
  const { hasPermission, hasAnyPermission, hasAllPermissions, canAccessAdminArea } = usePermissions();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  // Verificação de admin (compatibilidade com código existente)
  if (requireAdmin && !canAccessAdminArea()) {
    return fallbackComponent || (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Acesso negado. Apenas administradores podem aceder a esta área.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Verificação de permissão específica
  if (permission && !hasPermission(permission.resource, permission.action)) {
    return fallbackComponent || (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Não tem permissões suficientes para aceder a esta funcionalidade.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Verificação de múltiplas permissões
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);

    if (!hasAccess) {
      return fallbackComponent || (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-md">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Não tem as permissões necessárias para aceder a esta área.
            </AlertDescription>
          </Alert>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
