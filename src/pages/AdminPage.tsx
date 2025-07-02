
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage = () => {
  return (
    <ProtectedRoute permission={{ resource: 'admin', action: 'manage' }}>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminPage;
