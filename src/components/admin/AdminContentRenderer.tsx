
import React from 'react';
import Dashboard from './Dashboard';
import NewsManagement from './NewsManagement';
import GamesManagement from './GamesManagement';
import PlayersManagement from './PlayersManagement';
import ClubsManagement from './ClubsManagement';
import CompetitionsManagement from './CompetitionsManagement';
import RefereesManagement from './RefereesManagement';
import EventsManagement from './EventsManagement';
import GalleryManagement from './GalleryManagement';
import SystemSettings from './SystemSettings';
import CompetitionsContentManager from './CompetitionsContentManager';
import PagesContentManager from './PagesContentManager';
import AdvancedPagesManager from './AdvancedPagesManager';

interface AdminContentRendererProps {
  activeTab: string;
}

const AdminContentRenderer = ({ activeTab }: AdminContentRendererProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'advanced-pages':
        return <AdvancedPagesManager />;
      case 'pages':
        return <PagesContentManager />;
      case 'competitions-content':
        return <CompetitionsContentManager />;
      case 'news':
        return <NewsManagement />;
      case 'games':
        return <GamesManagement />;
      case 'clubs':
        return <ClubsManagement />;
      case 'players':
        return <PlayersManagement />;
      case 'competitions':
        return <CompetitionsManagement />;
      case 'referees':
        return <RefereesManagement />;
      case 'events':
        return <EventsManagement />;
      case 'gallery':
        return <GalleryManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return <>{renderContent()}</>;
};

export default AdminContentRenderer;
