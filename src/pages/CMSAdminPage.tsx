
import PageLayout from './PageLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CMSPanel from '@/components/admin/cms/CMSPanel';

const CMSAdminPage = () => {
  return (
    <ProtectedRoute permission={{ resource: 'admin', action: 'manage' }}>
      <PageLayout 
        title="CMS Admin" 
        description="Sistema de Gestão de Conteúdo da FCBB"
      >
        <CMSPanel />
      </PageLayout>
    </ProtectedRoute>
  );
};

export default CMSAdminPage;
