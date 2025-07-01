
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  FileText, 
  Camera, 
  BarChart3, 
  Trophy, 
  Users, 
  FileImage,
  Edit,
  Trash2,
  Plus,
  Loader2
} from 'lucide-react';
import { PageData, PageSection, SectionType } from './types';
import { usePagesApi } from '@/hooks/usePagesApi';

interface PageSectionsProps {
  page: PageData;
  onPageChange: (page: PageData) => void;
}

const PageSections = ({ page, onPageChange }: PageSectionsProps) => {
  const { usePageSections, useCreateSection, useUpdateSection, useDeleteSection } = usePagesApi();
  
  // Fetch sections for this page
  const { data: sections = [], refetch: refetchSections } = usePageSections(page.id);
  
  // Mutations
  const createSectionMutation = useCreateSection();
  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();

  const sectionTypes: SectionType[] = [
    { value: 'hero', label: 'Seção Hero', description: 'Banner principal com imagem de fundo' },
    { value: 'content', label: 'Conteúdo', description: 'Texto e conteúdo geral' },
    { value: 'gallery', label: 'Galeria', description: 'Galeria de imagens' },
    { value: 'stats', label: 'Estatísticas', description: 'Números e métricas' },
    { value: 'news', label: 'Notícias', description: 'Seção de notícias' },
    { value: 'competitions', label: 'Competições', description: 'Lista de competições' },
    { value: 'teams', label: 'Equipas', description: 'Showcase de equipas' },
    { value: 'documents', label: 'Documentos', description: 'Lista de documentos' }
  ];

  const handleAddSection = async (type: string) => {
    if (!type) return;
    
    try {
      const newSectionData = {
        page_id: page.id,
        type: type as PageSection['type'],
        title: `Nova Seção ${type}`,
        content: {},
        order_index: sections.length + 1,
        visible: true
      };

      await createSectionMutation.mutateAsync(newSectionData);
      await refetchSections();
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      await deleteSectionMutation.mutateAsync(sectionId);
      await refetchSections();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleToggleVisibility = async (section: PageSection) => {
    try {
      await updateSectionMutation.mutateAsync({
        id: section.id,
        data: { visible: !section.visible }
      });
      await refetchSections();
    } catch (error) {
      console.error('Error updating section visibility:', error);
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero': return <Home className="w-4 h-4" />;
      case 'content': return <FileText className="w-4 h-4" />;
      case 'gallery': return <Camera className="w-4 h-4" />;
      case 'stats': return <BarChart3 className="w-4 h-4" />;
      case 'news': return <FileText className="w-4 h-4" />;
      case 'competitions': return <Trophy className="w-4 h-4" />;
      case 'teams': return <Users className="w-4 h-4" />;
      case 'documents': return <FileImage className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSectionLabel = (type: string) => {
    const sectionType = sectionTypes.find(st => st.value === type);
    return sectionType ? sectionType.label : type;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seções da Página</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {sections.length} seção{sections.length !== 1 ? 'ões' : ''} configurada{sections.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Select onValueChange={(value) => value && handleAddSection(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Adicionar Seção" />
            </SelectTrigger>
            <SelectContent>
              {sectionTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    {getSectionIcon(type.value)}
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma seção adicionada ainda.</p>
              <p className="text-sm">Use o menu acima para adicionar seções à página.</p>
            </div>
          ) : (
            sections
              .sort((a, b) => a.order_index - b.order_index)
              .map((section) => (
                <Card key={section.id} className={`${!section.visible ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          {getSectionIcon(section.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{section.title}</h4>
                          <p className="text-sm text-gray-600">{getSectionLabel(section.type)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleVisibility(section)}
                          disabled={updateSectionMutation.isPending}
                        >
                          {updateSectionMutation.isPending ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Badge variant={section.visible ? 'default' : 'secondary'}>
                              {section.visible ? 'Visível' : 'Oculto'}
                            </Badge>
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            if (confirm(`Tem a certeza que deseja eliminar a seção "${section.title}"?`)) {
                              handleDeleteSection(section.id);
                            }
                          }}
                          disabled={deleteSectionMutation.isPending}
                        >
                          {deleteSectionMutation.isPending ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>Ordem: {section.order_index}</p>
                      {section.content && Object.keys(section.content).length > 0 && (
                        <p className="mt-1">Conteúdo configurado</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
          
          {createSectionMutation.isPending && (
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span className="text-gray-600">Criando nova seção...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageSections;
