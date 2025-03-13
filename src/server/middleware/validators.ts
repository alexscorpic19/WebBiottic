import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  message: Joi.string().trim().min(10).max(1000).required(),
  phone: Joi.string().trim().max(10).optional(),
  company: Joi.string().trim().max(100).optional()
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