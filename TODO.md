# Mobilify Project TODO List

This document outlines actionable improvements and best practices for the Mobilify website, based on a comprehensive review of the project's goals and existing code.

## 1. Component-Specific Improvements

### 1.1. `src/components/Process.tsx` Refactor

- [ ] **Refactor to use Semantic HTML (`<ol>` and `<li>`):**
  - Change the main container for steps from `div` to `ol`.
  - Change individual steps from `motion.div` to `motion.li`.
  - **Reasoning:** Improves accessibility and semantic meaning for sequential steps.

- [ ] **Implement New Connection Line Animation:**
  - Remove the individual, awkwardly positioned connection lines within each step.
  - Introduce a single `motion.div` *behind* the entire ordered list of steps.
  - Animate this line's `scaleX` property from left to right as the section comes into view.
  - Adjust `top` positioning to align with the center of the step icons.
  - **Reasoning:** Creates a more cohesive, visually appealing, and performant "path" for the process.

- [ ] **Enhance Accessibility for Decorative Elements:**
  - Add `aria-hidden="true"` to purely decorative elements like the step number circle (`<div className="absolute -top-2 -right-2 ...">`) and the new connection line.
  - **Reasoning:** Prevents screen readers from announcing redundant or non-essential information.

- [ ] **Minor Styling Adjustment:**
  - Add `px-2` to the content div within each step for slightly better horizontal padding on smaller screens.
  - **Reasoning:** Improves visual spacing on mobile devices.

## 2. General Project-Level Improvements

### 2.1. Branding & Styling Consistency

- [ ] **Define Custom Tailwind Colors:**
  - Add `dark-charcoal: '#111827'` and `electric-blue: '#4f46e5'` to `theme.extend.colors` in `tailwind.config.js`.
  - **Reasoning:** Ensures pixel-perfect branding consistency across the entire application and simplifies future color updates.
  - **Example `tailwind.config.js` snippet:**
    ```javascript
    // tailwind.config.js
    module.exports = {
      theme: {
        extend: {
          colors: {
            'dark-charcoal': '#111827',
            'electric-blue': '#4f46e5',
          },
        },
      },
      // ... other configurations
    };
    ```

### 2.2. Form Handling (`Contact` Section)

- [ ] **Implement Client-Side Validation:**
  - Integrate a library like `react-hook-form` with a schema validation library (e.g., `Zod` or `Yup`) for the contact form.
  - Provide immediate visual feedback to users for invalid inputs (e.g., empty fields, incorrect email format).
  - **Reasoning:** Improves user experience by preventing unnecessary server requests for invalid data.

- [ ] **Display Loading States:**
  - Show a loading indicator (e.g., a spinner or "Sending..." text) on the submit button during form submission.
  - **Reasoning:** Informs the user that their request is being processed, preventing multiple submissions.

- [ ] **Ensure Clear Success/Error Messages:**
  - Verify that success and error messages are prominently displayed and easy to understand. Consider using a toast notification system for non-intrusive feedback.
  - **Reasoning:** Provides clear communication to the user about the outcome of their submission.

### 2.3. Image Optimization

- [ ] **Utilize Next.js `Image` Component:**
  - Replace all `<img>` tags with Next.js's `Image` component.
  - **Reasoning:** Automatically handles image optimization (lazy loading, responsive sizing, modern formats like WebP/AVIF).

- [ ] **Apply `priority` for Above-the-Fold Images:**
  - Use the `priority` prop on `Image` components for critical images in the hero section or other above-the-fold content.
  - **Reasoning:** Ensures these images are loaded immediately, improving Largest Contentful Paint (LCP) scores.

- [ ] **Specify `width` and `height` Props:**
  - Always provide explicit `width` and `height` props to the `Image` component.
  - **Reasoning:** Prevents layout shifts (CLS) during image loading.

### 2.4. SEO Enhancements

- [ ] **Implement Structured Data (Schema.org):**
  - Add Schema.org markup (JSON-LD) to relevant pages.
    - For `/services` page: Consider `Service` or `Product` schema.
    - For `/about` page: Use `Organization` and `Person` schema for Alex and Maria.
    - For the main page: Consider `WebSite` or `LocalBusiness` schema.
  - **Reasoning:** Provides explicit information to search engines, potentially leading to rich snippets and improved visibility.

### 2.5. Testing Strategy

- [ ] **Write Unit Tests:**
  - Use Jest and React Testing Library to write unit tests for critical components (e.g., `Header`, `Contact` form, `Process` steps).
  - **Reasoning:** Ensures individual components render correctly and behave as expected.

- [ ] **Implement Integration Tests:**
  - Test key user flows, such as submitting the contact form or navigating through anchor links.
  - **Reasoning:** Verifies that different parts of the application work together seamlessly.
