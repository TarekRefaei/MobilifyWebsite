'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from './ui';

interface NewsletterSignupProps {
  variant?: 'inline' | 'footer' | 'section';
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  variant = 'inline',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get Mailchimp API credentials from environment variables
      const apiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
      const listId = process.env.MAILCHIMP_LIST_ID;

      if (!apiKey || !listId) {
        console.warn('Mailchimp credentials not configured');
        // Simulate success for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        setEmail('');
        
        // Track newsletter signup event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: variant
          });
        }
        return;
      }

      // In a real implementation, you would call your API endpoint here
      // that handles the Mailchimp subscription
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: variant
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
        
        // Track newsletter signup event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'engagement',
            event_label: variant
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className={`${className}`}>
      {(variant === 'inline' || variant === 'section') && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16 md:py-20 bg-electric-blue"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated on Mobile Innovation
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-blue-100 max-w-3xl mx-auto mb-8">
              Get insights on mobile app development, industry trends, and exclusive tips delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-white border-white focus:ring-white focus:border-white"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  isLoading={isSubmitting}
                  disabled={!email.trim() || isSubmitting}
                  className="bg-white text-electric-blue hover:bg-gray-50 border-white"
                >
                  Subscribe
                </Button>
              </div>
              
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-100 text-sm"
                >
                  ✓ Successfully subscribed! Check your email for confirmation.
                </motion.p>
              )}
              
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-red-100 text-sm"
                >
                  ✗ Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      )}

      {variant === 'footer' && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Stay Connected</h3>
          <p className="text-sm text-gray-400 dark:text-gray-300 mb-4 leading-relaxed">
            Get the latest updates on mobile app development and industry insights.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-electric-blue focus:border-electric-blue"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
              disabled={!email.trim() || isSubmitting}
              className="w-full"
            >
              Subscribe
            </Button>
            
            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm"
              >
                ✓ Successfully subscribed!
              </motion.p>
            )}
            
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                ✗ Please try again.
              </motion.p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;
