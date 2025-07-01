
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useUnifiedApi } from '@/hooks/useUnifiedApi';
import { FileText, Plus, Edit, Trash2, Download, Upload } from 'lucide-react';

const DocumentsManagement = () => {
  const { useOptimizedFetch, useOptimizedCreate, useOptimizedUpdate, useOptimizedDelete } = useUnifiedApi();
  
  const { data: documents = [], isLoading } = useOptimizedFetch('official_documents');
  
  const createDocument = useOptimizedCreate('official_documents');
  const updateDocument = useOptimizedUpdate('official_documents');
  const deleteDocument = useOptimizedDelete('official_documents');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: '',
    file_url: '',
    file_size: 0,
    file_type: '',
    category: 'geral',
    published: false,
    featured: false
  });

  const documentTypes = [
    { value: 'regulamento', label: 'Regulamento' },
    { value: 'acta', label: 'Acta' },
    { value: 'comunicado', label: 'Comunicado' },
    { value: 'estatuto', label: 'Estatuto' },
    { value: 'relatorio', label: 'Relatório' },
    { value: 'convocatoria', label: 'Convocatória' }
  ];

  const categories = [
    { value: 'geral', label: 'Geral' },
    { value: 'competicoes', label: 'Competições' },
    { value: 'formacao', label: 'Formação' },
    { value: 'arbitragem', label: 'Arbitragem' },
    { value: 'legal', label: 'Legal' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const documentData = {
        ...formData,
        file_size: parseInt(formData.file_size.toString()) || 0
      };

      if (editingDocument) {
        await updateDocument.mutateAsync({ id: editingDocument.id, data: documentData });
      } else {
        await createDocument.mutateAsync(documentData);
      }
      
      setIsDialogOpen(false);
      setEditingDocument(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar documento:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      document_type: '',
      file_url: '',
      file_size: 0,
      file_type: '',
      category: 'geral',
      published: false,
      featured: false
    });
  };

  const handleEdit = (document: any) => {
    setEditingDocument(document);
    setFormData({
      title: document.title || '',
      description: document.description || '',
      document_type: document.document_type || '',
      file_url: document.file_url || '',
      file_size: document.file_size || 0,
      file_type: document.file_type || '',
      category: document.category || 'geral',
      published: document.published || false,
      featured: document.featured || false
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja eliminar este documento?')) {
      await deleteDocument.mutateAsync(id);
    }
  };

  const getTypeBadge = (type: string) => {
    const typeColors = {
      'regulamento': 'bg-blue-100 text-blue-800 border-blue-200',
      'acta': 'bg-green-100 text-green-800 border-green-200',
      'comunicado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'estatuto': 'bg-purple-100 text-purple-800 border-purple-200',
      'relatorio': 'bg-orange-100 text-orange-800 border-orange-200',
      'convocatoria': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <Badge variant="outline" className={typeColors[type as keyof typeof typeColors] || 'bg-gray-100'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return <div>Carregando documentos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cv-blue flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Gestão de Documentos
          </h2>
          <p className="text-gray-600">Gerir documentos oficiais da FCBB</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
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
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="document_type">Tipo de Documento</Label>
                  <Select 
                    value={formData.document_type} 
                    onValueChange={(value) => setFormData({...formData, document_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="file_url">URL do Ficheiro</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                  placeholder="https://exemplo.com/documento.pdf"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="file_type">Tipo de Ficheiro</Label>
                  <Input
                    id="file_type"
                    value={formData.file_type}
                    onChange={(e) => setFormData({...formData, file_type: e.target.value})}
                    placeholder="PDF, DOC, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="file_size">Tamanho (bytes)</Label>
                  <Input
                    id="file_size"
                    type="number"
                    value={formData.file_size}
                    onChange={(e) => setFormData({...formData, file_size: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  />
                  <span>Publicado</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span>Destacado</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-cv-blue hover:bg-cv-blue/90">
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
            <Upload className="w-5 h-5" />
            Documentos Registados ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document: any) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{document.title}</div>
                      {document.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {document.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(document.document_type)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-50">
                      {document.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(document.file_size || 0)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {document.published && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Publicado
                        </Badge>
                      )}
                      {document.featured && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Destacado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{document.download_count || 0}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(document.file_url, '_blank')}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(document)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document.id)}
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

export default DocumentsManagement;
