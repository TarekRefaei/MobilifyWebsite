/**
 * Analytics Type Definitions
 * 
 * This file contains all TypeScript interfaces for analytics tracking and events.
 * These types ensure type safety when working with analytics across the application.
 */

// Base Analytics Event
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

// Google Analytics Event
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Enhanced E-commerce Events
export interface EcommerceEvent {
  currency?: string;
  value?: number;
  transaction_id?: string;
  items?: EcommerceItem[];
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  category?: string;
  quantity?: number;
  price?: number;
}

// User Properties
export interface UserProperties {
  user_id?: string;
  user_type?: 'visitor' | 'lead' | 'customer';
  subscription_status?: 'free' | 'trial' | 'paid';
  company_size?: 'startup' | 'small' | 'medium' | 'enterprise';
  industry?: string;
  referral_source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Page View Event
export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_referrer?: string;
  content_group1?: string; // Section (e.g., 'home', 'services', 'about')
  content_group2?: string; // Subsection
  custom_parameters?: Record<string, any>;
}

// Form Analytics Events
export interface FormEvent extends AnalyticsEvent {
  name: 'form_start' | 'form_submit' | 'form_success' | 'form_error' | 'form_abandon';
  properties: {
    form_name: string;
    form_id?: string;
    field_name?: string;
    error_type?: string;
    time_to_complete?: number;
    step_number?: number;
    total_steps?: number;
  };
}

// Navigation Events
export interface NavigationEvent extends AnalyticsEvent {
  name: 'navigation_click' | 'cta_click' | 'link_click';
  properties: {
    link_text: string;
    link_url: string;
    link_type: 'internal' | 'external' | 'download' | 'email' | 'phone';
    section: string;
    position?: number;
  };
}

// Interactive Demo Events
export interface DemoEvent extends AnalyticsEvent {
  name: 'demo_start' | 'demo_step' | 'demo_complete' | 'demo_abandon';
  properties: {
    demo_type: string;
    step_name?: string;
    step_number?: number;
    total_steps?: number;
    time_spent?: number;
    completion_rate?: number;
  };
}

// Content Engagement Events
export interface ContentEvent extends AnalyticsEvent {
  name: 'content_view' | 'content_engage' | 'content_share' | 'content_download';
  properties: {
    content_type: 'blog' | 'case_study' | 'whitepaper' | 'video' | 'infographic';
    content_id: string;
    content_title: string;
    content_category?: string;
    engagement_type?: 'scroll' | 'time' | 'click' | 'share';
    engagement_value?: number;
  };
}

// Search Events
export interface SearchEvent extends AnalyticsEvent {
  name: 'search' | 'search_results' | 'search_result_click';
  properties: {
    search_term: string;
    search_results_count?: number;
    result_position?: number;
    result_id?: string;
    search_type?: 'site' | 'blog' | 'services';
  };
}

// Error Events
export interface ErrorEvent extends AnalyticsEvent {
  name: 'error' | 'exception';
  properties: {
    error_type: 'javascript' | 'network' | 'form' | 'api';
    error_message: string;
    error_stack?: string;
    page_location: string;
    user_agent?: string;
    fatal?: boolean;
  };
}

// Performance Events
export interface PerformanceEvent extends AnalyticsEvent {
  name: 'page_load' | 'core_web_vitals' | 'resource_timing';
  properties: {
    metric_name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'load_time';
    metric_value: number;
    metric_unit: 'ms' | 'score' | 'bytes';
    page_location: string;
    connection_type?: string;
    device_type?: 'mobile' | 'tablet' | 'desktop';
  };
}

// Custom Events for Mobilify
export interface MobilifyEvent extends AnalyticsEvent {
  name: 
    | 'hero_cta_click'
    | 'services_view'
    | 'process_step_view'
    | 'contact_form_start'
    | 'contact_form_submit'
    | 'newsletter_signup'
    | 'demo_request'
    | 'quote_request'
    | 'social_link_click'
    | 'footer_link_click'
    | 'mobile_menu_open'
    | 'mobile_menu_close'
    | 'dark_mode_toggle'
    | 'language_change'
    | 'cookie_consent'
    | 'scroll_depth'
    | 'video_play'
    | 'video_complete'
    | 'file_download'
    | 'external_link_click';
}

// Analytics Configuration
export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  linkedInPartnerId?: string;
  hotjarId?: string;
  mixpanelToken?: string;
  segmentWriteKey?: string;
  enableDebugMode?: boolean;
  enableInDevelopment?: boolean;
  cookieConsentRequired?: boolean;
  dataRetentionDays?: number;
}

// Analytics Provider Interface
export interface AnalyticsProvider {
  name: string;
  initialize: (config: AnalyticsConfig) => void;
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (event: PageViewEvent) => void;
  setUserProperties: (properties: UserProperties) => void;
  identify: (userId: string, properties?: UserProperties) => void;
  reset: () => void;
  isInitialized: () => boolean;
}

// Analytics Context
export interface AnalyticsContextValue {
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (event: PageViewEvent) => void;
  trackFormEvent: (event: FormEvent) => void;
  trackNavigationEvent: (event: NavigationEvent) => void;
  trackDemoEvent: (event: DemoEvent) => void;
  trackContentEvent: (event: ContentEvent) => void;
  trackSearchEvent: (event: SearchEvent) => void;
  trackErrorEvent: (event: ErrorEvent) => void;
  trackPerformanceEvent: (event: PerformanceEvent) => void;
  setUserProperties: (properties: UserProperties) => void;
  identify: (userId: string, properties?: UserProperties) => void;
  isInitialized: boolean;
  debugMode: boolean;
}

// Analytics Hook Return Type
export interface UseAnalyticsReturn {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
  trackPageView: (pageName: string, properties?: Record<string, any>) => void;
  trackFormSubmission: (formName: string, success: boolean, properties?: Record<string, any>) => void;
  trackButtonClick: (buttonName: string, location: string, properties?: Record<string, any>) => void;
  trackLinkClick: (linkText: string, linkUrl: string, properties?: Record<string, any>) => void;
  trackError: (error: Error, context?: string, properties?: Record<string, any>) => void;
  setUserProperties: (properties: UserProperties) => void;
  identify: (userId: string, properties?: UserProperties) => void;
}

// Event Tracking Utilities
export interface EventTracker {
  // Form tracking
  trackFormStart: (formName: string) => void;
  trackFormSubmit: (formName: string) => void;
  trackFormSuccess: (formName: string, timeToComplete?: number) => void;
  trackFormError: (formName: string, errorType: string) => void;
  trackFormAbandon: (formName: string, lastField?: string) => void;
  
  // Navigation tracking
  trackNavigation: (linkText: string, linkUrl: string, section: string) => void;
  trackCTAClick: (ctaText: string, location: string) => void;
  
  // Content tracking
  trackContentView: (contentType: string, contentId: string) => void;
  trackScrollDepth: (depth: number, page: string) => void;
  
  // Demo tracking
  trackDemoStart: (demoType: string) => void;
  trackDemoStep: (stepName: string, stepNumber: number) => void;
  trackDemoComplete: (demoType: string, timeSpent: number) => void;
}

// Analytics Middleware
export interface AnalyticsMiddleware {
  beforeTrack?: (event: AnalyticsEvent) => AnalyticsEvent | null;
  afterTrack?: (event: AnalyticsEvent) => void;
  onError?: (error: Error, event: AnalyticsEvent) => void;
}
