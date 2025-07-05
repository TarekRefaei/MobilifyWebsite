/**
 * Interactive Demo Section Component
 *
 * Main demo section that allows users to interact with different app conversion types.
 * Composed of three main sub-components: DemoTabs, DemoInput, and DemoPreview.
 *
 * @component
 * @example
 * ```tsx
 * <InteractiveDemo />
 * ```
 *
 * Features:
 * - Tab-based demo type selection (website, mobile, tablet)
 * - Real-time input validation and preview generation
 * - Analytics tracking for user interactions
 * - Responsive design with mobile-first approach
 * - Smooth animations and transitions
 * - CMS-driven content with fallbacks
 *
 * Architecture:
 * - Uses composition pattern with smaller focused components
 * - State management for active tab and input values
 * - Integrated analytics tracking for demo interactions
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics, useSectionSettings } from '@/hooks';
import { ANIMATION_CONFIG } from '@/config/site';
import DemoTabs from './DemoTabs';
import DemoInput from './DemoInput';
import DemoPreview from './DemoPreview';

/**
 * Interactive demo section with tabbed interface and live preview
 */
const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [inputValue, setInputValue] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const { trackDemoInteraction } = useAnalytics();
  const demoSettings = useSectionSettings('services'); // Use services settings for demo section

  const handlePreview = () => {
    if (inputValue.trim()) {
      setShowDemo(true);
      trackDemoInteraction('preview_click', activeTab);
    }
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    setShowDemo(false);
    setInputValue('');
    trackDemoInteraction('tab_switch', tab);
  };

  const handleAnimationComplete = () => {
    trackDemoInteraction('animation_complete', activeTab);
  };

  return (
    <section id="demo" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONFIG.duration.normal }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal dark:text-white mb-4">
            {demoSettings.headline || 'From Zero to App, Instantly.'}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {demoSettings.subtext || 'See how quickly we can transform your vision into a beautiful mobile app'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATION_CONFIG.duration.normal, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <DemoTabs
              activeTab={activeTab}
              onTabChange={handleTabSwitch}
            />

            <DemoInput
              activeTab={activeTab}
              value={inputValue}
              onChange={setInputValue}
              onPreview={handlePreview}
            />

          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATION_CONFIG.duration.normal, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <DemoPreview
              activeTab={activeTab}
              inputValue={inputValue}
              isVisible={showDemo}
              onAnimationComplete={handleAnimationComplete}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
