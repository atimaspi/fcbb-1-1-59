
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Key } from 'lucide-react';

const UserTable = () => {
  const mockUsers = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@fcbb.cv',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-06-30 14:30',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@fcbb.cv',
      role: 'editor',
      status: 'active',
      lastLogin: '2024-06-30 12:15',
      created: '2024-02-20'
    },
    {
      id: 3,
      name: 'Pedro Mendes',
      email: 'pedro@fcbb.cv',
      role: 'gestor',
      status: 'inactive',
      lastLogin: '2024-06-25 09:45',
      created: '2024-03-10'
    }
  ];

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    editor: 'bg-blue-100 text-blue-800',
    gestor: 'bg-green-100 text-green-800',
    user: 'bg-gray-100 text-gray-800'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Utilizadores</CardTitle>
        <CardDescription>Gerir contas de utilizador e permissões</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Login</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserTable;
