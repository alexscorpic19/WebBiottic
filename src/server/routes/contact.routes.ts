import express, { Request, Response } from 'express';
import { sendContactEmail } from '../services/email.js';

// Add explicit type annotation for router
const router: express.Router = express.Router();

// Fix the route path - remove '/contact' since it's already mounted at '/api/contact' in index.ts
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Recibida solicitud POST a /api/contact');
    console.log('Body:', req.body);
    
    const { name, email, message, phone, company } = req.body;
    
    // Validar datos requeridos
    if (!name || !email || !message) {
      console.log('Datos incompletos:', { name, email, message });
      res.status(400).json({ 
        success: false, 
        message: 'Nombre, email y mensaje son requeridos' 
      });
    }
    
    // Enviar email
    await sendContactEmail({ name, email, message, phone, company });
    
    // Responder al cliente
    res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    });
  } catch (error) {
    console.error('Error en ruta /api/contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la solicitud' 
    });
  }
});

export default router;
