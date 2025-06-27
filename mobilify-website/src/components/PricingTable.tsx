'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const PricingTable = () => {
  const packages = [
    {
      name: 'Starter App',
      price: '$5,000',
      description: 'Perfect for converting existing websites',
      popular: false,
    },
    {
      name: 'Custom App',
      price: '$15,000',
      description: 'Turn your ideas into reality',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom Pricing',
      description: 'Bespoke solutions for complex needs',
      popular: false,
    },
  ];

  const features = [
    {
      name: 'Core Service',
      starter: 'Website Conversion',
      custom: 'Idea to App',
      enterprise: 'Bespoke Solution',
    },
    {
      name: 'Platform',
      starter: 'iOS & Android',
      custom: 'iOS & Android',
      enterprise: 'iOS & Android',
    },
    {
      name: 'UI/UX',
      starter: 'Standardized Template',
      custom: 'Custom Branded UI/UX',
      enterprise: 'Fully Bespoke Design',
    },
    {
      name: 'Push Notifications',
      starter: true,
      custom: true,
      enterprise: true,
    },
    {
      name: 'App Store Submission',
      starter: 'Guided',
      custom: 'Managed',
      enterprise: 'Fully Managed',
    },
    {
      name: 'Native Features (Camera, GPS)',
      starter: false,
      custom: true,
      enterprise: true,
    },
    {
      name: 'Offline Access',
      starter: 'Basic Caching',
      custom: 'Advanced Offline Mode',
      enterprise: 'Custom Sync Engine',
    },
    {
      name: '3rd Party Integrations',
      starter: false,
      custom: 'Up to 2 APIs',
      enterprise: 'Unlimited APIs',
    },
    {
      name: 'Dedicated Project Manager',
      starter: false,
      custom: false,
      enterprise: true,
    },
    {
      name: 'Support',
      starter: 'Email Support',
      custom: 'Priority Email & Chat',
      enterprise: '24/7 Dedicated Support',
    },
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-600">{value}</span>;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Compare All Features & Pricing
          </h2>
          
          {/* Mobile-friendly cards for small screens */}
          <div className="md:hidden space-y-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  pkg.popular ? 'ring-2 ring-indigo-500' : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                      <div className="text-right">
                        {renderFeatureValue(
                          pkg.name === 'Starter App' ? feature.starter :
                          pkg.name === 'Custom App' ? feature.custom :
                          feature.enterprise
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Features</th>
                  {packages.map((pkg) => (
                    <th key={pkg.name} className="text-center py-4 px-6">
                      <div className={`rounded-xl p-6 ${
                        pkg.popular ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-gray-50'
                      }`}>
                        {pkg.popular && (
                          <div className="mb-2">
                            <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className="font-bold text-xl text-gray-900 mb-2">{pkg.name}</div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                        <div className="text-sm text-gray-600">{pkg.description}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-6 font-medium text-gray-900">{feature.name}</td>
                    <td className="py-4 px-6 text-center">{renderFeatureValue(feature.starter)}</td>
                    <td className="py-4 px-6 text-center">{renderFeatureValue(feature.custom)}</td>
                    <td className="py-4 px-6 text-center">{renderFeatureValue(feature.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Your Custom Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTable;
