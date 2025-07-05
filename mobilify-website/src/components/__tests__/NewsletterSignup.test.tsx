import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterSignup from '../NewsletterSignup'

// Mock fetch for API testing
global.fetch = jest.fn()

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Inline Variant', () => {
    it('renders inline variant with proper content', () => {
      render(<NewsletterSignup variant="inline" />)
      
      expect(screen.getByRole('heading', { name: /stay updated on mobile innovation/i })).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })

    it('has proper styling for inline variant', () => {
      render(<NewsletterSignup variant="inline" />)

      // Find the motion.div with bg-electric-blue class more specifically
      const section = screen.getByRole('heading', { name: /stay updated on mobile innovation/i }).closest('.bg-electric-blue')
      expect(section).toHaveClass('bg-electric-blue')
    })
  })

  describe('Footer Variant', () => {
    it('renders footer variant with proper content', () => {
      render(<NewsletterSignup variant="footer" />)
      
      expect(screen.getByRole('heading', { name: /stay connected/i })).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })

    it('has compact layout for footer variant', () => {
      render(<NewsletterSignup variant="footer" />)
      
      const heading = screen.getByRole('heading', { name: /stay connected/i })
      expect(heading).toHaveClass('text-xl')
    })
  })

  describe('Section Variant', () => {
    it('renders section variant properly', () => {
      render(<NewsletterSignup variant="section" />)
      
      expect(screen.getByRole('heading', { name: /stay updated on mobile innovation/i })).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })
  })

  describe('Email Validation', () => {
    it('prevents submission with empty email', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup variant="footer" />)
      
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(submitButton)
      
      expect(fetch).not.toHaveBeenCalled()
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup variant="footer" />)
      
      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)
      
      // Browser validation should prevent submission
      expect(fetch).not.toHaveBeenCalled()
    })

    it('accepts valid email format', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      
      render(<NewsletterSignup variant="footer" />)
      
      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      // Should simulate successful submission since API credentials are not configured
      await waitFor(() => {
        expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument()
      })
    })
  })

  describe('Submission Flow', () => {
    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
      )
      
      render(<NewsletterSignup variant="footer" />)
      
      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      // Check for loading state
      expect(submitButton).toBeDisabled()
    })

    it('clears email field on successful submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup variant="footer" />)
      
      const emailInput = screen.getByPlaceholderText(/enter your email/i) as HTMLInputElement
      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(emailInput.value).toBe('')
      })
    })

    it('shows success message on successful submission', async () => {
      const user = userEvent.setup()

      // Ensure no API credentials are set to trigger demo behavior
      const originalApiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      const originalListId = process.env.MAILCHIMP_LIST_ID
      delete process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      delete process.env.MAILCHIMP_LIST_ID

      render(<NewsletterSignup variant="footer" />)

      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument()
      }, { timeout: 3000 })

      // Restore environment variables
      if (originalApiKey !== undefined) {
        process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY = originalApiKey
      }
      if (originalListId !== undefined) {
        process.env.MAILCHIMP_LIST_ID = originalListId
      }
    })

    it('shows error message on failed submission', async () => {
      const user = userEvent.setup()

      // Set environment variables before importing/rendering the component
      process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY = 'test-key'
      process.env.MAILCHIMP_LIST_ID = 'test-list'

      // Mock fetch to simulate API failure
      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'))
      global.fetch = mockFetch

      render(<NewsletterSignup variant="footer" />)

      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/✗ Please try again/i)).toBeInTheDocument()
      }, { timeout: 5000 })

      // Verify fetch was called
      expect(mockFetch).toHaveBeenCalledWith('/api/subscribe', expect.any(Object))

      // Clean up
      delete process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      delete process.env.MAILCHIMP_LIST_ID
    })
  })

  describe('Analytics Tracking', () => {
    it('tracks newsletter signup events', async () => {
      const user = userEvent.setup()

      // Ensure no API credentials are set (default demo behavior)
      const originalApiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      const originalListId = process.env.MAILCHIMP_LIST_ID
      delete process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      delete process.env.MAILCHIMP_LIST_ID

      render(<NewsletterSignup variant="footer" />)

      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      // Wait for success message to appear first
      await waitFor(() => {
        expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument()
      })

      // Then check if gtag was called
      expect(window.gtag).toHaveBeenCalledWith('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'footer'
      })

      // Restore environment variables
      if (originalApiKey !== undefined) {
        process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY = originalApiKey
      }
      if (originalListId !== undefined) {
        process.env.MAILCHIMP_LIST_ID = originalListId
      }
    })

    it('tracks different variants correctly', async () => {
      const user = userEvent.setup()

      // Ensure no API credentials are set to trigger demo behavior
      const originalApiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      const originalListId = process.env.MAILCHIMP_LIST_ID
      delete process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      delete process.env.MAILCHIMP_LIST_ID

      render(<NewsletterSignup variant="inline" />)

      const emailInput = screen.getByPlaceholderText(/enter your email address/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(window.gtag).toHaveBeenCalledWith('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'inline'
        })
      })

      // Restore environment variables
      if (originalApiKey !== undefined) {
        process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY = originalApiKey
      }
      if (originalListId !== undefined) {
        process.env.MAILCHIMP_LIST_ID = originalListId
      }
    })
  })

  describe('Multiple Instance Testing', () => {
    it('handles multiple newsletter forms independently', () => {
      render(
        <div>
          <NewsletterSignup variant="footer" />
          <NewsletterSignup variant="inline" />
        </div>
      )
      
      const footerForm = screen.getByRole('heading', { name: /stay connected/i })
      const inlineForm = screen.getByRole('heading', { name: /stay updated on mobile innovation/i })
      
      expect(footerForm).toBeInTheDocument()
      expect(inlineForm).toBeInTheDocument()
      
      // Should have two separate email inputs with accessible names
      const emailInputs = screen.getAllByRole('textbox', { name: /email/i })
      expect(emailInputs).toHaveLength(2)
    })
  })

  describe('Accessibility', () => {
    it('has proper form labels and attributes', () => {
      render(<NewsletterSignup variant="footer" />)
      
      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
    })

    it('provides proper button states for screen readers', async () => {
      const user = userEvent.setup()

      // Ensure no API credentials to use demo mode
      delete process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
      delete process.env.MAILCHIMP_LIST_ID

      render(<NewsletterSignup variant="footer" />)

      const emailInput = screen.getByPlaceholderText(/enter your email/i)
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      // Initially disabled when email is empty
      expect(submitButton).toBeDisabled()

      await user.type(emailInput, 'test@example.com')

      // Should be enabled after typing valid email
      expect(submitButton).not.toBeDisabled()

      // Mock a slow response to catch the loading state
      const slowPromise = new Promise(resolve => setTimeout(resolve, 100))
      jest.spyOn(global, 'setTimeout').mockImplementationOnce((fn) => {
        slowPromise.then(fn)
        return 1 as any
      })

      await user.click(submitButton)

      // Should be disabled during submission (briefly)
      expect(submitButton).toBeDisabled()

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument()
      })
    })
  })
})
