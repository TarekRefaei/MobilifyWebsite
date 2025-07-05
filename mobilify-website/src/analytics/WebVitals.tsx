'use client';

import { useEffect } from 'react';

// Web Vitals monitoring component
const WebVitals = () => {
  useEffect(() => {
    // Only load web-vitals in production and when analytics is available
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && window.gtag) {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        // Core Web Vitals
        onCLS((metric) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(metric.value * 1000),
            custom_map: {
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
            },
          });
        });

        // FID has been replaced by INP in web-vitals v3+

        onFCP((metric) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(metric.value),
            custom_map: {
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
            },
          });
        });

        onLCP((metric) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(metric.value),
            custom_map: {
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
            },
          });
        });

        onTTFB((metric) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'TTFB',
            value: Math.round(metric.value),
            custom_map: {
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
            },
          });
        });

        // Interaction to Next Paint (INP) - new Core Web Vital
        onINP((metric) => {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'INP',
            value: Math.round(metric.value),
            custom_map: {
              metric_id: metric.id,
              metric_value: metric.value,
              metric_delta: metric.delta,
            },
          });
        });
      }).catch((error) => {
        console.warn('Failed to load web-vitals:', error);
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitals;
