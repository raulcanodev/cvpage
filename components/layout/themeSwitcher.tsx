'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
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
    <div className="flex items-center space-x-2">
      {/* <Sun className="h-[1.2rem] w-[1.2rem] text-gray-500 dark:text-gray-400" /> */}
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-zinc-200"
        aria-label="Toggle dark mode"
      />
      {/* <Moon className="h-[1.2rem] w-[1.2rem] text-gray-500 dark:text-gray-400" /> */}
    </div>
  );
};