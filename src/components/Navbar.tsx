import React from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartNavigation = () => {
    navigate('/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cerrar menú al presionar Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Cerrar menú al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white dark:bg-dark-800 shadow-lg fixed w-full z-50 transition-colors duration-200" role="navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <span className="text-green-600 dark:text-green-400 text-2xl font-bold">Biottic</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">
              Inicio
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">
              Sobre Nosotros
            </Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">
              Productos
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400">
              Contacto
            </Link>
            <a 
              href="https://biolabs.biottic.com.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
            >
              Biolabs
            </a>
            <ThemeToggle />
            <button
              onClick={handleCartNavigation}
              className="relative text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 p-2"
              aria-expanded={isOpen}
              aria-label="Menú principal"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-dark-800 shadow-lg"
            role="menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => handleNavigation('/')} 
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Inicio
              </button>
              <button 
                onClick={() => handleNavigation('/about')} 
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Sobre Nosotros
              </button>
              <button 
                onClick={() => handleNavigation('/products')} 
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Productos
              </button>
              <button 
                onClick={() => handleNavigation('/contact')} 
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                Contacto
              </button>
              <a 
                href="https://biolabs.biottic.com.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                Biolabs
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
