
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import CompetitionsPage from './pages/CompetitionsPage';
import ClassificacoesPage from './pages/ClassificacoesPage';
import ResultsPage from './pages/ResultsPage';
import ContactoPage from './pages/ContactoPage';
import ComprehensiveAdminPage from './pages/ComprehensiveAdminPage';
import ClassificacoesRegionaisPage from './pages/competitions/ClassificacoesRegionaisPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/classificacoes" element={<ClassificacoesPage />} />
          <Route path="/competicoes" element={<CompetitionsPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/contactos" element={<ContactoPage />} />
          <Route path="/admin" element={<ComprehensiveAdminPage />} />
          <Route path="/classificacoes-regionais" element={<ClassificacoesRegionaisPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
