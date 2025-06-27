'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AboutSnippet = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              We're More Than Just Developers
            </h2>
            
            <div className="text-lg text-gray-600 leading-relaxed mb-8 space-y-4">
              <p>
                At Mobilify, we believe that every great idea deserves to become reality. 
                We're passionate about helping founders and businesses succeed by removing 
                the traditional barriers to mobile app development.
              </p>
              
              <p>
                Our commitment goes beyond just writing code – we're your partners in 
                bringing your vision to life. We focus on quality over quantity, ensuring 
                each app we create is crafted with care, attention to detail, and a deep 
                understanding of your unique needs.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link
                href="/about"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
              >
                Meet the Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
