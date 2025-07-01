
import { useMemo } from 'react';
import type { NewsItem, Event, Game } from '@/types/backend';

export const useComputedData = (
  news: NewsItem[], 
  events: Event[], 
  games: Game[]
) => {
  return useMemo(() => {
    console.log('🔄 Computing derived data...');
    
    // Published news
    const publishedNews = news.filter(article => 
      article.status === 'publicado' || article.published === true
    );

    // Active events (future events)
    const activeEvents = events.filter(event => {
      const eventDate = new Date(event.event_date);
      const now = new Date();
      return eventDate > now;
    });

    // Upcoming games (future games)
    const upcomingGames = games.filter(game => {
      const gameDate = new Date(game.scheduled_date);
      const now = new Date();
      return gameDate > now && game.status === 'scheduled';
    });

    // Recent games (completed games)
    const recentGames = games
      .filter(game => game.status === 'finalizado' || game.status === 'completed')
      .sort((a, b) => new Date(b.scheduled_date).getTime() - new Date(a.scheduled_date).getTime())
      .slice(0, 10);

    console.log('✅ Computed data ready:', {
      publishedNews: publishedNews.length,
      activeEvents: activeEvents.length,
      upcomingGames: upcomingGames.length,
      recentGames: recentGames.length
    });

    return {
      publishedNews,
      activeEvents,
      upcomingGames,
      recentGames
    };
  }, [news, events, games]);
};
