import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extender Vitest con los matchers de jest-dom
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
