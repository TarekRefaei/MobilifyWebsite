import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveClass('border-gray-300')
    })

    it('renders with label', () => {
      render(<Input label="Email Address" />)
      
      expect(screen.getByText('Email Address')).toBeInTheDocument()
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Input helperText="Enter your email address" />)
      
      expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Input className="custom-input" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-input')
    })
  })

  describe('Variants', () => {
    it('renders base variant correctly', () => {
      render(<Input variant="base" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-gray-300', 'focus:ring-electric-blue')
    })

    it('renders error variant correctly', () => {
      render(<Input variant="error" errorMessage="This field is required" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500', 'focus:ring-red-500')
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('renders success variant correctly', () => {
      render(<Input variant="success" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-green-500', 'focus:ring-green-500')
    })
  })

  describe('Error Handling', () => {
    it('shows error message when variant is error', () => {
      render(<Input variant="error" errorMessage="Invalid input" />)
      
      expect(screen.getByText('Invalid input')).toBeInTheDocument()
      expect(screen.getByText('Invalid input')).toHaveClass('text-red-600')
    })

    it('does not show helper text when error is present', () => {
      render(
        <Input 
          variant="error" 
          errorMessage="Error message" 
          helperText="Helper text" 
        />
      )
      
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })

    it('shows helper text when no error is present', () => {
      render(<Input helperText="Helper text" />)
      
      expect(screen.getByText('Helper text')).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('accepts user input', async () => {
      const user = userEvent.setup()
      render(<Input />)
      
      const input = screen.getByRole('textbox') as HTMLInputElement
      await user.type(input, 'test input')
      
      expect(input.value).toBe('test input')
    })

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn()
      const user = userEvent.setup()
      
      render(<Input onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'a')
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('supports controlled input', () => {
      const { rerender } = render(<Input value="initial" onChange={() => {}} />)
      
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('initial')
      
      rerender(<Input value="updated" onChange={() => {}} />)
      expect(input.value).toBe('updated')
    })
  })

  describe('Accessibility', () => {
    it('associates label with input correctly', () => {
      render(<Input label="Username" />)
      
      const input = screen.getByLabelText('Username')
      expect(input).toBeInTheDocument()
    })

    it('has proper ARIA attributes for error state', () => {
      render(<Input variant="error" errorMessage="Error message" />)
      
      const input = screen.getByRole('textbox')
      const errorMessage = screen.getByText('Error message')
      
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(errorMessage).toHaveAttribute('role', 'alert')
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      
      await user.tab()
      expect(input).toHaveFocus()
    })

    it('has proper focus styles', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('focus:outline-none', 'focus:ring-2')
    })
  })

  describe('HTML Attributes', () => {
    it('forwards HTML input attributes', () => {
      render(
        <Input 
          type="email"
          placeholder="Enter email"
          required
          disabled
          data-testid="email-input"
        />
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
      expect(input).toHaveAttribute('placeholder', 'Enter email')
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('disabled')
      expect(input).toHaveAttribute('data-testid', 'email-input')
    })

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLInputElement>()
      
      render(<Input ref={ref} />)
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Design System Compliance', () => {
    it('uses semantic colors from design system', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('focus:ring-electric-blue')
    })

    it('has consistent border radius', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('rounded-lg')
    })

    it('has proper padding and sizing', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('px-4', 'py-3', 'text-base')
    })

    it('includes transition effects', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('transition-all', 'duration-200')
    })
  })

  describe('Dark Mode Support', () => {
    it('has dark mode classes', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('dark:border-gray-600', 'dark:bg-gray-800', 'dark:text-gray-100')
    })

    it('has dark mode placeholder styling', () => {
      render(<Input placeholder="Test placeholder" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('dark:placeholder-gray-400')
    })

    it('maintains proper contrast in dark mode', () => {
      render(<Input label="Test Label" />)
      
      const label = screen.getByText('Test Label')
      expect(label).toHaveClass('dark:text-gray-300')
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styling', () => {
      render(<Input disabled />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup()
      render(<Input disabled />)
      
      const input = screen.getByRole('textbox') as HTMLInputElement
      await user.type(input, 'test')
      
      expect(input.value).toBe('')
    })
  })

  describe('Responsive Design', () => {
    it('maintains proper sizing on mobile', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      // Should have adequate touch target size
      expect(input).toHaveClass('py-3')
    })

    it('has full width by default', () => {
      render(<Input />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('w-full')
    })
  })

  describe('Label and Helper Text Layout', () => {
    it('renders label above input', () => {
      render(<Input label="Test Label" />)
      
      const container = screen.getByText('Test Label').parentElement
      const label = screen.getByText('Test Label')
      const input = screen.getByRole('textbox')
      
      expect(container).toContainElement(label)
      expect(container).toContainElement(input)
    })

    it('renders helper text below input', () => {
      render(<Input helperText="Helper text" />)
      
      const helperText = screen.getByText('Helper text')
      expect(helperText).toHaveClass('mt-2', 'text-sm')
    })

    it('renders error message below input', () => {
      render(<Input variant="error" errorMessage="Error message" />)
      
      const errorMessage = screen.getByText('Error message')
      expect(errorMessage).toHaveClass('mt-2', 'text-sm', 'text-red-600')
    })
  })
})
