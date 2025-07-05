/**
 * Demo Preview Component
 *
 * Animated preview display that shows a mockup of the user's app based on their input.
 * Features a realistic phone mockup with dynamic content and smooth animations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active demo tab
 * @param {string} props.inputValue - User's input value
 * @param {boolean} props.isVisible - Whether the preview should be shown
 * @param {() => void} [props.onAnimationComplete] - Callback when animation completes
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DemoPreview
 *   activeTab="website"
 *   inputValue="https://example.com"
 *   isVisible={showPreview}
 *   onAnimationComplete={handleAnimationComplete}
 * />
 * ```
 *
 * Features:
 * - Realistic phone mockup with status bar and app content
 * - Dynamic content based on demo type and user input
 * - Smooth enter/exit animations using Framer Motion
 * - Feature list highlighting app capabilities
 * - Call-to-action buttons for next steps
 * - Responsive design that works on all screen sizes
 * - Semantic color tokens for consistent theming
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, Tablet, Download, Share2 } from 'lucide-react';
import { ANIMATION_CONFIG } from '@/config/site';

interface DemoPreviewProps {
  activeTab: string;
  inputValue: string;
  isVisible: boolean;
  onAnimationComplete?: () => void;
  className?: string;
}

const DemoPreview: React.FC<DemoPreviewProps> = ({
  activeTab,
  inputValue,
  isVisible,
  onAnimationComplete,
  className = ''
}) => {
  const getPreviewContent = () => {
    switch (activeTab) {
      case 'website':
        return {
          title: 'Website to App Conversion',
          description: `Converting ${inputValue} into a mobile app`,
          icon: <Smartphone className="w-8 h-8" />,
          features: [
            'Native mobile navigation',
            'Offline functionality',
            'Push notifications',
            'App store optimization'
          ]
        };
      case 'mobile':
        return {
          title: 'Custom Mobile App',
          description: `Building: ${inputValue}`,
          icon: <Smartphone className="w-8 h-8" />,
          features: [
            'Custom UI/UX design',
            'Native performance',
            'Cross-platform compatibility',
            'Backend integration'
          ]
        };
      case 'tablet':
        return {
          title: 'Tablet Application',
          description: `Creating: ${inputValue}`,
          icon: <Tablet className="w-8 h-8" />,
          features: [
            'Tablet-optimized layout',
            'Multi-window support',
            'Enhanced productivity features',
            'Responsive design'
          ]
        };
      default:
        return null;
    }
  };

  const content = getPreviewContent();
  if (!content) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{
            duration: ANIMATION_CONFIG.duration.normal,
            ease: ANIMATION_CONFIG.easing.easeInOut
          }}
          onAnimationComplete={onAnimationComplete}
          className={`bg-surface-light dark:bg-surface-gray-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden ${className}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-electric-blue to-blue-600 text-white p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                {content.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{content.title}</h3>
                <p className="text-white/80 mt-1">{content.description}</p>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            {/* Mock Device Frame */}
            <div className="relative mx-auto mb-6" style={{ width: '280px', height: '500px' }}>
              <div className="absolute inset-0 bg-dark-charcoal rounded-[2.5rem] p-2">
                <div className="w-full h-full bg-surface-light rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-surface-gray flex items-center justify-between px-4 text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-success rounded-sm"></div>
                      <div className="w-4 h-2 bg-border-light rounded-sm"></div>
                      <div className="w-4 h-2 bg-border-light rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full bg-gradient-to-b from-blue-50 to-white">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-electric-blue rounded-xl mx-auto mb-2 flex items-center justify-center">
                        <Monitor className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-text-primary">Your App</h4>
                    </div>
                    
                    {/* Mock Content */}
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-surface-gray rounded-lg animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {content.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-surface-gray dark:bg-surface-gray-dark rounded-lg"
                >
                  <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                  <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-electric-blue text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-electric-blue/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Get Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 border-2 border-electric-blue text-electric-blue rounded-xl font-semibold flex items-center justify-center hover:bg-electric-blue/10 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoPreview;
