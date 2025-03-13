import React from 'react';
import { APP_CONFIG, ASSETS } from '../config';

export function WhatsAppButton() {
  return (
    <a
      href={APP_CONFIG.SOCIAL_MEDIA.WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
    >
      <img
        src={ASSETS.WHATSAPP_ICON}
        alt="WhatsApp"
        width={60}
        height={60}
        className="w-[60px] h-[60px]"
      />
    </a>
  );
}
