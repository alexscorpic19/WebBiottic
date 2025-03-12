import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmailConfig() {
  console.log('Testing email configuration...');
  
  // Muestra la configuración (ocultando la contraseña)
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

    // Verifica la configuración
    console.log('Verificando configuración del transportador...');
    await transporter.verify();
    console.log('Configuración válida');

    // Intenta enviar un correo de prueba
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
  }
}

testEmailConfig();