
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Trophy, Calendar, Users } from 'lucide-react';

const AdminDashboardStats = () => {
  const stats = [
    {
      title: 'Páginas Ativas',
      value: '45',
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      title: 'Competições',
      value: '5',
      icon: Trophy,
      color: 'text-green-500'
    },
    {
      title: 'Notícias',
      value: '34',
      icon: FileText,
      color: 'text-purple-500'
    },
    {
      title: 'Jogos',
      value: '128',
      icon: Calendar,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <IconComponent className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminDashboardStats;
