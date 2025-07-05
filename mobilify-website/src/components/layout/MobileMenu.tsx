/**
 * Mobile Menu Component
 *
 * Full-screen mobile navigation menu with slide-in animation from the right.
 * Includes navigation items, chat trigger, dark mode toggle, and close button.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the mobile menu is currently open
 * @param {() => void} props.onClose - Callback function to close the menu
 *
 * @example
 * ```tsx
 * <MobileMenu
 *   isOpen={isMenuOpen}
 *   onClose={() => setIsMenuOpen(false)}
 * />
 * ```
 *
 * Features:
 * - Smooth slide-in/out animation using Framer Motion
 * - Full-screen overlay with backdrop blur
 * - Integrated navigation, chat, and dark mode toggle
 * - Keyboard and click-outside support for closing
 * - Mobile-optimized touch interactions
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Navigation from './Navigation';
import SimpleHeaderChat from '../SimpleHeaderChat';
import SimpleDarkModeToggle from '../SimpleDarkModeToggle';
import { ANIMATION_CONFIG } from '@/config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_CONFIG.duration.normal }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              duration: ANIMATION_CONFIG.duration.normal,
              ease: ANIMATION_CONFIG.easing.easeInOut
            }}
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 p-4">
                <Navigation 
                  isMobile={true} 
                  onItemClick={onClose}
                  className="mb-8"
                />
                
                {/* Mobile-specific features */}
                <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dark Mode
                    </span>
                    <SimpleDarkModeToggle />
                  </div>
                  
                  <div className="pt-4">
                    <SimpleHeaderChat />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
