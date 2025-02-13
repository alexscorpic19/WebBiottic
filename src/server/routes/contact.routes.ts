import { Router, Request, Response } from 'express';
import { createContactMessage } from '../controllers/contact.controller';

const router = Router();

// POST /api/contact
router.post('/contact', async (req: Request, res: Response) => {
  await createContactMessage(req, res);
});

export default router;
