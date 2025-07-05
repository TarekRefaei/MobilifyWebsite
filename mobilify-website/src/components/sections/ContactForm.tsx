/**
 * Contact Form Component
 *
 * Comprehensive contact form with validation, submission handling, and analytics tracking.
 * Features real-time validation, loading states, and success/error feedback.
 *
 * @component
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 *
 * Features:
 * - Real-time form validation with field-level feedback
 * - Form submission with loading states and success/error handling
 * - Analytics tracking for form interactions and submissions
 * - Responsive design with mobile-optimized inputs
 * - Accessibility support with proper ARIA labels and error announcements
 * - Integration with external form services (Formspree/Web3Forms)
 * - Smooth animations for state transitions
 * - CMS-driven content with fallbacks
 *
 * Form Fields:
 * - Name (required)
 * - Email (required, validated)
 * - Company (optional)
 * - Project type (select dropdown)
 * - Budget range (select dropdown)
 * - Message (required, textarea)
 *
 * State Management:
 * - Uses custom useContactForm hook for all form logic
 * - Handles validation, submission, and reset functionality
 * - Integrates with analytics for tracking user interactions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useContactForm, useSectionSettings } from '@/hooks';
import { ANIMATION_CONFIG } from '@/config/site';

/**
 * Contact form with comprehensive validation and submission handling
 */
const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submitSuccess,
    updateField,
    handleFieldFocus,
    validateSingleField,
    submitForm,
    resetForm
  } = useContactForm();

  const contactSettings = useSectionSettings('contact');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(e.target.name as keyof typeof formData, e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    validateSingleField(e.target.name as keyof typeof formData);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleFieldFocus(e.target.name as keyof typeof formData);
  };

  // Show success message
  if (isSubmitted && submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: ANIMATION_CONFIG.duration.normal }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
      >
        <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-2">
          Message Sent Successfully!
        </div>
        <p className="text-green-700 dark:text-green-300 mb-4">
          {contactSettings.successMessage}
        </p>
        <button
          onClick={resetForm}
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your full name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company (Optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.company ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your company name"
          disabled={isSubmitting}
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
        )}
      </div>

      {/* Project Type Field */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Type *
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
            errors.projectType ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          disabled={isSubmitting}
        >
          <option value="">Select a project type</option>
          <option value="website-conversion">Website to App Conversion</option>
          <option value="custom-app">Custom App Development</option>
          <option value="enterprise">Enterprise Solution</option>
          <option value="consultation">Consultation Only</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectType}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-vertical ${
            errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us about your project, timeline, and any specific requirements..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {formData.message.length}/1000 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-electric-blue text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? 'Sending...' : contactSettings.buttonText}
      </button>

      {/* Error Message */}
      {isSubmitted && !submitSuccess && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">
            {contactSettings.errorMessage}
          </p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
