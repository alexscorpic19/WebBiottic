import { Request, Response } from 'express';
import { ContactMessage } from '../models/contact.model';
import { sendContactEmail } from '../services/email.service';
import Joi from 'joi';

// Definir el esquema de validación
const contactSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(100)
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres'
    }),
  email: Joi.string()
    .required()
    .trim()
    .email()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Formato de email inválido'
    }),
  message: Joi.string()
    .required()
    .trim()
    .min(10)
    .max(1000)
    .messages({
      'string.empty': 'El mensaje es requerido',
      'string.min': 'El mensaje debe tener al menos 10 caracteres',
      'string.max': 'El mensaje no puede exceder 1000 caracteres'
    }),
  phone: Joi.string()
    .trim()
    .max(10)
    .optional()
    .messages({
      'string.max': 'El número de teléfono no debe exceder los 10 dígitos'
    }),
  company: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      'string.max': 'El nombre de la empresa no puede exceder 100 caracteres'
    })
});

export const contactController = {
  createContactMessage: async (req: Request, res: Response) => {
    try {
      // Validar con Joi
      const { error, value } = contactSchema.validate(req.body, { 
        abortEarly: false,
        stripUnknown: true
      });
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: error.details.map((detail: Joi.ValidationErrorItem) => detail.message)
        });
      }
      
      // Datos validados y sanitizados
      const { name, email, message, phone, company } = value;

      // Crear el documento
      const contactMessage = new ContactMessage({
        name,
        email,
        message,
        phone,
        company
      });

      // Guardar en MongoDB y enviar email en paralelo
      const [savedMessage] = await Promise.all([
        contactMessage.save(),
        sendContactEmail({ name, email, message, phone, company })
      ]);
      
      // Log seguro (sin datos sensibles completos)
      console.log(`Mensaje guardado: ID=${savedMessage._id}, Email=${email.substring(0, 3)}...`);

      return res.status(201).json({
        success: true,
        message: 'Mensaje enviado exitosamente',
        data: savedMessage
      });

    } catch (error) {
      console.error('Error al procesar el mensaje de contacto:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
};
