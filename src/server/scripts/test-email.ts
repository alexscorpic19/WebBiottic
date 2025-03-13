import dotenv from 'dotenv';
import { sendEmail } from '../services/email.js';
import { EMAIL_CONFIG } from '../../config/index.js';

// Cargar variables de entorno
dotenv.config({ path: '.env.development' });

async function testEmail() {
  console.log('Starting email test...');
  
  // Verificar variables de entorno
  console.log('Environment variables:', {
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
    EMAIL_PASS: process.env.EMAIL_PASS ? '****' : 'NOT SET'
  });

  try {
    console.log('Attempting to send test email...');
    
    await sendEmail({
      from: EMAIL_CONFIG.FROM_EMAIL,
      to: EMAIL_CONFIG.TO_EMAIL,
      subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} Test Email`,
      text: 'This is a test email sent at ' + new Date().toISOString(),
      html: `
        <h1>Test Email</h1>
        <p>This is a test email sent at ${new Date().toISOString()}</p>
        <p>If you receive this, the email configuration is working correctly.</p>
      `
    });

    console.log('Test email completed successfully!');
  } catch (error) {
    console.error('Test email failed:', error);
    process.exit(1);
  }
}

testEmail();
