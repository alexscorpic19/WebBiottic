/// <reference types="vite/client" />
import dotenv from 'dotenv';

// Cargar variables de entorno en entorno Node.js
if (typeof process !== 'undefined' && process.env) {
  dotenv.config();
}

// Helper para obtener variables de entorno de manera segura
const getEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // En el cliente, usar variables de Vite
  return (import.meta.env[key] as string) || defaultValue;
};

// Importar imágenes usando rutas relativas para el servidor
const whatsappIcon: string = new URL('../assets/images/WAPP.png', import.meta.url).href;
/* @vite-ignore */
const productPlaceholder = new URL('../assets/images/product-placeholder.png', import.meta.url).href;
/* @vite-ignore */
const defaultHero = new URL('../assets/images/default-hero.jpg', import.meta.url).href;

// API URLs
export const API_CONFIG = {
  BASE_URL: getEnv('VITE_API_URL', 'http://localhost:3000/api'),
  ENDPOINTS: {
    CONTACT: '/contact'
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
  SERVICE: getEnv('EMAIL_SERVICE', 'gmail'),
  FROM_EMAIL: getEnv('EMAIL_FROM', 'biottic.com@gmail.com'),
  TO_EMAIL: getEnv('EMAIL_TO', 'contacto@biottic.com.co'),
  SUBJECT_PREFIX: getEnv('EMAIL_SUBJECT_PREFIX', '[Biottic Web] '),
  
  // Configuración SMTP basada en el entorno
  getSmtpConfig: (): {
    host: string;
    port: number;
    secure: boolean;
    requireTLS: boolean;
    auth: {
      user: string;
      pass: string;
    };
  } => {
    const environment = getEnv('NODE_ENV', 'development');
    const configs = {
      development: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: getEnv('EMAIL_USER'),
          pass: getEnv('EMAIL_PASS')
        }
      },
      production: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
          user: getEnv('EMAIL_USER'),
          pass: getEnv('EMAIL_PASS')
        }
      }
    };
    
    return configs[environment as keyof typeof configs] || configs.development;
  }
};

// Configuración de almacenamiento local
export const STORAGE_KEYS = {
  CONTACT_FORM: 'biottic_contact_form',
  CART_ITEMS: 'biottic_cart_items',
  USER_PREFERENCES: 'biottic_user_prefs'
};
