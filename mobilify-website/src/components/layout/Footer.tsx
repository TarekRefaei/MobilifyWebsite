/**
 * Footer Component
 *
 * Main site footer with company information, navigation links, and newsletter signup.
 * Composed of smaller focused components for better maintainability.
 *
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * Features:
 * - Company branding and description
 * - Organized navigation links in multiple columns
 * - Newsletter signup with validation
 * - Dark mode toggle
 * - Copyright and legal information
 * - Responsive design with mobile-first approach
 *
 * Architecture:
 * - Uses composition with FooterNav and FooterNewsletter components
 * - CMS-driven content with fallbacks from site config
 * - Consistent theming with semantic color tokens
 */

'use client';

import React from 'react';
import Logo from '../Logo';
import SimpleDarkModeToggle from '../SimpleDarkModeToggle';
import NoSSR from '../NoSSR';
import FooterNav from './FooterNav';
import FooterNewsletter from './FooterNewsletter';
import { SITE_CONFIG } from '@/config/site';

/**
 * Site footer with navigation, newsletter, and company information
 */
const Footer = () => {
  return (
    <footer className="bg-dark-charcoal dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <FooterNewsletter />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <FooterNav />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <NoSSR>
                <SimpleDarkModeToggle />
              </NoSSR>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
