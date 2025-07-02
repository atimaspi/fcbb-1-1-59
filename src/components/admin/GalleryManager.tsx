
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Image, Eye } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Gallery {
  id: string;
  title: string;
  description: string;
  event: string;
  status: string;
  published_at: string;
  image_count: number;
  created_at: string;
}

const GalleryManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event: '',
    status: 'draft'
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: galleries = [], isLoading } = useQuery({
    queryKey: ['galleries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Gallery[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('gallery')
        .insert([{ ...data, image_count: 0 }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Galeria criada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar galeria', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const updateData: any = { ...data };
      if (data.status === 'published' && !editingGallery?.published_at) {
        updateData.published_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from('gallery')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Galeria atualizada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar galeria', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] });
      toast({ title: 'Galeria eliminada com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar galeria', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event: '',
      status: 'draft'
    });
    setEditingGallery(null);
  };

  const handleEdit = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      description: gallery.description || '',
      event: gallery.event || '',
      status: gallery.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGallery) {
      updateMutation.mutate({ id: editingGallery.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicada';
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendada';
      default: return status;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando galerias...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Galeria</h2>
          <p className="text-gray-600">Gerir galerias de imagens e eventos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Galeria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingGallery ? 'Editar Galeria' : 'Nova Galeria'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Galeria</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="event">Evento</Label>
                <Input
                  id="event"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicada</SelectItem>
                    <SelectItem value="scheduled">Agendada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingGallery ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Lista de Galerias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Imagens</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleries.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{gallery.title}</div>
                      {gallery.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{gallery.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {gallery.event && (
                      <Badge variant="outline">{gallery.event}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(gallery.status)}>
                      {getStatusLabel(gallery.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Image className="w-4 h-4 text-gray-400" />
                      {gallery.image_count || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(gallery.created_at).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(gallery)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(gallery.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManager;
