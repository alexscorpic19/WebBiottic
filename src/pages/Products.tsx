
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/format';

export function Products() {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Nuestros Productos</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Características:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                  <span className="text-2xl font-bold text-green-600 mb-3 sm:mb-0">
                    {formatCurrency(product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto"
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
