'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface DarkModeToggleProps {
  variant?: 'button' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  variant = 'button',
  size = 'md',
  className = '',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useTheme();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-10 h-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  if (variant === 'switch') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {theme === 'dark' ? 'Dark' : 'Light'} Mode
          </span>
        )}
        <button
          onClick={toggleTheme}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.span
            className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200"
            animate={{
              x: theme === 'dark' ? 24 : 4,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <motion.div
              className="flex items-center justify-center h-full w-full"
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? (
                <Moon className="w-2.5 h-2.5 text-gray-600" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-yellow-500" />
              )}
            </motion.div>
          </motion.span>
        </button>
      </div>
    );
  }

  // Default button variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        onClick={toggleTheme}
        className={`
          ${getSizeClasses()}
          flex items-center justify-center
          rounded-lg
          bg-gray-100 hover:bg-gray-200
          dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-600 dark:text-gray-300
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2
          dark:focus:ring-offset-gray-800
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === 'dark' ? 180 : 0,
            scale: theme === 'dark' ? 0.8 : 1
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {theme === 'dark' ? (
            <Sun className={`${getIconSize()} text-yellow-400`} />
          ) : (
            <Moon className={`${getIconSize()} text-gray-600`} />
          )}
        </motion.div>
      </motion.button>
      
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </span>
      )}
    </div>
  );
};

export default DarkModeToggle;

// Pre-configured dark mode toggles for different use cases
export const DarkModeToggles = {
  // For the header (compact button)
  HeaderToggle: () => (
    <DarkModeToggle
      variant="button"
      size="sm"
      className="mr-4"
    />
  ),

  // For settings pages (switch with label)
  SettingsToggle: () => (
    <DarkModeToggle
      variant="switch"
      size="md"
      showLabel={true}
      className="justify-between w-full"
    />
  ),

  // For mobile menu (larger button with label)
  MobileToggle: () => (
    <DarkModeToggle
      variant="button"
      size="md"
      showLabel={true}
      className="justify-center"
    />
  ),

  // For footer (small switch)
  FooterToggle: () => (
    <DarkModeToggle
      variant="switch"
      size="sm"
    />
  )
};
