import { Request, Response } from 'express';
import { ContactMessage } from '../models/contact.model.js';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import { EMAIL_CONFIG } from '../../config/index.js';

// Export the createContact function
export const createContact = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Create new contact message
    const contactMessage = new ContactMessage(value);
    await contactMessage.save();

    // Send email notification
    // ... email sending logic

    return res.status(201).json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al procesar el contacto:', error);
    return res.status(500).json({ success: false, message: 'Error al procesar la solicitud' });
  }
};

// Esquema de validación con Joi
const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres'
    }),
  email: Joi.string().trim().email().required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Formato de email inválido'
    }),
  message: Joi.string().trim().min(10).max(1000).required()
    .messages({
      'string.empty': 'El mensaje es requerido',
      'string.min': 'El mensaje debe tener al menos 10 caracteres',
      'string.max': 'El mensaje no puede exceder 1000 caracteres'
    }),
  phone: Joi.string().allow('').max(10).optional(),
  company: Joi.string().allow('').max(100).optional()
});

// Función para crear el transportador de correo
const createTransporter = () => {
  const smtpConfig = EMAIL_CONFIG.getSmtpConfig();
  
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    throw new Error('Credenciales de email no configuradas');
  }

  return nodemailer.createTransport({
    ...smtpConfig,
    // Opciones adicionales para mejor manejo
    pool: true,
    maxConnections: 1,
    rateDelta: 1000,
    rateLimit: 5
  });
};

// Función para enviar correo con reintentos
export const sendEmailWithRetry = async (mailOptions: nodemailer.SendMailOptions, maxRetries = 3) => {
  const transporter = createTransporter();
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email enviado correctamente (intento ${attempt}):`, info.messageId);
      return info;
    } catch (error) {
      lastError = error;
      console.error(`Error en intento ${attempt}/${maxRetries}:`, error);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  throw lastError;
};

export const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Iniciando sendContactMessage con datos:', req.body);
    
    // Validar datos (aunque ya deberían estar validados por el middleware)
    const { name, email, message, phone, company } = req.body;
    
    if (!name || !email || !message) {
      console.log('Datos incompletos:', { name, email, message });
      res.status(400).json({ 
        success: false, 
        message: 'Faltan campos requeridos' 
      });
      return;
    }
    
    console.log('Datos validados, intentando enviar email');
    
    try {
      // Importar el servicio de email de forma dinámica para evitar problemas de sintaxis
      const emailModule = await import('../services/email.js');
      console.log('Módulo de email importado correctamente');
      
      await emailModule.sendContactEmail({ name, email, message, phone, company });
      console.log('Email enviado correctamente');
      
      res.status(200).json({ 
        success: true, 
        message: 'Mensaje enviado correctamente' 
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      throw emailError;
    }
  } catch (error) {
    console.error('Error en sendContactMessage:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message, phone, company } = req.body;
    
    const contactMessage = new ContactMessage({
      name,
      email,
      message,
      phone,
      company
    });

    await contactMessage.save();

    res.status(201).json({
      success: true,
      message: 'Mensaje enviado exitosamente'
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje'
    });
  }
};
