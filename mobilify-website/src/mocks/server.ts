/**
 * MSW Server Setup for Testing
 *
 * This file sets up the Mock Service Worker server for use in tests.
 * It configures the server to intercept network requests during testing
 * and return mock responses defined in the handlers.
 */

// Use require for MSW to avoid Jest module resolution issues
const { setupServer } = require('msw/node')
const { handlers } = require('./handlers')

// Setup MSW server with our handlers
export const server = setupServer(...handlers)

// Export server for use in test setup
export default server
