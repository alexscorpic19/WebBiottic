import React from 'react';

export function About() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Sobre Nosotros</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
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
      </div>
    </div>
  );
}