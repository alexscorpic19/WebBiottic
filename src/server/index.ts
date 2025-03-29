import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import router from './routes/index.js';
//import contactRoutes from './routes/contact.routes.js';
import cors from 'cors';
import { blockHiddenFiles} from './middleware/security.js';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',') 
  : ['https://test.biottic.com.co', 'https://biottic.com.co', 'http://localhost:5173'];

const corsOptions = {
  origin: corsOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Aplicar CORS a todas las rutas
app.use(cors(corsOptions));

// Add comprehensive security headers middleware
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable strict HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Set Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none'; base-uri 'self'; form-action 'self';");
  
  // Set Permissions Policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  
  // Fix CORS issues
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  next();
});

// Configurar body parser para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para depuración
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Apply security middleware early in the chain
app.use(blockHiddenFiles as express.RequestHandler);

// Montar las rutas
app.use('/api', router);
// Remove this line as it's redundant: app.use('/api/contact', contactRoutes);

// Add health check endpoint
app.get('/api/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
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

// Add 404 handler at the end
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
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

    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
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
