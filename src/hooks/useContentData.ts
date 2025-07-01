
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useContentData = () => {
  console.log('=== CONTENT DATA HOOK INITIALIZED ===');

  // Fetch all content management data
  const { data: allContentData, isLoading: contentLoading, error: contentError } = useQuery({
    queryKey: ['content-management'],
    queryFn: async () => {
      console.log('Fetching all content management data...');
      
      // Parallel fetching for better performance
      const [
        newsResponse,
        eventsResponse,
        heroSlidesResponse,
        partnersResponse,
        galleryResponse,
        galleryImagesResponse,
        siteSettingsResponse,
        statisticsResponse
      ] = await Promise.all([
        supabase.from('news').select('*').eq('published', true).order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('event_date', { ascending: false }),
        supabase.from('hero_slides').select('*').eq('active', true).order('order_index', { ascending: true }),
        supabase.from('partners').select('*').eq('active', true).order('order_index', { ascending: true }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery_images').select('*').order('order_index', { ascending: true }),
        supabase.from('site_settings').select('*'),
        supabase.from('basketball_stats').select('*').eq('active', true).order('order_index', { ascending: true })
      ]);

      // Check for errors
      const responses = [
        newsResponse, eventsResponse, heroSlidesResponse, partnersResponse,
        galleryResponse, galleryImagesResponse, siteSettingsResponse, statisticsResponse
      ];

      for (const response of responses) {
        if (response.error) {
          console.error('Error fetching content data:', response.error);
          throw response.error;
        }
      }

      const contentData = {
        news: newsResponse.data || [],
        events: eventsResponse.data || [],
        heroSlides: heroSlidesResponse.data || [],
        partners: partnersResponse.data || [],
        gallery: galleryResponse.data || [],
        galleryImages: galleryImagesResponse.data || [],
        siteSettings: siteSettingsResponse.data || [],
        statistics: statisticsResponse.data || []
      };

      console.log('Content management data fetched:', contentData);
      return contentData;
    }
  });

  return {
    // Content data
    newsData: allContentData?.news || [],
    eventsData: allContentData?.events || [],
    heroSlidesData: allContentData?.heroSlides || [],
    partnersData: allContentData?.partners || [],
    galleryData: allContentData?.gallery || [],
    galleryImagesData: allContentData?.galleryImages || [],
    siteSettingsData: allContentData?.siteSettings || [],
    statisticsData: allContentData?.statistics || [],

    // Loading state
    isContentLoading: contentLoading,

    // Error state
    contentError
  };
};
