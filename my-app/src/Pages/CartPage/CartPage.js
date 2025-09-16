




import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/payment');  // Navigate to the CheckoutPage
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">Your cart is currently empty.</p>
          <Link to="/" className="text-indigo-600 font-medium hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 border rounded-lg p-4 shadow-sm bg-white"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  <p className="text-sm text-gray-600 mt-1">
                    Price: <span className="font-medium">₹{item.price.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(index, Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center border-l border-r outline-none"
                  />
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold text-gray-800">
              Total: ₹{getTotal()}
            </h3>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
