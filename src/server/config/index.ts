import dotenv from 'dotenv';
import path from 'path';

// Load environment variables in Node.js environment
if (typeof process !== 'undefined' && process.env) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

// Helper to safely get environment variables
const getEnv = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue;
};

// Email configuration
export const EMAIL_CONFIG = {
  SERVICE: getEnv('EMAIL_SERVICE', 'gmail'),
  FROM_EMAIL: getEnv('EMAIL_FROM', 'biottic.com@gmail.com'),
  TO_EMAIL: getEnv('EMAIL_TO', 'contacto@biottic.com.co'),
  SUBJECT_PREFIX: getEnv('EMAIL_SUBJECT_PREFIX', '[Biottic Web] '),
  
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
