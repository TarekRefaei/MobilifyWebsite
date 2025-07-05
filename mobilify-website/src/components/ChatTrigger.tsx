'use client';

import React from 'react';
import { MessageCircle, HelpCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { crispUtils } from '../analytics/CrispChat';

interface ChatTriggerProps {
  variant?: 'button' | 'floating' | 'inline';
  text?: string;
  icon?: 'message' | 'help' | 'phone';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  context?: string; // For analytics and session data
}

const ChatTrigger: React.FC<ChatTriggerProps> = ({
  variant = 'button',
  text = 'Chat with us',
  icon = 'message',
  className = '',
  size = 'md',
  context = 'general'
}) => {
  const handleChatOpen = () => {
    // Set context data for better support
    crispUtils.setSessionData({
      trigger_context: context,
      trigger_page: window.location.pathname,
      trigger_time: new Date().toISOString()
    });

    // Open the chat
    crispUtils.openChat();

    // Track the interaction
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_trigger_clicked', {
        event_category: 'engagement',
        event_label: context,
        custom_parameter_1: variant
      });
    }
  };

  const getIcon = () => {
    const iconProps = {
      className: size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
    };

    switch (icon) {
      case 'help':
        return <HelpCircle {...iconProps} />;
      case 'phone':
        return <Phone {...iconProps} />;
      default:
        return <MessageCircle {...iconProps} />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  if (variant === 'floating') {
    return (
      <motion.button
        onClick={handleChatOpen}
        className={`fixed bottom-6 right-6 bg-electric-blue text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        title={text}
      >
        {getIcon()}
        <span className="sr-only">{text}</span>
      </motion.button>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={handleChatOpen}
        className={`inline-flex items-center gap-2 text-electric-blue hover:text-indigo-700 font-medium transition-colors duration-200 ${className}`}
      >
        {getIcon()}
        <span>{text}</span>
      </button>
    );
  }

  // Default button variant
  return (
    <motion.button
      onClick={handleChatOpen}
      className={`inline-flex items-center gap-2 bg-electric-blue text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg ${getSizeClasses()} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {getIcon()}
      <span>{text}</span>
    </motion.button>
  );
};

export default ChatTrigger;

// Pre-configured chat triggers for common use cases
export const ChatTriggers = {
  // For the header/navigation
  HeaderChat: () => (
    <ChatTrigger
      variant="inline"
      text="Live Chat"
      icon="message"
      context="header"
      size="sm"
    />
  ),

  // For the contact section
  ContactChat: () => (
    <ChatTrigger
      variant="button"
      text="Chat with Our Team"
      icon="message"
      context="contact"
      size="lg"
      className="w-full sm:w-auto"
    />
  ),

  // For the services page
  ServicesChat: () => (
    <ChatTrigger
      variant="button"
      text="Ask About Pricing"
      icon="help"
      context="services"
      size="md"
    />
  ),

  // For the FAQ page
  FAQChat: () => (
    <ChatTrigger
      variant="inline"
      text="Still have questions? Chat with us"
      icon="help"
      context="faq"
      size="md"
    />
  ),

  // For blog posts
  BlogChat: () => (
    <ChatTrigger
      variant="inline"
      text="Discuss this article"
      icon="message"
      context="blog"
      size="sm"
    />
  ),

  // Floating action button (always visible)
  FloatingChat: () => (
    <ChatTrigger
      variant="floating"
      text="Chat with us"
      icon="message"
      context="floating"
    />
  ),

  // For the demo section
  DemoChat: () => (
    <ChatTrigger
      variant="button"
      text="Get Help with Demo"
      icon="help"
      context="demo"
      size="md"
    />
  )
};
