'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { useSectionSettings, useAnalytics } from '@/hooks';
import { ANIMATION_CONFIG } from '@/config/site';

const Hero = () => {
  const heroSettings = useSectionSettings('hero');
  const { trackNavigation } = useAnalytics();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      trackNavigation(sectionId, 'hero_cta');
    }
  };

  return (
    <section id="hero" className="pt-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center w-full transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_CONFIG.duration.slow }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-charcoal dark:text-white leading-tight">
              {heroSettings.headline}
            </h1>

            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {heroSettings.subtext}
            </p>

            <div className="mt-8">
              <Button
                onClick={() => scrollToSection('demo')}
                variant="primary"
                size="lg"
                disabled={heroSettings.isLoading}
              >
                {heroSettings.buttonText}
              </Button>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: ANIMATION_CONFIG.duration.slow,
              delay: ANIMATION_CONFIG.duration.fast
            }}
            className="relative"
          >
            <div className="relative mx-auto w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
              {/* Phone frame */}
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                {/* Status bar */}
                <div className="h-6 bg-gray-900 flex items-center justify-center">
                  <div className="w-16 h-1 bg-white rounded-full"></div>
                </div>
                
                {/* App content placeholder */}
                <div className="p-4 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="h-32 bg-gradient-to-r from-electric-blue/10 to-electric-blue/20 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-electric-blue font-semibold">Your App Here</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="space-y-2"
                  >
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
