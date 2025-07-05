/**
 * Navigation Component
 *
 * Handles the main navigation menu for both desktop and mobile views.
 * Supports smooth scrolling to sections and analytics tracking.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <Navigation className="hidden md:flex space-x-8" />
 * ```
 *
 * Features:
 * - Smooth scrolling to page sections
 * - Analytics tracking for navigation events
 * - Configurable navigation items from site config
 * - Responsive design support
 */

'use client';

import React from 'react';
import { NAVIGATION } from '@/config/site';
import { useAnalytics } from '@/hooks';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  isMobile = false, 
  onItemClick,
  className = ''
}) => {
  const { trackNavigation } = useAnalytics();

  const handleNavigation = (href: string, label: string, id: string) => {
    // Handle direct page navigation (like Home)
    if (href.startsWith('/') && !href.includes('#')) {
      window.location.href = href;
      trackNavigation(label, isMobile ? 'mobile_nav' : 'desktop_nav');
      onItemClick?.();
      return;
    }

    // Handle section scrolling
    const sectionId = id || href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      // If element exists on current page, scroll to it
      element.scrollIntoView({ behavior: 'smooth' });
      trackNavigation(label, isMobile ? 'mobile_nav' : 'desktop_nav');
    } else {
      // If element doesn't exist, navigate to home page with hash
      const currentPath = window.location.pathname;
      if (currentPath !== '/') {
        // Navigate to home page with the section hash
        window.location.href = `/#${sectionId}`;
      }
    }
    onItemClick?.();
  };

  // Add "Home" link when not on home page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isHomePage = currentPath === '/';

  const navItems = isHomePage
    ? NAVIGATION.main
    : [{ label: 'Home', href: '/', id: 'home' }, ...NAVIGATION.main];

  const baseClasses = isMobile 
    ? "flex flex-col space-y-4"
    : "hidden md:flex md:items-center md:space-x-8";

  return (
    <nav className={`${baseClasses} ${className}`}>
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={() => handleNavigation(item.href, item.label, item.id)}
          className={`
            text-gray-700 dark:text-gray-300 hover:text-electric-blue dark:hover:text-electric-blue
            transition-colors duration-200 font-medium
            ${isMobile
              ? 'text-lg py-2 text-left w-full hover:bg-gray-50 dark:hover:bg-gray-800 px-4 rounded-lg'
              : 'text-sm'
            }
          `}
          aria-label={`Navigate to ${item.label} section`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
