import { Router, Request, Response, NextFunction } from 'express';
import { sendContactMessage } from '../controllers/contact.controller.js';
import { validateContactForm } from '../middleware/validators.js';

const router: Router = Router();

router.post('/', validateContactForm, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendContactMessage(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
