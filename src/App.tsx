
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import PerformanceMonitor from "./components/monitoring/PerformanceMonitor";
import NotFound from "./pages/NotFound";

// Import all pages
import Index from "./pages/Index";
import CompeticoesPage from "./pages/CompeticoesPage";
import CompetitionsStructurePage from "./pages/CompetitionsStructurePage";
import ResultadosPage from "./pages/ResultadosPage";
import ResultadosAoVivoPage from "./pages/ResultadosAoVivoPage";
import ClassificacoesPage from "./pages/ClassificacoesPage";
import ClubesPage from "./pages/ClubesPage";
import NoticiasPage from "./pages/NoticiasPage";
import GaleriaPage from "./pages/GaleriaPage";
import DocumentosPage from "./pages/DocumentosPage";
import SobrePage from "./pages/SobrePage";
import ContactoPage from "./pages/ContactoPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

// Competition specific pages
import MasculinoPage from "./pages/competitions/MasculinoPage";
import FemininoPage from "./pages/competitions/FemininoPage";
import TacaPage from "./pages/competitions/TacaPage";
import ClassificacoesRegionaisPage from "./pages/competitions/ClassificacoesRegionaisPage";
import CompeticoesRegionaisPage from "./pages/competitions/CompeticoesRegionaisPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/competicoes" element={<CompeticoesPage />} />
                  <Route path="/competitions-structure" element={<CompetitionsStructurePage />} />
                  <Route path="/competicoes/masculino" element={<MasculinoPage />} />
                  <Route path="/competicoes/feminino" element={<FemininoPage />} />
                  <Route path="/competicoes/taca" element={<TacaPage />} />
                  <Route path="/competicoes/regionais" element={<CompeticoesRegionaisPage />} />
                  <Route path="/resultados" element={<ResultadosPage />} />
                  <Route path="/resultados/ao-vivo" element={<ResultadosAoVivoPage />} />
                  <Route path="/classificacoes" element={<ClassificacoesPage />} />
                  <Route path="/classificacoes/regionais" element={<ClassificacoesRegionaisPage />} />
                  <Route path="/clubes" element={<ClubesPage />} />
                  <Route path="/noticias" element={<NoticiasPage />} />
                  <Route path="/galeria" element={<GaleriaPage />} />
                  <Route path="/documentos" element={<DocumentosPage />} />
                  <Route path="/sobre" element={<SobrePage />} />
                  <Route path="/contacto" element={<ContactoPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/*" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <PerformanceMonitor />
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
