import { useState, useEffect } from 'react';
import type { ContactFormData } from '../types/contact';
import { STORAGE_KEYS } from '../config';
import Logger from '../utils/logger';

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEYS.CONTACT_FORM);
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      message: '',
      phone: '',
      company: ''
    };
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [shouldPersist, setShouldPersist] = useState(true);

  useEffect(() => {
    if (shouldPersist) {
      try {
        localStorage.setItem(STORAGE_KEYS.CONTACT_FORM, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [formData, shouldPersist]);

  const validateField = (field: keyof ContactFormData, value: string): boolean => {
    let isValid = true;
    let error = '';

    switch (field) {
      case 'name':
        if (!value.trim()) {
          isValid = false;
          error = 'El nombre es requerido';
        }
        break;
      case 'email':
        if (!value.trim()) {
          isValid = false;
          error = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          isValid = false;
          error = 'El formato del email es inválido';
        }
        break;
      case 'message':
        if (!value.trim()) {
          isValid = false;
          error = 'El mensaje es requerido';
        } else if (value.trim().length < 10) {
          isValid = false;
          error = 'El mensaje debe tener al menos 10 caracteres';
        } else if (value.trim().length > 1000) {
          isValid = false;
          error = 'El mensaje no puede exceder 1000 caracteres';
        }
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return isValid;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email es inválido';
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setShouldPersist(true);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  const clearForm = () => {
    setShouldPersist(false);
    setFormData({
      name: '',
      email: '',
      message: '',
      phone: '',
      company: ''
    });
    setFormErrors({});
    localStorage.removeItem(STORAGE_KEYS.CONTACT_FORM);
  };

  const handleSubmit = async (_data: FormData) => {
    try {
      // ... lógica de envío
      Logger.info('Form submitted successfully');
    } catch (error) {
      Logger.error('Error submitting form:', error);
      // ... manejo del error
    }
  };

  return {
    formData,
    formErrors,
    updateField,
    validateForm,
    clearForm,
    handleSubmit
  };
}
