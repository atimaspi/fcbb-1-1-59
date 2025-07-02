
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, FileText, Download, Star } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  title: string;
  description: string;
  document_type: string;
  file_url: string;
  category: string;
  published: boolean;
  featured: boolean;
  download_count: number;
  created_at: string;
}

const DocumentsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: 'regulamento',
    file_url: '',
    category: 'geral',
    published: false,
    featured: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const documentTypes = ['regulamento', 'acta', 'comunicado', 'estatuto', 'relatorio', 'formulario'];
  const categories = ['geral', 'estatutos', 'regulamentos', 'relatorios', 'comunicados', 'formularios'];

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('official_documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Document[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('official_documents')
        .insert([{ ...data, download_count: 0 }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Documento criado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar documento', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from('official_documents')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: 'Documento atualizado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar documento', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('official_documents')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({ title: 'Documento eliminado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao eliminar documento', variant: 'destructive' });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      document_type: 'regulamento',
      file_url: '',
      category: 'geral',
      published: false,
      featured: false
    });
    setEditingDocument(null);
  };

  const handleEdit = (document: Document) => {
    setEditingDocument(document);
    setFormData({
      title: document.title,
      description: document.description || '',
      document_type: document.document_type,
      file_url: document.file_url,
      category: document.category,
      published: document.published,
      featured: document.featured
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDocument) {
      updateMutation.mutate({ id: editingDocument.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'regulamento': return 'Regulamento';
      case 'acta': return 'Acta';
      case 'comunicado': return 'Comunicado';
      case 'estatuto': return 'Estatuto';
      case 'relatorio': return 'Relatório';
      case 'formulario': return 'Formulário';
      default: return type;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando documentos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Documentos</h2>
          <p className="text-gray-600">Gerir documentos oficiais da FCBB</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingDocument ? 'Editar Documento' : 'Novo Documento'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Documento</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="document_type">Tipo de Documento</Label>
                  <Select value={formData.document_type} onValueChange={(value) => setFormData({ ...formData, document_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {getTypeLabel(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="file_url">URL do Arquivo</Label>
                <Input
                  id="file_url"
                  type="url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
                  />
                  <Label htmlFor="published">Publicado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured">Documento em destaque</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingDocument ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Lista de Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="font-medium">{document.title}</div>
                        {document.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{document.description}</div>
                        )}
                      </div>
                      {document.featured && <Star className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getTypeLabel(document.document_type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={document.published ? 'default' : 'secondary'}>
                      {document.published ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-gray-400" />
                      {document.download_count || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(document.created_at).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(document)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(document.id)}
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

export default DocumentsManager;
