
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description: string;
}

const AdminHeader = ({ title, description }: AdminHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Ver Site
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
