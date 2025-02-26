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
  company: Joi.string().trim().allow('').optional()
});

export const createContactMessage = async (req: Request, res: Response) => {
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
        errors: error.details.map(detail => detail.message)
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

    // Declarar savedMessage fuera de los bloques try para que esté disponible en todo el ámbito
    let savedMessage;

    try {
      // Guardar en MongoDB
      savedMessage = await contactMessage.save();
      
      // Log seguro (sin datos sensibles completos)
      console.log(`Mensaje guardado: ID=${savedMessage._id}, Email=${email.substring(0, 3)}...`);
    } catch (dbError: any) {
      // Manejar errores de validación de Mongoose
      if (dbError.name === 'ValidationError') {
        const validationErrors = Object.values(dbError.errors).map((err: any) => err.message);
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: validationErrors
        });
      }
      throw dbError; // Re-lanzar otros errores para ser manejados en el catch externo
    }

    try {
      // Verificar que las variables de entorno estén definidas
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Credenciales de email no configuradas');
      }

      // Configurar email
      const transporter = nodemailer.createTransport({
        service: EMAIL_CONFIG.SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Enviar email
      await transporter.sendMail({
        from: EMAIL_CONFIG.FROM_EMAIL,
        to: EMAIL_CONFIG.TO_EMAIL,
        subject: `${EMAIL_CONFIG.SUBJECT_PREFIX}Nuevo mensaje de contacto de ${name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `
      });

      console.log('Email enviado correctamente a', EMAIL_CONFIG.TO_EMAIL);
      
      return res.status(201).json({
        success: true,
        message: 'Mensaje enviado correctamente',
        data: {
          id: savedMessage._id
        }
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      
      // Aún retornamos éxito porque el mensaje se guardó en la base de datos
      return res.status(201).json({
        success: true,
        message: 'Mensaje guardado, pero hubo un problema al enviar la notificación por email',
        data: {
          id: savedMessage._id
        }
      });
    }
  } catch (error) {
    console.error('Error al procesar mensaje de contacto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar su solicitud'
    });
  }
};
