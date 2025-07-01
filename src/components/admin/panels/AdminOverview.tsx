
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, UserCheck, Calendar } from 'lucide-react';

const AdminOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4 text-cv-blue" />
            Clubes Registados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">32</div>
          <p className="text-xs text-gray-600">Activos em 9 ilhas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4 text-cv-blue" />
            Competições Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">8</div>
          <p className="text-xs text-gray-600">Entre regionais e nacionais</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cv-blue" />
            Jogadores Federados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">450</div>
          <p className="text-xs text-gray-600">Masculinos e femininos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cv-blue" />
            Jogos Esta Época
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cv-blue">156</div>
          <p className="text-xs text-gray-600">Realizados e agendados</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
