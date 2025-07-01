
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Eye, Globe, Code, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PublicAPI = () => {
  const [apiStats, setApiStats] = useState({
    news: 0,
    championships: 0,
    clubs: 0,
    games: 0,
    gallery: 0,
    partners: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchApiStats();
  }, []);

  const fetchApiStats = async () => {
    try {
      const tables = ['news', 'championships', 'clubs', 'games', 'gallery', 'partners'];
      const stats: any = {};

      for (const table of tables) {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
          .eq('status', 'publicado');

        if (!error) {
          stats[table] = count || 0;
        }
      }

      setApiStats(stats);
    } catch (error) {
      console.error('Error fetching API stats:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Endpoint copiado para a área de transferência.",
    });
  };

  const apiEndpoints = [
    {
      name: 'Notícias',
      endpoint: '/api/noticias',
      description: 'Lista todas as notícias publicadas',
      count: apiStats.news,
      example: {
        method: 'GET',
        params: '?page=1&limit=10&category=desporto',
        response: {
          data: [
            {
              id: "uuid",
              title: "Título da notícia",
              excerpt: "Resumo da notícia",
              content: "Conteúdo completo",
              category: "desporto",
              author: "Nome do autor",
              published_at: "2024-01-01T00:00:00Z",
              image_url: "https://..."
            }
          ],
          meta: {
            total: 100,
            page: 1,
            limit: 10,
            pages: 10
          }
        }
      }
    },
    {
      name: 'Competições',
      endpoint: '/api/competicoes',
      description: 'Lista todas as competições ativas',
      count: apiStats.championships,
      example: {
        method: 'GET',
        params: '?season=2024&status=active',
        response: {
          data: [
            {
              id: "uuid",
              name: "Liga Nacional 2024",
              season: "2024",
              type: "championship",
              status: "active",
              start_date: "2024-01-01",
              end_date: "2024-12-31"
            }
          ]
        }
      }
    },
    {
      name: 'Clubes',
      endpoint: '/api/clubes',
      description: 'Lista todos os clubes registados',
      count: apiStats.clubs,
      example: {
        method: 'GET',
        params: '?island=santiago&active=true',
        response: {
          data: [
            {
              id: "uuid",
              name: "Nome do Clube",
              island: "Santiago",
              founded_year: 1990,
              logo_url: "https://...",
              active: true
            }
          ]
        }
      }
    },
    {
      name: 'Jogos',
      endpoint: '/api/jogos',
      description: 'Lista jogos e resultados',
      count: apiStats.games,
      example: {
        method: 'GET',
        params: '?date=2024-01-01&status=finished',
        response: {
          data: [
            {
              id: "uuid",
              home_team: "Clube A",
              away_team: "Clube B",
              home_score: 85,
              away_score: 78,
              scheduled_date: "2024-01-01T19:00:00Z",
              status: "finished"
            }
          ]
        }
      }
    },
    {
      name: 'Galeria',
      endpoint: '/api/galeria',
      description: 'Lista galerias de imagens publicadas',
      count: apiStats.gallery,
      example: {
        method: 'GET',
        params: '?event=liga_nacional',
        response: {
          data: [
            {
              id: "uuid",
              title: "Liga Nacional - Jornada 1",
              description: "Imagens da primeira jornada",
              image_count: 15,
              published_at: "2024-01-01T00:00:00Z"
            }
          ]
        }
      }
    },
    {
      name: 'Parceiros',
      endpoint: '/api/parceiros',
      description: 'Lista parceiros e patrocinadores',
      count: apiStats.partners,
      example: {
        method: 'GET',
        params: '?category=sponsor&active=true',
        response: {
          data: [
            {
              id: "uuid",
              name: "Nome do Parceiro",
              category: "sponsor",
              logo_url: "https://...",
              website_url: "https://...",
              active: true
            }
          ]
        }
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cv-blue mb-2">API Pública FCBB</h2>
        <p className="text-gray-600">
          Documentação e endpoints da API pública para acesso aos dados da FCBB
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Object.values(apiStats).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-sm text-gray-600">Total de Registos Públicos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {apiEndpoints.length}
                </div>
                <div className="text-sm text-gray-600">Endpoints Disponíveis</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">REST</div>
                <div className="text-sm text-gray-600">Formato da API</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Gerais da API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cv-blue" />
            Informações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Base URL</h4>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                https://fcbb.cv/api/v1
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Formato de Resposta</h4>
              <Badge className="bg-green-100 text-green-800">JSON</Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Autenticação</h4>
            <p className="text-sm text-gray-600">
              Todos os endpoints públicos não requerem autenticação. 
              Apenas conteúdo com status "publicado" é retornado.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Paginação</h4>
            <p className="text-sm text-gray-600 mb-2">
              A maioria dos endpoints suporta paginação através dos parâmetros:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li><code>page</code> - Número da página (padrão: 1)</li>
              <li><code>limit</code> - Itens por página (padrão: 20, máximo: 100)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Endpoints Disponíveis</h3>
        
        {apiEndpoints.map((endpoint, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-cv-blue" />
                  {endpoint.name}
                  <Badge variant="outline">{endpoint.count} registos</Badge>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(`https://fcbb.cv/api/v1${endpoint.endpoint}`)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copiar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800">
                    {endpoint.example.method}
                  </Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {endpoint.endpoint}
                  </code>
                </div>
                <p className="text-sm text-gray-600">{endpoint.description}</p>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Exemplo de Requisição</h5>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <div className="text-green-400">
                    GET https://fcbb.cv/api/v1{endpoint.endpoint}{endpoint.example.params}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Exemplo de Resposta</h5>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <pre>{JSON.stringify(endpoint.example.response, null, 2)}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Códigos de Status */}
      <Card>
        <CardHeader>
          <CardTitle>Códigos de Status HTTP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">200</Badge>
              <span className="text-sm">Sucesso - Dados retornados</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-100 text-gray-800">404</Badge>
              <span className="text-sm">Não encontrado - Recurso não existe</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-red-100 text-red-800">500</Badge>
              <span className="text-sm">Erro interno do servidor</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicAPI;
