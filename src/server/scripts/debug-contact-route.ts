import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

// Configurar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Función para probar el envío de correo con los mismos parámetros que usa el formulario de contacto
const debugContactEmail = async () => {
  try {
    console.log('Debugging contact email functionality...');
    console.log('Environment variables:');
    console.log('- EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
    console.log('- EMAIL_USER:', process.env.EMAIL_USER);
    console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('- EMAIL_TO:', process.env.EMAIL_TO);
    console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]');
    
    // Datos de prueba
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from debug script',
      phone: '1234567890',
      company: 'Test Company'
    };
    
    // Crear transportador
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true
    });
    
    // Verificar conexión
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');
    
    // Opciones de correo (similar a las usadas en el controlador de contacto)
    const mailOptions = {
      from: `"Biottic Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO || 'contacto@biottic.com.co',
      subject: `${process.env.EMAIL_SUBJECT_PREFIX || '[Website Contact]'} New message from ${testData.name}`,
      text: `
        New Contact Form Submission
        
        Name: ${testData.name}
        Email: ${testData.email}
        ${testData.phone ? `Phone: ${testData.phone}` : ''}
        ${testData.company ? `Company: ${testData.company}` : ''}
        
        Message:
        ${testData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${testData.name}</p>
        <p><strong>Email:</strong> ${testData.email}</p>
        ${testData.phone ? `<p><strong>Phone:</strong> ${testData.phone}</p>` : ''}
        ${testData.company ? `<p><strong>Company:</strong> ${testData.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${testData.message.replace(/\n/g, '<br>')}</p>
      `,
      priority: 'high',
      headers: {
        'X-Priority': '1',
        'Importance': 'high'
      }
    };
    
    // Enviar correo
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      ...mailOptions,
      priority: 'high' as const
    });
    console.log('✅ Test email sent successfully:', info.messageId);
    
    // Probar la ruta específica que está fallando
    console.log('\nNow testing the actual contact route handler...');
    
    // Importar y probar la función sendContactEmail
    try {
      const { sendContactEmail } = await import('../services/email.js');
      console.log('✅ Successfully imported sendContactEmail function');
      
      await sendContactEmail(testData);
      console.log('✅ sendContactEmail executed successfully');
    } catch (importError) {
      console.error('❌ Error importing or executing sendContactEmail:', importError);
      console.error('Stack trace:', importError instanceof Error ? importError.stack : 'No stack trace available');
    }
    
  } catch (error) {
    console.error('❌ Debug process failed:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
  }
};

debugContactEmail();