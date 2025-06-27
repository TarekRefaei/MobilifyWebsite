'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    // Only load Google Analytics in production and if GA_ID is provided
    const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    if (!GA_ID || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Check if scripts are already loaded
    if (document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)) {
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(script2);

    // Make gtag available globally
    window.gtag = function() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
