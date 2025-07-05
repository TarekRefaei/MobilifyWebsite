# Dark Mode Implementation Guide

This guide explains the dark mode implementation for the Mobilify website, including setup, usage, and customization.

## Overview

The dark mode implementation provides:
- **System preference detection**: Automatically detects user's system theme preference
- **Manual toggle**: Users can override system preference with manual toggle
- **Persistent storage**: User preference is saved in localStorage
- **Smooth transitions**: All theme changes include smooth CSS transitions
- **Component support**: All major components support both light and dark themes

## Architecture

### Theme Context
The implementation uses React Context for state management:

- **ThemeProvider**: Wraps the entire application
- **useTheme hook**: Provides theme state and controls
- **localStorage persistence**: Saves user preference
- **System preference detection**: Respects `prefers-color-scheme`

### Tailwind Configuration
Dark mode is configured using Tailwind's class-based approach:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // ... other config
}
```

## Components

### 1. ThemeContext (`src/contexts/ThemeContext.tsx`)

**Features:**
- Manages global theme state
- Detects system preference on first load
- Persists user choice in localStorage
- Provides theme utilities

**Usage:**
```typescript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div className={`bg-white dark:bg-gray-900`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </div>
  );
};
```

### 2. DarkModeToggle (`src/components/DarkModeToggle.tsx`)

**Variants:**
- **Button**: Icon-based toggle button
- **Switch**: iOS-style toggle switch

**Pre-configured toggles:**
- `HeaderToggle`: Compact button for navigation
- `SettingsToggle`: Switch with label for settings pages
- `MobileToggle`: Larger button for mobile menus
- `FooterToggle`: Small switch for footer

**Usage:**
```typescript
import { DarkModeToggles } from './DarkModeToggle';

// Use pre-configured toggles
<DarkModeToggles.HeaderToggle />

// Or create custom toggle
<DarkModeToggle 
  variant="switch" 
  size="lg" 
  showLabel={true} 
/>
```

## Implementation Details

### Color System
The implementation uses semantic color classes:

```css
/* Light mode */
.text-dark-charcoal { color: #111827; }
.text-electric-blue { color: #4f46e5; }

/* Dark mode */
.dark .text-dark-charcoal { color: #ffffff; }
.dark .text-electric-blue { color: #4f46e5; }
```

### Component Updates
Key components updated for dark mode support:

1. **Layout**: Added ThemeProvider wrapper and dark mode body classes
2. **Header**: Dark background, text colors, and toggle placement
3. **Hero**: Dark gradient backgrounds and text colors
4. **InteractiveDemo**: Dark backgrounds for tabs and inputs
5. **Footer**: Darker background and toggle in bottom bar

### Transition Effects
All theme changes include smooth transitions:

```css
.transition-colors { transition: color 0.3s ease; }
.duration-300 { transition-duration: 300ms; }
```

## Usage Guidelines

### Adding Dark Mode to New Components

1. **Background colors:**
   ```html
   <div className="bg-white dark:bg-gray-900">
   ```

2. **Text colors:**
   ```html
   <h1 className="text-gray-900 dark:text-white">
   <p className="text-gray-600 dark:text-gray-300">
   ```

3. **Borders:**
   ```html
   <div className="border-gray-200 dark:border-gray-700">
   ```

4. **Interactive elements:**
   ```html
   <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
   ```

### Best Practices

1. **Use semantic colors**: Prefer `text-dark-charcoal dark:text-white` over specific gray values
2. **Test both themes**: Always verify components work in both light and dark modes
3. **Maintain contrast**: Ensure sufficient color contrast in both themes
4. **Smooth transitions**: Add transition classes for better UX
5. **Respect user choice**: Don't force theme changes without user interaction

## Testing Checklist

### Functionality
- [ ] Toggle works in header
- [ ] Toggle works in footer
- [ ] Theme persists across page reloads
- [ ] System preference is detected on first visit
- [ ] Manual preference overrides system preference

### Visual Testing
- [ ] All text is readable in both themes
- [ ] Sufficient color contrast in both modes
- [ ] Smooth transitions between themes
- [ ] No visual glitches during theme switch
- [ ] Icons and graphics work in both themes

### Components to Test
- [ ] Header navigation and logo
- [ ] Hero section text and backgrounds
- [ ] Interactive demo tabs and inputs
- [ ] Newsletter signup forms
- [ ] Contact form styling
- [ ] Footer links and content
- [ ] Chat triggers and buttons

## Browser Support

The implementation supports:
- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **System preference**: `prefers-color-scheme` media query
- **localStorage**: For preference persistence
- **CSS custom properties**: For dynamic theming

## Analytics Integration

Theme changes are tracked with Google Analytics:

```typescript
// Automatic tracking in ThemeContext
gtag('event', 'theme_changed', {
  event_category: 'user_preference',
  event_label: theme // 'light' or 'dark'
});
```

## Customization

### Adding New Color Variants

1. **Update Tailwind config:**
   ```javascript
   // tailwind.config.js
   theme: {
     extend: {
       colors: {
         'custom-light': '#f0f0f0',
         'custom-dark': '#2a2a2a',
       }
     }
   }
   ```

2. **Use in components:**
   ```html
   <div className="bg-custom-light dark:bg-custom-dark">
   ```

### Creating Custom Toggles

```typescript
import DarkModeToggle from './DarkModeToggle';

const CustomToggle = () => (
  <DarkModeToggle
    variant="button"
    size="lg"
    showLabel={true}
    className="custom-styles"
  />
);
```

## Troubleshooting

### Common Issues

1. **Hydration mismatch**
   - **Cause**: Server renders light theme, client has dark preference
   - **Solution**: ThemeProvider prevents rendering until mounted

2. **Flashing on page load**
   - **Cause**: Theme applied after initial render
   - **Solution**: Theme is applied immediately in useEffect

3. **Styles not applying**
   - **Cause**: Missing `dark:` prefix or incorrect class order
   - **Solution**: Ensure dark mode classes are properly prefixed

4. **Toggle not working**
   - **Cause**: Component not wrapped in ThemeProvider
   - **Solution**: Ensure ThemeProvider wraps the component tree

### Debug Mode

To debug theme issues, check:

1. **localStorage**: `mobilify-theme` key should contain 'light' or 'dark'
2. **HTML class**: `<html>` should have `dark` class in dark mode
3. **Console**: Check for any JavaScript errors
4. **CSS**: Verify dark mode styles are compiled correctly

## Performance Considerations

- **Minimal bundle impact**: Context and toggle components are lightweight
- **CSS-only transitions**: No JavaScript animations for theme switching
- **Efficient re-renders**: Only theme-dependent components re-render
- **localStorage caching**: Prevents unnecessary system preference checks

## Future Enhancements

Potential improvements for future versions:

1. **Auto theme scheduling**: Switch themes based on time of day
2. **Custom theme colors**: Allow users to customize accent colors
3. **High contrast mode**: Additional accessibility theme
4. **Theme preview**: Preview themes before applying
5. **Sync across devices**: Cloud-based preference sync

## Resources

- [Tailwind Dark Mode Documentation](https://tailwindcss.com/docs/dark-mode)
- [MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
