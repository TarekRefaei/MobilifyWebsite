'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('website');
  const [inputValue, setInputValue] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handlePreview = () => {
    if (inputValue.trim()) {
      setShowDemo(true);
      // Track demo interaction event (placeholder for GA4)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'demo_interaction', {
          event_category: 'engagement',
          event_label: activeTab
        });
      }
    }
  };

  const resetDemo = () => {
    setShowDemo(false);
    setInputValue('');
  };

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            From Zero to App, Instantly.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how quickly we can transform your vision into a beautiful mobile app
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {setActiveTab('website'); resetDemo();}}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'website'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Convert a Website
              </button>
              <button
                onClick={() => {setActiveTab('idea'); resetDemo();}}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'idea'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Describe an Idea
              </button>
            </div>

            {/* Input Field */}
            <div className="space-y-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  activeTab === 'website'
                    ? 'Enter your website URL (e.g., https://example.com)'
                    : 'Describe your app idea (e.g., A fitness tracking app for runners)'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              
              <button
                onClick={handlePreview}
                disabled={!inputValue.trim()}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Mobilify Preview
              </button>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-2xl overflow-hidden relative">
                  {/* Status bar */}
                  <div className="h-6 bg-gray-900 flex items-center justify-center">
                    <div className="w-16 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  {/* App content */}
                  <div className="p-4 h-full bg-gray-800 text-white">
                    <AnimatePresence mode="wait">
                      {!showDemo ? (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center h-full"
                        >
                          <div className="text-center text-gray-400">
                            <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                              <span className="text-2xl">📱</span>
                            </div>
                            <p className="text-sm">Your app preview will appear here</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="demo"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-4"
                        >
                          {/* Header */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg font-semibold"
                          >
                            Hello, Alex
                          </motion.div>
                          
                          {/* Chart */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-gray-700 rounded-lg p-4 h-32 flex items-end justify-between"
                          >
                            {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                              <motion.div
                                key={index}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                                className="bg-indigo-500 w-4 rounded-t"
                              />
                            ))}
                          </motion.div>
                          
                          {/* Active Projects */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="space-y-2"
                          >
                            <h3 className="font-medium text-sm">Active Projects</h3>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between bg-gray-700 rounded p-2">
                                <span className="text-sm">Mobile App Design</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="flex items-center justify-between bg-gray-700 rounded p-2">
                                <span className="text-sm">Website Redesign</span>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Bottom Navigation */}
                  {showDemo && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="absolute bottom-2 left-2 right-2 bg-gray-700 rounded-lg p-2 flex justify-around"
                    >
                      <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
                        <span className="text-xs">🏠</span>
                      </div>
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-xs">📊</span>
                      </div>
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-xs">⚙️</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
