import React, { useState } from 'react';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name')?.toString() ?? '',
        email: formData.get('email')?.toString() ?? '',
        message: formData.get('message')?.toString() ?? '',
        phone: formData.get('phone')?.toString() ?? '',
      };

      if (!validateData(data)) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'contacto@biottic.com.co',
          subject: `Contacto desde la web - ${data.name}`,
          text: `${data.message}\n\nEmail: ${data.email}${data.phone ? `\nTeléfono: ${data.phone}` : ''}`,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el mensaje');
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Contacto</h1>
        <div className="grid md:grid-cols-2 gap-8 md:gap-[8rem]">
          {/* Formulario */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[400px] mx-auto md:mx-0">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
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

          {/* Información de contacto */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-8">Información de Contacto</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] mx-auto">
              <div className="text-gray-700 leading-relaxed space-y-3">
                <div className="flex items-center space-x-2">
                  <span style={{ color: '#00FF00' }}>📧</span>
                  <span>Email: info@biottic.com.co</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{ color: '#00FF00' }}>📞</span>
                  <span>Teléfono: +1 234 567 890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{ color: '#00FF00' }}>📍</span>
                  <span>Dirección: Calle Principal 123, Ciudad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
