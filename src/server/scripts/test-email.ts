import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde el directorio raíz
dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function testEmailConfig() {
  console.log('Testing email configuration...');
  
  console.log('Email Config:', {
    host: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO
  });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('Verificando configuración del transportador...');
    await transporter.verify();
    console.log('Configuración válida');

    console.log('Enviando correo de prueba...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Test Email',
      text: 'Si recibes este correo, la configuración está funcionando correctamente.'
    });

    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error en la prueba:', error);
    process.exit(1);
  }
}

testEmailConfig();