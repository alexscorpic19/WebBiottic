import express, { Router } from 'express';
import { createContactMessage } from '../controllers/contact.controller';

const router: Router = express.Router();

// POST /api/contact
router.post('/contact', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await createContactMessage(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
