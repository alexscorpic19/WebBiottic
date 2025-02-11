import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio de monitoreo
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Lo sentimos, algo salió mal
            </h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Error desconocido'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

// Lazy loaded components
const Home = React.lazy(() => 
  import('./pages/Home').then(module => ({ default: module.Home }))
);
const About = React.lazy(() => 
  import('./pages/About').then(module => ({ default: module.About }))
);
const Products = React.lazy(() => 
  import('./pages/Products').then(module => ({ default: module.Products }))
);
const Contact = React.lazy(() => 
  import('./pages/Contact').then(module => ({ default: module.Contact }))
);
const Cart = React.lazy(() => 
  import('./pages/Cart').then(module => ({ default: module.Cart }))
);
const NotFound = React.lazy(() => import('./pages/NotFound.tsx'));

// Wrapper component for lazy-loaded routes
const LazyRoute = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LazyRoute component={Home} />} />
              <Route path="/about" element={<LazyRoute component={About} />} />
              <Route path="/products" element={<LazyRoute component={Products} />} />
              <Route path="/contact" element={<LazyRoute component={Contact} />} />
              <Route path="/cart" element={<LazyRoute component={Cart} />} />
              <Route path="*" element={<LazyRoute component={NotFound} />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
