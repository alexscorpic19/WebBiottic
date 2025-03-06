import mongoose from 'mongoose';
import { SERVER_CONFIG } from './index';

export const connectDB = async () => {
  try {
    if (!SERVER_CONFIG.mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', SERVER_CONFIG.mongoUri);

    await mongoose.connect(SERVER_CONFIG.mongoUri, {
      // Opciones de conexión recomendadas
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      connectTimeoutMS: 10000,
    });

    console.log('✅ MongoDB connected successfully');
    
    // Manejadores de eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
