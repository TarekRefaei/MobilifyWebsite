/**
 * Hooks Index
 * 
 * Central export point for all custom hooks.
 */

// Analytics hook
export { useAnalytics, ANALYTICS_EVENTS } from './useAnalytics';
export type { AnalyticsEvent } from './useAnalytics';

// Contact form hook
export { useContactForm } from './useContactForm';
export type { ContactFormData, FormErrors, FormState } from './useContactForm';

// Site settings hook
export { useSiteSettings, useSectionSettings, getStaticSiteSettings } from './useSiteSettings';
export type { SiteSettingsWithFallbacks } from './useSiteSettings';
