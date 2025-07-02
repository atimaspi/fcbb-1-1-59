
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ClassificacoesPage from './pages/ClassificacoesPage';
import CompetitionsPage from './pages/CompetitionsPage';
import ResultsPage from './pages/ResultsPage';
import ContactoPage from './pages/ContactoPage';
import ComprehensiveAdminPage from './pages/ComprehensiveAdminPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
