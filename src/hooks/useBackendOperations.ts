
import { useApi } from '@/hooks/useApi';

export const useBackendOperations = () => {
  const { useCreate, useUpdate, useDelete } = useApi();

  const operations = {
    teams: {
      create: useCreate('teams'),
      update: useUpdate('teams'),
      delete: useDelete('teams')
    },
    clubs: {
      create: useCreate('clubs'),
      update: useUpdate('clubs'),
      delete: useDelete('clubs')
    },
    competitions: {
      create: useCreate('championships'),
      update: useUpdate('championships'),
      delete: useDelete('championships')
    },
    games: {
      create: useCreate('games'),
      update: useUpdate('games'),
      delete: useDelete('games')
    },
    players: {
      create: useCreate('players'),
      update: useUpdate('players'),
      delete: useDelete('players')
    },
    news: {
      create: useCreate('news'),
      update: useUpdate('news'),
      delete: useDelete('news')
    },
    events: {
      create: useCreate('events'),
      update: useUpdate('events'),
      delete: useDelete('events')
    },
    referees: {
      create: useCreate('referees'),
      update: useUpdate('referees'),
      delete: useDelete('referees')
    },
    coaches: {
      create: useCreate('coaches'),
      update: useUpdate('coaches'),
      delete: useDelete('coaches')
    },
    federations: {
      create: useCreate('federations'),
      update: useUpdate('federations'),
      delete: useDelete('federations')
    },
    regionalAssociations: {
      create: useCreate('regional_associations'),
      update: useUpdate('regional_associations'),
      delete: useDelete('regional_associations')
    }
  };

  return { operations };
};
