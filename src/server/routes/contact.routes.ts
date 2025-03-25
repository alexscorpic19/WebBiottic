import { Router, Request, Response, NextFunction } from 'express';
import { sendContactMessage } from '../controllers/contact.controller.js';
import { validateContactForm } from '../middleware/validators.js';

const router: Router = Router();

// Debug log
console.log('Configuring contact routes');

// Test route
router.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Contact route working correctly' });
});

// Handle OPTIONS requests explicitly for CORS preflight
router.options('/', (req: Request, res: Response) => {
  res.status(200).end();
});

// Main contact endpoint
router.post('/', validateContactForm, async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received POST request to /api/contact:', req.body);
    await sendContactMessage(req, res);
  } catch (error) {
    console.error('Error in contact route:', error);
    next(error);
  }
});

export default router;
