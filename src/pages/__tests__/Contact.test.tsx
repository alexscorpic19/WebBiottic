
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Contact } from '../Contact';
import { BrowserRouter } from 'react-router-dom';

// Mock the email service
vi.mock('../../server/services/email.service', () => ({
  sendContactEmail: vi.fn().mockRejectedValue(new Error('Server error'))
}));

describe('Contact Page', () => {
  it('handles server error', async () => {
    const { container } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    // Fill in the form
    fireEvent.change(screen.getByRole('textbox', { name: /correo electrónico/i }), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: /mensaje/i }), {
      target: { value: 'Test message' }
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    // Wait for error message
    await waitFor(() => {
      const errorElement = screen.getByText((content) => {
        return content.toLowerCase().includes('error');
      });
      expect(errorElement).toBeInTheDocument();
    }, { container });
  });
});
