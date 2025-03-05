import { Router, Request, Response } from 'express';
import { createContactMessage } from '../controllers/contact.controller';

const router: Router = Router();

// POST /api/contact
router.post('/', async (req: Request, res: Response) => {
    await createContactMessage(req, res);
});

export default router;
