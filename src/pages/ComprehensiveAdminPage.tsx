
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import ComprehensiveAdminPanel from '@/components/admin/ComprehensiveAdminPanel';
import AuthForm from '@/components/auth/AuthForm';
import PageLayout from './PageLayout';

const ComprehensiveAdminPage = () => {
  const { user } = useAuth();
  const { canAccessAdminArea } = usePermissions();

  if (!user) {
    return <AuthForm />;
  }

  if (!canAccessAdminArea()) {
    return (
      <PageLayout 
        title="Acesso Negado" 
        description="Não tem permissões para aceder a esta área"
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
            <p className="text-gray-600">
              Não tem permissões suficientes para aceder ao painel administrativo.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return <ComprehensiveAdminPanel />;
};

export default ComprehensiveAdminPage;
