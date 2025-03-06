import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';

const router = Router();

router.post('/', contactController.createContactMessage);

export default router;
