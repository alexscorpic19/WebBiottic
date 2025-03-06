import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/database';
import { SERVER_CONFIG } from './config';
import { APP_CONFIG } from '../config';
import contactRoutes from './routes/contact.routes';

const app = express();
const port = SERVER_CONFIG.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok',
    environment: APP_CONFIG.ENVIRONMENT,
    version: '1.0.0',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const startServer = async () => {
  try {
    console.log('Starting server...');
    console.log('Environment:', SERVER_CONFIG.nodeEnv);
    console.log('Port:', SERVER_CONFIG.port);
    
    // Conectar a MongoDB
    await connectDB();
    
    // Iniciar servidor Express
    app.listen(port, () => {
      console.log(`
🚀 Server is running!
📡 API: http://localhost:${port}/api
🔧 Environment: ${SERVER_CONFIG.nodeEnv}
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});
