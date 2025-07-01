
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageCategorySidebar, { PageCategory } from './PageCategorySidebar';
import PagesList from './PagesList';
import PageEditor from './PageEditor';
import PageSections from './PageSections';
import { PageData, CreatePageData } from './types';
import { usePagesApi } from '@/hooks/usePagesApi';
import { useToast } from '@/hooks/use-toast';

const PagesManager = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [editingPage, setEditingPage] = useState<PageData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { usePages, useCreatePage, useUpdatePage, useDeletePage } = usePagesApi();
  
  // Fetch pages
  const { data: pages = [], isLoading, refetch } = usePages();
  
  // Mutations
  const createPageMutation = useCreatePage();
  const updatePageMutation = useUpdatePage();
  const deletePageMutation = useDeletePage();

  const categories: PageCategory[] = [
    { 
      id: 'home', 
      name: 'Página Inicial', 
      icon: 'home',
      description: 'Página principal do site',
      color: '#3B82F6',
      count: pages.filter(p => p.category === 'home').length
    },
    { 
      id: 'about', 
      name: 'Sobre a FCBB', 
      icon: 'info',
      description: 'Informações institucionais',
      color: '#10B981',
      count: pages.filter(p => p.category === 'about').length
    },
    { 
      id: 'competitions', 
      name: 'Competições', 
      icon: 'trophy',
      description: 'Campeonatos e torneios',
      color: '#F59E0B',
      count: pages.filter(p => p.category === 'competitions').length
    },
    { 
      id: 'teams', 
      name: 'Equipas', 
      icon: 'users',
      description: 'Clubes e seleções',
      color: '#8B5CF6',
      count: pages.filter(p => p.category === 'teams').length
    },
    { 
      id: 'results', 
      name: 'Resultados', 
      icon: 'calendar',
      description: 'Jogos e calendário',
      color: '#EF4444',
      count: pages.filter(p => p.category === 'results').length
    },
    { 
      id: 'stats', 
      name: 'Estatísticas', 
      icon: 'stats',
      description: 'Números e classificações',
      color: '#06B6D4',
      count: pages.filter(p => p.category === 'stats').length
    },
    { 
      id: 'media', 
      name: 'Multimédia', 
      icon: 'camera',
      description: 'Fotos e vídeos',
      color: '#EC4899',
      count: pages.filter(p => p.category === 'media').length
    },
    { 
      id: 'contact', 
      name: 'Contacto', 
      icon: 'phone',
      description: 'Informações de contacto',
      color: '#84CC16',
      count: pages.filter(p => p.category === 'contact').length
    }
  ];

  const handleCreatePage = async () => {
    const newPageData: CreatePageData = {
      title: 'Nova Página',
      slug: `/nova-pagina-${Date.now()}`,
      content: '',
      status: 'draft',
      category: selectedCategory,
      order_index: pages.filter(p => p.category === selectedCategory).length + 1
    };

    try {
      const newPage = await createPageMutation.mutateAsync(newPageData);
      setEditingPage(newPage);
      setSelectedPage(newPage.id);
      await refetch();
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  const handlePageEdit = (page: PageData) => {
    setEditingPage(page);
    setSelectedPage(page.id);
  };

  const handlePageSave = async () => {
    if (!editingPage) return;

    try {
      await updatePageMutation.mutateAsync({
        id: editingPage.id,
        data: {
          title: editingPage.title,
          slug: editingPage.slug,
          content: editingPage.content,
          status: editingPage.status,
          seo_title: editingPage.seo_title,
          seo_description: editingPage.seo_description
        }
      });
      await refetch();
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handlePageDelete = async (pageId: string) => {
    if (confirm('Tem a certeza que deseja eliminar esta página?')) {
      try {
        await deletePageMutation.mutateAsync(pageId);
        if (selectedPage === pageId) {
          setSelectedPage('');
          setEditingPage(null);
        }
        await refetch();
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesCategory = page.category === selectedCategory;
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesCategory && matchesSearch && matchesStatus;
  });

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão Completa de Páginas</h2>
          <p className="text-gray-600">Sistema completo para gestão de conteúdo do site da FCBB</p>
        </div>
        <Button onClick={handleCreatePage} className="bg-cv-blue hover:bg-cv-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          Nova Página
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Procurar páginas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
                <SelectItem value="archived">Arquivados</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="px-3 py-1">
              {filteredPages.length} página{filteredPages.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <PageCategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {editingPage ? (
            <Tabs defaultValue="editor" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">Editor de Página</TabsTrigger>
                <TabsTrigger value="sections">Seções da Página</TabsTrigger>
              </TabsList>

              <TabsContent value="editor">
                <PageEditor
                  page={editingPage}
                  onPageChange={setEditingPage}
                  onSave={handlePageSave}
                  isSaving={updatePageMutation.isPending}
                />
              </TabsContent>

              <TabsContent value="sections">
                <PageSections
                  page={editingPage}
                  onPageChange={setEditingPage}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <PagesList
              category={categories.find(c => c.id === selectedCategory)!}
              pages={filteredPages}
              selectedPage={selectedPage}
              onPageSelect={setSelectedPage}
              onPageEdit={handlePageEdit}
              onPageDelete={handlePageDelete}
              isDeleting={deletePageMutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PagesManager;
