
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cv-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AdminDashboard />;
};

export default AdminPage;
