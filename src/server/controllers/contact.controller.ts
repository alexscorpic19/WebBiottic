import type { RequestHandler } from 'express';
import { ContactMessage as Contact } from '../models/contact.model.js';
import { sendEmail } from '../services/email.js';
import Joi from 'joi';
import { EMAIL_CONFIG } from '../../config/index.js';
import type { ContactFormData } from '../../shared/types/contact.js';

// Validation schema
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
  phone: Joi.string().trim().max(20).optional(),
  company: Joi.string().trim().max(100).optional()
});

export const createContactMessage: RequestHandler<{}, any, ContactFormData> = async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      res.status(400).json({
        success: false,
        errors: error.details.map(detail => detail.message)
      });
      return;
    }

    const contactMessage = new Contact(value);
    await contactMessage.save();

    await sendEmail({
      from: EMAIL_CONFIG.FROM_EMAIL,
      to: EMAIL_CONFIG.TO_EMAIL,
      subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} Nuevo mensaje de contacto`,
      text: `
Nuevo mensaje de contacto:

Nombre: ${value.name}
Email: ${value.email}
Teléfono: ${value.phone || 'No proporcionado'}
Empresa: ${value.company || 'No proporcionada'}

Mensaje:
${value.message}
        `,
      html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${value.name}</p>
          <p><strong>Email:</strong> ${value.email}</p>
          <p><strong>Teléfono:</strong> ${value.phone || 'No proporcionado'}</p>
          <p><strong>Empresa:</strong> ${value.company || 'No proporcionada'}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${value.message}</p>
        `
    });

    res.status(201).json({
      success: true,
      message: 'Mensaje de contacto creado y notificación enviada correctamente',
      data: contactMessage
    });
  } catch (error) {
    console.error('Error en el controlador de contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud de contacto',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
