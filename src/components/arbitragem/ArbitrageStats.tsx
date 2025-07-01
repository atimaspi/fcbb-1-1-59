
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, BookOpen, Award } from 'lucide-react';

const ArbitrageStats = () => {
  const stats = [
    {
      icon: Target,
      value: "85",
      label: "Árbitros Ativos",
      gradient: "from-blue-500 to-cv-blue"
    },
    {
      icon: Users,
      value: "12",
      label: "Instrutores",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      value: "24",
      label: "Cursos Realizados",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Award,
      value: "6",
      label: "Árbitros Internacionais",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className={`bg-gradient-to-br ${stat.gradient} text-white`}>
            <CardContent className="p-6 text-center">
              <Icon className="w-12 h-12 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ArbitrageStats;
