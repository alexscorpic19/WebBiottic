// Importar imágenes usando rutas relativas para el servidor
const whatsappIcon: string = new URL('../assets/images/WAPP.png', import.meta.url).href;
/* @vite-ignore */
const productPlaceholder = new URL('../assets/images/product-placeholder.png', import.meta.url).href;
/* @vite-ignore */
const defaultHero = new URL('../assets/images/default-hero.jpg', import.meta.url).href;

// Configuración centralizada para la aplicación
import dotenv from 'dotenv';

declare const process: NodeJS.Process;
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      // Add other env variables you use
    }
  }
}

// Load environment variables (solo para Node.js)
if (typeof process !== 'undefined' && process.env) {
  dotenv.config();
}

// Helper function to access environment variables in both browser and Node.js
const getEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
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

export const IMAGE_CONFIG = {
  PRODUCT_PLACEHOLDER: productPlaceholder,
  DEFAULT_HERO: defaultHero,
  WHATSAPP_ICON: whatsappIcon
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
