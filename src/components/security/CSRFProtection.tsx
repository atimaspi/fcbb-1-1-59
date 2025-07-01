
import { useEffect, useState } from 'react';

let csrfToken: string | null = null;

export const useCSRFToken = () => {
  const [token, setToken] = useState<string | null>(csrfToken);

  useEffect(() => {
    if (!csrfToken) {
      // Generate a simple CSRF token for client-side protection
      const newToken = `csrf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      csrfToken = newToken;
      setToken(newToken);
      
      // Store in session storage
      sessionStorage.setItem('csrf_token', newToken);
    }
  }, []);

  return token;
};

export const validateCSRFToken = (providedToken: string): boolean => {
  const storedToken = sessionStorage.getItem('csrf_token');
  return storedToken === providedToken && storedToken !== null;
};

export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};
