import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo);
    // TODO: Implementar servicio de monitoreo de errores (e.g., Sentry)
    // sendToErrorMonitoring(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Algo salió mal
              </h2>
            </div>
            
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <pre className="bg-gray-50 p-3 rounded text-xs sm:text-sm overflow-auto max-h-32 sm:max-h-40 mb-4 border border-gray-200">
                {this.state.error?.message || 'Error desconocido'}
              </pre>
            )}
            
            <button
              onClick={this.handleReload}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recargar página</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
