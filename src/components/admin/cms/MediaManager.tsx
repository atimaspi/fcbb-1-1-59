
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Image, Video, FileText, Music, Folder, Search, Filter, Grid, List } from 'lucide-react';
import { useMedia, useUploadMedia, useCategories } from '@/hooks/useCMSData';
import { Media } from '@/types/cms';

const MediaManager = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category_id: '',
    folder_path: '/'
  });

  const { data: media = [], isLoading } = useMedia();
  const { data: categories = [] } = useCategories();
  const uploadMediaMutation = useUploadMedia();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setUploadData(prev => ({
        ...prev,
        title: e.target.files![0].name.split('.')[0]
      }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFiles || selectedFiles.length === 0) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      await uploadMediaMutation.mutateAsync({
        file,
        title: uploadData.title || file.name,
        description: uploadData.description,
        category_id: uploadData.category_id || undefined,
        folder_path: uploadData.folder_path
      });
    }

    setIsUploadDialogOpen(false);
    setSelectedFiles(null);
    setUploadData({
      title: '',
      description: '',
      category_id: '',
      folder_path: '/'
    });
  };

  const getFileIcon = (fileType: string) => {
    switch(fileType) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.original_filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.file_type === filterType;
    return matchesSearch && matchesType;
  });

  const mediaStats = {
    total: media.length,
    images: media.filter(m => m.file_type === 'image').length,
    videos: media.filter(m => m.file_type === 'video').length,
    documents: media.filter(m => m.file_type === 'document').length,
    audio: media.filter(m => m.file_type === 'audio').length
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando media...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Media</h2>
          <p className="text-gray-600">Gerir ficheiros multimédia do site</p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Carregar Ficheiros
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Carregar Novos Ficheiros</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="files">Selecionar Ficheiros</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  className="cursor-pointer"
                />
              </div>
              
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={uploadData.title}
                  onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={uploadData.category_id} onValueChange={(value) => setUploadData(prev => ({ ...prev, category_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="folder">Pasta</Label>
                <Input
                  id="folder"
                  value={uploadData.folder_path}
                  onChange={(e) => setUploadData(prev => ({ ...prev, folder_path: e.target.value }))}
                  placeholder="/uploads/"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!selectedFiles || uploadMediaMutation.isPending}>
                  Carregar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">{mediaStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Imagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mediaStats.images}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Vídeos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{mediaStats.videos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mediaStats.documents}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Áudio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mediaStats.audio}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Pesquisar ficheiros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="image">Imagens</SelectItem>
                  <SelectItem value="video">Vídeos</SelectItem>
                  <SelectItem value="audio">Áudio</SelectItem>
                  <SelectItem value="document">Documentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Media */}
      <Card>
        <CardHeader>
          <CardTitle>Ficheiros Media ({filteredMedia.length})</CardTitle>
          <CardDescription>
            Biblioteca de ficheiros multimédia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      {item.file_type === 'image' ? (
                        <img 
                          src={item.file_url} 
                          alt={item.alt_text || item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400">
                          {getFileIcon(item.file_type)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm truncate">{item.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {item.file_type}
                        </Badge>
                        <span>{formatFileSize(item.file_size)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    {getFileIcon(item.file_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.title}</div>
                    <div className="text-sm text-gray-500 truncate">{item.original_filename}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="outline">{item.file_type}</Badge>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {formatFileSize(item.file_size)}
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString('pt-PT')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManager;
