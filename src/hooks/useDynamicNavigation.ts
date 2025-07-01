
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  submenu?: MenuItem[];
}

export const useDynamicNavigation = () => {
  const [navItems, setNavItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        // Fetch championships for competitions menu
        const { data: championships } = await supabase
          .from('championships')
          .select('id, name, type, status')
          .eq('status', 'active')
          .order('name');

        // Fetch news categories
        const { data: newsData } = await supabase
          .from('news')
          .select('category')
          .eq('published', true);
        
        const newsCategories = [...new Set(newsData?.map(n => n.category) || [])];

        // Fetch active regional associations
        const { data: regions } = await supabase
          .from('regional_associations')
          .select('id, name, island')
          .order('name');

        // Build dynamic navigation with updated structure
        const dynamicNavItems: MenuItem[] = [
          {
            id: 'inicio',
            label: 'Início',
            href: '/'
          },
          {
            id: 'sobre',
            label: 'Sobre a FCBB',
            submenu: [
              { id: 'historia', label: 'História', href: '/sobre/historia' },
              { id: 'missao', label: 'Missão e Visão', href: '/sobre/missao-visao' },
              { id: 'direcao', label: 'Direção', href: '/sobre/direcao' },
              { id: 'orgaos', label: 'Órgãos Sociais', href: '/sobre/orgaos-sociais' },
              { id: 'estatutos', label: 'Estatutos', href: '/sobre/estatutos' },
              { id: 'contactos', label: 'Contactos', href: '/sobre/contactos' }
            ]
          },
          {
            id: 'competicoes',
            label: 'Competições',
            submenu: [
              { id: 'estrutura', label: 'Estrutura Competitiva', href: '/competitions-structure' },
              { id: 'regionais', label: 'Competições Regionais', href: '/competicoes#regionais' },
              { id: 'masculino', label: 'Nacional Masculino', href: '/competicoes/masculino' },
              { id: 'feminino', label: 'Nacional Feminino', href: '/competicoes/feminino' },
              { id: 'taca', label: 'Taça de Cabo Verde', href: '/competicoes/taca' },
              { id: 'calendario', label: 'Calendário', href: '/competicoes/calendario' },
              ...(championships?.map(comp => ({
                id: comp.id,
                label: comp.name,
                href: `/competicoes/${comp.id}`
              })) || [])
            ]
          },
          {
            id: 'resultados',
            label: 'Resultados',
            submenu: [
              { id: 'recentes', label: 'Resultados Recentes', href: '/resultados' },
              { id: 'ao-vivo', label: 'Ao Vivo', href: '/resultados/ao-vivo' },
              { id: 'classificacoes', label: 'Classificações Nacionais', href: '/classificacoes' },
              { id: 'classificacoes-regionais', label: 'Classificações Regionais', href: '/classificacoes/regionais' },
              { id: 'estatisticas', label: 'Estatísticas', href: '/estatisticas' }
            ]
          },
          {
            id: 'selecoes',
            label: 'Seleções Nacionais',
            submenu: [
              { id: 'estrutura-selecoes', label: 'Representação Internacional', href: '/competitions-structure#international' },
              { id: 'senior-masc', label: 'Seleção Masculina Sénior', href: '/selecoes/senior-masculina' },
              { id: 'senior-fem', label: 'Seleção Feminina Sénior', href: '/selecoes/senior-feminina' },
              { id: 'afrobasket', label: 'AfroBasket', href: '/selecoes/afrobasket' },
              { id: 'mundial-fiba', label: 'Mundial FIBA', href: '/selecoes/mundial-fiba' },
              { id: 'sub18-masc', label: 'Sub-18 Masculina', href: '/selecoes/sub-18-masculina' },
              { id: 'sub18-fem', label: 'Sub-18 Feminina', href: '/selecoes/sub-18-feminina' }
            ]
          },
          {
            id: 'clubes',
            label: 'Clubes & Atletas',
            submenu: [
              { id: 'clubes', label: 'Clubes', href: '/clubes' },
              { id: 'atletas', label: 'Atletas', href: '/atletas' },
              { id: 'transferencias', label: 'Transferências', href: '/transferencias' },
              { id: 'arbitragem', label: 'Arbitragem', href: '/arbitragem' },
              ...(regions?.map(region => ({
                id: `regiao-${region.id}`,
                label: `Região ${region.island}`,
                href: `/clubes/regiao/${region.id}`
              })) || [])
            ]
          },
          {
            id: 'noticias',
            label: 'Notícias',
            submenu: [
              { id: 'todas', label: 'Todas as Notícias', href: '/noticias' },
              ...newsCategories.map(category => ({
                id: `cat-${category}`,
                label: category.charAt(0).toUpperCase() + category.slice(1),
                href: `/noticias/${category}`
              }))
            ]
          },
          {
            id: 'multimedia',
            label: 'Multimédia',
            submenu: [
              { id: 'galeria', label: 'Galeria de Fotos', href: '/galeria' },
              { id: 'videos', label: 'Vídeos', href: '/videos' },
              { id: 'transmissoes', label: 'Transmissões', href: '/transmissoes' }
            ]
          },
          {
            id: 'documentos',
            label: 'Documentos',
            href: '/documentos'
          }
        ];

        setNavItems(dynamicNavItems);
      } catch (error) {
        console.error('Erro ao carregar navegação:', error);
        // Fallback to static navigation
        setNavItems(getStaticNavigation());
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, []);

  return { navItems, loading };
};

const getStaticNavigation = (): MenuItem[] => [
  {
    id: 'inicio',
    label: 'Início',
    href: '/'
  },
  {
    id: 'sobre',
    label: 'Sobre a FCBB',
    submenu: [
      { id: 'historia', label: 'História', href: '/sobre/historia' },
      { id: 'missao', label: 'Missão e Visão', href: '/sobre/missao-visao' },
      { id: 'direcao', label: 'Direção', href: '/sobre/direcao' },
      { id: 'contactos', label: 'Contactos', href: '/sobre/contactos' }
    ]
  },
  {
    id: 'competicoes',
    label: 'Competições',
    submenu: [
      { id: 'estrutura', label: 'Estrutura Competitiva', href: '/competitions-structure' },
      { id: 'masculino', label: 'Nacional Masculino', href: '/competicoes/masculino' },
      { id: 'feminino', label: 'Nacional Feminino', href: '/competicoes/feminino' },
      { id: 'taca', label: 'Taça de Cabo Verde', href: '/competicoes/taca' },
      { id: 'calendario', label: 'Calendário', href: '/competicoes/calendario' }
    ]
  },
  {
    id: 'resultados',
    label: 'Resultados',
    submenu: [
      { id: 'recentes', label: 'Resultados Recentes', href: '/resultados' },
      { id: 'classificacoes', label: 'Classificações', href: '/classificacoes' }
    ]
  },
  {
    id: 'selecoes',
    label: 'Seleções',
    submenu: [
      { id: 'masculina', label: 'Seleção Masculina', href: '/selecoes/masculina' },
      { id: 'feminina', label: 'Seleção Feminina', href: '/selecoes/feminina' }
    ]
  },
  {
    id: 'clubes',
    label: 'Clubes',
    submenu: [
      { id: 'clubes', label: 'Clubes', href: '/clubes' },
      { id: 'atletas', label: 'Atletas', href: '/atletas' }
    ]
  },
  {
    id: 'noticias',
    label: 'Notícias',
    href: '/noticias'
  },
  {
    id: 'documentos',
    label: 'Documentos',
    href: '/documentos'
  }
];
