/**
 * Button Component
 *
 * Reusable button component with multiple variants, sizes, and loading states.
 * Built with accessibility and consistent design in mind.
 *
 * @component
 * @param {Object} props - Component props extending HTML button attributes
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant='primary'] - Button style variant
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.isLoading=false] - Whether to show loading state
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Get Started
 * </Button>
 *
 * <Button variant="secondary" isLoading={isSubmitting}>
 *   Submit Form
 * </Button>
 * ```
 *
 * Features:
 * - Three variants: primary (filled), secondary (outlined), ghost (text only)
 * - Three sizes: sm, md, lg with appropriate padding and text sizes
 * - Loading state with spinner animation
 * - Disabled state with visual feedback
 * - Focus management and keyboard accessibility
 * - Consistent hover and active states
 * - Forward ref support for advanced use cases
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show loading spinner */
  isLoading?: boolean;
  /** Button content */
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-electric-blue text-white hover:opacity-90 focus:ring-electric-blue shadow-lg hover:shadow-xl',
      secondary: 'border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white focus:ring-electric-blue',
      ghost: 'text-electric-blue hover:bg-electric-blue hover:bg-opacity-10 focus:ring-electric-blue'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
