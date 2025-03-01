import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio de monitoreo
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error?: Error }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-600 mb-8">
          {error?.message || 'Ha ocurrido un error inesperado'}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar página
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
