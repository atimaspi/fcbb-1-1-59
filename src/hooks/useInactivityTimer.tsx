
import { useEffect, useRef, useCallback } from 'react';

interface UseInactivityTimerProps {
  timeout: number; // em milissegundos
  onTimeout: () => void;
  enabled?: boolean;
}

export const useInactivityTimer = ({
  timeout,
  onTimeout,
  enabled = true
}: UseInactivityTimerProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onTimeout();
    }, timeout);
  }, [timeout, onTimeout, enabled]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      clearTimer();
      return;
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetTimer();
    };

    // Iniciar o timer
    resetTimer();

    // Adicionar event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      clearTimer();
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [resetTimer, clearTimer, enabled]);

  return { resetTimer, clearTimer };
};
