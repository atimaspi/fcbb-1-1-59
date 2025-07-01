
import { NavItem } from './types';

export const createNavItems = (pathname: string): NavItem[] => [
  { 
    id: 'inicio', 
    label: 'Início',
    href: '/',
    isActive: pathname === '/'
  },
  { 
    id: 'sobre', 
    label: 'Sobre', 
    submenu: [
      { label: 'História', link: '/sobre/historia' },
      { label: 'Missão e Visão', link: '/sobre/missao-visao' },
      { label: 'Direção', link: '/sobre/direcao' },
      { label: 'Órgãos Sociais', link: '/sobre/orgaos-sociais' },
      { label: 'Estatutos', link: '/sobre/estatutos' },
      { label: 'Contactos', link: '/sobre/contactos' }
    ],
    isActive: pathname.startsWith('/sobre')
  },
  { 
    id: 'competicoes', 
    label: 'Competições', 
    submenu: [
      { label: 'Liga Nacional', link: '/competicoes/liga-nacional' },
      { label: 'Taça de Cabo Verde', link: '/competicoes/taca-cabo-verde' },
      { label: 'Super Taça', link: '/competicoes/super-taca' },
      { label: 'Nacional Masculino', link: '/competicoes/nacional-masculino' },
      { label: 'Competições Regionais', link: '/competicoes/competicoes-regionais' },
      { label: 'Calendário', link: '/competicoes/calendario' }
    ],
    isActive: pathname.startsWith('/competicoes')
  },
  { 
    id: 'resultados', 
    label: 'Resultados', 
    submenu: [
      { label: 'Resultados Recentes', link: '/resultados' },
      { label: 'Ao Vivo', link: '/resultados/ao-vivo' },
      { label: 'Classificações', link: '/resultados/classificacoes' },
      { label: 'Estatísticas', link: '/estatisticas' }
    ],
    isActive: pathname.startsWith('/resultados') || pathname.startsWith('/estatisticas')
  },
  { 
    id: 'selecoes', 
    label: 'Seleções', 
    submenu: [
      { label: 'Seleção Masculina', link: '/selecoes/senior-masculina' },
      { label: 'Seleção Feminina', link: '/selecoes/senior-feminina' },
      { label: 'Sub-18 Masculina', link: '/selecoes/sub-18-masculina' },
      { label: 'Sub-18 Feminina', link: '/selecoes/sub-18-feminina' },
      { label: 'Sub-16 Masculina', link: '/selecoes/sub-16-masculina' },
      { label: 'Sub-16 Feminina', link: '/selecoes/sub-16-feminina' }
    ],
    isActive: pathname.startsWith('/selecoes')
  },
  { 
    id: 'clubes', 
    label: 'Clubes', 
    submenu: [
      { label: 'Diretório de Clubes', link: '/clubes' },
      { label: 'Lista Completa', link: '/clubes/completo' },
      { label: 'Transferências', link: '/transferencias' },
      { label: 'Formação', link: '/formacao' },
      { label: 'Arbitragem', link: '/arbitragem' }
    ],
    isActive: pathname.startsWith('/clubes') || 
              pathname.startsWith('/transferencias') || 
              pathname.startsWith('/formacao') ||
              pathname.startsWith('/arbitragem')
  },
  { 
    id: 'multimedia', 
    label: 'Multimédia', 
    submenu: [
      { label: 'Notícias', link: '/noticias' },
      { label: 'Galeria', link: '/galeria' },
      { label: 'Vídeos', link: '/videos' },
      { label: 'Transmissões', link: '/transmissoes' },
      { label: 'Área de Imprensa', link: '/imprensa' }
    ],
    isActive: pathname.startsWith('/noticias') || 
              pathname.startsWith('/galeria') || 
              pathname.startsWith('/videos') || 
              pathname.startsWith('/transmissoes') ||
              pathname.startsWith('/imprensa')
  }
];
