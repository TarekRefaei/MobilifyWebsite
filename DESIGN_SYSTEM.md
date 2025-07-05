# 🎨 Mobilify Design System

This document is the single source of truth for all design tokens, components, and usage guidelines for the Mobilify website. Adhering to this system ensures a consistent, high-quality, and scalable user experience.

## Color Palette

Our color palette is modern, accessible, and built around semantic tokens defined in `tailwind.config.js`.

| Token             | Hex       | Usage                                                              |
| ----------------- | --------- | ------------------------------------------------------------------ |
| `dark-charcoal`   | `#111827` | Primary text, dark backgrounds (in light mode)                     |
| `electric-blue`   | `#4f46e5` | Primary actions, links, accents, focus rings                       |
| `white`           | `#ffffff` | Primary background (light mode), primary text (in dark mode)       |
| `gray-50` to `900`| `...`     | Secondary text, borders, disabled states, subtle backgrounds       |
| `red-500`         | `...`     | Error states, destructive actions                                  |
| `green-500`       | `...`     | Success states, positive feedback                                  |

**Dark Mode:** In dark mode, text and background colors are inverted (e.g., `dark-charcoal` becomes `white` for text), and background shades are adjusted from the gray palette to maintain proper contrast.

## Typography

We use the "Inter" font family for its excellent readability on screens. The system is designed with a clear and responsive hierarchy.

### Heading Hierarchy

- **H1 (Page Titles):** `text-4xl md:text-5xl lg:text-6xl font-bold`
- **H2 (Section Titles):** `text-3xl md:text-4xl font-bold`
- **H3 (Subsection Titles):** `text-2xl md:text-3xl font-semibold`
- **H4 (Card Titles, FAQ Questions):** `text-xl font-semibold`

### Body Text

- **Lead/Hero Text:** `text-lg md:text-xl leading-relaxed`
- **Standard Body:** `text-base leading-relaxed`
- **Small/Caption Text:** `text-sm` (for metadata, captions, etc.)

### Interactive Text

- **Primary Buttons:** `font-semibold`
- **Secondary Buttons:** `font-medium`
- **Links:** `font-medium hover:underline`

## Spacing & Layout

A consistent spacing scale ensures a balanced and harmonious layout across all pages and components.

### Section Spacing
- **Main Sections:** `py-16 md:py-20` (Hero, Services, Process, Contact)
- **Subsections:** `py-8 md:py-12` (FAQ items, card content)
- **Component Spacing:** `mb-16` for section headers, `mb-12` for card grids

### Container Widths
- **Main Content:** `max-w-7xl` (homepage sections, services overview)
- **Text-Heavy Content:** `max-w-4xl` (blog posts, about page)
- **Forms:** `max-w-2xl` (contact form, newsletter signup)
- **Centered Text:** `max-w-3xl` (section descriptions, hero text)

### Grid & Flex Gaps
- **Main Grids:** `gap-8 md:gap-12` (service cards, process steps)
- **Lists:** `gap-4 md:gap-6` (feature lists, navigation items)
- **Inline Elements:** `gap-2` (button groups, tags)

### Container Padding
- **All Main Containers:** `px-4 sm:px-6 lg:px-8`
- **Card Content:** `p-8` for main cards, `p-4` for smaller cards
- **Form Elements:** `px-4 py-3` for inputs, `py-4 px-6` for buttons

## Component Variants

Standardized component variants ensure a cohesive look and feel for all interactive elements.

### Buttons

All buttons use the semantic `electric-blue` color and follow consistent sizing and interaction patterns.

- **Primary:** `bg-electric-blue text-white hover:opacity-90 focus:ring-2 focus:ring-electric-blue`
- **Secondary:** `border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white`
- **Ghost:** `text-electric-blue hover:bg-electric-blue hover:bg-opacity-10`

### Form Inputs

- **Base:** `border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-electric-blue`
- **Error State:** `border-red-500 focus:ring-red-500`
- **Success State:** `border-green-500 focus:ring-green-500`

### Cards

- **Base:** `bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700`
- **Hover:** `hover:shadow-md transition-shadow duration-200`
- **Interactive:** `hover:shadow-lg cursor-pointer`

## Responsive Design

The entire site is built with a mobile-first approach, ensuring a seamless experience on any device.

- **Mobile-First:** Styles are defined for mobile and enhanced for larger screens using breakpoints.
- **Breakpoints:** Standard Tailwind CSS breakpoints are used:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Touch Targets:** All interactive elements on mobile have a minimum touch target size of 44x44 pixels to meet accessibility standards.

## Implementation Status

### ✅ Completed Components
- **UI Library:** Button, Input, Card components with full variant support
- **Typography:** Consistent heading hierarchy (H1-H4) and body text standards
- **Color System:** Semantic colors (`electric-blue`, `dark-charcoal`) implemented across all components
- **Spacing:** Standardized section spacing, container widths, and grid gaps
- **Dark Mode:** Full dark mode support with proper color contrast

### ✅ Migrated Components
- **Hero.tsx** - Typography hierarchy and semantic colors
- **InteractiveDemo.tsx** - Tab indicators and semantic color usage
- **Process.tsx** - Step titles and consistent spacing
- **ServicesOverview.tsx** - Card styling and typography
- **Contact.tsx** - Form styling and semantic colors
- **Footer.tsx** - Link hover states and background colors

### 🎯 Design System Benefits
- **Consistency:** Unified visual language across all components
- **Maintainability:** Centralized design tokens in Tailwind config
- **Scalability:** Reusable UI components for future development
- **Accessibility:** Proper contrast ratios and touch target sizes
- **Performance:** Optimized CSS with design system constraints