
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface NewsFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isSubmitting?: boolean;
}

const NewsForm: React.FC<NewsFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'geral',
    status: 'draft',
    author: 'Admin',
    image_url: '',
    featured: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        category: initialData.category || 'geral',
        status: initialData.status || 'draft',
        author: initialData.author || 'Admin',
        image_url: initialData.image_url || '',
        featured: initialData.featured || false
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categories = [
    'geral', 'competições', 'clubes', 'jogadores', 'internacional', 'formação'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Título da notícia"
          required
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleInputChange('excerpt', e.target.value)}
          placeholder="Breve resumo da notícia"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="content">Conteúdo *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          placeholder="Conteúdo completo da notícia"
          rows={6}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Rascunho</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="Nome do autor"
          />
        </div>
        <div>
          <Label htmlFor="featured">Destaque</Label>
          <Select value={formData.featured.toString()} onValueChange={(value) => handleInputChange('featured', value === 'true')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="false">Não</SelectItem>
              <SelectItem value="true">Sim</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="image_url">URL da Imagem</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => handleInputChange('image_url', e.target.value)}
          placeholder="URL da imagem da notícia"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'A gravar...' : (initialData ? 'Atualizar' : 'Criar')} Notícia
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
