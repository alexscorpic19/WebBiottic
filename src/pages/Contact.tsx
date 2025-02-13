import React, { useState } from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { Toast } from '../components/Toast';

// Asegúrate que esta URL sea correcta y el servidor esté corriendo en este puerto
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { formData, updateField, clearForm } = useContactForm();

  const validateData = (data: {
    name: string;
    email: string;
    message: string;
    phone?: string;
  }) => {
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      setError('Por favor complete todos los campos requeridos');
      return false;
    }

    if (!/^[^\s@]+@([^\s@]+\.)+[a-zA-Z]{2,}$/.test(data.email)) {
      setError('El correo electrónico ingresado no es válido');
      return false;
    }

    if (data.phone && data.phone.length > 10) {
      setError('El número de teléfono no debe exceder los 10 dígitos');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!validateData(formData)) {
        setLoading(false);
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone
      };

      console.log('Enviando solicitud a:', `${API_BASE_URL}/api/contact`);
      console.log('Payload:', payload);

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `Error del servidor: ${response.status} ${response.statusText}`
        }));
        throw new Error(errorData.message);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Error al procesar la solicitud');
      }

      setSuccess(true);
      clearForm();
      setToastMessage('Mensaje enviado exitosamente');
      setShowToast(true);
    } catch (err) {
      console.error('Error detallado:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error de conexión con el servidor';
      setError(errorMessage);
      setToastMessage(errorMessage);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
          {/* Columna izquierda - Título y Formulario */}
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-8">Contacto</h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  autoComplete="tel"
                  maxLength={10}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-green-400"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>

              {error && (
                <div className="text-red-600 text-sm mt-2">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 text-sm mt-2">
                  Mensaje enviado exitosamente
                </div>
              )}
            </form>
          </div>

          {/* Columna derecha - Título e Información de contacto */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-8">Información de Contacto</h2>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <div className="text-gray-700 leading-relaxed space-y-3">
                <div className="flex items-center space-x-2">
                  <span style={{ color: '#00FF00' }}>📧</span>
                  <span>Email: info@biottic.com.co</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{ color: '#00FF00' }}>📞</span>
                  <span>Teléfono: +57 3174133379</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{ color: '#00FF00' }}>📍</span>
                  <span>Dirección: Calle Principal 123, Bucaramanga-Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
