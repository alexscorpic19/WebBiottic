import { useState, useEffect } from 'react';
import type { ContactFormData } from '../types/contact';

const STORAGE_KEY = 'contact_form_data';

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      message: '',
      phone: ''
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      phone: ''
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    formData,
    updateField,
    clearForm
  };
}
