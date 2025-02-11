import React, { useState } from 'react';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateData = (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      setError('Por favor complete todos los campos requeridos');
      return false;
    }

    if (!/^[^\s@]+@([^\s@]+\.)+[a-zA-Z]{2,}$/.test(data.email)) {
      setError('El correo electrónico ingresado no es válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
    };

    if (!validateData(data)) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'contacto@biottic.com.co',
          subject: `Contacto desde la web - ${data.name}`,
          text: `${data.message}\n\nEmail: ${data.email}`,
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
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <h2 className="text-xl font-semibold mb-2">Información de Contacto</h2>
              <p className="text-gray-600">
                Email: info@biottic.com.co<br />
                Teléfono: +1 234 567 890<br />
                Dirección: Calle Principal 123, Ciudad
              </p>
            </div>
            
            <div className="bg-gray-200 h-64 rounded-lg">
              {/* Map will be implemented here */}
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-600">Mapa en desarrollo...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}