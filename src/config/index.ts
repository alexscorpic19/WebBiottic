import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

export const APP_CONFIG = {
  NAME: 'Biottic',
  COMPANY: 'Biottic S.A.S',
  CONTACT_EMAIL: 'contacto@biottic.com.co',
  CONTACT_PHONE: '+573001234567', // Formato internacional sin espacios ni caracteres especiales
  ADDRESS: 'Medellín, Colombia',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/biottic',
    INSTAGRAM: 'https://instagram.com/biottic',
    LINKEDIN: 'https://linkedin.com/company/biottic',
    TWITTER: 'https://twitter.com/biottic',
    WHATSAPP: 'https://wa.me/573001234567' // Added WhatsApp link using the same phone number
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

// Validar configuración crítica
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}
