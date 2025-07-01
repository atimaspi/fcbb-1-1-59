
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ComprehensiveAdminPanel from './ComprehensiveAdminPanel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const AdminDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <ComprehensiveAdminPanel />;
};

export default AdminDashboard;
