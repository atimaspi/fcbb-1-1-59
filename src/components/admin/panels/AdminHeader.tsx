
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Database } from 'lucide-react';

const AdminHeader = () => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-cv-blue">
              Painel Administrativo FCBB
            </h1>
            <p className="text-gray-600">
              Sistema completo de gestão de conteúdos
            </p>
          </div>
          <Badge variant="outline" className="text-cv-blue border-cv-blue">
            <Database className="w-4 h-4 mr-1" />
            Sistema Integrado
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
