'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PortableText from '../../components/PortableText';
import { FAQItem } from '../../lib/sanity';

interface FAQClientProps {
  faqItems: FAQItem[];
}

export default function FAQClient({ faqItems = [] }: FAQClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  // Get unique topics
  const topics = useMemo(() => {
    const topicSet = new Set(faqItems.map(item => item.topic.title));
    return Array.from(topicSet).sort();
  }, [faqItems]);

  // Filter FAQ items based on search and topic
  const filteredItems = useMemo(() => {
    return faqItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.some(block => 
          block._type === 'block' && 
          block.children?.some(child => 
            child.text?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      
      const matchesTopic = selectedTopic === 'all' || item.topic.title === selectedTopic;
      
      return matchesSearch && matchesTopic;
    });
  }, [faqItems, searchTerm, selectedTopic]);

  // Group items by topic
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: FAQItem[] } = {};
    filteredItems.forEach(item => {
      const topicTitle = item.topic.title;
      if (!groups[topicTitle]) {
        groups[topicTitle] = [];
      }
      groups[topicTitle].push(item);
    });
    return groups;
  }, [filteredItems]);

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.map(block => 
          block._type === 'block' && block.children 
            ? block.children.map(child => child.text).join(' ')
            : ''
        ).join(' '),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen w-full overflow-x-hidden">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-r from-electric-blue to-indigo-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Find answers to common questions about mobile app development, our process, pricing, and more.
              </p>
            </div>
          </section>

          {/* Search and Filter */}
          <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                />
              </div>

              {/* Topic Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedTopic === 'all'
                      ? 'bg-electric-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All Topics
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedTopic === topic
                        ? 'bg-electric-blue text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Items */}
          <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {Object.keys(groupedItems).length === 0 ? (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-dark-charcoal dark:text-white mb-4">
                    No questions found
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Try adjusting your search terms or topic filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTopic('all');
                    }}
                    className="bg-electric-blue text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedItems).map(([topicTitle, items]) => (
                    <div key={topicTitle}>
                      <h2 className="text-2xl font-bold text-dark-charcoal dark:text-white mb-6 pb-2 border-b-2 border-electric-blue">
                        {topicTitle}
                      </h2>
                      
                      <div className="space-y-4">
                        {items.map((item) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <button
                              onClick={() => toggleItem(item._id)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            >
                              <h3 className="text-lg font-semibold text-dark-charcoal dark:text-white pr-4">
                                {item.question}
                              </h3>
                              {openItems.has(item._id) ? (
                                <ChevronUp className="w-5 h-5 text-electric-blue flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-electric-blue flex-shrink-0" />
                              )}
                            </button>
                            
                            <AnimatePresence>
                              {openItems.has(item._id) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6">
                                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                      <PortableText content={item.answer} className="text-gray-700 dark:text-gray-300" />
                                      
                                      {/* Related Posts */}
                                      {item.relatedPosts && item.relatedPosts.length > 0 && (
                                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                                          <h4 className="text-sm font-semibold text-dark-charcoal dark:text-white mb-3">
                                            Related Articles:
                                          </h4>
                                          <div className="space-y-2">
                                            {item.relatedPosts.map((post) => (
                                              <Link
                                                key={post._id}
                                                href={`/blog/${post.slug.current}`}
                                                className="inline-flex items-center text-electric-blue hover:underline text-sm"
                                              >
                                                {post.title}
                                                <ExternalLink className="ml-1 w-3 h-3" />
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-dark-charcoal dark:text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We&apos;re here to help! Get in touch with our team for personalized answers.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center bg-electric-blue text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
