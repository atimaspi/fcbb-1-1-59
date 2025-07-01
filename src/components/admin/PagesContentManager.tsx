import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Home, 
  Trophy, 
  Users, 
  Calendar,
  BarChart3,
  Camera,
  Phone,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePagesApi } from '@/hooks/usePagesApi';

interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  lastModified: string;
  sections: ContentSection[];
}

interface ContentSection {
  id: string;
  type: 'hero' | 'stats' | 'news' | 'competitions' | 'teams' | 'gallery';
  title: string;
  content: any;
  order: number;
  visible: boolean;
}

const PagesContentManager = () => {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<string>('home');
  
  // Use real data from the API instead of mock data
  const { usePages } = usePagesApi();
  const { data: pages = [], isLoading } = usePages();

  const pageTemplates = [
    { 
      id: 'home', 
      name: 'Página Inicial', 
      icon: Home,
      description: 'Página principal do site'
    },
    { 
      id: 'competitions', 
      name: 'Competições', 
      icon: Trophy,
      description: 'Gestão de competições e torneios'
    },
    { 
      id: 'teams', 
      name: 'Equipas', 
      icon: Users,
      description: 'Gestão de equipas e clubes'
    },
    { 
      id: 'results', 
      name: 'Resultados', 
      icon: Calendar,
      description: 'Resultados e calendário de jogos'
    },
    { 
      id: 'stats', 
      name: 'Estatísticas', 
      icon: BarChart3,
      description: 'Estatísticas e classificações'
    },
    { 
      id: 'gallery', 
      name: 'Galeria', 
      icon: Camera,
      description: 'Galeria de fotos e vídeos'
    },
    { 
      id: 'contact', 
      name: 'Contacto', 
      icon: Phone,
      description: 'Informações de contacto'
    },
    { 
      id: 'about', 
      name: 'Sobre', 
      icon: Info,
      description: 'Informações sobre a FCBB'
    }
  ];

  const sectionTypes = [
    { value: 'hero', label: 'Seção Hero', description: 'Banner principal com call-to-action' },
    { value: 'stats', label: 'Estatísticas', description: 'Números e métricas importantes' },
    { value: 'news', label: 'Notícias', description: 'Últimas notícias e artigos' },
    { value: 'competitions', label: 'Competições', description: 'Lista de competições ativas' },
    { value: 'teams', label: 'Equipas', description: 'Showcase de equipas e clubes' },
    { value: 'gallery', label: 'Galeria', description: 'Galeria de imagens' }
  ];

  const getCurrentPage = () => {
    return pages.find(p => p.id === selectedPage) || pages[0];
  };

  const handleAddSection = (type: string) => {
    const currentPage = getCurrentPage();
    const newSection: ContentSection = {
      id: `${type}-${Date.now()}`,
      type: type as ContentSection['type'],
      title: `Nova Seção ${type}`,
      content: {},
      order: currentPage.sections.length + 1,
      visible: true
    };

    const updatedPages = pages.map(page => 
      page.id === selectedPage 
        ? { ...page, sections: [...page.sections, newSection] }
        : page
    );

    // setPages(updatedPages);
    toast({
      title: "Seção adicionada",
      description: `Nova seção ${type} foi adicionada à página.`,
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedPages = pages.map(page => 
      page.id === selectedPage 
        ? { ...page, sections: page.sections.filter(s => s.id !== sectionId) }
        : page
    );

    // setPages(updatedPages);
    toast({
      title: "Seção removida",
      description: "Seção foi removida da página.",
    });
  };

  const handleToggleSection = (sectionId: string) => {
    const updatedPages = pages.map(page => 
      page.id === selectedPage 
        ? { 
            ...page, 
            sections: page.sections.map(s => 
              s.id === sectionId ? { ...s, visible: !s.visible } : s
            )
          }
        : page
    );

    // setPages(updatedPages);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cv-blue mx-auto mb-4"></div>
          <p>Carregando páginas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gestão de Páginas</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Página
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar com lista de páginas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Páginas do Site</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pageTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Button
                    key={template.id}
                    variant={selectedPage === template.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedPage(template.id)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {template.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{getCurrentPage().title}</CardTitle>
                <Badge variant={getCurrentPage().status === 'published' ? 'default' : 'secondary'}>
                  {getCurrentPage().status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="page-title">Título da Página</Label>
                  <Input
                    id="page-title"
                    value={getCurrentPage().title}
                    placeholder="Título da página"
                  />
                </div>
                <div>
                  <Label htmlFor="page-slug">URL/Slug</Label>
                  <Input
                    id="page-slug"
                    value={getCurrentPage().slug}
                    placeholder="/pagina-exemplo"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Seções da Página</CardTitle>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-1 border rounded"
                    onChange={(e) => e.target.value && handleAddSection(e.target.value)}
                    value=""
                  >
                    <option value="">Adicionar Seção</option>
                    {sectionTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* {getCurrentPage().sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <Card key={section.id} className={`${!section.visible ? 'opacity-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                              {section.type === 'hero' && <Home className="w-4 h-4" />}
                              {section.type === 'stats' && <BarChart3 className="w-4 h-4" />}
                              {section.type === 'news' && <FileText className="w-4 h-4" />}
                              {section.type === 'competitions' && <Trophy className="w-4 h-4" />}
                              {section.type === 'teams' && <Users className="w-4 h-4" />}
                              {section.type === 'gallery' && <Camera className="w-4 h-4" />}
                            </div>
                            <div>
                              <h4 className="font-semibold">{section.title}</h4>
                              <p className="text-sm text-gray-600 capitalize">{section.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={section.visible ? 'default' : 'secondary'}>
                              {section.visible ? 'Visível' : 'Oculto'}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleSection(section.id)}
                            >
                              {section.visible ? 'Ocultar' : 'Mostrar'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteSection(section.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-600 mb-2">Configurações da Seção:</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <span>Tipo: {section.type}</span>
                            <span>Ordem: {section.order}</span>
                            <span>Status: {section.visible ? 'Ativo' : 'Inativo'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                } */}
                
                {/* {getCurrentPage().sections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma seção adicionada ainda.</p>
                    <p className="text-sm">Use o menu acima para adicionar seções à página.</p>
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1">
              Salvar Alterações
            </Button>
            <Button variant="outline">
              Pré-visualizar
            </Button>
            <Button variant="outline">
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesContentManager;
