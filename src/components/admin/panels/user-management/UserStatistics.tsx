
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserStatistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Total Utilizadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">23</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Administradores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">3</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Editores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">8</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Gestores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">12</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatistics;
