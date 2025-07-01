
import { DetailedRole } from '@/components/auth/RoleSelector';
import { Permission } from './types';

export const DETAILED_ROLE_PERMISSIONS: Record<DetailedRole, Permission[]> = {
  admin: [
    { resource: 'news', action: 'create' },
    { resource: 'news', action: 'edit' },
    { resource: 'news', action: 'delete' },
    { resource: 'news', action: 'view' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'edit' },
    { resource: 'events', action: 'delete' },
    { resource: 'events', action: 'view' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'edit' },
    { resource: 'users', action: 'delete' },
    { resource: 'users', action: 'view' },
    { resource: 'dashboard', action: 'view' },
    { resource: 'settings', action: 'edit' },
  ],
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
