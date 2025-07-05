/**
 * Analytics Hook
 * 
 * Unified interface for all analytics tracking across the site.
 * Abstracts away the implementation details of Google Analytics.
 */

import { useCallback } from 'react';
import { DEV_CONFIG } from '@/config/site';

// Analytics event types
export interface AnalyticsEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Predefined event types for type safety
export const ANALYTICS_EVENTS = {
  // Navigation & CTA Events
  HERO_CTA_CLICK: 'hero_cta_click',
  CONTACT_CTA_CLICK: 'contact_cta_click',
  SERVICES_CTA_CLICK: 'services_cta_click',
  
  // Demo Interaction Events
  DEMO_INTERACTION: 'demo_interaction',
  DEMO_TAB_SWITCH: 'demo_tab_switch',
  DEMO_ANIMATION_COMPLETE: 'demo_animation_complete',
  DEMO_PREVIEW_CLICK: 'demo_preview_click',
  
  // Form Events
  FORM_SUBMIT: 'form_submit',
  FORM_SUCCESS: 'form_success',
  FORM_ERROR: 'form_error',
  FORM_FIELD_FOCUS: 'form_field_focus',
  
  // Content Interaction Events
  BLOG_POST_CLICK: 'blog_post_click',
  FAQ_ITEM_EXPAND: 'faq_item_expand',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  
  // Chat & Support Events
  CHAT_TRIGGER_CLICK: 'chat_trigger_click',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  
  // Page Events
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
} as const;

// Hook implementation
export function useAnalytics() {
  const trackEvent = useCallback((
    eventName: string,
    eventData?: Partial<AnalyticsEvent>
  ) => {
    // Only track in production or when explicitly enabled
    if (!DEV_CONFIG.enableAnalytics && !DEV_CONFIG.isDevelopment) {
      return;
    }

    // Log in development for debugging
    if (DEV_CONFIG.isDevelopment && DEV_CONFIG.enableDebugLogs) {
      console.log('📊 Analytics Event:', {
        event: eventName,
        ...eventData
      });
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', eventName, {
          event_category: eventData?.category || 'engagement',
          event_label: eventData?.label,
          value: eventData?.value,
          ...eventData?.custom_parameters
        });
      } catch (error) {
        console.warn('Failed to send analytics event:', error);
      }
    }
  }, []);

  // Convenience methods for common events
  const trackNavigation = useCallback((destination: string, source?: string) => {
    trackEvent(ANALYTICS_EVENTS.HERO_CTA_CLICK, {
      category: 'navigation',
      label: destination,
      custom_parameters: { source }
    });
  }, [trackEvent]);

  const trackFormInteraction = useCallback((
    action: 'submit' | 'success' | 'error' | 'field_focus',
    formName: string,
    fieldName?: string
  ) => {
    const eventMap = {
      submit: ANALYTICS_EVENTS.FORM_SUBMIT,
      success: ANALYTICS_EVENTS.FORM_SUCCESS,
      error: ANALYTICS_EVENTS.FORM_ERROR,
      field_focus: ANALYTICS_EVENTS.FORM_FIELD_FOCUS
    };

    trackEvent(eventMap[action], {
      category: 'form_interaction',
      label: formName,
      custom_parameters: { field_name: fieldName }
    });
  }, [trackEvent]);

  const trackDemoInteraction = useCallback((
    action: 'tab_switch' | 'preview_click' | 'animation_complete',
    details?: string
  ) => {
    const eventMap = {
      tab_switch: ANALYTICS_EVENTS.DEMO_TAB_SWITCH,
      preview_click: ANALYTICS_EVENTS.DEMO_PREVIEW_CLICK,
      animation_complete: ANALYTICS_EVENTS.DEMO_ANIMATION_COMPLETE
    };

    trackEvent(eventMap[action], {
      category: 'demo_interaction',
      label: details
    });
  }, [trackEvent]);

  const trackContentInteraction = useCallback((
    contentType: 'blog_post' | 'faq_item' | 'external_link',
    contentId: string,
    action?: string
  ) => {
    const eventMap = {
      blog_post: ANALYTICS_EVENTS.BLOG_POST_CLICK,
      faq_item: ANALYTICS_EVENTS.FAQ_ITEM_EXPAND,
      external_link: ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK
    };

    trackEvent(eventMap[contentType], {
      category: 'content_interaction',
      label: contentId,
      custom_parameters: { action }
    });
  }, [trackEvent]);

  const trackSupportInteraction = useCallback((
    method: 'chat' | 'phone' | 'email',
    source?: string
  ) => {
    const eventMap = {
      chat: ANALYTICS_EVENTS.CHAT_TRIGGER_CLICK,
      phone: ANALYTICS_EVENTS.PHONE_CLICK,
      email: ANALYTICS_EVENTS.EMAIL_CLICK
    };

    trackEvent(eventMap[method], {
      category: 'support_interaction',
      label: method,
      custom_parameters: { source }
    });
  }, [trackEvent]);

  const trackPageView = useCallback((pagePath: string, pageTitle?: string) => {
    trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
      category: 'page_interaction',
      label: pagePath,
      custom_parameters: {
        page_title: pageTitle,
        page_path: pagePath
      }
    });
  }, [trackEvent]);

  const trackFormSubmission = useCallback((formName: string, success: boolean, metadata?: Record<string, unknown>) => {
    trackEvent(ANALYTICS_EVENTS.FORM_SUBMIT, {
      category: 'form',
      label: formName,
      custom_parameters: {
        success,
        ...metadata
      }
    });
  }, [trackEvent]);

  return {
    // Core tracking function
    trackEvent,

    // Convenience methods
    trackNavigation,
    trackFormInteraction,
    trackFormSubmission,
    trackDemoInteraction,
    trackContentInteraction,
    trackSupportInteraction,
    trackPageView,

    // Event constants for external use
    EVENTS: ANALYTICS_EVENTS
  };
}


