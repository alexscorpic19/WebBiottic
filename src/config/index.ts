/// <reference types="vite/client" />

// Helper para obtener variables de entorno de manera segura
const getEnv = (key: string, defaultValue: string = ''): string => {
  return (import.meta.env[key] as string) || defaultValue;
};

// Rutas de assets
/* @vite-ignore */
const getAssetUrl = (path: string): string => {
  if (import.meta.env.DEV) {
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
  BASE_URL: getEnv('VITE_API_URL', 'http://localhost:3000/api'),
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
