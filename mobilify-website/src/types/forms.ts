/**
 * Form Type Definitions
 * 
 * This file contains all TypeScript interfaces for form inputs, states, and validation.
 * These types ensure type safety when working with forms across the application.
 */

// Base form field interface
export interface FormField {
  value: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

// Contact Form Data
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

// Contact Form Validation Errors
export interface ContactFormErrors {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
  general?: string;
}

// Contact Form State
export interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitSuccess: boolean;
  submitMessage?: string;
}

// Newsletter Form Data
export interface NewsletterFormData {
  email: string;
}

// Newsletter Form Errors
export interface NewsletterFormErrors {
  email?: string;
  general?: string;
}

// Newsletter Form State
export interface NewsletterFormState {
  data: NewsletterFormData;
  errors: NewsletterFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitSuccess: boolean;
  submitMessage?: string;
}

// Generic Form State
export interface FormState<TData = any, TErrors = any> {
  data: TData;
  errors: TErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitSuccess: boolean;
  submitMessage?: string;
  isDirty?: boolean;
  isValid?: boolean;
}

// Form Validation Rule
export interface ValidationRule<T = unknown> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
  message?: string;
}

// Form Field Configuration
export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: Array<{ value: string; label: string }>; // For select, radio, checkbox
  rows?: number; // For textarea
  autoComplete?: string;
  disabled?: boolean;
}

// Form Configuration
export interface FormConfig<TData = any> {
  fields: FormFieldConfig[];
  submitText?: string;
  resetText?: string;
  onSubmit: (data: TData) => Promise<void> | void;
  onReset?: () => void;
  validation?: {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    validateOnSubmit?: boolean;
  };
}

// Form Submission Result
export interface FormSubmissionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: any;
}

// Form Event Handlers
export interface FormEventHandlers<TData = any> {
  onChange: (name: keyof TData, value: any) => void;
  onBlur: (name: keyof TData) => void;
  onSubmit: (event: React.FormEvent) => void;
  onReset: () => void;
  onFieldChange: (name: keyof TData, value: any, shouldValidate?: boolean) => void;
}

// Form Hook Return Type
export interface UseFormReturn<TData = any, TErrors = any> {
  formState: FormState<TData, TErrors>;
  handlers: FormEventHandlers<TData>;
  helpers: {
    setFieldValue: (name: keyof TData, value: any) => void;
    setFieldError: (name: keyof TErrors, error: string) => void;
    clearFieldError: (name: keyof TErrors) => void;
    clearAllErrors: () => void;
    validateField: (name: keyof TData) => boolean;
    validateForm: () => boolean;
    resetForm: () => void;
    setSubmitting: (isSubmitting: boolean) => void;
    setSubmitSuccess: (success: boolean, message?: string) => void;
  };
  computed: {
    isValid: boolean;
    isDirty: boolean;
    hasErrors: boolean;
    canSubmit: boolean;
  };
}

// Project Type Options (for contact form)
export type ProjectType = 
  | 'mobile-app'
  | 'web-app'
  | 'consultation'
  | 'maintenance'
  | 'other';

// Project Type Configuration
export interface ProjectTypeOption {
  value: ProjectType;
  label: string;
  description?: string;
}

// Form Analytics Events
export interface FormAnalyticsEvent {
  formName: string;
  action: 'start' | 'submit' | 'success' | 'error' | 'abandon';
  fieldName?: string;
  errorType?: string;
  timeToComplete?: number;
  metadata?: Record<string, unknown>;
}

// Form Validation Schema
// TODO: Fix TypeScript syntax issue
// export interface FormValidationSchema<TData = Record<string, unknown>> {
//   [K in keyof TData]?: ValidationRule<unknown>[];
// }

// Form Field Props (for UI components)
export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

// Input Field Props
export interface InputFieldProps extends FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'url';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
  maxLength?: number;
}

// Textarea Field Props
export interface TextareaFieldProps extends FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  rows?: number;
  maxLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Select Field Props
export interface SelectFieldProps extends FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  multiple?: boolean;
}

// Checkbox Field Props
export interface CheckboxFieldProps extends FormFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
}

// Radio Group Props
export interface RadioGroupProps extends FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  orientation?: 'horizontal' | 'vertical';
}
