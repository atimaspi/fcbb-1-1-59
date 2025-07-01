
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';

// Import header and tabs components
import AdminHeader from './panels/AdminHeader';
import AdminTabsList from './panels/AdminTabsList';
import AdminOverview from './panels/AdminOverview';

// Import all management components
import ClubsManagementAdvanced from './ClubsManagementAdvanced';
import CompetitionsManagementAdvanced from './CompetitionsManagementAdvanced';
import PlayersManagementAdvanced from './PlayersManagementAdvanced';
import GamesManagementAdvanced from './GamesManagementAdvanced';
import NewsManagementAdvanced from './NewsManagementAdvanced';
import RefereesManagement from './RefereesManagement';
import CoachesManagement from './CoachesManagement';
import StandingsManagement from './StandingsManagement';
import PlayerStatsManagement from './PlayerStatsManagement';
import NationalTeamManagement from './NationalTeamManagement';
import DocumentsManagement from './DocumentsManagement';
import CalendarManagement from './CalendarManagement';
import TransfersManagement from './TransfersManagement';
import SiteSettingsAdvanced from './SiteSettingsAdvanced';

const ComprehensiveAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <AdminTabsList />

          <div className="mt-6">
            <TabsContent value="overview">
              <AdminOverview />
            </TabsContent>

            <TabsContent value="clubs">
              <ClubsManagementAdvanced />
            </TabsContent>

            <TabsContent value="competitions">
              <CompetitionsManagementAdvanced />
            </TabsContent>

            <TabsContent value="players">
              <PlayersManagementAdvanced />
            </TabsContent>

            <TabsContent value="games">
              <GamesManagementAdvanced />
            </TabsContent>

            <TabsContent value="standings">
              <StandingsManagement />
            </TabsContent>

            <TabsContent value="stats">
              <PlayerStatsManagement />
            </TabsContent>

            <TabsContent value="coaches">
              <CoachesManagement />
            </TabsContent>

            <TabsContent value="referees">
              <RefereesManagement />
            </TabsContent>

            <TabsContent value="nationalteam">
              <NationalTeamManagement />
            </TabsContent>

            <TabsContent value="transfers">
              <TransfersManagement />
            </TabsContent>

            <TabsContent value="news">
              <NewsManagementAdvanced />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsManagement />
            </TabsContent>

            <TabsContent value="calendar">
              <CalendarManagement />
            </TabsContent>

            <TabsContent value="settings">
              <SiteSettingsAdvanced />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveAdminPanel;
