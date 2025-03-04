import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Contact } from '../Contact';
import { API_CONFIG } from '../../config';

// Mock fetch
global.fetch = vi.fn();

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
    
    await waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el mensaje es requerido/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByRole('textbox', { name: /nombre/i }), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /correo electrónico/i }), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /mensaje/i }), {
      target: { value: 'This is a test message with more than 10 characters' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT}`,
        expect.any(Object)
      );
    });
  });
});
