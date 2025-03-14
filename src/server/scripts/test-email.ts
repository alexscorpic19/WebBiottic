import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const testEmailConfig = async () => {
  try {
    console.log('Testing email configuration...');
    
    // Check required environment variables
    const requiredVars = ['EMAIL_SERVICE', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
      process.exit(1);
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    
    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
      subject: `${process.env.EMAIL_SUBJECT_PREFIX || '[Test]'} Email Configuration Test`,
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify that the email configuration is working correctly.</p>
        <p>If you received this email, the configuration is valid.</p>
        <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
        <p>Time: ${new Date().toISOString()}</p>
      `
    });
    
    console.log(`✅ Test email sent: ${info.messageId}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    process.exit(1);
  }
};

testEmailConfig();
