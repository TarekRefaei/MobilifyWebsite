'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-16 bg-gradient-to-br from-white to-gray-50 min-h-screen flex items-center w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Idea. Your App.{' '}
              <span className="text-indigo-600">Realized.</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Mobilify transforms your concepts and existing websites into stunning, 
              high-performance mobile apps. We are the bridge from vision to launch.
            </p>
            
            <div className="mt-8">
              <button
                onClick={() => scrollToSection('demo')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                See How It Works
              </button>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
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
                    className="h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-indigo-600 font-semibold">Your App Here</div>
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
