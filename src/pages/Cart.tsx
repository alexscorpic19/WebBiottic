import React, { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = React.useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handlePayment = useCallback(async () => {
    try {
      if (cart.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const referenceInput = document.getElementById('reference') as HTMLInputElement;
      const amountInput = document.getElementById('amount') as HTMLInputElement;
      const form = document.getElementById('payu-form') as HTMLFormElement;

      if (!referenceInput || !amountInput || !form) {
        throw new Error('Error en el formulario de pago');
      }

      const totalAmount = total * 500;
      if (totalAmount <= 0) {
        throw new Error('El monto total debe ser mayor a 0');
      }

      const reference = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      referenceInput.value = reference;
      amountInput.value = totalAmount.toFixed(2);
      
      const formData = new FormData(form);
      if (!formData.get('reference') || !formData.get('amount')) {
        throw new Error('Datos del formulario incompletos');
      }

      form.submit();
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      window.alert(error instanceof Error ? error.message : 'Error al procesar el pago');
    }
  }, [cart, total]);

  if (cart.length === 0) {
    return (
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Carrito de Compras</h1>
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6 transition-colors">
            <p className="text-gray-600 dark:text-gray-300">El carrito está vacío</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Carrito de Compras</h1>
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow p-6 transition-colors">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b dark:border-gray-700 last:border-b-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded mb-3 sm:mb-0"
              />
              <div className="flex-1 ml-0 sm:ml-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end sm:space-x-4">
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="sr-only">Cantidad</label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border dark:border-gray-600 rounded text-center 
                             bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 ml-4 transition-colors"
                  aria-label="Eliminar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 border-t dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-gray-100">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <form id="payu-form" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" method="POST" target="_blank">
              <input type="hidden" name="merchantId" value={import.meta.env.VITE_PAYU_MERCHANT_ID} />
              <input type="hidden" name="accountId" value={import.meta.env.VITE_PAYU_ACCOUNT_ID} />
              <input type="hidden" name="description" value="Compra en Biottic" />
              <input type="hidden" name="reference" id="reference" />
              <input type="hidden" name="amount" id="amount" />
              <input type="hidden" name="currency" value="COP" />
              <input type="hidden" name="signature" value={import.meta.env.VITE_PAYU_SIGNATURE_KEY} />
              <input type="hidden" name="test" value="1" />
              <input type="hidden" name="responseUrl" value={`${window.location.origin}/payment/response`} />
              <input type="hidden" name="confirmationUrl" value={`${window.location.origin}/api/payment/confirmation`} />
              <button
                type="button"
                onClick={handlePayment}
                className="mt-4 w-full bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-md 
                         hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-block text-center"
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

