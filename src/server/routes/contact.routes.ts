import express, { Router } from 'express';
import { sendContactMessage } from '../controllers/contact.controller';

const router: Router = express.Router();

// POST /api/contact
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await sendContactMessage(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
