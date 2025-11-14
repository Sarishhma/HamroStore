import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bestseller } from "./Top";
import { useCartOperations } from "./hooks/useCartOperations";
import ProductCard from "./common/ProductCard";
import Nav from "./Nav";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;
  const { addingToCart, handleAddToCart, handleBuyNow } = useCartOperations();

  if (!item) return <div>No product found</div>;

  const recommended = Bestseller.filter(p => p.id !== item.id).slice(0, 4);
  const isAdding = addingToCart[item.id];

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Nav />
      </div>
      
      {/* Main Content with responsive top padding */}
      {/* Mobile: pt-32 (h-16 + mobile search area) */}
      {/* Desktop: pt-16 (only h-16) */}
      <div className="pt-44 md:pt-20 pb-6 px-6 max-w-7xl mx-auto">
        
        {/* Product Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Product Image */}
          <div className="flex-1">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full max-w-md h-96 object-cover rounded-2xl shadow-lg mx-auto" 
            />
          </div>
          
          {/* Product Details - your existing code remains the same */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{item.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{item.subtitle}</p>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 fill-current ${i < Math.floor(item.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.rate}</span>
              </div>
              <span className="text-sm text-gray-500">1.2k reviews</span>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">{item.price}</span>
                <span className="text-lg text-gray-500 line-through">{item.before}</span>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  12% off
                </span>
              </div>
              <div className="text-sm text-gray-500">Free delivery • 7-day return policy</div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                In stock
              </div>
              <div className="text-gray-500">🔥 256 bought in past week</div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={(e) => handleAddToCart(item, e)} 
                disabled={isAdding}
                className={`bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                  isAdding ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding to Cart...
                  </>
                ) : (
                  'Add To Cart'
                )}
              </button>
              
              <button 
                onClick={(e) => handleBuyNow(item, e)} 
                disabled={isAdding}
                className={`bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-base border border-gray-800 hover:border-gray-700 active:scale-95 ${
                  isAdding ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">Free Delivery</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">1 Year Warranty</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Products</h2>
          <div className="flex overflow-x-auto scrollbar-hide gap-5 py-4 px-2 scroll-smooth no-scrollbar">
            {recommended.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}