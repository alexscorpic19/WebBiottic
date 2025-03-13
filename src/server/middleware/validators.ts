import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(60).required()
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder los 60 caracteres'
    }),
  email: Joi.string().trim().email().max(100).required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.email': 'Formato de email inválido',
      'string.max': 'El email no puede exceder los 100 caracteres'
    }),
  message: Joi.string().trim().min(10).max(1000).required()
    .messages({
      'string.empty': 'El mensaje es requerido',
      'string.min': 'El mensaje debe tener al menos 10 caracteres',
      'string.max': 'El mensaje no puede exceder los 1000 caracteres'
    }),
  phone: Joi.string().trim().max(10).optional()
    .messages({
      'string.max': 'El número de teléfono no debe exceder los 10 dígitos'
    }),
  company: Joi.string().trim().max(100).optional()
    .messages({
      'string.max': 'El nombre de la empresa no puede exceder los 100 caracteres'
    })
});

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = contactSchema.validate(req.body);
  
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  
  next();
};