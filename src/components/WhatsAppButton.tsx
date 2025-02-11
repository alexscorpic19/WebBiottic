import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573174133379"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <img 
        src="/src/assets/images/WAPP.png"
        alt="WhatsApp"
        className="w-14 h-14 hover:opacity-90 transition-opacity"
      />
    </a>
  );
}