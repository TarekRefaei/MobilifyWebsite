/**
 * MSW (Mock Service Worker) Handlers
 * 
 * This file defines mock API handlers for testing purposes.
 * These handlers intercept network requests during tests and return
 * predefined responses, making tests more reliable and independent.
 */

import { http, HttpResponse } from 'msw'

// Newsletter subscription endpoint handlers
export const handlers = [
  // Success response for newsletter subscription
  http.post('/api/subscribe', async ({ request }) => {
    const body = await request.json() as { email: string }
    
    // Validate email format (basic validation for testing)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!body.email || !emailRegex.test(body.email)) {
      return HttpResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Simulate successful subscription
    return HttpResponse.json(
      { 
        message: 'Successfully subscribed!',
        email: body.email,
        subscribed: true 
      },
      { status: 200 }
    )
  }),

  // Error response handler (can be used to override success handler in specific tests)
  http.post('/api/subscribe-error', () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }),

  // Network timeout simulation (for testing loading states)
  http.post('/api/subscribe-timeout', async () => {
    // Simulate a slow network response
    await new Promise(resolve => setTimeout(resolve, 5000))
    return HttpResponse.json(
      { message: 'Delayed response' },
      { status: 200 }
    )
  })
]

// Export individual handlers for test-specific overrides
export const successHandler = handlers[0]
export const errorHandler = http.post('/api/subscribe', () => {
  return HttpResponse.json(
    { error: 'Network error' },
    { status: 500 }
  )
})

export const timeoutHandler = http.post('/api/subscribe', async () => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return HttpResponse.json(
    { error: 'Request timeout' },
    { status: 408 }
  )
})
