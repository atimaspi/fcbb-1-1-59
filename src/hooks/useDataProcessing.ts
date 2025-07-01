
import { useMemo } from 'react';
import type { 
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

interface DataProcessingProps {
  teamsData: any;
  clubsData: any;
  competitionsData: any;
  gamesData: any;
  playersData: any;
  newsData: any;
  eventsData: any;
  refereesData: any;
  federationsData: any;
  regionalAssociationsData: any;
}

export const useDataProcessing = ({
  teamsData,
  clubsData,
  competitionsData,
  gamesData,
  playersData,
  newsData,
  eventsData,
  refereesData,
  federationsData,
  regionalAssociationsData
}: DataProcessingProps) => {
  
  // Process and type all data arrays
  const processedData = useMemo(() => {
    console.log('🔄 Processing all backend data...');
    
    const teams: Team[] = Array.isArray(teamsData) ? teamsData : [];
    const clubs: Club[] = Array.isArray(clubsData) ? clubsData : [];
    const competitions: Competition[] = Array.isArray(competitionsData) ? competitionsData : [];
    const games: Game[] = Array.isArray(gamesData) ? gamesData : [];
    const players: Player[] = Array.isArray(playersData) ? playersData : [];
    const news: NewsItem[] = Array.isArray(newsData) ? newsData : [];
    const events: Event[] = Array.isArray(eventsData) ? eventsData : [];
    const referees: Referee[] = Array.isArray(refereesData) ? refereesData : [];
    const coaches: Coach[] = []; // Will be loaded separately
    const federations: Federation[] = Array.isArray(federationsData) ? federationsData : [];
    const regionalAssociations: RegionalAssociation[] = Array.isArray(regionalAssociationsData) ? regionalAssociationsData : [];

    console.log('✅ Data processing complete:', {
      teams: teams.length,
      clubs: clubs.length,
      competitions: competitions.length,
      games: games.length,
      players: players.length,
      news: news.length,
      events: events.length,
      referees: referees.length,
      coaches: coaches.length,
      federations: federations.length,
      regionalAssociations: regionalAssociations.length
    });

    return {
      teams,
      clubs,
      competitions,
      games,
      players,
      news,
      events,
      referees,
      coaches,
      federations,
      regionalAssociations
    };
  }, [
    teamsData,
    clubsData,
    competitionsData,
    gamesData,
    playersData,
    newsData,
    eventsData,
    refereesData,
    federationsData,
    regionalAssociationsData
  ]);

  return processedData;
};
