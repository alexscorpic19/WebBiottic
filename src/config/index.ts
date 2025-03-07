// Configuración centralizada para la aplicación
import dotenv from 'dotenv';

// Load environment variables (solo para Node.js)
if (typeof process !== 'undefined' && process.env) {
  dotenv.config();
}

// Helper function to access environment variables in both browser and Node.js
const getEnv = (key: string, defaultValue: string): string => {
  // For browser (Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const envKey = `VITE_${key}`;
    return (import.meta.env[envKey] as string) || defaultValue;
  }
  // For Node.js
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // Fallback
  return defaultValue;
};

// API URLs
export const API_CONFIG = {
  BASE_URL: getEnv('API_URL', 'http://localhost:3000'),
  ENDPOINTS: {
    CONTACT: '/api/contact',
    PRODUCTS: '/api/products',
    USERS: '/api/users',
    AUTH: '/api/auth'
  }
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'Biottic',
  COMPANY: 'Biottic Technologies',
  CONTACT_EMAIL: 'contacto@biottic.com.co',
  CONTACT_PHONE: '+57 3174133379',
  ADDRESS: 'Calle 123 #45-67, Bogotá, Colombia',
  SOCIAL_MEDIA: {
    WHATSAPP: 'https://wa.me/573174133379',
    INSTAGRAM: 'https://instagram.com/biottic',
    FACEBOOK: 'https://facebook.com/biottic',
    LINKEDIN: 'https://linkedin.com/company/biottic'
  }
};

// Configuración de imágenes
export const IMAGE_CONFIG = {
  PRODUCT_PLACEHOLDER: '/assets/images/product-placeholder.png',
  DEFAULT_HERO: '/assets/images/default-hero.jpg',
  WHATSAPP_ICON: '/assets/images/WAPP.png'
};

// Configuración del servidor de correo
export const EMAIL_CONFIG = {
  SERVICE: 'gmail',
  FROM_EMAIL: getEnv('EMAIL_USER', 'biottic.com@gmail.com'),
  TO_EMAIL: 'contacto@biottic.com.co',
  SUBJECT_PREFIX: '[Biottic Web] '
};

// Configuración de almacenamiento local
export const STORAGE_KEYS = {
  CONTACT_FORM: 'biottic_contact_form',
  CART_ITEMS: 'biottic_cart_items',
  USER_PREFERENCES: 'biottic_user_prefs'
};
