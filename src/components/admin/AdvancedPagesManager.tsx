
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Eye, Save, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageCategorySidebar, { PageCategory } from './pages/PageCategorySidebar';
import PagesList from './pages/PagesList';
import PageEditor from './pages/PageEditor';
import PageSections from './pages/PageSections';
import EmptyPageState from './pages/EmptyPageState';
import { PageData } from './pages/types';
import { usePagesApi } from '@/hooks/usePagesApi';

const AdvancedPagesManager = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('home');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [editingPage, setEditingPage] = useState<PageData | null>(null);

  // API hooks
  const {
    usePages,
    useCreatePage,
    useUpdatePage,
    useDeletePage
  } = usePagesApi();

  // Fetch pages
  const { data: pages = [], isLoading, refetch } = usePages();
  
  // Mutations
  const createPageMutation = useCreatePage();
  const updatePageMutation = useUpdatePage();
  const deletePageMutation = useDeletePage();

  // Define categories locally since they're not exported from PageCategorySidebar
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

  const getCurrentCategory = () => {
    return categories.find(cat => cat.id === selectedCategory) || categories[0];
  };

  const handleCreatePage = async () => {
    try {
      const newPageData = {
        title: 'Nova Página',
        slug: `/nova-pagina-${Date.now()}`,
        content: '',
        status: 'draft' as const,
        category: selectedCategory,
        order_index: pages.filter(p => p.category === selectedCategory).length + 1,
        seo_title: '',
        seo_description: ''
      };

      const result = await createPageMutation.mutateAsync(newPageData);
      
      if (result) {
        setSelectedPage(result.id);
        setEditingPage(result);
        await refetch();
      }
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    
    try {
      const { id, sections, created_at, updated_at, created_by, updated_by, ...updateData } = editingPage;
      
      await updatePageMutation.mutateAsync({
        id,
        data: updateData
      });
      
      await refetch();
      
      toast({
        title: "Sucesso",
        description: "Página salva com sucesso!",
      });
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleDeletePage = async (pageId: string) => {
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
  };

  const handlePageSelect = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setSelectedPage(pageId);
      setEditingPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando páginas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Gestão Completa de Páginas</h2>
          <p className="text-gray-600">Sistema completo para gestão de conteúdo do site da FCBB</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Ver Site
          </Button>
          <Button onClick={handleCreatePage} disabled={createPageMutation.isPending}>
            <Plus className="w-4 h-4 mr-2" />
            {createPageMutation.isPending ? 'Criando...' : 'Nova Página'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <PageCategorySidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <PagesList 
          category={getCurrentCategory()}
          pages={pages}
          selectedPage={selectedPage}
          onPageSelect={handlePageSelect}
          onPageEdit={setEditingPage}
          onPageDelete={handleDeletePage}
          isDeleting={deletePageMutation.isPending}
        />

        <div className="lg:col-span-3 space-y-6">
          {editingPage ? (
            <>
              <PageEditor 
                page={editingPage}
                onPageChange={setEditingPage}
                onSave={handleSavePage}
                isSaving={updatePageMutation.isPending}
              />

              <PageSections 
                page={editingPage}
                onPageChange={setEditingPage}
              />

              <div className="flex gap-4">
                <Button 
                  onClick={handleSavePage} 
                  className="flex-1"
                  disabled={updatePageMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updatePageMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Pré-visualizar
                </Button>
                <Button variant="outline">
                  <Globe className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
              </div>
            </>
          ) : (
            <EmptyPageState />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedPagesManager;
