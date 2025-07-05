'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ServicesFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What\'s included in the Starter App package?',
      answer: 'The Starter App package is perfect for converting existing websites into mobile apps. It includes iOS and Android development, standardized UI templates, push notifications, guided app store submission, and email support. This package focuses on getting your existing web presence onto mobile devices quickly and affordably.',
    },
    {
      question: 'How is the Custom App package different?',
      answer: 'The Custom App package is our most popular option for turning new ideas into reality. It includes everything in Starter, plus custom branded UI/UX design, native device features (camera, GPS, etc.), advanced offline capabilities, up to 2 third-party API integrations, managed app store submission, and priority email & chat support.',
    },
    {
      question: 'When should I choose the Enterprise package?',
      answer: 'The Enterprise package is designed for complex projects requiring bespoke solutions. It includes fully custom design, unlimited API integrations, custom sync engines, a dedicated project manager, 24/7 support, and fully managed app store processes. Perfect for large organizations or apps with complex technical requirements.',
    },
    {
      question: 'How long does development typically take?',
      answer: 'Development timelines vary by package: Starter Apps typically take 2-4 weeks, Custom Apps take 4-8 weeks, and Enterprise projects are scoped individually. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
    },
    {
      question: 'Do you handle app store submissions?',
      answer: 'Yes! All packages include app store submission support. Starter packages include guided submission (we help you through the process), Custom packages include managed submission (we handle most of it), and Enterprise packages include fully managed submission (we take care of everything).',
    },
    {
      question: 'What ongoing support do you provide?',
      answer: 'Support varies by package: Starter includes email support, Custom includes priority email & chat support, and Enterprise includes 24/7 dedicated support. All packages include bug fixes for the first 30 days after launch, and we offer ongoing maintenance plans for long-term support.',
    },
    {
      question: 'Can I upgrade my package later?',
      answer: 'Absolutely! You can upgrade your package at any time during development. We\'ll adjust the pricing and timeline accordingly. Many clients start with a Starter package and upgrade to Custom as their needs become clearer.',
    },
    {
      question: 'Do you provide the source code?',
      answer: 'Yes, you own all the code we create for your project. Upon final payment, you receive the complete source code, documentation, and any necessary credentials. This ensures you\'re never locked into working with us and can make changes independently if needed.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our services and packages
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;d love to help!
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
          >
            Get in touch with our team
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesFAQ;
