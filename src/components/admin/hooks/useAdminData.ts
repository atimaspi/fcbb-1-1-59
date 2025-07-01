
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalUsers: number;
  totalNews: number;
  totalCompetitions: number;
  totalClubs: number;
  totalPlayers: number;
  totalMedia: number;
  monthlyVisitors: number;
  activeSubscribers: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  status: string;
  author: string;
  created_at: string;
  views?: number;
}

export interface CompetitionItem {
  id: string;
  name: string;
  type: string;
  status: string;
  teams: number;
  games: number;
  start_date: string;
}

export const useAdminData = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const [
        { data: newsData, error: newsError },
        { data: clubsData, error: clubsError },
        { data: playersData, error: playersError },
        { data: competitionsData, error: competitionsError }
      ] = await Promise.all([
        supabase.from('news').select('id', { count: 'exact' }),
        supabase.from('clubs').select('id', { count: 'exact' }),
        supabase.from('players').select('id', { count: 'exact' }),
        supabase.from('championships').select('id', { count: 'exact' })
      ]);

      if (newsError || clubsError || playersError || competitionsError) {
        throw new Error('Erro ao carregar estatísticas');
      }

      const adminStats: AdminStats = {
        totalUsers: 23, // Mock data - seria necessário implementar contagem de utilizadores
        totalNews: newsData?.length || 0,
        totalCompetitions: competitionsData?.length || 0,
        totalClubs: clubsData?.length || 0,
        totalPlayers: playersData?.length || 0,
        totalMedia: 2456, // Mock data
        monthlyVisitors: 12234, // Mock data
        activeSubscribers: 1247 // Mock data
      };

      setStats(adminStats);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('id, title, category, status, author, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setNews(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('championships')
        .select('id, name, type, status, start_date')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Transform data to match expected format
      const transformedData = data?.map(comp => ({
        ...comp,
        teams: 12, // Mock data - seria necessário contar equipas por competição
        games: 66 // Mock data - seria necessário contar jogos por competição
      })) || [];

      setCompetitions(transformedData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchNews(), fetchCompetitions()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const refreshData = async () => {
    await Promise.all([fetchStats(), fetchNews(), fetchCompetitions()]);
  };

  return {
    stats,
    news,
    competitions,
    loading,
    error,
    refreshData
  };
};
