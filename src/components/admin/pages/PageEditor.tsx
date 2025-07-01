
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Save, Eye, Globe, Loader2 } from 'lucide-react';
import { PageData } from './types';

interface PageEditorProps {
  page: PageData;
  onPageChange: (page: PageData) => void;
  onSave: () => void;
  isSaving?: boolean;
}

const PageEditor = ({ page, onPageChange, onSave, isSaving = false }: PageEditorProps) => {
  const generateSlug = (title: string) => {
    return '/' + title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleTitleChange = (title: string) => {
    const updatedPage = { ...page, title };
    
    // Auto-generate slug if it's empty or matches the previous title pattern
    if (!page.slug || page.slug === '/' || page.slug.includes('nova-pagina')) {
      updatedPage.slug = generateSlug(title);
    }
    
    onPageChange(updatedPage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Rascunho';
      case 'archived':
        return 'Arquivado';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Editar Página</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(page.status)}>
              {getStatusLabel(page.status)}
            </Badge>
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-3 h-3 mr-1" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="page-title">Título da Página</Label>
            <Input
              id="page-title"
              value={page.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título da página"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="page-slug">URL/Slug</Label>
            <Input
              id="page-slug"
              value={page.slug}
              onChange={(e) => onPageChange({...page, slug: e.target.value})}
              placeholder="/exemplo-url"
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="page-content">Conteúdo</Label>
          <Textarea
            id="page-content"
            value={page.content}
            onChange={(e) => onPageChange({...page, content: e.target.value})}
            placeholder="Conteúdo da página"
            rows={4}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="page-status">Status</Label>
            <Select 
              value={page.status} 
              onValueChange={(value) => onPageChange({...page, status: value as PageData['status']})}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="page-order">Ordem</Label>
            <Input
              id="page-order"
              type="number"
              value={page.order_index}
              onChange={(e) => onPageChange({...page, order_index: parseInt(e.target.value) || 0})}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="seo-title">SEO Título</Label>
            <Input
              id="seo-title"
              value={page.seo_title || ''}
              onChange={(e) => onPageChange({...page, seo_title: e.target.value})}
              placeholder="Título para SEO"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="seo-description">SEO Descrição</Label>
            <Input
              id="seo-description"
              value={page.seo_description || ''}
              onChange={(e) => onPageChange({...page, seo_description: e.target.value})}
              placeholder="Descrição para SEO"
              className="mt-1"
            />
          </div>
        </div>

        {page.created_at && (
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <strong>Criado em:</strong> {new Date(page.created_at).toLocaleString('pt-PT')}
              </div>
              <div>
                <strong>Atualizado em:</strong> {new Date(page.updated_at).toLocaleString('pt-PT')}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageEditor;
