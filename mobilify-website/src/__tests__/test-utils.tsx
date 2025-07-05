import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock data generators for consistent testing
export const mockFormData = {
  contact: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I need help building a mobile app for my business.'
  },
  newsletter: {
    email: 'subscriber@example.com'
  },
  demo: {
    websiteUrl: 'https://example.com',
    appIdea: 'A fitness tracking app for runners'
  }
}

// Mock API responses
export const mockApiResponses = {
  web3forms: {
    success: {
      ok: true,
      json: async () => ({ success: true, message: 'Form submitted successfully' })
    },
    error: {
      ok: false,
      json: async () => ({ success: false, message: 'Submission failed' })
    }
  },
  mailchimp: {
    success: {
      ok: true,
      json: async () => ({ id: '123', email_address: 'test@example.com', status: 'subscribed' })
    },
    error: {
      ok: false,
      json: async () => ({ title: 'Invalid Resource', detail: 'The email address is invalid' })
    }
  }
}

// Mock environment variables
export const mockEnvVars = {
  web3forms: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: 'test-web3forms-key'
  },
  mailchimp: {
    NEXT_PUBLIC_MAILCHIMP_API_KEY: 'test-mailchimp-key',
    MAILCHIMP_LIST_ID: 'test-list-id'
  },
  analytics: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'G-TEST123456'
  }
}

// Helper to mock fetch with different responses
export const mockFetch = (response: any) => {
  global.fetch = jest.fn().mockResolvedValue(response)
}

// Helper to mock fetch with error
export const mockFetchError = (error: Error) => {
  global.fetch = jest.fn().mockRejectedValue(error)
}

// Helper to mock environment variables
export const mockEnvironment = (vars: Record<string, string>) => {
  const originalEnv = process.env
  process.env = { ...originalEnv, ...vars }
  
  return () => {
    process.env = originalEnv
  }
}

// Helper to mock window.gtag
export const mockGtag = () => {
  const gtagMock = jest.fn()
  Object.defineProperty(window, 'gtag', {
    value: gtagMock,
    writable: true,
  })
  return gtagMock
}

// Helper to mock localStorage
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  })
  
  return localStorageMock
}

// Helper to mock viewport size
export const mockViewport = (width: number, height: number = 800) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'))
}

// Helper to mock matchMedia for responsive testing
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Helper to wait for animations to complete
export const waitForAnimation = (duration: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

// Custom render function that includes common providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test patterns
export const testPatterns = {
  // Test that a component renders without crashing
  renderWithoutCrashing: (Component: React.ComponentType, props: any = {}) => {
    return () => {
      expect(() => render(<Component {...props} />)).not.toThrow()
    }
  },
  
  // Test that a component has proper accessibility attributes
  hasAccessibilityAttributes: (getElement: () => HTMLElement, attributes: string[]) => {
    return () => {
      const element = getElement()
      attributes.forEach(attr => {
        expect(element).toHaveAttribute(attr)
      })
    }
  },
  
  // Test that a component supports keyboard navigation
  supportsKeyboardNavigation: async (getElement: () => HTMLElement, user: any) => {
    const element = getElement()
    await user.tab()
    expect(element).toHaveFocus()
  }
}

// Viewport presets for responsive testing
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1024, height: 768 },
  large: { width: 1440, height: 900 }
}

// Common assertions
export const assertions = {
  hasDesignSystemClasses: (element: HTMLElement, classes: string[]) => {
    classes.forEach(className => {
      expect(element).toHaveClass(className)
    })
  },
  
  hasProperFocusStyles: (element: HTMLElement) => {
    expect(element).toHaveClass('focus:outline-none')
    expect(element).toHaveClass('focus:ring-2')
  },
  
  hasSemanticColors: (element: HTMLElement) => {
    const hasElectricBlue = element.classList.toString().includes('electric-blue')
    const hasDarkCharcoal = element.classList.toString().includes('dark-charcoal')
    expect(hasElectricBlue || hasDarkCharcoal).toBe(true)
  }
}
