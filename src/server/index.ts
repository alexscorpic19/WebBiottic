import express, { Application } from 'express';
//import { corsMiddleware } from './middleware/cors.js';
import contactRoutes from './routes/contact.routes.js';
import cors from 'cors';

const app: Application = express();

// Add proper CORS configuration
const corsOrigins = process.env.CORS_ORIGINS ? 
  process.env.CORS_ORIGINS.split(',') : 
  ['http://localhost:5173', 'https://test.biottic.com.co', 'https://biottic.com.co'];

// Apply CORS middleware before routes
app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Make sure you have body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/contact', contactRoutes);
// Add health check endpoint
app.get('/api/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Add proper route handler for contact endpoint
app.post('/api/contact', async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, message, phone, company } = req.body;
    
    // Call your email service
    const emailService = await import('./services/email.js');
    await emailService.sendContactEmail({ name, email, message, phone, company });
    
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
