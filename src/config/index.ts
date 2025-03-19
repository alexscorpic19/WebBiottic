/// <reference types="vite/client" />

// Helper para obtener variables de entorno de manera segura
const getEnv = (key: string, defaultValue: string = ''): string => {
  // Use a type-safe approach that works in both Node.js and browser environments
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  
  // For browser/Vite environment
  try {
    const envValue = import.meta.env[key];
    return envValue || defaultValue;
  } catch {  // Remove the error parameter completely
    return defaultValue;
  }
};

// Rutas de assets
const getAssetUrl = (path: string): string => {
  // Check if we're in development mode, handling both Node.js and browser environments
  if (
    (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') || 
    (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ) {
    return `/src/assets/${path}`;
  }
  return `/assets/${path}`;
};

// Assets paths
export const ASSETS = {
  WHATSAPP_ICON: getAssetUrl('images/WAPP.png'),
  PRODUCT_PLACEHOLDER: getAssetUrl('images/product-placeholder.png'),
  DEFAULT_HERO: getAssetUrl('images/default-hero.jpg')
} as const;

// API URLs
export const API_CONFIG = {
  BASE_URL: typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api',
  ENDPOINTS: {
    CONTACT: '/contact'
  }
} as const;

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
} as const;

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

// Remove or use the underscore parameter
export const someFunction = (param1: string): void => {
  // Implementation without using underscore
  console.log(param1);
};
