import { Component, ErrorInfo, ReactNode, memo, useCallback } from 'react';
import Logger from '../utils/logger';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error; // Añadimos la propiedad error como opcional
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error // Guardamos el error en el estado
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Logger.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Memoizar el ErrorFallback para evitar re-renders innecesarios
const ErrorFallback = memo(({ error }: { error?: Error }) => {
  const navigate = useNavigate();
  
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const handleNavigate = useCallback(() => {
    navigate('/');
  }, [navigate]);

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
            onClick={handleReload}
            className="btn-primary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar página
          </button>
          <button
            onClick={handleNavigate}
            className="btn-secondary"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
});

export default ErrorBoundary;
