import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Asegúrate de que las variables de entorno estén cargadas
dotenv.config();

// Configuración de email
const EMAIL_CONFIG = {
  SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  FROM_EMAIL: process.env.EMAIL_FROM || 'biottic.com@gmail.com',
  TO_EMAIL: process.env.EMAIL_TO || 'contacto@biottic.com.co',
  SUBJECT_PREFIX: process.env.EMAIL_SUBJECT_PREFIX || '[Biottic Web]',
  getSmtpConfig: () => {
    console.log('Configurando SMTP con servicio:', process.env.EMAIL_SERVICE);
    return {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };
  }
};

// Interfaz para los datos de contacto
interface ContactData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
}

/**
 * Envía un email con los datos del formulario de contacto
 */
export const sendContactEmail = async (data: ContactData): Promise<void> => {
  try {
    console.log('Intentando enviar email con datos:', {
      ...data,
      message: data.message.substring(0, 20) + '...' // Truncar mensaje para logs
    });
    
    console.log('Usando configuración de email:', {
      SERVICE: EMAIL_CONFIG.SERVICE,
      FROM_EMAIL: EMAIL_CONFIG.FROM_EMAIL,
      TO_EMAIL: EMAIL_CONFIG.TO_EMAIL,
      SUBJECT_PREFIX: EMAIL_CONFIG.SUBJECT_PREFIX
    });
    
    // Crear transporter
    const transporter = nodemailer.createTransport(EMAIL_CONFIG.getSmtpConfig());
    
    // Verificar configuración
    await transporter.verify();
    console.log('Configuración de transporter verificada');
    
    // Opciones de correo
    const mailOptions = {
      from: `"Biottic Contact" <${EMAIL_CONFIG.FROM_EMAIL}>`,
      to: EMAIL_CONFIG.TO_EMAIL,
      subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} New message from ${data.name}`,
      text: `
        New Contact Form Submission
        
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ''}
        ${data.company ? `Company: ${data.company}` : ''}
        
        Message:
        ${data.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      priority: 'high' as const
    };
    
    // Enviar correo
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado correctamente:', info.messageId);
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};
