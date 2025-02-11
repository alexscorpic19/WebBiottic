import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Biottic</h3>
            <p className="text-gray-300 mb-4">
              Soluciones tecnológicas innovadoras para el sector agropecuario.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">Email: info@biottic.com.co</p>
              <p className="text-gray-300">Tel: +57 300 123 4567</p>
              <p className="text-gray-300">Dirección: Calle 123 #45-67, Bogotá, Colombia</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Inicio</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">Sobre Nosotros</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white">Productos</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/biottic" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/biottic" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/biottic" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/biottic" target="_blank" rel="noopener noreferrer"
                className="text-gray-300 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} Biottic. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}