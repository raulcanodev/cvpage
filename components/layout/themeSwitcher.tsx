'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative inline-flex items-center justify-center w-10 h-10 p-2 transition-all duration-300 focus:outline-none"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300 transform rotate-180" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 transform rotate-0" stroke="black" />
      )}
    </button>
  );
};