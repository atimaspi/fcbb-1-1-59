
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Algo correu mal</h2>
                  <p>Ocorreu um erro inesperado. Por favor, tente novamente.</p>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-2">
              <Button onClick={this.handleRefresh} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Recarregar
              </Button>
              <Button onClick={this.handleGoHome} className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 p-4 bg-red-50 rounded border text-sm">
                <summary className="cursor-pointer font-medium">Detalhes do Erro</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
