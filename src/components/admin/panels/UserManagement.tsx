
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';
import UserStatistics from './user-management/UserStatistics';
import UserTable from './user-management/UserTable';
import RolePermissions from './user-management/RolePermissions';
import CreateUserDialog from './user-management/CreateUserDialog';
import SecuritySettings from './user-management/SecuritySettings';

const UserManagement = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Utilizadores</h3>
          <p className="text-sm text-gray-600">Gerir utilizadores e permissões do sistema</p>
        </div>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Utilizador
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Statistics */}
      <UserStatistics />

      {/* Users Table */}
      <UserTable />

      {/* Role Permissions */}
      <RolePermissions />

      {/* Security Settings */}
      <SecuritySettings />

      {/* Create User Dialog */}
      <CreateUserDialog 
        isOpen={isCreateUserOpen} 
        onClose={() => setIsCreateUserOpen(false)} 
      />
    </div>
  );
};

export default UserManagement;
