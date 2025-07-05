import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InteractiveDemo from '../InteractiveDemo'

describe('InteractiveDemo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders the demo section with proper heading', () => {
      render(<InteractiveDemo />)
      
      expect(screen.getByRole('heading', { name: /from zero to app, instantly/i })).toBeInTheDocument()
      expect(screen.getByText(/see how quickly we can transform your vision/i)).toBeInTheDocument()
    })

    it('renders tab buttons for different demo modes', () => {
      render(<InteractiveDemo />)
      
      expect(screen.getByRole('button', { name: /convert a website/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /describe an idea/i })).toBeInTheDocument()
    })

    it('renders input field and preview button', () => {
      render(<InteractiveDemo />)
      
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /mobilify preview/i })).toBeInTheDocument()
    })

    it('renders phone mockup container', () => {
      render(<InteractiveDemo />)
      
      expect(screen.getByText(/your app preview will appear here/i)).toBeInTheDocument()
    })
  })

  describe('Tab Switching', () => {
    it('starts with "Convert Website" tab active by default', () => {
      render(<InteractiveDemo />)
      
      const websiteTab = screen.getByRole('button', { name: /convert a website/i })
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      
      expect(websiteTab).toHaveClass('bg-electric-blue')
      expect(ideaTab).not.toHaveClass('bg-electric-blue')
    })

    it('switches to "Describe Idea" tab when clicked', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      await user.click(ideaTab)
      
      expect(ideaTab).toHaveClass('bg-electric-blue')
      
      // Check that placeholder text changed
      expect(screen.getByPlaceholderText(/describe your app idea/i)).toBeInTheDocument()
    })

    it('switches back to "Convert Website" tab', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const websiteTab = screen.getByRole('button', { name: /convert a website/i })
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      
      // Switch to idea tab first
      await user.click(ideaTab)
      expect(ideaTab).toHaveClass('bg-electric-blue')
      
      // Switch back to website tab
      await user.click(websiteTab)
      expect(websiteTab).toHaveClass('bg-electric-blue')
      expect(ideaTab).not.toHaveClass('bg-electric-blue')
      
      // Check that placeholder text changed back
      expect(screen.getByPlaceholderText(/enter your website url/i)).toBeInTheDocument()
    })

    it('tracks tab switch events', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      await user.click(ideaTab)
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'tab_switch', {
        event_category: 'engagement',
        event_label: 'idea'
      })
    })

    it('resets demo when switching tabs', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      
      // Enter text and show demo
      await user.type(input, 'https://example.com')
      await user.click(previewButton)
      
      // Switch tabs
      await user.click(ideaTab)
      
      // Input should be cleared and demo hidden
      expect(input).toHaveValue('')
      expect(screen.getByText(/your app preview will appear here/i)).toBeInTheDocument()
    })
  })

  describe('Input Validation and Preview', () => {
    it('disables preview button when input is empty', () => {
      render(<InteractiveDemo />)
      
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      expect(previewButton).toBeDisabled()
    })

    it('enables preview button when input has content', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      await user.type(input, 'https://example.com')
      expect(previewButton).not.toBeDisabled()
    })

    it('shows demo preview when valid input is provided', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      await user.type(input, 'https://example.com')
      await user.click(previewButton)
      
      await waitFor(() => {
        expect(screen.getByText(/hello, alex/i)).toBeInTheDocument()
      })
    })

    it('displays animated chart elements in demo', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      await user.type(input, 'My fitness app idea')
      await user.click(previewButton)
      
      await waitFor(() => {
        expect(screen.getByText(/active projects/i)).toBeInTheDocument()
        expect(screen.getByText(/mobile app design/i)).toBeInTheDocument()
      })
    })

    it('shows bottom navigation in demo', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      await user.type(input, 'Test input')
      await user.click(previewButton)
      
      await waitFor(() => {
        // Check for navigation icons (emojis)
        expect(screen.getByText('🏠')).toBeInTheDocument()
        expect(screen.getByText('📊')).toBeInTheDocument()
        expect(screen.getByText('⚙️')).toBeInTheDocument()
      })
    })
  })

  describe('Analytics Tracking', () => {
    it('tracks demo interaction events', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      await user.type(input, 'https://example.com')
      await user.click(previewButton)
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'demo_interaction', {
        event_category: 'engagement',
        event_label: 'website'
      })
    })

    it('tracks demo animation complete events', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      await user.type(input, 'Test idea')
      await user.click(previewButton)
      
      // Wait for animation to complete
      await waitFor(() => {
        expect(window.gtag).toHaveBeenCalledWith('event', 'demo_animation_complete', {
          event_category: 'engagement',
          event_label: 'website'
        })
      }, { timeout: 3000 })
    })

    it('tracks correct label for different tabs', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      const input = screen.getByRole('textbox')
      const previewButton = screen.getByRole('button', { name: /mobilify preview/i })
      
      // Switch to idea tab
      await user.click(ideaTab)
      
      await user.type(input, 'My app idea')
      await user.click(previewButton)
      
      expect(window.gtag).toHaveBeenCalledWith('event', 'demo_interaction', {
        event_category: 'engagement',
        event_label: 'idea'
      })
    })
  })

  describe('Responsive Design', () => {
    it('renders properly on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<InteractiveDemo />)
      
      expect(screen.getByRole('heading', { name: /from zero to app, instantly/i })).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /mobilify preview/i })).toBeInTheDocument()
    })

    it('maintains proper layout on tablet viewport', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(<InteractiveDemo />)
      
      const tabs = screen.getAllByRole('button')
      expect(tabs.length).toBeGreaterThanOrEqual(3) // 2 tabs + preview button
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<InteractiveDemo />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder')
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<InteractiveDemo />)
      
      const websiteTab = screen.getByRole('button', { name: /convert a website/i })
      const ideaTab = screen.getByRole('button', { name: /describe an idea/i })
      
      // Tab navigation should work
      await user.tab()
      expect(websiteTab).toHaveFocus()
      
      await user.tab()
      expect(ideaTab).toHaveFocus()
    })
  })
})
