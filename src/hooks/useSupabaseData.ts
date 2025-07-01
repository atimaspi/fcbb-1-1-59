
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseData = () => {
  console.log('=== SUPABASE DATA HOOK INITIALIZED ===');

  // Fetch all data in parallel for better performance
  const { data: allData, isLoading, error } = useQuery({
    queryKey: ['all-supabase-data'],
    queryFn: async () => {
      console.log('Fetching all Supabase data in parallel...');
      
      const [
        newsResponse,
        clubsResponse,
        gamesResponse,
        competitionsResponse,
        teamsResponse,
        statsResponse,
        playersResponse,
        refereesResponse,
        eventsResponse,
        federationsResponse,
        regionalAssociationsResponse,
        partnersResponse,
        heroSlidesResponse,
        galleryResponse,
        galleryImagesResponse,
        siteSettingsResponse
      ] = await Promise.all([
        supabase.from('news').select('*').eq('published', true).order('created_at', { ascending: false }),
        supabase.from('clubs').select('*').eq('active', true).order('name', { ascending: true }),
        supabase.from('games').select('*').order('scheduled_date', { ascending: false }),
        supabase.from('championships').select('*').order('start_date', { ascending: false }),
        supabase.from('teams').select('*').order('name', { ascending: true }),
        supabase.from('basketball_stats').select('*').eq('active', true).order('order_index', { ascending: true }),
        supabase.from('players').select('*').eq('active', true).order('last_name', { ascending: true }),
        supabase.from('referees').select('*').eq('active', true).order('last_name', { ascending: true }),
        supabase.from('events').select('*').order('event_date', { ascending: false }),
        supabase.from('federations').select('*').order('name', { ascending: true }),
        supabase.from('regional_associations').select('*').order('name', { ascending: true }),
        supabase.from('partners').select('*').eq('active', true).order('order_index', { ascending: true }),
        supabase.from('hero_slides').select('*').eq('active', true).order('order_index', { ascending: true }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery_images').select('*').order('order_index', { ascending: true }),
        supabase.from('site_settings').select('*')
      ]);

      // Check for errors and return data
      const responses = [
        { name: 'news', response: newsResponse },
        { name: 'clubs', response: clubsResponse },
        { name: 'games', response: gamesResponse },
        { name: 'competitions', response: competitionsResponse },
        { name: 'teams', response: teamsResponse },
        { name: 'stats', response: statsResponse },
        { name: 'players', response: playersResponse },
        { name: 'referees', response: refereesResponse },
        { name: 'events', response: eventsResponse },
        { name: 'federations', response: federationsResponse },
        { name: 'regionalAssociations', response: regionalAssociationsResponse },
        { name: 'partners', response: partnersResponse },
        { name: 'heroSlides', response: heroSlidesResponse },
        { name: 'gallery', response: galleryResponse },
        { name: 'galleryImages', response: galleryImagesResponse },
        { name: 'siteSettings', response: siteSettingsResponse }
      ];

      for (const { name, response } of responses) {
        if (response.error) {
          console.error(`Error fetching ${name}:`, response.error);
          throw response.error;
        }
      }

      const allData = {
        news: newsResponse.data || [],
        clubs: clubsResponse.data || [],
        games: gamesResponse.data || [],
        competitions: competitionsResponse.data || [],
        teams: teamsResponse.data || [],
        stats: statsResponse.data || [],
        players: playersResponse.data || [],
        referees: refereesResponse.data || [],
        events: eventsResponse.data || [],
        federations: federationsResponse.data || [],
        regionalAssociations: regionalAssociationsResponse.data || [],
        partners: partnersResponse.data || [],
        heroSlides: heroSlidesResponse.data || [],
        gallery: galleryResponse.data || [],
        galleryImages: galleryImagesResponse.data || [],
        siteSettings: siteSettingsResponse.data || []
      };

      console.log('All Supabase data fetched successfully:', {
        news: allData.news.length,
        clubs: allData.clubs.length,
        games: allData.games.length,
        competitions: allData.competitions.length,
        teams: allData.teams.length,
        stats: allData.stats.length,
        players: allData.players.length,
        referees: allData.referees.length,
        events: allData.events.length,
        federations: allData.federations.length,
        regionalAssociations: allData.regionalAssociations.length,
        partners: allData.partners.length,
        heroSlides: allData.heroSlides.length,
        gallery: allData.gallery.length,
        galleryImages: allData.galleryImages.length,
        siteSettings: allData.siteSettings.length
      });

      return allData;
    }
  });

  return {
    // Data arrays
    newsData: allData?.news || [],
    clubsData: allData?.clubs || [],
    gamesData: allData?.games || [],
    competitionsData: allData?.competitions || [],
    teamsData: allData?.teams || [],
    statsData: allData?.stats || [],
    playersData: allData?.players || [],
    refereesData: allData?.referees || [],
    eventsData: allData?.events || [],
    federationsData: allData?.federations || [],
    regionalAssociationsData: allData?.regionalAssociations || [],
    partnersData: allData?.partners || [],
    heroSlidesData: allData?.heroSlides || [],
    galleryData: allData?.gallery || [],
    galleryImagesData: allData?.galleryImages || [],
    siteSettingsData: allData?.siteSettings || [],

    // Loading state
    isLoading,

    // Error state
    error
  };
};
