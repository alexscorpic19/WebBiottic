import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../../config/index.js';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  const { name, email, message, phone, company } = data;
  
  console.log('Attempting to send email with data:', { name, email, message: message.substring(0, 20) + '...', phone, company });
  console.log('Using email config:', EMAIL_CONFIG);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials not configured in environment variables');
    throw new Error('Email credentials not configured');
  }
  
  // Crear transportador de correo
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  // Modificar las opciones de correo para mejorar la entrega
  const mailOptions = {
    from: `"Biottic Contact" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO || 'contacto@biottic.com.co',
    subject: `${process.env.EMAIL_SUBJECT_PREFIX || '[Website Contact]'} New message from ${name}`,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      ${company ? `Company: ${company}` : ''}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    priority: 'high',
    headers: {
      'X-Priority': '1',
      'Importance': 'high'
    }
  };
  
  // Send email with better error handling
  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      priority: 'high' as const
    });
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
