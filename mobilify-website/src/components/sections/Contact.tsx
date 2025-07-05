'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChatTriggers } from '../ChatTrigger';
import { useSectionSettings } from '@/hooks';
import { ANIMATION_CONFIG } from '@/config/site';
import ContactForm from './ContactForm';

const Contact = () => {
  const contactSettings = useSectionSettings('contact');

  return (
    <section id="contact" className="py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONFIG.duration.normal }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-charcoal dark:text-white mb-4">
            {contactSettings.headline}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {contactSettings.subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONFIG.duration.normal, delay: ANIMATION_CONFIG.duration.fast }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <ContactForm />

          {/* Alternative Contact Method */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Prefer to chat? Get instant answers to your questions.
            </p>
            <ChatTriggers.ContactChat />
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
