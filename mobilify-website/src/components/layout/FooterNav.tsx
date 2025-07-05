/**
 * Footer Navigation Component
 * 
 * Handles the navigation links in the footer section.
 * Organized into logical groups with proper accessibility.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks';

interface FooterNavProps {
  className?: string;
}

interface NavSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

const navSections: NavSection[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Interactive Demo', href: '/#demo' },
      { label: 'Our Services', href: '/#services' },
      { label: 'How It Works', href: '/#process' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/#contact' }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Website to App', href: '/services#website-conversion' },
      { label: 'Custom Mobile Apps', href: '/services#custom-apps' },
      { label: 'App Maintenance', href: '/services#maintenance' },
      { label: 'Consultation', href: '/services#consultation' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Case Studies', href: '/blog?category=case-studies' },
      { label: 'Pricing', href: '/services#pricing' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' }
    ]
  }
];

const FooterNav: React.FC<FooterNavProps> = ({ className = '' }) => {
  const { trackNavigation } = useAnalytics();

  const handleLinkClick = (label: string) => {
    trackNavigation(label, 'footer_nav');
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {navSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-semibold mb-4 text-white">
            {section.title}
          </h3>
          <ul className="space-y-2 text-sm">
            {section.links.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(link.label)}
                    className="text-gray-400 dark:text-gray-300 hover:text-electric-blue transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.label)}
                    className="text-gray-400 dark:text-gray-300 hover:text-electric-blue transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterNav;
