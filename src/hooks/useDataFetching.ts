
import { useApi } from '@/hooks/useApi';

export const useDataFetching = () => {
  const { useFetch } = useApi();

  // Fetch data with simplified approach - using correct column names
  const { data: teamsData, isLoading: teamsLoading, error: teamsError } = useFetch('teams');
  const { data: clubsData, isLoading: clubsLoading, error: clubsError } = useFetch('clubs');
  const { data: competitionsData, isLoading: competitionsLoading, error: competitionsError } = useFetch('championships');
  const { data: gamesData, isLoading: gamesLoading, error: gamesError } = useFetch('games');
  const { data: playersData, isLoading: playersLoading, error: playersError } = useFetch('players');
  
  // Fix news fetch - remove the invalid orderBy configuration
  const { data: newsData, isLoading: newsLoading, error: newsError } = useFetch('news');
  
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useFetch('events');
  const { data: refereesData, isLoading: refereesLoading, error: refereesError } = useFetch('referees');
  const { data: federationsData, isLoading: federationsLoading, error: federationsError } = useFetch('federations');
  const { data: regionalAssociationsData, isLoading: regionalAssociationsLoading, error: regionalAssociationsError } = useFetch('regional_associations');

  // Comprehensive logging for all data
  console.log('=== COMPLETE DATA LOADING STATUS ===');
  console.log('Teams:', { data: teamsData, loading: teamsLoading, error: teamsError });
  console.log('Clubs:', { data: clubsData, loading: clubsLoading, error: clubsError });
  console.log('Competitions:', { data: competitionsData, loading: competitionsLoading, error: competitionsError });
  console.log('Games:', { data: gamesData, loading: gamesLoading, error: gamesError });
  console.log('Players:', { data: playersData, loading: playersLoading, error: playersError });
  console.log('News:', { data: newsData, loading: newsLoading, error: newsError });
  console.log('Events:', { data: eventsData, loading: eventsLoading, error: eventsError });
  console.log('Referees:', { data: refereesData, loading: refereesLoading, error: refereesError });
  console.log('Federations:', { data: federationsData, loading: federationsLoading, error: federationsError });
  console.log('Regional Associations:', { data: regionalAssociationsData, loading: regionalAssociationsLoading, error: regionalAssociationsError });
  console.log('====================================');

  return {
    // Raw data
    teamsData,
    clubsData,
    competitionsData,
    gamesData,
    playersData,
    newsData,
    eventsData,
    refereesData,
    federationsData,
    regionalAssociationsData,
    
    // Loading states
    teamsLoading,
    clubsLoading,
    competitionsLoading,
    gamesLoading,
    playersLoading,
    newsLoading,
    eventsLoading,
    refereesLoading,
    federationsLoading,
    regionalAssociationsLoading,
    
    // Errors
    teamsError,
    clubsError,
    competitionsError,
    gamesError,
    playersError,
    newsError,
    eventsError,
    refereesError,
    federationsError,
    regionalAssociationsError
  };
};
