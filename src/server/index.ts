import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import router from './routes/index.js';

// Load environment variables
dotenv.config();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// API routes
app.use('/api', router);

// Añade un log para depurar las rutas
console.log('Rutas registradas:');
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files
const clientBuildPath = path.join(__dirname, '..', '..');
app.use(express.static(clientBuildPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

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
