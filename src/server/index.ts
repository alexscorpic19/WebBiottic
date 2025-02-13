import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.routes';

dotenv.config();

const app = express();

// Configurar CORS antes de las rutas
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://biottic.com.co' // Reemplaza con tu dominio de producción
    : 'http://localhost:5173', // Puerto por defecto de Vite
  credentials: true
}));

// Asegúrate de tener el middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', contactRoutes);

// Manejo de errores global mejorado
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error en el servidor:', {
    error: err,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Conectado a MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  });

export default app;
