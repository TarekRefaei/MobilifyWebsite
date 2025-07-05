'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Crisp Chat Types
type CrispCommand = string;
type CrispData = string | number | boolean | object | null;
type CrispCallback = (...args: unknown[]) => void;

// Google Analytics Types
type GtagEvent = (
  command: 'event',
  eventName: string,
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: unknown;
  }
) => void;

declare global {
  interface Window {
    $crisp: unknown[][];
    CRISP_WEBSITE_ID: string;
  }
}

interface CrispChatProps {
  websiteId?: string;
}

const CrispChat: React.FC<CrispChatProps> = ({ websiteId }) => {
  // Get website ID from props or environment variable
  const crispWebsiteId = websiteId || process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

  // Check if Crisp website ID is valid
  const isValidCrispId = (id: string | undefined): boolean => {
    if (!id) return false;
    // Exclude placeholder values and ensure it's a valid format
    return !id.includes('your_crisp_website_id') &&
           !id.includes('placeholder') &&
           id.length > 10; // Crisp IDs are typically longer
  };

  useEffect(() => {
    if (!crispWebsiteId || !isValidCrispId(crispWebsiteId)) {
      if (!crispWebsiteId) {
        console.warn('Crisp Website ID not found. Please set NEXT_PUBLIC_CRISP_WEBSITE_ID environment variable.');
      } else {
        console.warn('Invalid Crisp Website ID detected. Please check your NEXT_PUBLIC_CRISP_WEBSITE_ID environment variable.');
      }
      return;
    }

    // Initialize Crisp configuration after script loads
    const initializeCrisp = () => {
      if (typeof window !== 'undefined' && window.$crisp) {
        // Configure Crisp settings
        window.$crisp.push(['safe', true]);

        // Set custom data for better support
        window.$crisp.push(['set', 'user:company', 'Mobilify Website Visitor']);
        window.$crisp.push(['set', 'session:data', {
          source: 'website',
          page: window.location.pathname,
          timestamp: new Date().toISOString()
        }]);

        // Track chat interactions for analytics
        window.$crisp.push(['on', 'chat:opened', () => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'chat_opened', {
              event_category: 'engagement',
              event_label: 'crisp_chat'
            });
          }
        }]);

        window.$crisp.push(['on', 'message:sent', () => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'chat_message_sent', {
              event_category: 'engagement',
              event_label: 'crisp_chat'
            });
          }
        }]);

        window.$crisp.push(['on', 'message:received', () => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'chat_message_received', {
              event_category: 'engagement',
              event_label: 'crisp_chat'
            });
          }
        }]);
      }
    };

    // Initialize if Crisp is already loaded, otherwise wait for it
    if (window.$crisp) {
      initializeCrisp();
    } else {
      // Set up a check for when Crisp loads
      const checkCrisp = setInterval(() => {
        if (window.$crisp) {
          initializeCrisp();
          clearInterval(checkCrisp);
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkCrisp), 10000);
    }
  }, [crispWebsiteId]);

  if (!crispWebsiteId || !isValidCrispId(crispWebsiteId)) {
    return null;
  }

  return (
    <>
      <Script
        id="crisp-chat-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "${crispWebsiteId}";
          `
        }}
      />
      <Script
        src="https://client.crisp.chat/l.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default CrispChat;

// Utility functions for programmatic chat control
export const crispUtils = {
  // Open the chat widget
  openChat: () => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['do', 'chat:open']);
    }
  },

  // Close the chat widget
  closeChat: () => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['do', 'chat:close']);
    }
  },

  // Show the chat widget
  showChat: () => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['do', 'chat:show']);
    }
  },

  // Hide the chat widget
  hideChat: () => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['do', 'chat:hide']);
    }
  },

  // Set user information
  setUser: (user: { nickname?: string; email?: string; phone?: string; avatar?: string }) => {
    if (typeof window !== 'undefined' && window.$crisp) {
      if (user.nickname) window.$crisp.push(['set', 'user:nickname', user.nickname]);
      if (user.email) window.$crisp.push(['set', 'user:email', user.email]);
      if (user.phone) window.$crisp.push(['set', 'user:phone', user.phone]);
      if (user.avatar) window.$crisp.push(['set', 'user:avatar', user.avatar]);
    }
  },

  // Send a message programmatically
  sendMessage: (message: string) => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['do', 'message:send', ['text', message]]);
    }
  },

  // Set session data
  setSessionData: (data: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['set', 'session:data', data]);
    }
  },

  // Check if chat is available
  isChatAvailable: (): boolean => {
    if (typeof window !== 'undefined' && window.$crisp) {
      return window.$crisp.length > 0;
    }
    return false;
  },

  // Set custom segments for targeting
  setSegments: (segments: string[]) => {
    if (typeof window !== 'undefined' && window.$crisp) {
      window.$crisp.push(['set', 'session:segments', segments]);
    }
  }
};
