/**
 * Demo Tabs Component
 *
 * Tab navigation interface for selecting different demo types in the interactive demo.
 * Features animated tab switching with icons and descriptions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab ID
 * @param {(tabId: string) => void} props.onTabChange - Callback when tab is changed
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DemoTabs
 *   activeTab="website"
 *   onTabChange={(tabId) => setActiveTab(tabId)}
 * />
 * ```
 *
 * Features:
 * - Three demo types: Website to App, Mobile App, Tablet App
 * - Animated active state indicator using Framer Motion
 * - Icons and descriptions for each tab
 * - Responsive design (stacked on mobile, horizontal on desktop)
 * - Hover and tap animations for better UX
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Tablet } from 'lucide-react';

interface DemoTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface DemoTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const demoTabs: DemoTab[] = [
  {
    id: 'website',
    label: 'Website to App',
    icon: <Globe className="w-5 h-5" />,
    description: 'Convert your existing website into a mobile app'
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Build a custom mobile application from scratch'
  },
  {
    id: 'tablet',
    label: 'Tablet App',
    icon: <Tablet className="w-5 h-5" />,
    description: 'Create tablet-optimized applications'
  }
];

const DemoTabs: React.FC<DemoTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${className}`}>
      {demoTabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300
            ${activeTab === tab.id
              ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
              : 'border-gray-200 dark:border-gray-700 hover:border-electric-blue/50 text-gray-700 dark:text-gray-300'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Switch to ${tab.label} demo`}
        >
          {/* Active indicator */}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-electric-blue/5 rounded-xl"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          <div className="relative z-10 flex items-center gap-3">
            {tab.icon}
            <div className="text-left">
              <div className="font-semibold">{tab.label}</div>
              <div className="text-sm opacity-75">{tab.description}</div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default DemoTabs;
