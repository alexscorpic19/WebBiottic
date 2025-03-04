import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useContactForm } from '../useContactForm';
import { STORAGE_KEYS } from '../../config';

describe('useContactForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty form data', () => {
    const { result } = renderHook(() => useContactForm());
    
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      message: '',
      phone: '',
      company: ''
    });
  });

  it('should update fields correctly', () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.updateField('name', 'John Doe');
      result.current.updateField('email', 'john@example.com');
    });
    
    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.formData.email).toBe('john@example.com');
  });

  it('should validate required fields', async () => {
    const { result } = renderHook(() => useContactForm());
    
    let isValid;
    act(() => {
      isValid = result.current.validateForm();
    });
    
    expect(isValid).toBe(false);
    
    // Wait for next render to check updated errors
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(result.current.formErrors.name).toBe('El nombre es requerido');
    expect(result.current.formErrors.email).toBe('El email es requerido');
    expect(result.current.formErrors.message).toBe('El mensaje es requerido');
  });

  it('should validate email format correctly', async () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.updateField('email', 'invalid-email');
    });
    
    // Wait for next render
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(result.current.formErrors.email).toBe('El formato del email es inválido');
    
    act(() => {
      result.current.updateField('email', 'valid@email.com');
    });
    
    // Wait for next render
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(result.current.formErrors.email).toBe('');
  });

  it('should validate message length', async () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.updateField('message', 'short');
    });
    
    // Wait for next render
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(result.current.formErrors.message).toBe('El mensaje debe tener al menos 10 caracteres');
    
    act(() => {
      result.current.updateField('message', 'This is a long enough message');
    });
    
    // Wait for next render
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(result.current.formErrors.message).toBe('');
  });

  it('should persist form data in localStorage', () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.updateField('name', 'John Doe');
    });
    
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACT_FORM) || '{}');
    expect(savedData.name).toBe('John Doe');
  });

  it('should clear form data and localStorage', () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.updateField('name', 'John Doe');
      result.current.clearForm();
    });
    
    expect(result.current.formData.name).toBe('');
    expect(localStorage.getItem(STORAGE_KEYS.CONTACT_FORM)).toBeNull();
  });
});
