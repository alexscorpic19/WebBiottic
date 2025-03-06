import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sendContactEmail } from '../email.service';
import type { ContactForm } from '../../types';

// Mock nodemailer with default export
vi.mock('nodemailer', () => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test-id' });
  const mockCreateTransport = vi.fn(() => ({
    sendMail: mockSendMail
  }));
  
  return {
    default: {
      createTransport: mockCreateTransport
    }
  };
});

describe('Email Service', () => {
  beforeEach(() => {
    // Reset environment variables before each test
    process.env.NODE_ENV = 'test';
    process.env.SMTP_HOST = undefined;
    process.env.SMTP_PORT = undefined;
    process.env.SMTP_USER = undefined;
    process.env.SMTP_PASS = undefined;
    
    // Mock window as undefined to simulate server environment
    vi.stubGlobal('window', undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('should throw error when email configuration is not available', async () => {
    // Set empty credentials to test configuration error
    process.env.SMTP_HOST = '';
    process.env.SMTP_PORT = '';

    const testForm: ContactForm = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'test message'
    };

    await expect(sendContactEmail(testForm))
      .rejects.toThrow('Email configuration is not available');
  });

  it('should throw error when email credentials are missing', async () => {
    // Set configuration but missing credentials
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = '';
    process.env.SMTP_PASS = '';

    const testForm: ContactForm = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'test message'
    };

    await expect(sendContactEmail(testForm))
      .rejects.toThrow('Email credentials are missing');
  });

  it('should handle optional fields correctly', async () => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test';
    process.env.SMTP_PASS = 'test';
    process.env.CONTACT_EMAIL = 'contact@test.com';

    const testForm: ContactForm = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'test message',
      phone: '1234567890',
      company: 'Test Company'
    };

    await expect(sendContactEmail(testForm)).resolves.not.toThrow();
  });

  it('should work without optional fields', async () => {
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test';
    process.env.SMTP_PASS = 'test';
    process.env.CONTACT_EMAIL = 'contact@test.com';

    const testForm: ContactForm = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'test message'
    };

    await expect(sendContactEmail(testForm)).resolves.not.toThrow();
  });
});
