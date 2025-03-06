import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not found in environment variables, using default value');
}

export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/biottic',
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',
};

// Validación de configuración
const validateConfig = () => {
  const requiredFields = ['mongoUri', 'port', 'nodeEnv'];
  const missingFields = requiredFields.filter((field): field is keyof typeof SERVER_CONFIG => 
    !(field in SERVER_CONFIG)
  );
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
  }
};

validateConfig();

export default SERVER_CONFIG;
