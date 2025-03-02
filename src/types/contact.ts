export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  company: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  company?: string;
}

export type ToastType = 'success' | 'error';
