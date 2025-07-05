/**
 * Footer Newsletter Component
 * 
 * Handles newsletter signup in the footer section.
 * Includes form validation and submission tracking.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks';
import { ANIMATION_CONFIG } from '@/config/site';

interface FooterNewsletterProps {
  className?: string;
}

interface NewsletterState {
  email: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const FooterNewsletter: React.FC<FooterNewsletterProps> = ({ className = '' }) => {
  const [state, setState] = useState<NewsletterState>({
    email: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const { trackFormSubmission } = useAnalytics();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(state.email)) {
      setState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // Newsletter signup API call would go here
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isSubmitted: true,
        email: ''
      }));

      trackFormSubmission('newsletter', true, {
        source: 'footer',
        email_domain: state.email.split('@')[1]
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, isSubmitted: false }));
      }, 3000);

    } catch {
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: 'Something went wrong. Please try again.' 
      }));

      trackFormSubmission('newsletter', false, {
        source: 'footer',
        error: 'submission_failed'
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ 
      ...prev, 
      email: e.target.value,
      error: null 
    }));
  };

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-white">
        Stay Updated
      </h3>
      <p className="text-gray-400 dark:text-gray-300 text-sm mb-4">
        Get the latest updates on mobile app development trends and Mobilify news.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="email"
            value={state.email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            disabled={state.isSubmitting || state.isSubmitted}
            className="
              w-full pl-10 pr-4 py-2 text-sm
              bg-gray-800 dark:bg-gray-700 
              border border-gray-600 dark:border-gray-600
              rounded-lg text-white placeholder-gray-400
              focus:ring-2 focus:ring-electric-blue focus:border-electric-blue
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            aria-label="Email address for newsletter"
          />
        </div>

        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-xs"
          >
            <AlertCircle className="h-3 w-3" />
            {state.error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={state.isSubmitting || state.isSubmitted || !state.email.trim()}
          className="
            w-full py-2 px-4 text-sm font-medium rounded-lg
            bg-electric-blue hover:bg-electric-blue/90
            text-white transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-gray-800
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {state.isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </div>
          ) : state.isSubmitted ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Subscribed!
            </div>
          ) : (
            'Subscribe'
          )}
        </motion.button>
      </form>

      {state.isSubmitted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONFIG.duration.normal }}
          className="text-green-400 text-xs mt-2"
        >
          Thank you for subscribing! Check your email for confirmation.
        </motion.p>
      )}
    </div>
  );
};

export default FooterNewsletter;
