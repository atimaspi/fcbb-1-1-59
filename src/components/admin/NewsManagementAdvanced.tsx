
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useBackendData } from '@/hooks/useBackendData';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Tag, Image, Video } from 'lucide-react';
import FileUploader from '@/components/media/FileUploader';
import MediaGallery from '@/components/media/MediaGallery';

const NewsManagementAdvanced = () => {
  const { newsData, operations, newsLoading } = useBackendData();
  const { toast } = useToast();
  
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'geral',
    published: false,
    featured: false,
    featured_image_url: '',
    video_url: '',
    tags: [] as string[],
    gallery_images: [] as any[],
    attachments: [] as any[]
  });
  const [newTag, setNewTag] = useState('');

  const categories = [
    'geral', 'competições', 'seleções', 'clubes', 'formação', 'arbitragem'
  ];

  const handleEdit = (news: any) => {
    setSelectedNews(news);
    setFormData({
      title: news.title || '',
      content: news.content || '',
      excerpt: news.excerpt || '',
      category: news.category || 'geral',
      published: news.published || false,
      featured: news.featured || false,
      featured_image_url: news.featured_image_url || '',
      video_url: news.video_url || '',
      tags: news.tags || [],
      gallery_images: news.gallery_images || [],
      attachments: news.attachments || []
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setSelectedNews(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'geral',
      published: false,
      featured: false,
      featured_image_url: '',
      video_url: '',
      tags: [],
      gallery_images: [],
      attachments: []
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (selectedNews) {
        await operations.news.update.mutateAsync({
          id: selectedNews.id,
          data: formData
        });
        toast({ title: "Sucesso", description: "Notícia atualizada!" });
      } else {
        await operations.news.create.mutateAsync(formData);
        toast({ title: "Sucesso", description: "Notícia criada!" });
      }
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (newsId: string) => {
    if (window.confirm('Tem certeza que deseja eliminar esta notícia?')) {
      try {
        await operations.news.delete.mutateAsync(newsId);
        toast({ title: "Sucesso", description: "Notícia eliminada!" });
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (file: any, type: 'featured' | 'gallery' | 'attachment') => {
    if (type === 'featured') {
      setFormData(prev => ({ ...prev, featured_image_url: file.url }));
    } else if (type === 'gallery') {
      setFormData(prev => ({
        ...prev,
        gallery_images: [...prev.gallery_images, file]
      }));
    } else if (type === 'attachment') {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, file]
      }));
    }
  };

  const handleFileRemove = (fileId: string, type: 'gallery' | 'attachment') => {
    if (type === 'gallery') {
      setFormData(prev => ({
        ...prev,
        gallery_images: prev.gallery_images.filter(img => img.id !== fileId)
      }));
    } else if (type === 'attachment') {
      setFormData(prev => ({
        ...prev,
        attachments: prev.attachments.filter(att => att.id !== fileId)
      }));
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-cv-blue">
            {selectedNews ? 'Editar Notícia' : 'Nova Notícia'}
          </h3>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-cv-blue hover:bg-blue-700">
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário principal */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título da notícia"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Breve resumo da notícia"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Conteúdo *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Conteúdo completo da notícia"
                    rows={10}
                  />
                </div>

                <div>
                  <Label htmlFor="video_url">URL do Vídeo (opcional)</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Galeria de imagens */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Galeria de Imagens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={(file) => handleFileUpload(file, 'gallery')}
                  entityType="news"
                  entityId={selectedNews?.id}
                  allowedTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif']}
                  folder="news/gallery"
                />
                
                {formData.gallery_images.length > 0 && (
                  <MediaGallery
                    files={formData.gallery_images}
                    onFileRemove={(fileId) => handleFileRemove(fileId, 'gallery')}
                    editable
                  />
                )}
              </CardContent>
            </Card>

            {/* Anexos */}
            <Card>
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={(file) => handleFileUpload(file, 'attachment')}
                  entityType="news"
                  entityId={selectedNews?.id}
                  allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                  folder="news/attachments"
                />
                
                {formData.attachments.length > 0 && (
                  <MediaGallery
                    files={formData.attachments}
                    onFileRemove={(fileId) => handleFileRemove(fileId, 'attachment')}
                    editable
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Publicada</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Destaque</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Imagem destacada */}
            <Card>
              <CardHeader>
                <CardTitle>Imagem Destacada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUploader
                  onFileUpload={(file) => handleFileUpload(file, 'featured')}
                  entityType="news"
                  entityId={selectedNews?.id}
                  allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  maxFiles={1}
                  folder="news/featured"
                />
                
                {formData.featured_image_url && (
                  <div className="relative">
                    <img
                      src={formData.featured_image_url}
                      alt="Imagem destacada"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, featured_image_url: '' }))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Nova tag"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-cv-blue">Gestão de Notícias</h3>
        <Button onClick={handleCreate} className="bg-cv-blue hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Notícia
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {newsData.map((news: any) => (
          <Card key={news.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{news.title}</h4>
                    <Badge variant={news.published ? 'default' : 'secondary'}>
                      {news.published ? 'Publicada' : 'Rascunho'}
                    </Badge>
                    {news.featured && (
                      <Badge variant="outline">Destaque</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{news.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Categoria: {news.category}</span>
                    <span>Criada: {new Date(news.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(news)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(news.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsManagementAdvanced;
