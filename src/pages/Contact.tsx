import React, { useState, useCallback, memo } from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { Toast } from '../components/Toast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { API_CONFIG, APP_CONFIG } from '../config';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Componente separado para el contador de caracteres
const CharacterCount = memo(({ maxLength, currentLength }: {
  maxLength: number;
  currentLength: number;
}) => {
  const isExceeding = currentLength > maxLength;
  
  return (
    <div className={`text-xs mt-1 text-right ${
      isExceeding 
        ? 'text-red-500 dark:text-red-400' 
        : 'text-gray-500 dark:text-gray-400'
    }`}>
      {currentLength}/{maxLength} caracteres
    </div>
  );
});

// Hook para el toast
const useToast = (duration = 5000) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    setTimeout(() => setShowToast(false), duration);
  }, [duration]);

  return { showToast, toastMessage, toastType, showToastMessage };
};

export function Contact() {
  const [loading, setLoading] = useState(false);
  const { formData, formErrors, updateField, validateForm, clearForm } = useContactForm();
  const { showToast, toastMessage, toastType, showToastMessage } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToastMessage('Por favor, corrige los errores en el formulario', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.contact}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          showToastMessage(errorData.message || 'Error al procesar la solicitud', 'error');
        } catch {
          showToastMessage('Error en la comunicación con el servidor', 'error');
        }
        return;
      }

      await response.json();
      showToastMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
      clearForm();
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      showToastMessage('Error de conexión. Por favor verifica tu conexión a internet e intenta nuevamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-20 bg-gray-50 dark:bg-dark-900">
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => showToastMessage('', 'success')} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2 text-left text-gray-900 dark:text-gray-100">
          Contáctanos
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
          Estamos aquí para responder tus preguntas y ayudarte a encontrar la solución perfecta para tus necesidades agrícolas.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="bg-white dark:bg-dark-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              Envíanos un mensaje
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.name 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-dark-600'
                  } focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    dark:bg-dark-700 dark:text-gray-100 dark:placeholder-gray-400`}
                  placeholder="Ingresa tu nombre"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-dark-600'
                  } focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    dark:bg-dark-700 dark:text-gray-100 dark:placeholder-gray-400`}
                  placeholder="tu@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.phone 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-dark-600'
                  } focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    dark:bg-dark-700 dark:text-gray-100 dark:placeholder-gray-400`}
                  placeholder="Tu número de teléfono"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="company" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Empresa (Opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 
                    focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    dark:bg-dark-700 dark:text-gray-100 dark:placeholder-gray-400"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.message 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-dark-600'
                  } focus:ring-2 focus:ring-primary-500 focus:border-transparent
                    dark:bg-dark-700 dark:text-gray-100 dark:placeholder-gray-400`}
                  placeholder="¿En qué podemos ayudarte?"
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formErrors.message}</p>
                )}
                <CharacterCount 
                  maxLength={1000} 
                  currentLength={formData.message.length} 
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-offset-dark-900
                  transition-colors duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar mensaje
                  </span>
                )}
              </button>
            </form>
          </div>
          
          {/* Información de contacto */}
          <div className="bg-white dark:bg-dark-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              Información de contacto
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Correo electrónico</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{APP_CONFIG.CONTACT_EMAIL}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                  <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Teléfono</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{APP_CONFIG.CONTACT_PHONE}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Dirección</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{APP_CONFIG.ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
