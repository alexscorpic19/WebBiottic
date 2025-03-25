import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import router from './routes/index.js';
import contactRoutes from './routes/contact.routes.js';
import { corsMiddleware } from './middleware/cors.js';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

// Aplicar middleware CORS antes de las rutas
app.use(corsMiddleware);

// Configurar body parser para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar las rutas
app.use('/api', router);
app.use('/api/contact', contactRoutes);

// Add health check endpoint
app.get('/api/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Añadir un middleware de logging para depurar
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
const clientBuildPath = path.join(__dirname, '..', '..');
app.use(express.static(clientBuildPath));

// Fallback route for SPA
app.get('*', (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB if MONGODB_URI is provided
    if (process.env.MONGODB_URI) {
      await connectDB();
      console.log('Connected to MongoDB');
    } else {
      console.log('Skipping MongoDB connection - no URI provided');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      // Signal to PM2 that the app is ready
      if (process.send) {
        process.send('ready');
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
