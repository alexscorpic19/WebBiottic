import { Router } from 'express';
import contactRoutes from './contact.routes.js';

const router: Router = Router();

// Añade un log para depurar
console.log('Montando rutas de contacto en /contact');

// Mount the contact routes
router.use('/', contactRoutes);

// Ruta de prueba para verificar que el router funciona
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'API router funcionando correctamente' });
});

export default router;
