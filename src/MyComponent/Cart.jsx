import React from 'react';
import { useCart } from './CartContext';
import { faTrash, faPlus, faMinus, faShoppingBag, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity, getCartTotal, getTotalItems } = useCart();
  const navigate = useNavigate();

  // Helper function to parse price from "Rs.99" to number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    const numericString = priceString.replace('Rs.', '').replace(',', '').trim();
    return parseFloat(numericString) || 0;
  };

  const calculateTotal = () => {
    return getCartTotal();
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cart.find(item => item.id === itemId);
    if (item) {
      const newQuantity = (item.quantity || 1) + change;
      updateQuantity(itemId, newQuantity);
      
      if (newQuantity === 0) {
        toast.success('Item removed from cart');
      } else if (change > 0) {
        toast.success('Quantity increased');
      } else {
        toast.success('Quantity decreased');
      }
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('Proceeding to checkout!');
    // Navigate to checkout page
    // navigate('/checkout');
  };

  const continueShopping = () => {
    navigate(-1);
  };

  const total = calculateTotal();
  const shipping = total > 500 ? 0 : 40; // Free shipping over Rs.500
  const tax = total * 0.18; // 18% GST
  const finalTotal = total + shipping + tax;
  const totalItems = getTotalItems();

  // Format price to Indian Rupees
  const formatPrice = (price) => {
    return `Rs.${price.toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4"> {/* Increased max-width */}
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={continueShopping}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 items-center absolute left-1/2 transform -translate-x-1/2">Shopping Cart</h1>
        
        </div>

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faShoppingBag} className="text-3xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <button
              onClick={continueShopping}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8"> {/* Changed to 4 columns for larger screens */}
            {/* Cart Items - Now takes 3 columns on xl screens */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Cart Items ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-2 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Clear Cart
                  </button>
                </div>

                {/* Scrollable container for cart items */}
                <div className="max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const itemPrice = parsePrice(item.price);
                      const itemTotal = itemPrice * (item.quantity || 1);
                      
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white">
                          {/* Product Image */}
                          <img
                            src={item.image || '/default-product.png'}
                            alt={item.title || 'Product image'}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {
                              e.target.src = '/default-product.png';
                            }}
                          />
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                              {item.title || 'Unknown Product'}
                            </h3>
                            <p className="text-pink-500 font-bold text-lg mb-2">
                              {item.price || 'Rs.0'} {item.quantity > 1 && <span className="text-gray-500 text-sm">× {item.quantity}</span>}
                            </p>
                            <div className="flex items-center gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <FontAwesomeIcon icon={faMinus} className="text-xs" />
                                </button>
                                <span className="w-8 text-center font-medium text-gray-900">
                                  {item.quantity || 1}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                  <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => {
                                  removeFromCart(item.id);
                                  toast.success('Item removed from cart');
                                }}
                                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-sm"
                              >
                                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="font-bold text-gray-900 text-lg">
                              {formatPrice(itemTotal)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.price || 'Rs.0'} each
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Now takes 1 column on xl screens */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18% GST)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  {/* Free Shipping Progress */}
                  {total > 0 && total < 500 && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex justify-between text-sm text-blue-800 mb-1">
                        <span>Free shipping at Rs.500</span>
                        <span>{formatPrice(total)} / Rs.500</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((total / 500) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Add {formatPrice(500 - total)} more for free shipping!
                      </div>
                    </div>
                  )}
                  
                  {total >= 500 && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-sm text-green-800 font-semibold">
                        🎉 You've unlocked free shipping!
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span className="text-pink-500">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4"
                >
                  Proceed to Checkout ({formatPrice(finalTotal)})
                </button>

                {/* Security Badges */}
                <div className="text-center text-xs text-gray-500 space-y-2">
                  <div className="flex items-center justify-center gap-4">
                    <span>🔒 Secure checkout</span>
                    <span>🛡️ Buyer protection</span>
                  </div>
                  <p>30-day money back guarantee</p>
                </div>

                {/* Continue Shopping */}
                <button
                  onClick={continueShopping}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-semibold transition-all duration-300 mt-4"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}