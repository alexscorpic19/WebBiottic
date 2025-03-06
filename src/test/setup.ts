import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Create a proper window mock that satisfies the type requirements
const mockWindow = {
  ...window,
  HTMLIFrameElement: function() {},
  YT: {
    Player: vi.fn(),
    PlayerState: {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5
    }
  },
  onYouTubeIframeAPIReady: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
} as unknown as Window & typeof globalThis;

beforeEach(() => {
  vi.stubGlobal('window', mockWindow);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
