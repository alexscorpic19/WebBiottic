import React from 'react';
import { Hero } from '../components/Hero';
import { ArrowRight, Leaf, Droplet, LineChart } from 'lucide-react';

export function Home() {
  return (
    <div>
      <Hero />
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestras Soluciones</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sistemas de Control</h3>
              <p className="text-gray-600 mb-4">
                Automatización inteligente para optimizar sus procesos agrícolas.
              </p>
              <a href="/products" className="text-green-600 flex items-center hover:text-green-700">
                Ver más <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Riego Inteligente</h3>
              <p className="text-gray-600 mb-4">
                Sistemas de riego automatizados con control preciso del agua.
              </p>
              <a href="/products" className="text-green-600 flex items-center hover:text-green-700">
                Ver más <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">BioLabs Monitoreo en Tiempo Real</h3>
              <p className="text-gray-600 mb-4">
                Seguimiento y análisis de datos para toma de decisiones informadas.
              </p>
              <a href="/products" className="text-green-600 flex items-center hover:text-green-700">
                Ver más <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}