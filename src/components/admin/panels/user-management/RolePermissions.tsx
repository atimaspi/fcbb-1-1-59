
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const RolePermissions = () => {
  const rolePermissions = {
    admin: [
      'Gestão completa do sistema',
      'Gestão de utilizadores',
      'Configurações avançadas',
      'Relatórios e analytics',
      'Integração FIBA'
    ],
    editor: [
      'Gestão de conteúdos',
      'Publicação de notícias',
      'Gestão de multimédia',
      'Moderação de comentários'
    ],
    gestor: [
      'Gestão de competições',
      'Gestão de equipas',
      'Gestão de jogadores',
      'Resultados e estatísticas'
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(rolePermissions).map(([role, permissions]) => (
        <Card key={role}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </CardTitle>
            <CardDescription>Permissões do perfil {role}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {permissions.map((permission, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cv-blue rounded-full"></div>
                  <span className="text-sm">{permission}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RolePermissions;
