
import { DetailedRole } from '@/components/auth/RoleSelector';
import { Permission } from './types';

export const CONTENT_PERMISSIONS: Record<DetailedRole, Permission[]> = {
  admin: [
    // Gestão completa de todos os conteúdos
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'delete' },
    { resource: 'news', action: 'view' },
    { resource: 'news', action: 'publish' },
    { resource: 'news', action: 'review' },
    
    { resource: 'championships', action: 'create' },
    { resource: 'championships', action: 'edit' },
    { resource: 'championships', action: 'delete' },
    { resource: 'championships', action: 'view' },
    { resource: 'championships', action: 'publish' },
    
    { resource: 'clubs', action: 'create' },
    { resource: 'clubs', action: 'edit' },
    { resource: 'clubs', action: 'delete' },
    { resource: 'clubs', action: 'view' },
    { resource: 'clubs', action: 'publish' },
    
    { resource: 'national_teams', action: 'create' },
    { resource: 'national_teams', action: 'edit' },
    { resource: 'national_teams', action: 'delete' },
    { resource: 'national_teams', action: 'view' },
    { resource: 'national_teams', action: 'publish' },
    
    { resource: 'referees', action: 'create' },
    { resource: 'referees', action: 'edit' },
    { resource: 'referees', action: 'delete' },
    { resource: 'referees', action: 'view' },
    { resource: 'referees', action: 'publish' },
    
    { resource: 'training_programs', action: 'create' },
    { resource: 'training_programs', action: 'edit' },
    { resource: 'training_programs', action: 'delete' },
    { resource: 'training_programs', action: 'view' },
    { resource: 'training_programs', action: 'publish' },
    
    { resource: 'broadcasts', action: 'create' },
    { resource: 'broadcasts', action: 'edit' },
    { resource: 'broadcasts', action: 'delete' },
    { resource: 'broadcasts', action: 'view' },
    { resource: 'broadcasts', action: 'publish' },
    
    { resource: 'federation_members', action: 'create' },
    { resource: 'federation_members', action: 'edit' },
    { resource: 'federation_members', action: 'delete' },
    { resource: 'federation_members', action: 'view' },
    { resource: 'federation_members', action: 'publish' },
    
    { resource: 'gallery', action: 'create' },
    { resource: 'gallery', action: 'edit' },
    { resource: 'gallery', action: 'delete' },
    { resource: 'gallery', action: 'view' },
    { resource: 'gallery', action: 'publish' },
    
    { resource: 'partners', action: 'create' },
    { resource: 'partners', action: 'edit' },
    { resource: 'partners', action: 'delete' },
    { resource: 'partners', action: 'view' },
    { resource: 'partners', action: 'publish' },
    
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'edit' },
    { resource: 'users', action: 'delete' },
    { resource: 'users', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'settings', action: 'edit' },
    { resource: 'content', action: 'review' },
    { resource: 'content', action: 'publish' },
  ],
  
  revisor: [
    // Pode criar e editar conteúdo, mas principalmente revisar
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'news', action: 'review' },
    { resource: 'news', action: 'publish' },
    
    { resource: 'championships', action: 'create' },
    { resource: 'championships', action: 'edit' },
    { resource: 'championships', action: 'view' },
    { resource: 'championships', action: 'review' },
    { resource: 'championships', action: 'publish' },
    
    { resource: 'clubs', action: 'create' },
    { resource: 'clubs', action: 'edit' },
    { resource: 'clubs', action: 'view' },
    { resource: 'clubs', action: 'review' },
    { resource: 'clubs', action: 'publish' },
    
    { resource: 'national_teams', action: 'create' },
    { resource: 'national_teams', action: 'edit' },
    { resource: 'national_teams', action: 'view' },
    { resource: 'national_teams', action: 'review' },
    { resource: 'national_teams', action: 'publish' },
    
    { resource: 'referees', action: 'create' },
    { resource: 'referees', action: 'edit' },
    { resource: 'referees', action: 'view' },
    { resource: 'referees', action: 'review' },
    { resource: 'referees', action: 'publish' },
    
    { resource: 'training_programs', action: 'create' },
    { resource: 'training_programs', action: 'edit' },
    { resource: 'training_programs', action: 'view' },
    { resource: 'training_programs', action: 'review' },
    { resource: 'training_programs', action: 'publish' },
    
    { resource: 'broadcasts', action: 'create' },
    { resource: 'broadcasts', action: 'edit' },
    { resource: 'broadcasts', action: 'view' },
    { resource: 'broadcasts', action: 'review' },
    { resource: 'broadcasts', action: 'publish' },
    
    { resource: 'federation_members', action: 'create' },
    { resource: 'federation_members', action: 'edit' },
    { resource: 'federation_members', action: 'view' },
    { resource: 'federation_members', action: 'review' },
    { resource: 'federation_members', action: 'publish' },
    
    { resource: 'gallery', action: 'create' },
    { resource: 'gallery', action: 'edit' },
    { resource: 'gallery', action: 'view' },
    { resource: 'gallery', action: 'review' },
    { resource: 'gallery', action: 'publish' },
    
    { resource: 'partners', action: 'create' },
    { resource: 'partners', action: 'edit' },
    { resource: 'partners', action: 'view' },
    { resource: 'partners', action: 'review' },
    { resource: 'partners', action: 'publish' },
    
    { resource: 'dashboard', action: 'view' },
    { resource: 'content', action: 'review' },
    { resource: 'content', action: 'publish' },
  ],
  
  redator: [
    // Pode criar e editar apenas o próprio conteúdo
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    
    { resource: 'championships', action: 'create' },
    { resource: 'championships', action: 'edit' },
    { resource: 'championships', action: 'view' },
    
    { resource: 'clubs', action: 'create' },
    { resource: 'clubs', action: 'edit' },
    { resource: 'clubs', action: 'view' },
    
    { resource: 'national_teams', action: 'create' },
    { resource: 'national_teams', action: 'edit' },
    { resource: 'national_teams', action: 'view' },
    
    { resource: 'referees', action: 'create' },
    { resource: 'referees', action: 'edit' },
    { resource: 'referees', action: 'view' },
    
    { resource: 'training_programs', action: 'create' },
    { resource: 'training_programs', action: 'edit' },
    { resource: 'training_programs', action: 'view' },
    
    { resource: 'broadcasts', action: 'create' },
    { resource: 'broadcasts', action: 'edit' },
    { resource: 'broadcasts', action: 'view' },
    
    { resource: 'federation_members', action: 'create' },
    { resource: 'federation_members', action: 'edit' },
    { resource: 'federation_members', action: 'view' },
    
    { resource: 'gallery', action: 'create' },
    { resource: 'gallery', action: 'edit' },
    { resource: 'gallery', action: 'view' },
    
    { resource: 'partners', action: 'create' },
    { resource: 'partners', action: 'edit' },
    { resource: 'partners', action: 'view' },
    
    { resource: 'dashboard', action: 'view' },
  ],
  
  // Manter roles existentes
  editor: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  moderator: [
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  treinador: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'teams', action: 'edit' },
    { resource: 'players', action: 'edit' },
  ],
  arbitro: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'games', action: 'edit' },
    { resource: 'referees', action: 'view' },
  ],
  dirigente: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'clubs', action: 'edit' },
    { resource: 'teams', action: 'view' },
  ],
  jornalista: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
    { resource: 'dashboard', action: 'view' },
  ],
  user: [
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'view' },
  ],
};

// Para compatibilidade com o sistema anterior
export const DETAILED_ROLE_PERMISSIONS = CONTENT_PERMISSIONS;
