
import React from 'react';
import PageLayout from './PageLayout';
import CompetitionsSection from '../components/sections/CompetitionsSection';

const CompetitionsPage = () => {
  return (
    <PageLayout 
      title="Competições FCBB" 
      description="Todas as competições de basquetebol organizadas pela Federação Cabo-verdiana de Basquetebol"
    >
      <CompetitionsSection />
    </PageLayout>
  );
};

export default CompetitionsPage;
