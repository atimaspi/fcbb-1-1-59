
import PageLayout from '@/pages/PageLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminContent from '@/components/admin/AdminContent';

const AreaReservadaPage = () => {
  return (
    <ProtectedRoute permission={{ resource: 'dashboard', action: 'view' }}>
      <PageLayout 
        title="Área Reservada" 
        description="Painel de controle administrativo da FCBB"
      >
        <AdminContent />
      </PageLayout>
    </ProtectedRoute>
  );
};

export default AreaReservadaPage;
