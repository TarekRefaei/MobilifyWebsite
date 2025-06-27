'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Lightbulb, Building } from 'lucide-react';
import Link from 'next/link';

const ServicesOverview = () => {
  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Starter App',
      description: 'Perfect for converting existing websites into mobile apps.',
      price: 'Starting at $5,000',
      features: ['Website Conversion', 'iOS & Android', 'Basic Features'],
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Custom App',
      description: 'Turn your new ideas into reality with custom development.',
      price: 'Starting at $15,000',
      features: ['Idea to App', 'Custom UI/UX', 'Advanced Features'],
      popular: true,
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Enterprise',
      description: 'Complex projects needing deep integration and support.',
      price: 'Custom Pricing',
      features: ['Bespoke Solutions', 'Full Integration', '24/7 Support'],
    },
  ];

  const handleViewServices = () => {
    // Track view services details event (placeholder for GA4)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_services_details', {
        event_category: 'engagement',
        event_label: 'services_overview'
      });
    }
  };

  return (
    <section id="services-overview" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Solutions Tailored to Your Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're converting a website or building from scratch, we have the perfect package for your project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                service.popular ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-indigo-600 mb-4">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              <div className="text-2xl font-bold text-gray-900 mb-4">
                {service.price}
              </div>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            onClick={handleViewServices}
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Compare All Features & Pricing
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
