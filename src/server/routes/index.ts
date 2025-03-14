import { Router } from 'express';
import contactRoutes from './contact.routes.js';

const router: Router = Router();

// Mount the contact routes
router.use('/contact', contactRoutes);

export default router;