
export const navItems = [
  {
    title: "Sobre",
    dropdown: true,
    key: "about",
    ariaLabel: "Menu sobre a Federação Cabo-verdiana de Basquetebol",
    items: [
      { name: "Missão e Visão", path: "/sobre/missao-visao", description: "Conheça a missão e visão da FCBB" },
      { name: "História", path: "/sobre/historia", description: "História da federação" },
      { name: "Direção", path: "/sobre/direcao", description: "Membros da direção atual" },
      { name: "Órgãos Sociais", path: "/sobre/orgaos-sociais", description: "Estrutura organizacional" },
      { name: "Estatutos", path: "/sobre/estatutos", description: "Estatutos da federação" },
      { name: "Contactos", path: "/sobre/contactos", description: "Informações de contacto" }
    ]
  },
  {
    title: "Competições",
    dropdown: true,
    key: "competitions",
    ariaLabel: "Menu de competições de basquetebol",
    items: [
      { name: "Nacional Masculino", path: "/competicoes/nacional-masculino", description: "Campeonato Nacional Masculino" },
      { name: "Liga Nacional", path: "/competicoes/liga-nacional", description: "Liga Nacional de Basquetebol" },
      { name: "Taça de Cabo Verde", path: "/competicoes/taca-cabo-verde", description: "Taça Nacional" },
      { name: "Super Taça", path: "/competicoes/super-taca", description: "Super Taça Nacional" },
      { name: "Competições Regionais", path: "/competicoes/competicoes-regionais", description: "Campeonatos regionais" },
      { name: "Classificações", path: "/competicoes/classificacoes", description: "Tabelas classificativas" },
      { name: "Calendário", path: "/competicoes/calendario", description: "Calendário de jogos" }
    ]
  },
  {
    title: "Seleções Nacionais",
    dropdown: true,
    key: "teams",
    ariaLabel: "Menu das seleções nacionais",
    items: [
      { name: "Sénior Masculina", path: "/selecoes/senior-masculina", description: "Seleção nacional masculina sénior" },
      { name: "Sénior Feminina", path: "/selecoes/senior-feminina", description: "Seleção nacional feminina sénior" },
      { name: "Sub-18 Masculina", path: "/selecoes/sub-18-masculina", description: "Seleção masculina sub-18" },
      { name: "Sub-18 Feminina", path: "/selecoes/sub-18-feminina", description: "Seleção feminina sub-18" },
      { name: "Sub-16 Masculina", path: "/selecoes/sub-16-masculina", description: "Seleção masculina sub-16" },
      { name: "Sub-16 Feminina", path: "/selecoes/sub-16-feminina", description: "Seleção feminina sub-16" }
    ]
  },
  {
    title: "Clubes",
    dropdown: true,
    key: "clubs",
    ariaLabel: "Menu de gestão de clubes",
    items: [
      { name: "Direção de Clubes", path: "/clubes", description: "Gestão e administração de clubes" },
      { name: "Transferências", path: "/transferencias", description: "Sistema de transferências" },
      { name: "Formação", path: "/formacao", description: "Programas de formação" },
      { name: "Arbitragem", path: "/arbitragem", description: "Gestão de árbitros" }
    ]
  },
  {
    title: "Resultados & Estatísticas",
    dropdown: true,
    key: "results",
    ariaLabel: "Menu de resultados e estatísticas",
    items: [
      { name: "Resultados ao Vivo", path: "/resultados/ao-vivo", description: "Acompanhe jogos em tempo real" },
      { name: "Estatísticas", path: "/estatisticas", description: "Estatísticas detalhadas" },
      { name: "Resultados", path: "/resultados", description: "Arquivo de resultados" },
      { name: "FIBA LiveStats", path: "/resultados/fiba-livestats", description: "Estatísticas oficiais FIBA" }
    ]
  },
  {
    title: "Multimédia",
    dropdown: true,
    key: "multimedia",
    ariaLabel: "Menu de conteúdo multimédia",
    items: [
      { name: "Notícias", path: "/noticias", description: "Últimas notícias do basquetebol" },
      { name: "Galeria de Imagens", path: "/galeria", description: "Galeria fotográfica" },
      { name: "Vídeos", path: "/videos", description: "Vídeos e highlights" },
      { name: "Área de Imprensa", path: "/imprensa", description: "Recursos para jornalistas" },
      { name: "Transmissões", path: "/transmissoes", description: "Transmissões em direto" }
    ]
  }
];
