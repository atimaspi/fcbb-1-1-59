
import { useComputedData } from '@/hooks/useComputedData';
import { useBackendOperations } from '@/hooks/useBackendOperations';
import { useDataFetching } from '@/hooks/useDataFetching';
import { useDataProcessing } from '@/hooks/useDataProcessing';

export const useBackendData = () => {
  const { operations } = useBackendOperations();
  
  // Fetch all raw data
  const fetchingData = useDataFetching();
  
  // Process the raw data into typed arrays
  const processedData = useDataProcessing({
    teamsData: fetchingData.teamsData,
    clubsData: fetchingData.clubsData,
    competitionsData: fetchingData.competitionsData,
    gamesData: fetchingData.gamesData,
    playersData: fetchingData.playersData,
    newsData: fetchingData.newsData,
    eventsData: fetchingData.eventsData,
    refereesData: fetchingData.refereesData,
    federationsData: fetchingData.federationsData,
    regionalAssociationsData: fetchingData.regionalAssociationsData
  });

  // Get computed properties
  const { publishedNews, activeEvents, upcomingGames, recentGames } = useComputedData(
    processedData.news, 
    processedData.events, 
    processedData.games
  );

  return {
    // Data arrays
    ...processedData,

    // Computed properties
    publishedNews,
    activeEvents,
    upcomingGames,
    recentGames,
    newsData: fetchingData.newsData,
    eventsData: fetchingData.eventsData,

    // Loading states - individual loading states
    teamsLoading: fetchingData.teamsLoading,
    clubsLoading: fetchingData.clubsLoading,
    competitionsLoading: fetchingData.competitionsLoading,
    gamesLoading: fetchingData.gamesLoading,
    playersLoading: fetchingData.playersLoading,
    newsLoading: fetchingData.newsLoading,
    eventsLoading: fetchingData.eventsLoading,
    refereesLoading: fetchingData.refereesLoading,
    federationsLoading: fetchingData.federationsLoading,
    regionalAssociationsLoading: fetchingData.regionalAssociationsLoading,
    coachesLoading: false,

    // General loading state
    isLoading: fetchingData.teamsLoading || fetchingData.clubsLoading || fetchingData.newsLoading || fetchingData.federationsLoading,

    // Error states - individual error states
    teamsError: fetchingData.teamsError,
    clubsError: fetchingData.clubsError,
    competitionsError: fetchingData.competitionsError,
    gamesError: fetchingData.gamesError,
    playersError: fetchingData.playersError,
    newsError: fetchingData.newsError,
    eventsError: fetchingData.eventsError,
    refereesError: fetchingData.refereesError,
    federationsError: fetchingData.federationsError,
    regionalAssociationsError: fetchingData.regionalAssociationsError,

    // CRUD operations
    operations
  };
};

// Re-export types for convenience
export type {
  Team,
  Club,
  Competition,
  Game,
  Player,
  NewsItem,
  Event,
  Referee,
  Coach,
  Federation,
  RegionalAssociation
} from '@/types/backend';
