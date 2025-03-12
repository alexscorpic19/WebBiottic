import express from 'express';
import { sendContactMessage } from '../controllers/contact.controller';
import { EMAIL_CONFIG } from '../../config';

const router: express.Router = express.Router();

// Endpoint de diagnóstico temporal
router.get('/contact/test-config', (req, res) => {
  const config = {
    smtp: {
      host: EMAIL_CONFIG.getSmtpConfig().host,
      port: EMAIL_CONFIG.getSmtpConfig().port,
      secure: EMAIL_CONFIG.getSmtpConfig().secure,
      user: EMAIL_CONFIG.getSmtpConfig().auth.user,
      // No incluimos la contraseña por seguridad
    },
    from: EMAIL_CONFIG.FROM_EMAIL,
    to: EMAIL_CONFIG.TO_EMAIL,
    subject_prefix: EMAIL_CONFIG.SUBJECT_PREFIX,
    node_env: process.env.NODE_ENV
  };
  
  res.json(config);
});

router.post('/', async (req, res, next) => {
  try {
    await sendContactMessage(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
