import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Create a minimal mock of the window object
const mockWindow = {
  ...window,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
} as unknown as Window & typeof globalThis;

// Replace the global window object
Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});
