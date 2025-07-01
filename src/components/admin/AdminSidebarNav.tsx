
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Trophy, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Camera,
  Edit,
  Eye,
  FileImage
} from 'lucide-react';

interface AdminSection {
  id: string;
  name: string;
  icon: any;
  description: string;
}

interface AdminSidebarNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebarNav = ({ activeTab, onTabChange }: AdminSidebarNavProps) => {
  const adminSections: AdminSection[] = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: Home,
      description: 'Visão geral do sistema'
    },
    { 
      id: 'advanced-pages', 
      name: 'Gestão Completa de Páginas', 
      icon: FileText,
      description: 'Sistema completo de gestão de páginas'
    },
    { 
      id: 'pages', 
      name: 'Gestão de Páginas (Simples)', 
      icon: FileText,
      description: 'Gerir conteúdo das páginas'
    },
    { 
      id: 'competitions-content', 
      name: 'Competições (Conteúdo)', 
      icon: Trophy,
      description: 'Gerir classificações e resultados'
    },
    { 
      id: 'news', 
      name: 'Notícias', 
      icon: FileText,
      description: 'Gestão de notícias e artigos'
    },
    { 
      id: 'games', 
      name: 'Jogos', 
      icon: Calendar,
      description: 'Gestão de jogos e resultados'
    },
    { 
      id: 'clubs', 
      name: 'Clubes', 
      icon: Users,
      description: 'Gestão de clubes e equipas'
    },
    { 
      id: 'players', 
      name: 'Jogadores', 
      icon: Users,
      description: 'Gestão de jogadores'
    },
    { 
      id: 'competitions', 
      name: 'Competições (Dados)', 
      icon: Trophy,
      description: 'Gestão de competições'
    },
    { 
      id: 'referees', 
      name: 'Árbitros', 
      icon: Users,
      description: 'Gestão de árbitros'
    },
    { 
      id: 'events', 
      name: 'Eventos', 
      icon: Calendar,
      description: 'Gestão de eventos'
    },
    { 
      id: 'gallery', 
      name: 'Galeria', 
      icon: Camera,
      description: 'Gestão de galeria'
    },
    { 
      id: 'settings', 
      name: 'Configurações', 
      icon: Settings,
      description: 'Configurações do sistema'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Área Administrativa</h1>
        <p className="text-sm text-gray-600">FCBB - Gestão de Conteúdo</p>
      </div>
      
      <nav className="p-4 space-y-2">
        {adminSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Button
              key={section.id}
              variant={activeTab === section.id ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => onTabChange(section.id)}
            >
              <IconComponent className="w-4 h-4 mr-3" />
              <div>
                <div className="font-medium">{section.name}</div>
                <div className="text-xs text-gray-500">{section.description}</div>
              </div>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <p className="text-xs text-gray-500">
          Sistema de gestão de conteúdo da FCBB
        </p>
      </div>
    </div>
  );
};

export default AdminSidebarNav;
