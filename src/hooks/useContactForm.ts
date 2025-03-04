import { useState, useEffect } from 'react';
import type { ContactFormData } from '../types/contact';
import { STORAGE_KEYS } from '../config';

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
      localStorage.setItem(STORAGE_KEYS.CONTACT_FORM, JSON.stringify(formData));
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
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    let isValid = true;

    // Validate required fields
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El formato del email es inválido';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

    setFormErrors(errors);
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

  return {
    formData,
    formErrors,
    updateField,
    validateForm,
    clearForm
  };
}
