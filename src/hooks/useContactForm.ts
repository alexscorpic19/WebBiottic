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
    
    // Limpiar el error cuando el usuario comienza a escribir
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
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
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El formato del email es inválido';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    // Validación para el número de teléfono
    if (formData.phone && formData.phone.trim().length > 10) {
      errors.phone = 'El número de teléfono no debe exceder los 10 dígitos';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    formData,
    formErrors,
    updateField,
    clearForm,
    validateForm
  };
}
