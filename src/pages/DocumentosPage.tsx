
import React from 'react';
import PageLayout from './PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Eye } from 'lucide-react';

const DocumentosPage = () => {
  const documents = [
    {
      id: 1,
      title: "Regulamento da Liga Nacional 2024/25",
      type: "Regulamento",
      date: "2024-08-15",
      size: "2.3 MB",
      downloads: 1240,
      category: "Competições"
    },
    {
      id: 2,
      title: "Estatutos da FCBB (Atualizado)",
      type: "Estatutos",
      date: "2024-06-20",
      size: "1.8 MB",
      downloads: 856,
      category: "Institucional"
    },
    {
      id: 3,
      title: "Regulamento Disciplinar",
      type: "Regulamento",
      date: "2024-07-10",
      size: "1.5 MB",
      downloads: 672,
      category: "Disciplinar"
    },
    {
      id: 4,
      title: "Manual de Arbitragem FIBA 2024",
      type: "Manual",
      date: "2024-05-30",
      size: "4.1 MB",
      downloads: 945,
      category: "Arbitragem"
    },
    {
      id: 5,
      title: "Calendário Oficial 2024/25",
      type: "Calendário",
      date: "2024-08-25",
      size: "0.8 MB",
      downloads: 1567,
      category: "Competições"
    },
    {
      id: 6,
      title: "Formulário de Inscrição de Jogadores",
      type: "Formulário",
      date: "2024-07-01",
      size: "0.3 MB",
      downloads: 2340,
      category: "Registos"
    }
  ];

  const categories = [
    { name: "Todos", count: 45, active: true },
    { name: "Competições", count: 18, active: false },
    { name: "Regulamentos", count: 12, active: false },
    { name: "Formulários", count: 8, active: false },
    { name: "Arbitragem", count: 7, active: false },
    { name: "Institucional", count: 6, active: false }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Regulamento':
        return 'bg-cv-blue text-white';
      case 'Manual':
        return 'bg-cv-red text-white';
      case 'Formulário':
        return 'bg-cv-yellow text-white';
      case 'Calendário':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <PageLayout 
      title="Documentos"
      description="Aceda a todos os documentos oficiais da FCBB"
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center border-t-4 border-cv-blue">
            <CardContent className="p-4">
              <FileText className="h-6 w-6 text-cv-blue mx-auto mb-2" />
              <div className="text-xl font-bold text-cv-blue">42</div>
              <div className="text-sm text-gray-600">Documentos</div>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-cv-red">
            <CardContent className="p-4">
              <Download className="h-6 w-6 text-cv-red mx-auto mb-2" />
              <div className="text-xl font-bold text-cv-red">8.6K</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-cv-yellow">
            <CardContent className="p-4">
              <Calendar className="h-6 w-6 text-cv-yellow mx-auto mb-2" />
              <div className="text-xl font-bold text-cv-yellow">12</div>
              <div className="text-sm text-gray-600">Atualizações</div>
            </CardContent>
          </Card>
          <Card className="text-center border-t-4 border-green-500">
            <CardContent className="p-4">
              <Eye className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-500">23.4K</div>
              <div className="text-sm text-gray-600">Visualizações</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              className={`px-4 py-2 cursor-pointer ${
                category.active 
                  ? 'bg-cv-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-cv-blue hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FileText className="w-6 h-6 text-cv-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-cv-blue mb-1">{doc.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <Badge className={getTypeColor(doc.type)}>
                          {doc.type}
                        </Badge>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(doc.date).toLocaleDateString('pt-PT')}
                        </div>
                        <span>{doc.size}</span>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {doc.downloads}
                        </div>
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {doc.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                    <Button size="sm" className="bg-cv-blue hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <ul>
                <li>Todos os documentos estão em formato PDF e requerem Adobe Reader ou equivalente.</li>
                <li>Os regulamentos são atualizados anualmente antes do início de cada época.</li>
                <li>Para questões sobre documentos, contacte a secretaria da FCBB.</li>
                <li>Alguns documentos podem requerer credenciais especiais para acesso.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DocumentosPage;
