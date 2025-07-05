/**
 * Contact Form Hook
 * 
 * Handles form state management, validation, and submission logic
 * for the contact form component.
 */

import { useState, useCallback } from 'react';
import { EXTERNAL_SERVICES } from '@/config/site';
import { useAnalytics } from './useAnalytics';

// Form data interface
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

// Form validation errors
export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
  general?: string;
}

// Form state
export interface FormState {
  data: ContactFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitSuccess: boolean;
}

// Initial form data
const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: ''
};

// Initial form state
const initialFormState: FormState = {
  data: initialFormData,
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  submitSuccess: false
};

// Validation rules
const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return undefined;
      
    case 'email':
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return undefined;
      
    case 'company':
      // Company is optional, but if provided should be reasonable length
      if (value.trim() && value.trim().length < 2) return 'Company name must be at least 2 characters';
      return undefined;
      
    case 'projectType':
      if (!value.trim()) return 'Please select a project type';
      return undefined;
      
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
      return undefined;
      
    default:
      return undefined;
  }
};

// Validate entire form
const validateForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {};
  
  (Object.keys(data) as Array<keyof ContactFormData>).forEach(field => {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

// Hook implementation
export function useContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const { trackFormInteraction } = useAnalytics();

  // Update form data
  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value
      },
      // Clear field error when user starts typing
      errors: {
        ...prev.errors,
        [field]: undefined,
        general: undefined
      }
    }));
  }, []);

  // Handle field focus for analytics
  const handleFieldFocus = useCallback((field: keyof ContactFormData) => {
    trackFormInteraction('field_focus', 'contact_form', field);
  }, [trackFormInteraction]);

  // Validate single field
  const validateSingleField = useCallback((field: keyof ContactFormData) => {
    const error = validateField(field, formState.data[field]);
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error
      }
    }));
    return !error;
  }, [formState.data]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormState(initialFormState);
  }, []);

  // Submit form
  const submitForm = useCallback(async () => {
    // Validate form
    const errors = validateForm(formState.data);
    
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({
        ...prev,
        errors
      }));
      return false;
    }

    // Check if Web3Forms is configured
    if (!EXTERNAL_SERVICES.forms.web3forms) {
      setFormState(prev => ({
        ...prev,
        errors: {
          general: 'Form service is not configured. Please contact us directly.'
        }
      }));
      trackFormInteraction('error', 'contact_form');
      return false;
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      errors: {}
    }));

    trackFormInteraction('submit', 'contact_form');

    try {
      const formData = new FormData();
      formData.append('access_key', EXTERNAL_SERVICES.forms.web3forms);
      formData.append('name', formState.data.name);
      formData.append('email', formState.data.email);
      formData.append('company', formState.data.company);
      formData.append('project_type', formState.data.projectType);
      formData.append('message', formState.data.message);
      formData.append('from_name', 'Mobilify Contact Form');
      formData.append('subject', `New Contact Form Submission from ${formState.data.name}`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
          submitSuccess: true
        }));
        trackFormInteraction('success', 'contact_form');
        return true;
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        submitSuccess: false,
        errors: {
          general: 'There was an error sending your message. Please try again or contact us directly.'
        }
      }));
      trackFormInteraction('error', 'contact_form');
      return false;
    }
  }, [formState.data, trackFormInteraction]);

  return {
    // Form state
    formData: formState.data,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSubmitted: formState.isSubmitted,
    submitSuccess: formState.submitSuccess,
    
    // Form actions
    updateField,
    handleFieldFocus,
    validateSingleField,
    submitForm,
    resetForm,
    
    // Validation helpers
    isValid: Object.keys(formState.errors).length === 0,
    hasErrors: Object.keys(formState.errors).length > 0
  };
}


