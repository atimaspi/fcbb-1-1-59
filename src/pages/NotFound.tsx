
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { logger } from "@/utils/logger";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.warn("404 Error: User attempted to access non-existent route", {
      pathname: location.pathname,
      search: location.search,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
  }, [location]);

  const suggestedRoutes = [
    { label: "Início", path: "/", icon: Home },
    { label: "Competições", path: "/competicoes", icon: FileQuestion },
    { label: "Notícias", path: "/noticias", icon: FileQuestion },
    { label: "Clubes", path: "/clubes", icon: FileQuestion },
    { label: "Contacto", path: "/contacto", icon: FileQuestion }
  ];

  return (
    <>
      <SEOHead
        title="Página Não Encontrada - FCBB"
        description="A página que procura não existe ou foi movida. Navegue para outras secções do site da FCBB."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Error Display */}
          <div className="text-center space-y-4">
            <div className="text-8xl font-bold text-cv-blue opacity-20">
              404
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Página não encontrada
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              A página que procura não existe ou foi movida para outro local.
            </p>
          </div>

          {/* Suggested Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                O que gostaria de fazer?
              </CardTitle>
              <CardDescription>
                Sugerimos algumas páginas que poderão ser úteis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedRoutes.map((route) => (
                  <Link key={route.path} to={route.path}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto py-3"
                    >
                      <route.icon className="w-4 h-4 mr-3" />
                      {route.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Página Anterior
            </Button>
          </div>

          {/* Additional Help */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              Se continuar com problemas, pode{" "}
              <Link to="/contacto" className="font-medium hover:underline">
                contactar-nos
              </Link>{" "}
              para obter ajuda.
            </p>
          </div>

          {/* Development Info */}
          {process.env.NODE_ENV === 'development' && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 text-sm">
                  Informação de Desenvolvimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs space-y-1 text-yellow-700">
                  <p><strong>Caminho:</strong> {location.pathname}</p>
                  <p><strong>Query:</strong> {location.search || "N/A"}</p>
                  <p><strong>Referrer:</strong> {document.referrer || "N/A"}</p>
                  <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default NotFound;
