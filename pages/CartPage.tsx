import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 
import { Trash2 } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart(); 
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-900 rounded-xl p-10 mt-10 shadow-2xl mx-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white text-center">Your Cart is Empty 🛒</h1>
        <p className="text-lg mb-8 text-gray-400 text-center">Time to find your next luxury timepiece.</p>
        <Link
          to="/shop"
          className="px-8 py-3 rounded-lg font-semibold text-lg bg-yellow-500 hover:bg-yellow-600 text-gray-900 transition duration-300 shadow-lg"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 min-h-screen bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 relative">
        
        {/* Items List */}
        <div className="flex-grow lg:w-2/3 bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-700 py-6 last:border-b-0"
            >
              <div className="flex items-center space-x-4 w-full sm:w-1/2">
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-600 bg-white">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1"/>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white leading-tight">{item.name}</h2>
                  <p className="text-yellow-400 text-base mt-1">Rs. {Number(item.price).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full sm:w-auto justify-between">
                <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                    className="px-3 py-1 text-white hover:text-yellow-500 transition"
                    disabled={(item.quantity || 1) <= 1}
                  >
                    -
                  </button>
                  <span className="text-white text-base font-medium w-4 text-center">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                    className="px-3 py-1 text-white hover:text-yellow-500 transition"
                  >
                    +
                  </button>
                </div>

                <div className="w-24 text-right hidden md:block">
                  <span className="text-white font-bold">Rs. {((item.quantity || 1) * Number(item.price)).toLocaleString()}</span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-full transition"
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-6">
            <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm underline decoration-red-500/30">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary Card - Sticky */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
           <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white font-semibold">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Shipping:</span>
                    <span className="text-green-400 text-sm">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between items-center border-t border-gray-700 pt-4 mt-4">
                    <span className="text-white text-lg font-bold">Total:</span>
                    <span className="text-yellow-500 text-2xl font-bold">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                
                <button
                    onClick={() => navigate('/checkout')}
                    className="mt-6 w-full py-3 rounded-lg font-bold text-gray-900 bg-yellow-500 hover:bg-yellow-400 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                    Proceed to Checkout
                </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;