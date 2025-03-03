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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACT_FORM, JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validar en tiempo real
    validateField(field, value);
  };

  const validateField = (field: keyof ContactFormData, value: string) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'El nombre es requerido';
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        } else if (value.trim().length > 60) {
          error = 'El nombre no puede exceder 60 caracteres';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'El formato del email es inválido';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'El mensaje es requerido';
        } else if (value.trim().length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres';
        } else if (value.trim().length > 1000) { // Cambiado de 500 a 1000 para coincidir con el servidor
          error = 'El mensaje no puede exceder 1000 caracteres';
        }
        break;
        
      case 'phone':
        if (value.trim().length > 10) {
          error = 'El número de teléfono no debe exceder los 10 dígitos';
        }
        break;
        
      case 'company':
        if (value.trim().length > 100) {  // Cambiado de 60 a 100
          error = 'El nombre de la empresa no puede exceder 100 caracteres';
        }
        break;
    }
    
    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    return !error;
  };

  const clearForm = () => {
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

  const validateForm = (): boolean => {
    // Validar todos los campos
    const nameValid = validateField('name', formData.name);
    const emailValid = validateField('email', formData.email);
    const messageValid = validateField('message', formData.message);
    const phoneValid = validateField('phone', formData.phone || '');
    const companyValid = validateField('company', formData.company || '');
    
    return nameValid && emailValid && messageValid && phoneValid && companyValid;
  };

  return {
    formData,
    formErrors,
    updateField,
    clearForm,
    validateForm,
    validateField
  };
}
