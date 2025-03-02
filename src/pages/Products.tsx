
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/format';

export function Products() {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Nuestros Productos</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-hidden transition-colors">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Características:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3 sm:mb-0">
                    {formatCurrency(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-primary-600 dark:bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors w-full sm:w-auto"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
