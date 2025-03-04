import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';
import { ErrorRequestHandler } from 'express';

dotenv.config();

const app = express();

// Configurar CORS antes de las rutas
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://biottic.com.co' // Reemplaza con tu dominio de producción
    : 'http://localhost:5173', // Puerto por defecto de Vite
  credentials: true
}));

// Middleware para parsear JSON con límites para prevenir ataques DoS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

interface ApiError extends Error {
  status?: number;
  code?: string;
}

const errorHandler: ErrorRequestHandler = (err: ApiError, req, res, _next) => {
  console.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message
  });
};

// Rutas
app.use('/api', contactRoutes);

// Manejo de errores global mejorado
app.use(errorHandler);

// Conexión a MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/biottic';
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
