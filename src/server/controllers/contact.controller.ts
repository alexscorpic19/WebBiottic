import { Request, Response } from 'express';
import { ContactMessage } from '../models/contact.model';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import { EMAIL_CONFIG } from '../../config';

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
  phone: Joi.string().trim().allow('').max(10).optional()
    .messages({
      'string.max': 'El número de teléfono no debe exceder los 10 dígitos'
    }),
  company: Joi.string().trim().allow('').max(100).optional()
    .messages({
      'string.max': 'El nombre de la empresa no puede exceder 100 caracteres'
    })
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
const sendEmailWithRetry = async (mailOptions: any, maxRetries = 3) => {
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

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { name, email, message, phone, company } = value;

    const contactMessage = new ContactMessage({
      name,
      email,
      message,
      phone,
      company
    });

    let savedMessage;

    try {
      savedMessage = await contactMessage.save();
      console.log(`Mensaje guardado: ID=${savedMessage._id}, Email=${email.substring(0, 3)}...`);
    } catch (dbError: any) {
      if (dbError.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: Object.values(dbError.errors).map((err: any) => err.message)
        });
      }
      throw dbError;
    }

    try {
      await sendEmailWithRetry({
        from: EMAIL_CONFIG.FROM_EMAIL,
        to: EMAIL_CONFIG.TO_EMAIL,
        subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} Nuevo mensaje de contacto`,
        text: `
          Nuevo mensaje de contacto:
          
          Nombre: ${name}
          Email: ${email}
          Teléfono: ${phone || 'No proporcionado'}
          Empresa: ${company || 'No proporcionada'}
          
          Mensaje:
          ${message}
        `,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Empresa:</strong> ${company || 'No proporcionada'}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `
      });

      res.status(201).json({
        success: true,
        message: 'Mensaje enviado correctamente',
        data: savedMessage
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      // El mensaje se guardó pero el email falló
      res.status(201).json({
        success: true,
        message: 'Mensaje guardado pero hubo un problema al enviar la notificación',
        data: savedMessage
      });
    }
  } catch (error) {
    console.error('Error en sendContactMessage:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
