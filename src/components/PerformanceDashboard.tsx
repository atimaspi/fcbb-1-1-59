
import React, { useState } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Activity, Cpu, Zap, AlertTriangle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PerformanceDashboard = () => {
  const { metrics, alerts, getOptimizationSuggestions, clearAlerts } = usePerformanceMonitor();
  const [isVisible, setIsVisible] = useState(false);
  const suggestions = getOptimizationSuggestions();

  if (!isVisible && process.env.NODE_ENV === 'production') {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-cv-blue hover:bg-blue-700"
        size="sm"
      >
        <Activity className="h-4 w-4" />
      </Button>
    );
  }

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-auto shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance Monitor
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-green-500" />
            <span>FPS: {metrics.fps}</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-blue-500" />
            <span>RAM: {metrics.memoryUsage}MB</span>
          </div>
          <div className="col-span-2">
            <span>Render: {metrics.renderTime.toFixed(1)}ms</span>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Alertas</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAlerts}
                className="text-xs h-5 px-1"
              >
                Limpar
              </Button>
            </div>
            {alerts.slice(-3).map((alert, idx) => (
              <div
                key={idx}
                className={`text-xs p-1 rounded flex items-center gap-1 ${
                  alert.type === 'error' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                <AlertTriangle className="h-3 w-3" />
                {alert.message}
              </div>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-medium">Sugestões</span>
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="text-xs p-1 bg-blue-50 text-blue-700 rounded">
                💡 {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Performance Score */}
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-xs">
            <span>Score Geral</span>
            <span className={`font-bold ${
              metrics.fps > 50 && metrics.memoryUsage < 50 
                ? 'text-green-600' 
                : metrics.fps > 30 
                  ? 'text-yellow-600' 
                  : 'text-red-600'
            }`}>
              {metrics.fps > 50 && metrics.memoryUsage < 50 ? 'Excelente' :
               metrics.fps > 30 ? 'Bom' : 'Precisa Otimizar'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceDashboard;
