
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '../config';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{APP_CONFIG.NAME}</h3>
            <p className="text-gray-300 mb-4">
              Soluciones tecnológicas innovadoras para el sector agropecuario.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">Email: {APP_CONFIG.CONTACT_EMAIL}</p>
              <p className="text-gray-300">Tel: {APP_CONFIG.CONTACT_PHONE}</p>
              <p className="text-gray-300">Dirección: {APP_CONFIG.ADDRESS}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Inicio</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition">Sobre Nosotros</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white transition">Productos</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href={APP_CONFIG.SOCIAL_MEDIA.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href={APP_CONFIG.SOCIAL_MEDIA.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href={APP_CONFIG.SOCIAL_MEDIA.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Linkedin size={24} />
              </a>
              <a href="https://twitter.com/biottic" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <Twitter size={24} />
              </a>
            </div>
            
            <div className="mt-6">
              <a 
                href={APP_CONFIG.SOCIAL_MEDIA.WHATSAPP} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-300 hover:text-white transition"
              >
                <MessageCircle size={20} className="mr-2" />
                Chatea con nosotros
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} {APP_CONFIG.COMPANY}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
