import { Request, Response } from 'express';
import { ContactMessage } from '../models/contact.model';
import nodemailer from 'nodemailer';

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    // Validación inicial del body
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Payload inválido'
      });
    }

    console.log('Recibido payload:', req.body);

    const { name, email, message, phone } = req.body;

    // Validación de campos
    const validationErrors = [];
    if (!name || typeof name !== 'string') validationErrors.push('Nombre inválido');
    if (!email || typeof email !== 'string') validationErrors.push('Email inválido');
    if (!message || typeof message !== 'string') validationErrors.push('Mensaje inválido');
    if (phone && typeof phone !== 'string') validationErrors.push('Teléfono inválido');

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: validationErrors
      });
    }

    // Crear el documento
    const contactMessage = new ContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      phone: phone?.trim()
    });

    // Guardar en MongoDB
    const savedMessage = await contactMessage.save();
    console.log('Mensaje guardado:', savedMessage);

    try {
      // Configurar email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Enviar email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'contacto@biottic.com.co',
        subject: `Nuevo contacto desde la web - ${name}`,
        text: `
Nombre: ${name}
Email: ${email}
${phone ? `Teléfono: ${phone}\n` : ''}
Mensaje:
${message}
        `.trim()
      });
      
      console.log('Email enviado exitosamente');
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      // Continuamos aunque falle el email
    }

    // Enviar respuesta
    return res.status(201).json({
      success: true,
      message: 'Mensaje enviado correctamente',
      data: {
        id: savedMessage._id,
        name: savedMessage.name,
        email: savedMessage.email,
        createdAt: savedMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Error en createContactMessage:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Error al procesar el mensaje',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
