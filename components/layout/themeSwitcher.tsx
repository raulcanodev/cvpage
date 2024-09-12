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
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full p-2 shadow-lg transition-all duration-300 focus:outline-none"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-white transition-transform duration-300 transform rotate-0" />
      ) : (
        <Sun className="w-5 h-5 text-white transition-transform duration-300 transform rotate-180" />
      )}
    </button>
  );
};