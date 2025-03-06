import '@testing-library/jest-dom';
import { vi } from 'vitest';

declare global {
  namespace Vi {
    interface CustomMatchers<R = unknown> {
      toHaveBeenCalledExactlyOnceWith(...args: unknown[]): R;
    }
  }
}

// Create a proper window mock
const windowMock = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  document: document,
  location: {
    href: 'http://localhost'
  },
  // Add other window properties as needed
};

// Set up the global window object
global.window = windowMock as any;
global.document = window.document;
