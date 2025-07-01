
import { useEffect, useRef, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  renderTime: number;
  networkRequests: number;
  cacheHitRatio: number;
}

interface PerformanceAlert {
  type: 'warning' | 'error';
  message: string;
  timestamp: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0,
    networkRequests: 0,
    cacheHitRatio: 100
  });
  
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const frameRef = useRef<number>();
  const lastFrameTime = useRef<number>(performance.now());
  const frameCount = useRef<number>(0);
  const renderStart = useRef<number>(0);

  // FPS Monitoring
  const measureFPS = useCallback(() => {
    const now = performance.now();
    frameCount.current++;
    
    if (now - lastFrameTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastFrameTime.current));
      
      setMetrics(prev => ({ ...prev, fps }));
      
      // Alert for low FPS
      if (fps < 30) {
        setAlerts(prev => [...prev, {
          type: 'warning',
          message: `FPS baixo detectado: ${fps}fps`,
          timestamp: Date.now()
        }]);
      }
      
      frameCount.current = 0;
      lastFrameTime.current = now;
    }
    
    frameRef.current = requestAnimationFrame(measureFPS);
  }, []);

  // Memory Usage Monitoring
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
      
      setMetrics(prev => ({ ...prev, memoryUsage: usedMB }));
      
      // Alert for high memory usage
      if (usedMB > 100) {
        setAlerts(prev => [...prev, {
          type: 'error',
          message: `Uso de memória alto: ${usedMB}MB`,
          timestamp: Date.now()
        }]);
      }
    }
  }, []);

  // Network Performance Monitoring
  const measureNetwork = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType;
      
      if (effectiveType === '2g' || effectiveType === 'slow-2g') {
        setAlerts(prev => [...prev, {
          type: 'warning',
          message: 'Conexão lenta detectada',
          timestamp: Date.now()
        }]);
      }
    }
  }, []);

  // Render Time Monitoring
  const startRenderMeasure = useCallback(() => {
    renderStart.current = performance.now();
  }, []);

  const endRenderMeasure = useCallback(() => {
    const renderTime = performance.now() - renderStart.current;
    setMetrics(prev => ({ ...prev, renderTime }));
    
    // Alert for slow renders
    if (renderTime > 16.67) { // More than 1 frame at 60fps
      setAlerts(prev => [...prev, {
        type: 'warning',
        message: `Renderização lenta: ${renderTime.toFixed(2)}ms`,
        timestamp: Date.now()
      }]);
    }
  }, []);

  // Web Vitals Monitoring
  const measureWebVitals = useCallback(() => {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.startTime;
      
      if (lcp > 2500) {
        setAlerts(prev => [...prev, {
          type: 'warning',
          message: `LCP lento: ${lcp.toFixed(0)}ms`,
          timestamp: Date.now()
        }]);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((list) => {
      let cls = 0;
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cls += (entry as any).value;
        }
      }
      
      if (cls > 0.1) {
        setAlerts(prev => [...prev, {
          type: 'warning',
          message: `Layout shift alto: ${cls.toFixed(3)}`,
          timestamp: Date.now()
        }]);
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }, []);

  // Auto-optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = [];
    
    if (metrics.fps < 45) {
      suggestions.push('Considere reduzir animações complexas');
    }
    
    if (metrics.memoryUsage > 80) {
      suggestions.push('Limpe cache desnecessário');
    }
    
    if (metrics.renderTime > 20) {
      suggestions.push('Otimize re-renders com React.memo');
    }
    
    return suggestions;
  }, [metrics]);

  // Initialize monitoring
  useEffect(() => {
    measureFPS();
    measureWebVitals();
    
    const memoryInterval = setInterval(measureMemory, 5000);
    const networkInterval = setInterval(measureNetwork, 10000);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      clearInterval(memoryInterval);
      clearInterval(networkInterval);
    };
  }, [measureFPS, measureMemory, measureNetwork, measureWebVitals]);

  // Clear old alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => prev.filter(alert => 
        Date.now() - alert.timestamp < 30000 // Keep for 30 seconds
      ));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    alerts,
    startRenderMeasure,
    endRenderMeasure,
    getOptimizationSuggestions,
    clearAlerts: () => setAlerts([])
  };
};
