'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SimpleDarkModeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SimpleDarkModeToggle: React.FC<SimpleDarkModeToggleProps> = ({
  className = '',
  size = 'md'
}) => {
  const { theme, toggleTheme } = useTheme();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${getSizeClasses()} flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default SimpleDarkModeToggle;
