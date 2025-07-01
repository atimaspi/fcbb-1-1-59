type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  stack?: string;
  userAgent?: string;
  url?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      stack: new Error().stack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
  }

  private storeLog(entry: LogEntry) {
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('fcbb_logs', JSON.stringify(this.logs.slice(-20)));
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  error(message: string, data?: any) {
    const entry = this.createLogEntry('error', message, data);
    this.storeLog(entry);
    
    console.error(`[FCBB ERROR] ${message}`, data);
    
    // In production, send to monitoring service
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry);
    }
  }

  warn(message: string, data?: any) {
    const entry = this.createLogEntry('warn', message, data);
    this.storeLog(entry);
    
    console.warn(`[FCBB WARN] ${message}`, data);
    
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry);
    }
  }

  info(message: string, data?: any) {
    const entry = this.createLogEntry('info', message, data);
    this.storeLog(entry);
    
    if (this.isDevelopment) {
      console.info(`[FCBB INFO] ${message}`, data);
    }
  }

  debug(message: string, data?: any) {
    if (!this.isDevelopment) return;
    
    const entry = this.createLogEntry('debug', message, data);
    this.storeLog(entry);
    
    console.debug(`[FCBB DEBUG] ${message}`, data);
  }

  private async sendToMonitoring(entry: LogEntry) {
    try {
      // In a real implementation, send to Sentry, LogRocket, or similar
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Silently fail to avoid infinite loops
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem('fcbb_logs');
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export const logger = new Logger();

// Global error handler
window.addEventListener('error', (event) => {
  logger.error('Global error caught', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack
  });
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled promise rejection', {
    reason: event.reason,
    promise: event.promise
  });
});

export default logger;
