import React from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

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
    <nav className="bg-white shadow-lg fixed w-full z-50" role="navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <span className="text-green-600 text-2xl font-bold">Biottic</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('/')} className="text-gray-700 hover:text-green-600">
              Inicio
            </button>
            <button onClick={() => handleNavigation('/about')} className="text-gray-700 hover:text-green-600">
              Sobre Nosotros
            </button>
            <button onClick={() => handleNavigation('/products')} className="text-gray-700 hover:text-green-600">
              Productos
            </button>
            <button onClick={() => handleNavigation('/contact')} className="text-gray-700 hover:text-green-600">
              Contacto
            </button>
            <a 
              href="https://biolabs.biottic.com.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600"
            >
              Biolabs
            </a>
            <button 
              onClick={() => handleNavigation('/cart')} 
              className="text-gray-700 hover:text-green-600 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu and Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={handleCartNavigation}
              className="text-gray-700 hover:text-green-600 relative"
              aria-label="Ver carrito de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-green-600 p-2"
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
            className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg"
            role="menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => handleNavigation('/')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                Inicio
              </button>
              <button onClick={() => handleNavigation('/about')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                Sobre Nosotros
              </button>
              <button onClick={() => handleNavigation('/products')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                Productos
              </button>
              <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                Contacto
              </button>
              <a 
                href="https://biolabs.biottic.com.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
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
