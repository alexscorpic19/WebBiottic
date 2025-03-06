import { useState, useEffect } from 'react';

const STORAGE_KEY = 'theme';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Remover ambas clases primero
    root.classList.remove('dark', 'light');
    // Añadir la clase correspondiente
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark(prev => !prev),
    setIsDark,
  };
}
