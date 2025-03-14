import { Router, Request, Response, RequestHandler } from 'express';
import { sendContactEmail } from '../services/email.js';
import { ContactMessage } from '../models/contact.model.js';

const router = Router();

router.post('/', (async (req: Request, res: Response) => {
  try {
    console.log('Contact form submission received:', req.body);
    const { name, email, message, phone, company } = req.body;
    
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields');
      res.status(400).json({ 
        success: false, 
        message: 'Name, email and message are required' 
      });
      return;
    }
    
    // Guardar en la base de datos
    try {
      const contactMessage = new ContactMessage({
        name,
        email,
        message,
        phone,
        company
      });
      
      await contactMessage.save();
      console.log('Contact message saved to database');
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      // Continue with email sending even if DB save fails
    }
    
    // Enviar email
    try {
      await sendContactEmail({ name, email, message, phone, company });
      console.log('Email sent successfully');
      
      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully' 
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send email. Please try again later.' 
      });
    }
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process your request' 
    });
  }
}) as RequestHandler);

export const contactRoutes: Router = router;
