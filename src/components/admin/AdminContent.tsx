import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import ComprehensiveDashboard from './panels/ComprehensiveDashboard';
import ContentManager from './panels/ContentManager';
import UserManagement from './panels/UserManagement';
import NewsletterManager from './panels/NewsletterManager';
import FibaIntegration from './panels/FibaIntegration';
import SecurityCenter from './panels/SecurityCenter';
import SystemSettings from './panels/SystemSettings';
import PagesManager from './pages/PagesManager';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Mail, 
  Globe, 
  Shield, 
  Settings,
  LogOut,
  Files
} from 'lucide-react';

const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, signOut } = useAuth();
  const { userRole, canAccessAdminArea } = usePermissions();

  if (!canAccessAdminArea()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Acesso Negado</CardTitle>
            <CardDescription className="text-center">
              Não tem permissões para aceder ao painel administrativo
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const adminTabs = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Visão geral e estatísticas'
    },
    { 
      id: 'pages', 
      name: 'Gestão de Páginas', 
      icon: Files,
      description: 'Editor completo de páginas'
    },
    { 
      id: 'content', 
      name: 'Conteúdo', 
      icon: FileText,
      description: 'Notícias, fotos, vídeos'
    },
    { 
      id: 'users', 
      name: 'Utilizadores', 
      icon: Users,
      description: 'Gestão de utilizadores'
    },
    { 
      id: 'newsletter', 
      name: 'Newsletter', 
      icon: Mail,
      description: 'Sistema de newsletter'
    },
    { 
      id: 'fiba', 
      name: 'FIBA', 
      icon: Globe,
      description: 'Integração FIBA'
    },
    { 
      id: 'security', 
      name: 'Segurança', 
      icon: Shield,
      description: 'Centro de segurança'
    },
    { 
      id: 'settings', 
      name: 'Configurações', 
      icon: Settings,
      description: 'Configurações do sistema'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ComprehensiveDashboard />;
      case 'pages':
        return <PagesManager />;
      case 'content':
        return <ContentManager />;
      case 'users':
        return <UserManagement />;
      case 'newsletter':
        return <NewsletterManager />;
      case 'fiba':
        return <FibaIntegration />;
      case 'security':
        return <SecurityCenter />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <ComprehensiveDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/8c0e50b0-b06a-42cf-b3fc-9a08063308b3.png" 
                alt="FCBB Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-cv-blue">
                  Área Reservada FCBB
                </h1>
                <p className="text-sm text-gray-600">
                  Painel de controle administrativo
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-cv-blue text-white">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
              <div className="text-sm text-gray-600">
                {user?.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-white rounded-lg shadow-sm border">
            {adminTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-cv-blue data-[state=active]:text-white"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium hidden sm:block">{tab.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {adminTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <tab.icon className="h-6 w-6 text-cv-blue" />
                    <span>{tab.name}</span>
                  </h2>
                  <p className="text-gray-600 mt-1">{tab.description}</p>
                </div>
                
                {renderTabContent()}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminContent;
