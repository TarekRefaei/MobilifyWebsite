/**
 * Demo Input Component
 *
 * Input field with validation for the interactive demo section.
 * Adapts placeholder text and validation rules based on the selected demo type.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active demo tab
 * @param {string} props.value - Current input value
 * @param {(value: string) => void} props.onChange - Callback when input changes
 * @param {() => void} props.onPreview - Callback to generate preview
 * @param {string} [props.placeholder] - Custom placeholder text
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DemoInput
 *   activeTab="website"
 *   value={inputValue}
 *   onChange={setInputValue}
 *   onPreview={handlePreview}
 * />
 * ```
 *
 * Features:
 * - Dynamic placeholder text based on demo type
 * - Real-time input validation (URL validation for website tab)
 * - Visual feedback for validation state
 * - Enter key support for quick preview generation
 * - Responsive design with proper touch targets
 * - Accessibility support with proper ARIA labels
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';

interface DemoInputProps {
  activeTab: string;
  value: string;
  onChange: (value: string) => void;
  onPreview: () => void;
  placeholder?: string;
  className?: string;
}

const DemoInput: React.FC<DemoInputProps> = ({
  activeTab,
  value,
  onChange,
  onPreview,
  placeholder,
  className = ''
}) => {
  const getPlaceholder = () => {
    switch (activeTab) {
      case 'website':
        return placeholder || 'Enter your website URL (e.g., https://example.com)';
      case 'mobile':
        return placeholder || 'Describe your mobile app idea';
      case 'tablet':
        return placeholder || 'Describe your tablet app concept';
      default:
        return placeholder || 'Enter your input';
    }
  };

  const getInputType = () => {
    return activeTab === 'website' ? 'url' : 'text';
  };

  const isValidInput = () => {
    if (!value.trim()) return false;
    
    if (activeTab === 'website') {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }
    
    return value.trim().length >= 3;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidInput()) {
      onPreview();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {activeTab === 'website' ? (
            <ExternalLink className="h-5 w-5 text-gray-400" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        
        <input
          type={getInputType()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={getPlaceholder()}
          className="
            w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 
            rounded-xl focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            transition-all duration-300
          "
          aria-label={`Input for ${activeTab} demo`}
        />
      </div>
      
      <motion.button
        onClick={onPreview}
        disabled={!isValidInput()}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300
          ${isValidInput()
            ? 'bg-electric-blue text-white hover:bg-electric-blue/90 shadow-lg hover:shadow-xl'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }
        `}
        whileHover={isValidInput() ? { scale: 1.02 } : {}}
        whileTap={isValidInput() ? { scale: 0.98 } : {}}
        aria-label="Generate preview"
      >
        {activeTab === 'website' ? 'Preview App Conversion' : 'Generate Preview'}
      </motion.button>
      
      {activeTab === 'website' && value && !isValidInput() && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 dark:text-red-400"
        >
          Please enter a valid URL (including http:// or https://)
        </motion.p>
      )}
    </div>
  );
};

export default DemoInput;
