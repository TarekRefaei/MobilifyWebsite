'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Lightbulb, Building } from 'lucide-react';
import Link from 'next/link';
import { useSectionSettings } from '@/hooks';
import { SERVICES, ANIMATION_CONFIG } from '@/config/site';

const ServicesOverview = () => {
  const servicesSettings = useSectionSettings('services');

  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      ...SERVICES.starter,
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      ...SERVICES.custom,
    },
    {
      icon: <Building className="w-8 h-8" />,
      ...SERVICES.enterprise,
    },
  ];

  const handleViewServices = () => {
    // Track view services details event (placeholder for GA4)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_services_details', {
        event_category: 'engagement',
        event_label: 'services_overview'
      });
    }
  };

  return (
    <section id="services-overview" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONFIG.duration.normal }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal dark:text-white mb-4">
            {servicesSettings.headline}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {servicesSettings.subtext}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                service.popular ? 'ring-2 ring-electric-blue' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-electric-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-electric-blue mb-4">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-dark-charcoal dark:text-white mb-2">
                {service.name}
              </h3>

              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>

              <div className="text-2xl font-bold text-dark-charcoal dark:text-white mb-4">
                {service.price}
              </div>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-base text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-electric-blue rounded-full mr-3"></div>
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
            className="inline-flex items-center bg-electric-blue text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl"
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
