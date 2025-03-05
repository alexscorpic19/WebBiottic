import { Schema, model, Document } from 'mongoose';

interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  createdAt: Date;
}

const contactSchema = new Schema<IContactMessage>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@([^\s@]+\.)+[a-zA-Z]{2,}$/, 'Formato de email inválido']
  },
  message: {
    type: String,
    required: [true, 'El mensaje es requerido'],
    trim: true,
    minlength: [10, 'El mensaje debe tener al menos 10 caracteres'],
    maxlength: [1000, 'El mensaje no puede exceder 1000 caracteres']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [10, 'El número de teléfono no debe exceder los 10 dígitos']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'El nombre de la empresa no puede exceder 100 caracteres']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ContactMessage = model<IContactMessage>('ContactMessage', contactSchema);
