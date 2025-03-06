import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../useContactForm';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('useContactForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should handle maximum length validation', async () => {
    const { result } = renderHook(() => useContactForm());

    await act(async () => {
      result.current.updateField(
        'message',
        'a'.repeat(1001)
      );
    });

    expect(result.current.formErrors.message).toBe('El mensaje no puede exceder 1000 caracteres');
  });

  it('should handle localStorage errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock localStorage.setItem to throw
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const { result } = renderHook(() => useContactForm());
    
    await act(async () => {
      result.current.updateField('name', 'Test User');
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
