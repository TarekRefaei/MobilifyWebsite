'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Eye, Zap } from 'lucide-react';

const CompanyValues = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Craftsmanship',
      description: 'We believe in doing things right the first time. Every line of code, every design element, and every user interaction is crafted with meticulous attention to detail.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client Partnership',
      description: 'We\'re not just service providers – we\'re your partners in success. We invest in understanding your vision and work collaboratively to bring it to life.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Transparency',
      description: 'Clear communication, honest timelines, and upfront pricing. You\'ll always know where your project stands and what to expect next.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We stay at the forefront of mobile technology, constantly exploring new ways to create better, faster, and more engaging user experiences.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do and every decision we make
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                {value.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We'd love to learn about your project and explore how we can help bring your mobile app vision to life. 
              Let's start a conversation about your goals and how Mobilify can support your success.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyValues;
