
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-8 w-8 px-0 glass-effect hover:bg-white/20 transition-all duration-200"
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500" />
      )}
    </Button>
  );
};

export default ThemeToggle;
