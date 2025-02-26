import mongoose, { Document, Schema } from 'mongoose';

export interface IContactMessage extends Document {
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
    trim: true
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
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [10, 'El número de teléfono no debe exceder los 10 dígitos']
  },
  company: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactSchema);
