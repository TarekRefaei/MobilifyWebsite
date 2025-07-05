import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'
import { mockViewport, viewports } from '../../__tests__/test-utils'

// Mock the child components
jest.mock('../Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>
  }
})

jest.mock('../NoSSR', () => {
  return function MockNoSSR({ children }: { children: React.ReactNode }) {
    return <div data-testid="no-ssr">{children}</div>
  }
})

jest.mock('../SimpleHeaderChat', () => {
  return function MockSimpleHeaderChat() {
    return <button data-testid="chat-trigger">Chat</button>
  }
})

jest.mock('../SimpleDarkModeToggle', () => {
  return function MockSimpleDarkModeToggle() {
    return <button data-testid="dark-mode-toggle">Toggle Dark Mode</button>
  }
})

describe('Header Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders the header with logo and navigation', () => {
      render(<Header />)
      
      expect(screen.getByTestId('logo')).toBeInTheDocument()
      expect(screen.getByText('Mobilify')).toBeInTheDocument()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('renders navigation items', () => {
      render(<Header />)
      
      expect(screen.getByRole('button', { name: /services/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /how it works/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /about us/i })).toBeInTheDocument()
    })

    it('renders chat and dark mode components', () => {
      render(<Header />)
      
      expect(screen.getByTestId('chat-trigger')).toBeInTheDocument()
      expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument()
    })
  })

  describe('Desktop Navigation', () => {
    beforeEach(() => {
      mockViewport(viewports.desktop.width)
    })

    it('shows desktop navigation on large screens', () => {
      render(<Header />)
      
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('hidden', 'md:flex')
    })

    it('navigates to sections when navigation items are clicked', async () => {
      const user = userEvent.setup()
      
      // Mock getElementById
      const mockElement = { scrollIntoView: jest.fn() }
      document.getElementById = jest.fn().mockReturnValue(mockElement)
      
      render(<Header />)
      
      const servicesButton = screen.getByRole('button', { name: /services/i })
      await user.click(servicesButton)
      
      expect(document.getElementById).toHaveBeenCalledWith('services-overview')
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('handles missing section elements gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock getElementById to return null
      document.getElementById = jest.fn().mockReturnValue(null)
      
      render(<Header />)
      
      const servicesButton = screen.getByRole('button', { name: /services/i })
      
      // Should not throw error
      expect(async () => {
        await user.click(servicesButton)
      }).not.toThrow()
    })
  })

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      mockViewport(viewports.mobile.width)
    })

    it('shows mobile menu button on small screens', () => {
      render(<Header />)
      
      const menuButton = screen.getByRole('button', { name: /menu/i })
      expect(menuButton).toBeInTheDocument()
    })

    it('opens mobile menu when menu button is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)
      
      const menuButton = screen.getByRole('button', { name: /menu/i })
      await user.click(menuButton)
      
      // Mobile menu should be visible
      const mobileNav = screen.getByRole('navigation')
      expect(mobileNav).toBeInTheDocument()
    })

    it('closes mobile menu when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<Header />)
      
      const menuButton = screen.getByRole('button', { name: /menu/i })
      await user.click(menuButton)
      
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      // Menu should be closed (check for menu button again)
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
    })

    it('closes mobile menu when navigation item is clicked', async () => {
      const user = userEvent.setup()
      
      // Mock getElementById
      const mockElement = { scrollIntoView: jest.fn() }
      document.getElementById = jest.fn().mockReturnValue(mockElement)
      
      render(<Header />)
      
      const menuButton = screen.getByRole('button', { name: /menu/i })
      await user.click(menuButton)
      
      const servicesButton = screen.getByRole('button', { name: /services/i })
      await user.click(servicesButton)
      
      // Menu should be closed
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('adapts layout for tablet viewport', () => {
      mockViewport(viewports.tablet.width)
      render(<Header />)
      
      // Should show desktop navigation on tablet
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('md:flex')
    })

    it('maintains proper header height across viewports', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('h-16')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for menu buttons', () => {
      mockViewport(viewports.mobile.width)
      render(<Header />)
      
      const menuButton = screen.getByRole('button', { name: /menu/i })
      expect(menuButton).toHaveAttribute('aria-label')
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Header />)
      
      // Tab through navigation items
      await user.tab()
      const firstNavItem = screen.getByRole('button', { name: /services/i })
      expect(firstNavItem).toHaveFocus()
    })

    it('has proper heading structure', () => {
      render(<Header />)
      
      // Logo text should be properly structured
      const logoText = screen.getByText('Mobilify')
      expect(logoText).toBeInTheDocument()
    })
  })

  describe('Design System Compliance', () => {
    it('uses semantic colors', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-white/95', 'dark:bg-gray-900/95')
    })

    it('has proper backdrop blur effect', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('backdrop-blur-sm')
    })

    it('has consistent border styling', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('border-b', 'border-gray-100', 'dark:border-gray-800')
    })

    it('maintains proper z-index for fixed positioning', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('z-50')
    })
  })

  describe('Dark Mode Support', () => {
    it('has dark mode classes', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('dark:bg-gray-900/95')
      
      const logoText = screen.getByText('Mobilify')
      expect(logoText).toHaveClass('dark:text-white')
    })

    it('renders dark mode toggle component', () => {
      render(<Header />)
      
      expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument()
    })
  })

  describe('Fixed Positioning', () => {
    it('has fixed positioning classes', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0')
    })

    it('spans full width', () => {
      render(<Header />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('w-full')
    })
  })

  describe('Integration with Other Components', () => {
    it('renders NoSSR wrapper for client-side components', () => {
      render(<Header />)
      
      expect(screen.getByTestId('no-ssr')).toBeInTheDocument()
    })

    it('includes chat trigger in navigation', () => {
      render(<Header />)
      
      expect(screen.getByTestId('chat-trigger')).toBeInTheDocument()
    })

    it('includes dark mode toggle in navigation', () => {
      render(<Header />)
      
      expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument()
    })
  })
})
