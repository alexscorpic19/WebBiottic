import { Router, Request, Response } from 'express';
import { contactController } from '../controllers/contact.controller';

const router: Router = Router();

// POST /api/contact
router.post('/', async (req: Request, res: Response) => {
    await contactController.createContactMessage(req, res);
});

export default router;
