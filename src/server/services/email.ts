import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../../config/index.js';

const smtpConfig = EMAIL_CONFIG.getSmtpConfig();
const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  requireTLS: smtpConfig.requireTLS,
  auth: {
    user: smtpConfig.auth.user,
    pass: smtpConfig.auth.pass
  }
});

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail(options);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};