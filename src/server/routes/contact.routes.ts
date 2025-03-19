import { Router, Request, Response, NextFunction } from 'express';
import { sendContactMessage } from '../controllers/contact.controller.js';
import { validateContactForm } from '../middleware/validators.js';

const router: Router = Router();

// Añade un log para depurar
console.log('Configurando ruta POST /contact');

// Añade una ruta de prueba
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Ruta de contacto funcionando correctamente' });
});

router.post('/', validateContactForm, async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Recibida solicitud POST a /contact:', req.body);
    await sendContactMessage(req, res);
  } catch (error) {
    console.error('Error en ruta de contacto:', error);
    next(error);
  }
});

export default router;
