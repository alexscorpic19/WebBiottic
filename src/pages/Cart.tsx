import React from 'react';
import { useStore } from '../store/useStore';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    // Get form elements with proper type checking
    const referenceInput = document.getElementById('reference') as HTMLInputElement;
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const form = document.getElementById('payu-form') as HTMLFormElement;

    const totalAmount = total * 500; // Convertir a COP (1 USD = 500 COP approx)
    const reference = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Set values safely
    referenceInput.value = reference;
    amountInput.value = totalAmount.toFixed(2);
    
    // Submit form
    form.submit();
  };

  if (cart.length === 0) {
    return (
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">El carrito está vacío</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <form id="payu-form" action="https://checkout.payu.com/CO/pipeline" method="POST" target="_blank">
              <input type="hidden" name="merchantId" value="TU_ID_DE_COMERCIO" />
              <input type="hidden" name="reference" id="reference" />
              <input type="hidden" name="amount" id="amount" />
              <input type="hidden" name="currency" value="COP" />
              <input type="hidden" name="language" value="es" />
              <input type="hidden" name="signature" value="TU_FIRMA_DIGITAL" />
              <input type="hidden" name="description" value="Compra de productos en BIOTTIC" />
              <input type="hidden" name="tax" value="0" />
              <input type="hidden" name="taxReturnBase" value="0" />
              <input type="hidden" name="shipping" value="0" />
              <input type="hidden" name="ipsSource" value="1" />
              <input type="hidden" name="paymentMethod" value="ALL" />
              
              <button
                type="button"
                onClick={handlePayment}
                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-block text-center"
              >
                Proceder al Pago con PayU
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}