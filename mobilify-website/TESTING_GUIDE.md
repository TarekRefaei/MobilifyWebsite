# Testing Guide - Mobilify Website

## 🧪 Testing Framework Setup

### Dependencies Installed
- **Jest**: JavaScript testing framework with Next.js integration
- **React Testing Library**: React component testing utilities
- **Jest DOM**: Custom Jest matchers for DOM testing
- **User Event**: Advanced user interaction simulation
- **MSW (Mock Service Worker)**: Network request mocking for API testing

### Configuration Files
- `jest.config.js` - Jest configuration with Next.js integration and module mapping
- `jest.setup.js` - Global test setup, MSW server configuration, and console mocking
- `src/__tests__/test-utils.tsx` - Custom testing utilities and helpers
- `src/mocks/handlers.ts` - MSW API handlers for `/api/subscribe` endpoint
- `src/mocks/server.ts` - MSW server setup for test environment

## 📋 Test Coverage Overview

### ✅ Completed Test Suites

#### **Priority 1: User Input & API Components**
1. **Contact.test.tsx** - Contact form component
   - Form rendering and validation
   - Web3Forms API integration
   - Success/error state handling
   - Analytics tracking
   - Accessibility compliance

2. **NewsletterSignup.test.tsx** - Newsletter subscription component ✅ **FULLY UPDATED**
   - Multiple variant support (inline, footer, section) with proper aria-labels
   - Email validation and button state management
   - API integration with proper environment variable handling
   - Loading, success, and error states with accurate text matching
   - Analytics event tracking with gtag verification
   - Accessibility compliance with proper ARIA attributes

#### **Priority 2: Core Interactive UI Components**
3. **InteractiveDemo.test.tsx** - Interactive demo component
   - Tab switching functionality
   - Input validation and preview generation
   - Animation and state management
   - Analytics tracking
   - Responsive behavior

4. **Button.test.tsx** - UI Button component
   - Variant testing (primary, secondary, ghost)
   - Size testing (sm, md, lg)
   - Loading and disabled states
   - Event handling and accessibility
   - Design system compliance

5. **Input.test.tsx** - UI Input component ✅ **FULLY UPDATED**
   - Variant testing (base, error, success) with semantic design tokens
   - Form validation and error handling with proper ARIA attributes
   - Accessibility attributes (aria-invalid, aria-describedby, role="alert")
   - Dark mode support with semantic color classes
   - Design system compliance with updated class assertions

#### **Integration Testing**
6. **Header.test.tsx** - Header navigation component
   - Desktop and mobile navigation
   - Responsive behavior testing
   - Accessibility compliance
   - Dark mode integration
   - Component integration testing

## 🎯 Test Categories

### **Functional Testing**
- Form submission workflows
- User interaction patterns
- API integration points
- State management
- Navigation functionality

### **Accessibility Testing**
- ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### **Responsive Design Testing**
- Mobile viewport behavior
- Tablet and desktop layouts
- Touch target sizing
- Breakpoint transitions

### **Design System Compliance**
- Semantic color usage
- Typography consistency
- Spacing and layout standards
- Component variant behavior

### **Analytics Testing**
- Event tracking verification
- User interaction monitoring
- Conversion funnel testing

## 🛠️ Testing Utilities

### **Mock Data Generators**
```typescript
mockFormData.contact    // Contact form test data
mockFormData.newsletter // Newsletter signup data
mockFormData.demo      // Interactive demo data
```

### **API Response Mocks**
```typescript
// MSW Handlers (Recommended)
handlers.subscribe.success   // Newsletter API success responses
handlers.subscribe.error     // Newsletter API error responses
handlers.subscribe.timeout   // Newsletter API timeout simulation

// Legacy Mock Functions (Fallback)
mockApiResponses.web3forms   // Contact form API responses
mockApiResponses.mailchimp   // Newsletter API responses
```

### **Environment Helpers**
```typescript
mockEnvironment()    // Mock environment variables for API testing
mockFetch()         // Mock fetch API calls (legacy approach)
mockGtag()          // Mock Google Analytics tracking
mockViewport()      // Mock responsive viewports
setupMSW()          // Initialize Mock Service Worker
```

### **Common Test Patterns**
```typescript
testPatterns.renderWithoutCrashing()
testPatterns.hasAccessibilityAttributes()
testPatterns.supportsKeyboardNavigation()
```

## 📊 Coverage Targets

### **Current Coverage Goals**
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### **Priority Components Covered**
- ✅ Contact form (100% critical paths)
- ✅ Newsletter signup (100% critical paths) - **Recently Updated with MSW integration**
- ✅ Interactive demo (100% critical paths)
- ✅ UI components (100% variants) - **Input component fully refactored with semantic tokens**
- ✅ Header navigation (100% responsive states)

### **Recent Test Infrastructure Improvements**
- ✅ **MSW Integration**: Mock Service Worker installed and configured for API testing
- ✅ **Semantic Design Tokens**: All test assertions updated to use current design system
- ✅ **Accessibility Enhancements**: Comprehensive ARIA attribute testing
- ✅ **Environment Variable Handling**: Robust testing of different API configurations
- ✅ **Console Mocking**: Clean test output with suppressed expected warnings

## 🚀 Running Tests

### **Test Commands**
```bash
npm run test           # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
npm run test:ci        # Run tests for CI/CD
```

### **Test File Patterns**
- `**/__tests__/**/*.test.{js,jsx,ts,tsx}`
- `**/*.{test,spec}.{js,jsx,ts,tsx}`

## 🔧 Test Environment

### **Mocked APIs and Services**
- Next.js Router and Navigation
- Framer Motion animations
- Google Analytics (gtag)
- localStorage and sessionStorage
- IntersectionObserver and ResizeObserver
- matchMedia for responsive testing

### **Browser Environment Simulation**
- JSDOM environment for DOM testing
- Window and document object mocking
- Event simulation and handling
- Viewport and media query testing

## 📈 Quality Assurance Benefits

### **Business Impact**
- **Reliability**: Ensures critical user flows work correctly
- **User Experience**: Validates accessibility and responsive design
- **Conversion**: Tests form submissions and analytics tracking
- **Maintainability**: Prevents regressions during development

### **Development Benefits**
- **Confidence**: Safe refactoring and feature additions
- **Documentation**: Tests serve as living documentation
- **Debugging**: Faster issue identification and resolution
- **Collaboration**: Clear expectations for component behavior

## 🎯 Next Steps

### **Additional Testing Opportunities**
1. **E2E Testing**: Cypress or Playwright for full user journeys
2. **Visual Regression**: Screenshot testing for design consistency
3. **Performance Testing**: Core Web Vitals and loading metrics
4. **Cross-browser Testing**: Compatibility across different browsers

### **Continuous Integration**
- Automated test runs on pull requests
- Coverage reporting and enforcement
- Performance regression detection
- Accessibility compliance checking

## 📚 Best Practices

### **Test Writing Guidelines**
- Test user behavior, not implementation details
- Use descriptive test names and organize with describe blocks
- Mock external dependencies and APIs
- Test both happy paths and error scenarios
- Ensure accessibility compliance in all tests

### **Maintenance**
- Keep tests simple and focused
- Update tests when requirements change
- Remove or update obsolete tests
- Monitor test performance and flakiness

This comprehensive testing setup ensures the Mobilify website maintains high quality, accessibility, and reliability standards while supporting confident development and deployment processes.
