
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Contact } from '../Contact';
import { API_CONFIG } from '../../config';

// Mock fetch globally
global.fetch = vi.fn().mockImplementation(() => 
  Promise.resolve(new Response(
    JSON.stringify({ success: true, message: 'Test message' }), 
    { status: 200 }
  ))
);

describe('Contact Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form', () => {
    render(<Contact />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    
    fireEvent.click(submitButton);
    
    // Use vi.waitFor instead
    await vi.waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el mensaje es requerido/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /mensaje/i }), {
      target: { value: 'This is a test message' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    
    // Use vi.waitFor instead
    await vi.waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT}`,
        expect.any(Object)
      );
    });
  });
});
