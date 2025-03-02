import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export function About() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Sobre Nosotros</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="text-gray-600 mb-6">
              En Biottic, nos dedicamos a revolucionar el sector agropecuario a través de soluciones tecnológicas innovadoras y sostenibles. Nuestro objetivo es empoderar a los agricultores con herramientas que optimicen sus operaciones y mejoren su productividad.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
            <p className="text-gray-600 mb-6">
              Aspiramos a ser líderes globales en la transformación digital del sector agrícola, creando un futuro donde la tecnología y la agricultura trabajen en perfecta armonía para garantizar la seguridad alimentaria y la sostenibilidad ambiental.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-green-600">Innovación</h3>
                <p className="text-gray-600">Buscamos constantemente nuevas formas de mejorar y optimizar los procesos agrícolas.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-green-600">Sostenibilidad</h3>
                <p className="text-gray-600">Desarrollamos soluciones que respetan y protegen el medio ambiente.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-green-600">Excelencia</h3>
                <p className="text-gray-600">Nos comprometemos con la calidad y la mejora continua en todo lo que hacemos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nueva sección de Nuestro Equipo */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Equipo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* CEO */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/src/assets/images/corzo.png"
                alt="CEO"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Carlos Corzo</h3>
                <p className="text-green-600 font-medium mb-3">CEO y Fundador</p>
                <p className="text-gray-600 mb-4">
                  Líder visionario con más de 15 años de experiencia en tecnología agrícola y gestión empresarial.
                </p>
                <div className="flex space-x-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-green-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:ceo@biottic.com.co" 
                    className="text-gray-600 hover:text-green-600">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Ingeniero Desarrollador */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/src/assets/images/alex.png"
                alt="Ingeniero Desarrollador, co Fundador"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Jhon A Hernandez</h3>
                <p className="text-green-600 font-medium mb-3">Ingeniero de Desarrollo y co Fundador</p>
                <p className="text-gray-600 mb-4">
                  Ingeniero electronico y desorrollador de sistemas.
                </p>
                <div className="flex space-x-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-green-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:desarrollo@biottic.com.co" 
                    className="text-gray-600 hover:text-green-600">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Comercial */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                alt="Comercial"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Carlos Martínez</h3>
                <p className="text-green-600 font-medium mb-3">Director Comercial</p>
                <p className="text-gray-600 mb-4">
                  Experto en desarrollo de negocios con amplia experiencia en el sector agroindustrial.
                </p>
                <div className="flex space-x-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-green-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:comercial@biottic.com.co" 
                    className="text-gray-600 hover:text-green-600">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

