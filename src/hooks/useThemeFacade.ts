import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function useThemeFacade() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );
}

