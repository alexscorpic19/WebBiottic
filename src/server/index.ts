import express, { Application } from 'express';
import { corsMiddleware } from './middleware/cors.js';
import contactRoutes from './routes/contact.routes.js';

const app: Application = express();

// Apply middleware
app.use(express.json());
app.use(corsMiddleware);

// API routes
app.use('/api/contact', contactRoutes);
// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
