// Configuración centralizada para la aplicación

// API URLs
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    CONTACT: '/api/contact',
    PRODUCTS: '/api/products',
    USERS: '/api/users',
    AUTH: '/api/auth'
  }
};

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'Biottic',
  COMPANY: 'Biottic Technologies',
  CONTACT_EMAIL: 'info@biottic.com.co',
  CONTACT_PHONE: '+57 3174133379',
  SOCIAL_MEDIA: {
    WHATSAPP: 'https://wa.me/573174133379',
    INSTAGRAM: 'https://instagram.com/biottic',
    FACEBOOK: 'https://facebook.com/biottic',
    LINKEDIN: 'https://linkedin.com/company/biottic'
  }
};

// Configuración de imágenes
export const IMAGE_CONFIG = {
  PRODUCT_PLACEHOLDER: '/src/assets/images/product-placeholder.png',
  LOGO: '/src/assets/images/logo.png',
  WHATSAPP_ICON: '/src/assets/images/WAPP.png'
};