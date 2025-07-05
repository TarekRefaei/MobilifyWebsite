'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Mission = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          
          <div className="text-lg text-gray-600 leading-relaxed space-y-6">
            <p>
              To empower every entrepreneur and business with the ability to create beautiful, 
              high-performance mobile apps, transforming brilliant ideas into market-ready 
              reality without the traditional complexity and cost.
            </p>
            
            <p>
              We believe that innovation shouldn&apos;t be limited by technical barriers or
              prohibitive costs. Every great idea deserves the chance to reach users 
              through the most personal and powerful platform available – mobile devices.
            </p>
            
            <p>
              Our approach combines cutting-edge technology with human expertise, ensuring 
              that each app we create is not just functional, but exceptional. We&apos;re not
              just building apps; we&apos;re building the future of mobile experiences, one
              project at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
