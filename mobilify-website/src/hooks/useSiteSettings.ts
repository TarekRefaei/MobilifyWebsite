/**
 * Site Settings Hook
 * 
 * Fetches site settings from Sanity CMS with fallback to static configuration.
 * Provides a unified interface for accessing dynamic content across the site.
 */

import { useState, useEffect } from 'react';
import { getSiteSettings, type SiteSettings } from '@/lib/sanity';
import { FALLBACK_CONTENT } from '@/config/site';

// Combined settings interface with fallbacks
export interface SiteSettingsWithFallbacks {
  // Hero Section
  heroHeadline: string;
  heroSubtext: string;
  heroButtonText: string;
  
  // Contact Section
  contactHeadline: string;
  contactSubtext: string;
  contactButtonText: string;
  
  // Form Messages
  formSuccessMessage: string;
  formErrorMessage: string;
  
  // Services Section
  servicesHeadline: string;
  servicesSubtext: string;
  
  // Process Section
  processHeadline: string;
  processSubtext: string;
  
  // About Section
  aboutHeadline: string;
  aboutSubtext: string;
  
  // Footer
  footerTagline: string;
  footerCopyright: string;
  
  // Meta information
  isLoading: boolean;
  isFromCMS: boolean;
  error: string | null;
}

// Create settings with fallbacks
const createSettingsWithFallbacks = (
  cmsSettings: SiteSettings | null,
  isLoading: boolean = false,
  error: string | null = null
): SiteSettingsWithFallbacks => {
  const currentYear = new Date().getFullYear();
  
  return {
    // Hero Section
    heroHeadline: cmsSettings?.heroHeadline || FALLBACK_CONTENT.hero.headline,
    heroSubtext: cmsSettings?.heroSubtext || FALLBACK_CONTENT.hero.subtext,
    heroButtonText: cmsSettings?.heroButtonText || FALLBACK_CONTENT.hero.buttonText,
    
    // Contact Section
    contactHeadline: cmsSettings?.contactHeadline || FALLBACK_CONTENT.contact.headline,
    contactSubtext: cmsSettings?.contactSubtext || FALLBACK_CONTENT.contact.subtext,
    contactButtonText: cmsSettings?.contactButtonText || FALLBACK_CONTENT.contact.buttonText,
    
    // Form Messages
    formSuccessMessage: cmsSettings?.formSuccessMessage || FALLBACK_CONTENT.contact.successMessage,
    formErrorMessage: cmsSettings?.formErrorMessage || FALLBACK_CONTENT.contact.errorMessage,
    
    // Services Section
    servicesHeadline: cmsSettings?.servicesHeadline || FALLBACK_CONTENT.services.headline,
    servicesSubtext: cmsSettings?.servicesSubtext || FALLBACK_CONTENT.services.subtext,
    
    // Process Section
    processHeadline: cmsSettings?.processHeadline || FALLBACK_CONTENT.process.headline,
    processSubtext: cmsSettings?.processSubtext || FALLBACK_CONTENT.process.subtext,
    
    // About Section
    aboutHeadline: cmsSettings?.aboutHeadline || FALLBACK_CONTENT.about.headline,
    aboutSubtext: cmsSettings?.aboutSubtext || FALLBACK_CONTENT.about.subtext,
    
    // Footer
    footerTagline: cmsSettings?.footerTagline || 'Building the future of mobile apps',
    footerCopyright: cmsSettings?.footerCopyright || `© ${currentYear} Mobilify. All rights reserved.`,
    
    // Meta information
    isLoading,
    isFromCMS: !!cmsSettings,
    error
  };
};

// Hook implementation
export function useSiteSettings(): SiteSettingsWithFallbacks {
  const [cmsSettings, setCmsSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const settings = await getSiteSettings();
        
        if (isMounted) {
          setCmsSettings(settings);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch site settings';
          setError(errorMessage);
          setIsLoading(false);
          console.warn('Failed to fetch site settings, using fallbacks:', errorMessage);
        }
      }
    };

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return createSettingsWithFallbacks(cmsSettings, isLoading, error);
}

// Static version for server-side rendering or when you need immediate access
export function getStaticSiteSettings(): SiteSettingsWithFallbacks {
  return createSettingsWithFallbacks(null, false, null);
}

// Utility function to get specific section settings
export function useSectionSettings(section: 'hero' | 'contact' | 'services' | 'process' | 'about') {
  const settings = useSiteSettings();
  
  switch (section) {
    case 'hero':
      return {
        headline: settings.heroHeadline,
        subtext: settings.heroSubtext,
        buttonText: settings.heroButtonText,
        isLoading: settings.isLoading,
        isFromCMS: settings.isFromCMS
      };
      
    case 'contact':
      return {
        headline: settings.contactHeadline,
        subtext: settings.contactSubtext,
        buttonText: settings.contactButtonText,
        successMessage: settings.formSuccessMessage,
        errorMessage: settings.formErrorMessage,
        isLoading: settings.isLoading,
        isFromCMS: settings.isFromCMS
      };
      
    case 'services':
      return {
        headline: settings.servicesHeadline,
        subtext: settings.servicesSubtext,
        isLoading: settings.isLoading,
        isFromCMS: settings.isFromCMS
      };
      
    case 'process':
      return {
        headline: settings.processHeadline,
        subtext: settings.processSubtext,
        isLoading: settings.isLoading,
        isFromCMS: settings.isFromCMS
      };
      
    case 'about':
      return {
        headline: settings.aboutHeadline,
        subtext: settings.aboutSubtext,
        isLoading: settings.isLoading,
        isFromCMS: settings.isFromCMS
      };
      
    default:
      return {
        isLoading: settings.isLoading,
        isFromCMS: settings.isFromCMS
      };
  }
}


