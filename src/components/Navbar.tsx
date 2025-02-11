import React from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
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
              <button 
                onClick={() => handleNavigation('/cart')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 flex items-center justify-between"
              >
                <span>Carrito</span>
                {totalItems > 0 && (
                  <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}