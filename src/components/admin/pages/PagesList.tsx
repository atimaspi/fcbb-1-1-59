import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { PageCategory } from './PageCategorySidebar';
import { PageData } from './types';

interface PagesListProps {
  category: PageCategory;
  pages: PageData[];
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
  onPageEdit: (page: PageData) => void;
  onPageDelete: (pageId: string) => void;
  isDeleting?: boolean;
}

const PagesList = ({ 
  category, 
  pages, 
  selectedPage, 
  onPageSelect, 
  onPageEdit, 
  onPageDelete,
  isDeleting = false
}: PagesListProps) => {
  // Filter pages by category
  const categoryPages = pages.filter(page => page.category === category.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {category.name}
          <Badge variant="secondary">{categoryPages.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categoryPages.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">Nenhuma página nesta categoria</p>
            </div>
          ) : (
            categoryPages.map((page) => (
              <Card 
                key={page.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPage === page.id ? 'border-cv-blue bg-blue-50' : ''
                }`}
                onClick={() => onPageSelect(page.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 truncate">{page.title}</h4>
                    <Badge className={getStatusColor(page.status)}>
                      {getStatusLabel(page.status)}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-4">
                      <span>URL: {page.slug}</span>
                      <span>•</span>
                      <span>Ordem: {page.order_index}</span>
                    </div>
                  </div>

                  {page.content && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {page.content.substring(0, 100)}...
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Atualizado: {new Date(page.updated_at).toLocaleDateString('pt-PT')}
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPageEdit(page);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPageDelete(page.id);
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PagesList;
