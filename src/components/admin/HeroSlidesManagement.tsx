
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useApi } from '@/hooks/useApi';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HeroSlidesManagement = () => {
  const { useFetch, useCreate, useUpdate, useDelete } = useApi();
  const { data: slides = [], isLoading } = useFetch('hero_slides');
  const createSlide = useCreate('hero_slides');
  const updateSlide = useUpdate('hero_slides');
  const deleteSlide = useDelete('hero_slides');
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    cta_text: 'Ver Mais',
    cta_link: '/',
    order_index: 0,
    active: true
  });

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      cta_text: 'Ver Mais',
      cta_link: '/',
      order_index: 0,
      active: true
    });
    setEditingSlide(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSlide) {
        await updateSlide.mutateAsync({ id: editingSlide.id, data: formData });
      } else {
        await createSlide.mutateAsync(formData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar slide:', error);
    }
  };

  const handleEdit = (slide: any) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      image_url: slide.image_url || '',
      cta_text: slide.cta_text || 'Ver Mais',
      cta_link: slide.cta_link || '/',
      order_index: slide.order_index || 0,
      active: slide.active ?? true
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este slide?')) {
      await deleteSlide.mutateAsync(id);
    }
  };

  if (isLoading) {
    return <div>Carregando slides...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue">Gestão de Slides do Banner</h2>
          <p className="text-gray-600">Gerir slides principais da página inicial</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSlide ? 'Editar Slide' : 'Novo Slide'}</DialogTitle>
              <DialogDescription>
                {editingSlide ? 'Edite as informações do slide' : 'Adicione um novo slide ao banner principal'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">URL da Imagem *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_text">Texto do Botão</Label>
                  <Input
                    id="cta_text"
                    value={formData.cta_text}
                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_link">Link do Botão</Label>
                  <Input
                    id="cta_link"
                    value={formData.cta_link}
                    onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order_index">Ordem</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Ativo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
                  {editingSlide ? 'Salvar Alterações' : 'Criar Slide'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide: any) => (
          <Card key={slide.id} className={`${!slide.active ? 'opacity-50' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{slide.title}</CardTitle>
                  {slide.subtitle && (
                    <CardDescription>{slide.subtitle}</CardDescription>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(slide)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(slide.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {slide.image_url && (
                <div className="mb-3">
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              {slide.description && (
                <p className="text-sm text-gray-600 mb-3">{slide.description}</p>
              )}
              <div className="flex justify-between text-xs text-gray-500">
                <span>Ordem: {slide.order_index}</span>
                <span>Status: {slide.active ? 'Ativo' : 'Inativo'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroSlidesManagement;
