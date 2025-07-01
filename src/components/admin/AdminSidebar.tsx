
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  LayoutDashboard,
  FileText, 
  Calendar, 
  Trophy, 
  Users, 
  Settings,
  BarChart3,
  Shield,
  Upload,
  User,
  UserCheck,
  GraduationCap,
  GamepadIcon,
  Building2,
  Building,
  Image,
  Star,
  Handshake,
  Sliders
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  permission: { resource: string; action: string } | null;
}

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const { canAccessAdminArea } = usePermissions();

  const getAvailableMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'profile', label: 'Perfil', icon: User, permission: null },
    ];

    const contentManagementItems: MenuItem[] = [
      { id: 'hero-slides', label: 'Slides Banner', icon: Image, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'statistics', label: 'Estatísticas', icon: BarChart3, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'partners', label: 'Parceiros', icon: Handshake, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'site-settings', label: 'Configurações Site', icon: Sliders, permission: { resource: 'settings', action: 'edit' } },
    ];

    const adminItems: MenuItem[] = [
      { id: 'news', label: 'Notícias', icon: FileText, permission: { resource: 'news', action: 'create' } },
      { id: 'events', label: 'Eventos', icon: Calendar, permission: { resource: 'events', action: 'create' } },
      { id: 'competitions', label: 'Competições', icon: Trophy, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'federations', label: 'Federações', icon: Building2, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'regionalAssociations', label: 'Ass. Regionais', icon: Building, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'clubs', label: 'Clubes', icon: Users, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'players', label: 'Jogadores', icon: UserCheck, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'coaches', label: 'Treinadores', icon: GraduationCap, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'games', label: 'Jogos', icon: GamepadIcon, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'gallery', label: 'Galeria', icon: Upload, permission: { resource: 'dashboard', action: 'view' } },
      { id: 'referees', label: 'Arbitragem', icon: Shield, permission: { resource: 'dashboard', action: 'view' } },
    ];

    const filteredItems = [...baseItems];
    
    // Add content management items if user has admin access
    if (canAccessAdminArea()) {
      filteredItems.push(...contentManagementItems);
    }

    // Add other admin items if user has admin access
    adminItems.forEach(item => {
      if (!item.permission || canAccessAdminArea()) {
        filteredItems.push(item);
      }
    });

    return filteredItems;
  };

  const menuItems = getAvailableMenuItems();

  return (
    <div className="w-64 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Menu Administrativo</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? 'bg-cv-blue hover:bg-cv-blue/90' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSidebar;
