/**
 * Header Component
 *
 * Main navigation header for the Mobilify website. Features responsive design
 * with desktop navigation and mobile hamburger menu. Includes logo, navigation
 * links, chat trigger, dark mode toggle, and CTA button.
 *
 * @component
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * Features:
 * - Responsive navigation (desktop/mobile)
 * - Mobile hamburger menu with slide-in animation
 * - Dark mode toggle
 * - Chat integration
 * - Analytics tracking for navigation events
 * - Fixed positioning with backdrop blur
 */

'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../Logo';
import NoSSR from '../NoSSR';
import SimpleHeaderChat from '../SimpleHeaderChat';
import SimpleDarkModeToggle from '../SimpleDarkModeToggle';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { useAnalytics } from '@/hooks';

/**
 * Header component with responsive navigation and mobile menu
 */
const Header = () => {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trackNavigation } = useAnalytics();

  /**
   * Handles mobile menu toggle and tracks the interaction
   */
  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    trackNavigation('mobile_menu_toggle', 'header');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Navigation />
              <NoSSR>
                <SimpleHeaderChat />
              </NoSSR>
              <NoSSR>
                <SimpleDarkModeToggle />
              </NoSSR>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Header;
