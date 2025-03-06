import nodemailer from 'nodemailer';
import type { ContactForm } from '../types';

const getEmailConfig = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const contactEmail = process.env.CONTACT_EMAIL;
  
  // First check if we have a valid configuration
  if (!host || !port) {
    throw new Error('Email configuration is not available');
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Then check credentials
  if (!user || !pass) {
    throw new Error('Email credentials are missing');
  }

  // Check contact email
  if (!contactEmail) {
    throw new Error('Contact email is not configured');
  }

  return {
    host,
    port: parseInt(port, 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
    contactEmail
  };
};

export async function sendContactEmail(data: ContactForm): Promise<void> {
  // Check for browser environment
  if (typeof window !== 'undefined') {
    throw new Error('Email service can only be used on the server side');
  }

  // Get and validate config before creating transporter
  const config = getEmailConfig();
  console.log('Email configuration:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    from: config.auth.user,
    to: config.contactEmail
  });

  const transporter = nodemailer.createTransport(config);

  const mailOptions = {
    from: config.auth.user,
    to: config.contactEmail,
    subject: `Nuevo mensaje de contacto de ${data.name}`,
    text: `
      Nombre: ${data.name}
      Email: ${data.email}
      ${data.phone ? `Teléfono: ${data.phone}` : ''}
      ${data.company ? `Empresa: ${data.company}` : ''}
      Mensaje:
      ${data.message}
    `.trim(),
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ''}
      ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
      <p><strong>Mensaje:</strong> ${data.message}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}






