import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompetitionsPage from './pages/CompetitionsPage';
import ClassificacoesPage from './pages/ClassificacoesPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCompetitions from './pages/admin/AdminCompetitions';
import AdminResults from './pages/admin/AdminResults';
import AdminTeams from './pages/admin/AdminTeams';
import AdminStandings from './pages/admin/AdminStandings';
import CompetitionDetailsPage from './pages/CompetitionDetailsPage';
import ClassificacoesRegionaisPage from './pages/competitions/ClassificacoesRegionaisPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classificacoes" element={<ClassificacoesPage />} />
          <Route path="/competicoes" element={<CompetitionsPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/contactos" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/competicoes" element={<AdminCompetitions />} />
          <Route path="/admin/resultados" element={<AdminResults />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/admin/classificacoes" element={<AdminStandings />} />
          <Route path="/competicao/:id" element={<CompetitionDetailsPage />} />
          <Route path="/classificacoes-regionais" element={<ClassificacoesRegionaisPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
