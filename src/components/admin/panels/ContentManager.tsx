
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  FileText, 
  Image, 
  Video, 
  Trophy, 
  Users, 
  Plus,
  Edit, 
  Trash2, 
  Eye,
  Upload,
  Calendar,
  Tag
} from 'lucide-react';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data para demonstração
  const newsData = [
    {
      id: 1,
      title: 'FCBB anuncia novo campeonato nacional',
      category: 'competicoes',
      status: 'published',
      author: 'Admin FCBB',
      date: '2024-06-30',
      views: 1250
    },
    {
      id: 2,
      title: 'Seleção nacional prepara-se para torneio',
      category: 'selecoes',
      status: 'draft',
      author: 'Editor',
      date: '2024-06-29',
      views: 0
    }
  ];

  const mediaData = [
    {
      id: 1,
      name: 'Final do Campeonato 2024',
      type: 'video',
      size: '250MB',
      date: '2024-06-28',
      category: 'competicoes'
    },
    {
      id: 2,
      name: 'Treino da Seleção',
      type: 'image',
      size: '2.5MB',
      date: '2024-06-27',
      category: 'selecoes'
    }
  ];

  const competitionsData = [
    {
      id: 1,
      name: 'Campeonato Nacional 2024',
      type: 'championship',
      status: 'active',
      teams: 12,
      games: 66,
      startDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Taça Nacional 2024',
      type: 'cup',
      status: 'upcoming',
      teams: 16,
      games: 15,
      startDate: '2024-07-10'
    }
  ];

  const NewsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Notícias</h3>
          <p className="text-sm text-gray-600">Criar e gerir artigos de notícias</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cv-blue hover:bg-cv-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Notícia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Notícia</DialogTitle>
              <DialogDescription>
                Preencha os campos para criar uma nova notícia
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Título da notícia" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="competicoes">Competições</SelectItem>
                      <SelectItem value="selecoes">Seleções</SelectItem>
                      <SelectItem value="clubes">Clubes</SelectItem>
                      <SelectItem value="geral">Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea id="excerpt" placeholder="Resumo da notícia" rows={3} />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea id="content" placeholder="Conteúdo completo da notícia" rows={8} />
              </div>
              <div>
                <Label htmlFor="image">Imagem de Destaque</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="featured" />
                <Label htmlFor="featured">Notícia em destaque</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-cv-blue hover:bg-cv-blue/90">
                  Criar Notícia
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Visualizações</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{news.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={news.status === 'published' ? 'default' : 'secondary'}>
                      {news.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell>{news.author}</TableCell>
                  <TableCell>{news.date}</TableCell>
                  <TableCell>{news.views}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
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

  const MediaContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Multimédia</h3>
          <p className="text-sm text-gray-600">Gerir fotos, vídeos e documentos</p>
        </div>
        <Button className="bg-cv-blue hover:bg-cv-blue/90">
          <Upload className="h-4 w-4 mr-2" />
          Carregar Ficheiro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total de Ficheiros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cv-blue">2,456</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Imagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,823</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Vídeos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">399</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mediaData.map((media) => (
                <TableRow key={media.id}>
                  <TableCell className="font-medium flex items-center space-x-2">
                    {media.type === 'video' ? <Video className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                    <span>{media.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {media.type === 'video' ? 'Vídeo' : 'Imagem'}
                    </Badge>
                  </TableCell>
                  <TableCell>{media.size}</TableCell>
                  <TableCell>{media.category}</TableCell>
                  <TableCell>{media.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
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

  const CompetitionsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestão de Competições</h3>
          <p className="text-sm text-gray-600">Gerir campeonatos e torneios</p>
        </div>
        <Button className="bg-cv-blue hover:bg-cv-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Competição
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Equipas</TableHead>
                <TableHead>Jogos</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitionsData.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell className="font-medium">{comp.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {comp.type === 'championship' ? 'Campeonato' : 'Taça'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={comp.status === 'active' ? 'default' : 'secondary'}>
                      {comp.status === 'active' ? 'Ativo' : 'Próximo'}
                    </Badge>
                  </TableCell>
                  <TableCell>{comp.teams}</TableCell>
                  <TableCell>{comp.games}</TableCell>
                  <TableCell>{comp.startDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="news" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Notícias</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center space-x-2">
            <Image className="h-4 w-4" />
            <span>Multimédia</span>
          </TabsTrigger>
          <TabsTrigger value="competitions" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Competições</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <NewsContent />
        </TabsContent>

        <TabsContent value="media">
          <MediaContent />
        </TabsContent>

        <TabsContent value="competitions">
          <CompetitionsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
