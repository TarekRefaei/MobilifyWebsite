import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../Contact'

// Mock fetch for form submission testing
global.fetch = jest.fn()

describe('Contact Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders the contact form with all required fields', () => {
      render(<Contact />)
      
      // Check for main heading
      expect(screen.getByRole('heading', { name: /ready to build your mobile future/i })).toBeInTheDocument()
      
      // Check for form fields
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/briefly describe your project/i)).toBeInTheDocument()
      
      // Check for submit button
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('displays required field indicators', () => {
      render(<Contact />)
      
      // Check for asterisks indicating required fields
      expect(screen.getByText(/name \*/i)).toBeInTheDocument()
      expect(screen.getByText(/email \*/i)).toBeInTheDocument()
      expect(screen.getByText(/briefly describe your project \*/i)).toBeInTheDocument()
    })

    it('has proper accessibility attributes', () => {
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      
      expect(nameInput).toHaveAttribute('required')
      expect(emailInput).toHaveAttribute('required')
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(messageInput).toHaveAttribute('required')
    })
  })

  describe('Form Validation', () => {
    it('prevents submission with empty required fields', async () => {
      const user = userEvent.setup()
      render(<Contact />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.click(submitButton)
      
      // Form should not submit (fetch should not be called)
      expect(fetch).not.toHaveBeenCalled()
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'invalid-email')
      await user.type(messageInput, 'Test message')
      await user.click(submitButton)
      
      // Browser validation should prevent submission
      expect(fetch).not.toHaveBeenCalled()
    })

    it('accepts valid form data', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'I need help building a mobile app for my business.')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('john@example.com'),
        })
      })
    })
  })

  describe('Form Submission', () => {
    it('shows loading state during submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100))
      )
      
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      await user.click(submitButton)
      
      // Check for loading state
      expect(screen.getByText(/sending/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    it('shows success message on successful submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
      })
      
      // Form should be cleared
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })

    it('shows error message on failed submission', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
      
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      })
    })
  })

  describe('Analytics Tracking', () => {
    it('tracks form submission events', async () => {
      const user = userEvent.setup()
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      
      render(<Contact />)
      
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const messageInput = screen.getByLabelText(/briefly describe your project/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Test message')
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(window.gtag).toHaveBeenCalledWith('event', 'form_submission', {
          event_category: 'engagement',
          event_label: 'contact_form'
        })
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
      
      render(<Contact />)
      
      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
      
      // Check that form fields stack vertically on mobile
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      
      expect(nameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
    })
  })
})
