import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
        <Link 
          to="/" 
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
