type Environment = {
  API_URL: string;
  NODE_ENV: string;
};

const getEnvironment = (): Environment => {
  if (typeof window === 'undefined') {
    // Server-side
    return {
      API_URL: process.env.API_URL || 'http://localhost:3000/api',
      NODE_ENV: process.env.NODE_ENV || 'development'
    };
  }
  // Client-side
  return {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    NODE_ENV: import.meta.env.MODE
  };
};

const env = getEnvironment();

export const APP_CONFIG = {
  NAME: 'Biottic',
  COMPANY: 'Biottic S.A.S',
  CONTACT_EMAIL: 'contacto@biottic.com.co',
  CONTACT_PHONE: '+573001234567',
  ADDRESS: 'Medellín, Colombia',
  ENVIRONMENT: env.NODE_ENV,
  IS_DEVELOPMENT: env.NODE_ENV === 'development',
  IS_PRODUCTION: env.NODE_ENV === 'production',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/biottic',
    INSTAGRAM: 'https://instagram.com/biottic',
    LINKEDIN: 'https://linkedin.com/company/biottic',
    TWITTER: 'https://twitter.com/biottic',
    WHATSAPP: 'https://wa.me/573001234567'
  }
};

export const IMAGE_CONFIG = {
  WHATSAPP_ICON: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg'
};

export const STORAGE_KEYS = {
  CONTACT_FORM: 'biottic_contact_form',
  USER_PREFERENCES: 'biottic_user_preferences',
  AUTH_TOKEN: 'biottic_auth_token'
};

export const API_CONFIG = {
  BASE_URL: env.API_URL,
  ENDPOINTS: {
    CONTACT: '/contact',
    HEALTH: '/health'
  }
};

export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/biottic',
};

export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
};

export const CLIENT_CONFIG = {
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3000/api',
};

// Validar configuración crítica solo en el servidor
if (typeof window === 'undefined') {
  const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'MONGODB_URI'];
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }
}
