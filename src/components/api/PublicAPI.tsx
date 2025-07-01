
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const PublicAPI = () => {
  const [apiData, setApiData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState('news');

  const endpoints = [
    { key: 'news', label: 'Notícias', table: 'news' as const },
    { key: 'championships', label: 'Competições', table: 'championships' as const },
    { key: 'clubs', label: 'Clubes', table: 'clubs' as const },
    { key: 'games', label: 'Jogos', table: 'games' as const },
    { key: 'gallery', label: 'Galeria', table: 'gallery' as const },
    { key: 'national_teams', label: 'Seleções', table: 'national_teams' as const },
    { key: 'training_programs', label: 'Formação', table: 'training_programs' as const },
    { key: 'broadcasts', label: 'Transmissões', table: 'broadcasts' as const }
  ];

  const fetchData = async (tableName: string) => {
    setLoading(true);
    try {
      // Use type assertion to handle dynamic table names safely
      const { data, error } = await (supabase as any)
        .from(tableName)
        .select('*')
        .eq('status', 'publicado')
        .limit(10);

      if (error) throw error;
      
      setApiData(prev => ({
        ...prev,
        [tableName]: data
      }));
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const endpoint = endpoints.find(e => e.key === activeEndpoint);
    if (endpoint) {
      fetchData(endpoint.table);
    }
  }, [activeEndpoint]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cv-blue mb-2">API Pública FCBB</h1>
        <p className="text-gray-600">
          Endpoints da API para acesso aos dados públicos da Federação
        </p>
      </div>

      <Tabs value={activeEndpoint} onValueChange={setActiveEndpoint}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {endpoints.map((endpoint) => (
            <TabsTrigger key={endpoint.key} value={endpoint.key}>
              {endpoint.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {endpoints.map((endpoint) => (
          <TabsContent key={endpoint.key} value={endpoint.key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>/api/{endpoint.key}</span>
                  <Badge variant="outline">GET</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Exemplo de Resposta:</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      {loading ? (
                        'Carregando...'
                      ) : (
                        JSON.stringify(apiData[endpoint.table] || [], null, 2)
                      )}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Parâmetros de Query:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><code>page</code> - Número da página (padrão: 1)</li>
                      <li><code>limit</code> - Itens por página (máx: 100)</li>
                      <li><code>category</code> - Filtrar por categoria</li>
                      <li><code>date_from</code> - Filtrar a partir de data</li>
                      <li><code>date_to</code> - Filtrar até data</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Documentação da API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Base URL</h3>
              <code className="bg-gray-100 px-2 py-1 rounded">
                https://sua-app.lovable.app/api
              </code>
            </div>
            
            <div>
              <h3 className="font-semibold">Autenticação</h3>
              <p className="text-sm text-gray-600">
                Os endpoints públicos não requerem autenticação. 
                Apenas conteúdo com status "publicado" é retornado.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Rate Limiting</h3>
              <p className="text-sm text-gray-600">
                100 requisições por minuto por IP.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicAPI;
