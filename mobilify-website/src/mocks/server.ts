/**
 * MSW Server Setup for Testing
 *
 * This file sets up the Mock Service Worker server for use in tests.
 * It configures the server to intercept network requests during testing
 * and return mock responses defined in the handlers.
 */

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Setup MSW server with our handlers
export const server = setupServer(...handlers)

// Export server for use in test setup
export default server
