import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';
import { ErrorRequestHandler } from 'express';

dotenv.config();

const app: Express = express();

const corsOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://test.biottic.com.co', 'https://biottic.com.co']
  : ['http://localhost:5173'];

// Configurar CORS antes de las rutas
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON con límites para prevenir ataques DoS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rutas
app.use('/api/contact', contactRoutes);

interface ApiError extends Error {
  status?: number;
  code?: string;
}

const errorHandler: ErrorRequestHandler = (err: ApiError, req, res, _next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    code: err.code
  });

  res.status(err.status || 500).json({
    error: {
      message: err.message,
      code: err.code
    }
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB before starting the server
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Connected to MongoDB');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

export default app;
