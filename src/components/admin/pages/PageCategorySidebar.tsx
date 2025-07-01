
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Trophy, 
  Users, 
  Calendar, 
  BarChart3, 
  Camera, 
  Phone, 
  Info,
  FileText,
  Settings
} from 'lucide-react';

export interface PageCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  count?: number;
}

interface PageCategorySidebarProps {
  categories: PageCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const PageCategorySidebar = ({ categories, selectedCategory, onCategorySelect }: PageCategorySidebarProps) => {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      home: Home,
      trophy: Trophy,
      users: Users,
      calendar: Calendar,
      stats: BarChart3,
      camera: Camera,
      phone: Phone,
      info: Info,
      fileText: FileText,
      settings: Settings
    };
    return icons[iconName] || FileText;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias de Páginas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => {
            const IconComponent = getIcon(category.icon);
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3"
                onClick={() => onCategorySelect(category.id)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div 
                    className={`p-2 rounded-md`}
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-gray-600">{category.description}</div>
                  </div>
                  {category.count !== undefined && (
                    <Badge variant="secondary" className="ml-auto">
                      {category.count}
                    </Badge>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageCategorySidebar;
