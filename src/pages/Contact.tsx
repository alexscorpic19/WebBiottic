import React, { useState } from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { Toast } from '../components/Toast';
import { API_CONFIG, APP_CONFIG } from '../config';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const { formData, formErrors, updateField, clearForm, validateForm } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToastType('success');
        setToastMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        clearForm();
      } else {
        setToastType('error');
        
        // Manejo de errores específicos del servidor
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          // Si el servidor devuelve un array de errores, mostrar el primero
          setToastMessage(data.errors[0]);
        } else if (data.message) {
          // Si hay un mensaje de error general
          setToastMessage(data.message);
        } else {
          // Mensaje genérico si no hay detalles
          setToastMessage('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
        }
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setToastType('error');
      setToastMessage('Error de conexión. Por favor verifica tu conexión a internet e intenta nuevamente.');
    } finally {
      setLoading(false);
      setShowToast(true);
      
      // Ocultar el toast después de 5 segundos
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  // Función para mostrar contador de caracteres
  const renderCharacterCount = (field: 'name' | 'email' | 'message' | 'phone' | 'company', maxLength: number) => {
    const currentLength = formData[field]?.length || 0;
    const isExceeding = maxLength && currentLength > maxLength;
    
    return (
      <div className={`text-xs mt-1 text-right ${isExceeding ? 'text-red-500' : 'text-gray-500'}`}>
        {currentLength}/{maxLength} caracteres
      </div>
    );
  };

  return (
    <div className="pt-16 pb-20 bg-gray-50">
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-left">Contáctanos</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Estamos aquí para responder tus preguntas y ayudarte a encontrar la solución perfecta para tus necesidades agrícolas.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Envíanos un mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre"
                  maxLength={60}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
                {renderCharacterCount('name', 60)}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="tu@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+57 300 123 4567"
                  maxLength={10}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                )}
                {renderCharacterCount('phone', 10)}
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    formErrors.company ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre de tu empresa"
                  maxLength={60}
                />
                {formErrors.company && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.company}</p>
                )}
                {renderCharacterCount('company', 60)}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="¿En qué podemos ayudarte?"
                  maxLength={500}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                )}
                {renderCharacterCount('message', 500)}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar mensaje
                  </span>
                )}
              </button>
            </form>
          </div>
          
          {/* Información de contacto */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Información de contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Correo electrónico</h3>
                  <p className="text-gray-600 mt-1">{APP_CONFIG.CONTACT_EMAIL}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Teléfono</h3>
                  <p className="text-gray-600 mt-1">{APP_CONFIG.CONTACT_PHONE}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Dirección</h3>
                  <p className="text-gray-600 mt-1">{APP_CONFIG.ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
