/**
 * Input Component
 *
 * Reusable input field component with validation states, labels, and helper text.
 * Supports different variants for visual feedback and accessibility features.
 *
 * @component
 * @param {Object} props - Component props extending HTML input attributes
 * @param {'base' | 'error' | 'success'} [props.variant='base'] - Input validation state
 * @param {string} [props.label] - Input label text
 * @param {string} [props.errorMessage] - Error message to display
 * @param {string} [props.helperText] - Helper text for additional guidance
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   variant="base"
 *   helperText="We'll never share your email"
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   variant="error"
 *   errorMessage="Password must be at least 8 characters"
 * />
 * ```
 *
 * Features:
 * - Three validation states: base, error, success with appropriate styling
 * - Optional label with proper association
 * - Error message display with accessibility support
 * - Helper text for additional context
 * - Consistent focus states and transitions
 * - Dark mode support with semantic color tokens
 * - Forward ref support for form libraries
 */

'use client';

import React, { useId, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input validation state affecting visual styling */
  variant?: 'base' | 'error' | 'success';
  /** Label text displayed above the input */
  label?: string;
  /** Helper text for additional guidance */
  helperText?: string;
  /** Error message displayed below the input */
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'base', label, helperText, errorMessage, id, ...props }, ref) => {
    const generatedId = useId();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    // Use provided id or generate one only after hydration to avoid mismatch
    const inputId = id || (isHydrated ? generatedId : undefined);
    const hasError = variant === 'error' && !!errorMessage;

    const baseClasses = 'w-full px-4 py-3 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      base: 'border border-border-light dark:border-border-dark focus:ring-electric-blue focus:border-electric-blue bg-surface-light dark:bg-surface-gray-dark text-text-primary dark:text-text-primary-dark placeholder-text-muted dark:placeholder-text-muted-dark',
      error: 'border border-error focus:ring-error focus:border-error bg-surface-light dark:bg-surface-gray-dark text-text-primary dark:text-text-primary-dark placeholder-text-muted dark:placeholder-text-muted-dark',
      success: 'border border-success focus:ring-success focus:border-success bg-surface-light dark:bg-surface-gray-dark text-text-primary dark:text-text-primary-dark placeholder-text-muted dark:placeholder-text-muted-dark'
    };

    const inputClasses = cn(
      baseClasses,
      variants[variant],
      className
    );

    const displayErrorMessage = variant === 'error' && errorMessage;
    const displayHelperText = variant !== 'error' && helperText;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {displayErrorMessage && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
            {errorMessage}
          </p>
        )}
        {displayHelperText && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
