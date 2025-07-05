'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TeamProfiles = () => {
  const team = [
    {
      name: 'Alex Chen',
      title: 'CEO & Founder',
      bio: 'A former Product Lead at Shopify, Alex saw countless businesses struggle to make the leap from web to mobile. He founded Mobilify with a passion for democratizing technology, driven by the belief that a great idea, not a massive budget, should be the only prerequisite for a world-class mobile app.',
      // Using a placeholder service for professional headshots
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Maria Garcia',
      title: 'CTO & Co-Founder',
      bio: 'With a background as a Senior Software Engineer at Twilio, Maria is the technical architect behind Mobilify\'s innovative platform. She specializes in building scalable, AI-driven systems. Maria is passionate about crafting elegant code and powerful tools that make sophisticated technology feel simple and accessible to everyone.',
      // Using a placeholder service for professional headshots
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind Mobilify, dedicated to turning your vision into reality
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                  priority={index === 0} // Prioritize first image for LCP
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-indigo-600 font-semibold mb-4">
                {member.title}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Why We Started Mobilify
            </h3>
            <p className="text-gray-600 leading-relaxed">
              After years of working at leading tech companies, we saw firsthand how mobile apps 
              could transform businesses. Yet, we also witnessed countless entrepreneurs and small 
              businesses struggle with the complexity and cost of mobile development. Mobilify was 
              born from our desire to bridge this gap – to make world-class mobile app development 
              accessible to everyone with a great idea.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamProfiles;
