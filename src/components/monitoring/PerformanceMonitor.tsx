
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, Clock, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  apiCalls: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    apiCalls: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    const measurePerformance = () => {
      // Measure load time
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      
      // Measure memory usage (if available)
      const memoryUsage = (performance as any).memory?.usedJSHeapSize / 1048576 || 0;
      
      // Count API calls (simplified)
      const apiCalls = performance.getEntriesByType('xmlhttprequest').length;

      setMetrics({
        loadTime: loadTime / 1000,
        renderTime: performance.now() / 1000,
        memoryUsage: Math.round(memoryUsage),
        apiCalls
      });
    };

    measurePerformance();
    const interval = setInterval(measurePerformance, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const getMetricStatus = (metric: string, value: number) => {
    switch (metric) {
      case 'loadTime':
        return value > 3 ? 'destructive' : value > 1.5 ? 'secondary' : 'default';
      case 'memoryUsage':
        return value > 100 ? 'destructive' : value > 50 ? 'secondary' : 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white/90 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Load
              </span>
              <Badge variant={getMetricStatus('loadTime', metrics.loadTime)} className="text-xs">
                {metrics.loadTime.toFixed(2)}s
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Render
              </span>
              <Badge variant="outline" className="text-xs">
                {metrics.renderTime.toFixed(2)}s
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Memory
              </span>
              <Badge variant={getMetricStatus('memoryUsage', metrics.memoryUsage)} className="text-xs">
                {metrics.memoryUsage}MB
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span>API Calls</span>
              <Badge variant="outline" className="text-xs">
                {metrics.apiCalls}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
