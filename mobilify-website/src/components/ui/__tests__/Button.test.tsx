import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-electric-blue') // primary variant default
    })

    it('renders children correctly', () => {
      render(<Button>Test Button</Button>)
      
      expect(screen.getByText('Test Button')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Button className="custom-class">Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      render(<Button variant="primary">Primary</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-electric-blue', 'text-white')
    })

    it('renders secondary variant correctly', () => {
      render(<Button variant="secondary">Secondary</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-electric-blue', 'text-electric-blue')
    })

    it('renders ghost variant correctly', () => {
      render(<Button variant="ghost">Ghost</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-electric-blue')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Button size="sm">Small</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-4', 'py-2', 'text-sm')
    })

    it('renders medium size correctly (default)', () => {
      render(<Button size="md">Medium</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-6', 'py-3', 'text-base')
    })

    it('renders large size correctly', () => {
      render(<Button size="lg">Large</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-8', 'py-4', 'text-lg')
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when isLoading is true', () => {
      render(<Button isLoading>Loading Button</Button>)
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
      expect(screen.queryByText('Loading Button')).not.toBeInTheDocument()
    })

    it('disables button when loading', () => {
      render(<Button isLoading>Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('shows loading spinner with proper accessibility', () => {
      render(<Button isLoading>Button</Button>)
      
      const spinner = screen.getByRole('button').querySelector('svg')
      expect(spinner).toHaveClass('animate-spin')
    })
  })

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })

    it('disables button when both disabled and isLoading are true', () => {
      render(<Button disabled isLoading>Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Event Handling', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick} disabled>Click me</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick} isLoading>Click me</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper button role', () => {
      render(<Button>Button</Button>)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(<Button onClick={handleClick}>Button</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('has proper focus styles', () => {
      render(<Button>Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2')
    })

    it('maintains accessibility when disabled', () => {
      render(<Button disabled>Disabled Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('disabled')
    })
  })

  describe('HTML Attributes', () => {
    it('forwards HTML button attributes', () => {
      render(
        <Button 
          type="submit" 
          form="test-form" 
          data-testid="custom-button"
        >
          Submit
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('form', 'test-form')
      expect(button).toHaveAttribute('data-testid', 'custom-button')
    })

    it('supports ref forwarding', () => {
      const ref = React.createRef<HTMLButtonElement>()
      
      render(<Button ref={ref}>Button</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Design System Compliance', () => {
    it('uses semantic colors from design system', () => {
      render(<Button variant="primary">Primary</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-electric-blue')
    })

    it('has consistent transition timing', () => {
      render(<Button>Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('transition-all', 'duration-200')
    })

    it('includes proper shadow styling', () => {
      render(<Button variant="primary">Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('shadow-lg', 'hover:shadow-xl')
    })

    it('has rounded corners consistent with design system', () => {
      render(<Button>Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('rounded-lg')
    })
  })

  describe('Responsive Design', () => {
    it('maintains proper touch targets on mobile', () => {
      render(<Button size="sm">Small Button</Button>)
      
      const button = screen.getByRole('button')
      // Even small buttons should have adequate padding for touch
      expect(button).toHaveClass('px-4', 'py-2')
    })

    it('scales appropriately for different sizes', () => {
      const { rerender } = render(<Button size="sm">Button</Button>)
      let button = screen.getByRole('button')
      expect(button).toHaveClass('text-sm')
      
      rerender(<Button size="lg">Button</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('text-lg')
    })
  })
})
