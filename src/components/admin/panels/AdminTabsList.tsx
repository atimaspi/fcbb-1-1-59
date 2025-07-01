
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  Settings,
  UserCheck,
  GraduationCap,
  ClipboardList,
  Globe,
  Shield,
  Database
} from 'lucide-react';

interface AdminSection {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const adminSections: AdminSection[] = [
  { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
  { id: 'clubs', label: 'Clubes', icon: Users },
  { id: 'competitions', label: 'Competições', icon: Trophy },
  { id: 'players', label: 'Jogadores', icon: UserCheck },
  { id: 'games', label: 'Jogos', icon: Calendar },
  { id: 'standings', label: 'Classificações', icon: ClipboardList },
  { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
  { id: 'coaches', label: 'Treinadores', icon: GraduationCap },
  { id: 'referees', label: 'Árbitros', icon: Shield },
  { id: 'nationalteam', label: 'Seleções', icon: Globe },
  { id: 'transfers', label: 'Transferências', icon: Users },
  { id: 'news', label: 'Notícias', icon: FileText },
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'calendar', label: 'Calendário', icon: Calendar },
  { id: 'settings', label: 'Configurações', icon: Settings }
];

const AdminTabsList = () => {
  return (
    <TabsList className="grid grid-cols-5 lg:grid-cols-8 gap-1 h-auto p-1 bg-white">
      {adminSections.map((section) => (
        <TabsTrigger
          key={section.id}
          value={section.id}
          className="flex flex-col items-center gap-1 p-3 text-xs data-[state=active]:bg-cv-blue data-[state=active]:text-white"
        >
          <section.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{section.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default AdminTabsList;
