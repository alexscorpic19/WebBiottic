type Environment = {
  API_URL: string;
  NODE_ENV: string;
};

const getEnvironment = (): Environment => {
  // Verificar si estamos en el navegador
  if (typeof window !== 'undefined') {
    return {
      API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      NODE_ENV: import.meta.env.MODE
    };
  }
  
  // Entorno del servidor
  return {
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };
};

const env = getEnvironment();

// Configuración específica del servidor
export const SERVER_CONFIG = typeof window === 'undefined' ? {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/biottic',
} : null;

// Configuración de API que funciona en ambos entornos
export const API_CONFIG = {
  baseUrl: env.API_URL,
  endpoints: {
    contact: '/contact',
    health: '/health'
  }
};

// Configuración específica del cliente
export const CLIENT_CONFIG = typeof window !== 'undefined' ? {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
} : null;

// Tipo para la configuración de email
type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

// Configuración de email (solo servidor)
export const EMAIL_CONFIG: EmailConfig | null = typeof window === 'undefined' 
  ? {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    }
  : null;

// Configuración general de la aplicación
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

export default {
  apiUrl: env.API_URL,
}
