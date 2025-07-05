/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: '#4f46e5',
        'electric-blue': '#4f46e5',
        'dark-charcoal': '#111827',
        'logo-bg': '#1a1a1a',

        // Semantic Colors
        'surface-light': '#ffffff',
        'surface-dark': '#111827',
        'surface-gray': '#f9fafb',
        'surface-gray-dark': '#1f2937',

        'text-primary': '#111827',
        'text-primary-dark': '#ffffff',
        'text-secondary': '#6b7280',
        'text-secondary-dark': '#d1d5db',
        'text-muted': '#9ca3af',
        'text-muted-dark': '#9ca3af',

        'border-light': '#e5e7eb',
        'border-dark': '#374151',
        'border-subtle': '#f3f4f6',
        'border-subtle-dark': '#1f2937',

        // Status Colors
        'success': '#10b981',
        'success-light': '#d1fae5',
        'error': '#ef4444',
        'error-light': '#fee2e2',
        'warning': '#f59e0b',
        'warning-light': '#fef3c7',
        'info': '#3b82f6',
        'info-light': '#dbeafe',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  important: false,
  corePlugins: {
    preflight: true,
  },
}
