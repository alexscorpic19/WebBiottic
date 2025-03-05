import React from 'react';
import { APP_CONFIG, IMAGE_CONFIG } from '../config';

export function WhatsAppButton() {
  return (
    <a
      href={APP_CONFIG.SOCIAL_MEDIA.WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <img 
        src={IMAGE_CONFIG.WHATSAPP_ICON}
        alt="WhatsApp"
        className="w-14 h-14 hover:opacity-90 transition-opacity"
      />
    </a>
  );
}
