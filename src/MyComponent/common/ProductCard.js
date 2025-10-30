import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';

export default function ProductCard({ product, showWishlist = false }) {
  const { addingToCart, handleAddToCart, handleBuyNow } = useCartOperations();
  const navigate = useNavigate();
  const isAdding = addingToCart[product.id];

  return (
    <div className="flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full sm:w-64 group hover:-translate-y-2 max-h-[30rem] overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img 
          onClick={() => navigate("/product-details", { state: product })}
          src={product.image} 
          alt={product.title} 
          className='w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer' 
        />
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base line-clamp-2 leading-snug hover:text-pink-600 transition-colors duration-200 cursor-pointer">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${i < Math.floor(product.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">{product.rate}</span>
            </div>
          </div>
          <span className="text-xs text-gray-500 hidden sm:block">1.2k reviews</span>
        </div>

        {/* Pricing */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg sm:text-xl font-bold text-gray-900">{product.price}</span>
            <span className="text-xs sm:text-sm text-gray-500 line-through">{product.before}</span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
              12% off
            </span>
          </div>
          <div className="text-xs text-gray-600">Free delivery</div>
        </div>

        {/* More Offer Link */}
        <div className="text-xs text-blue-600 mb-3 sm:mb-4 cursor-pointer hover:text-blue-700 transition-colors duration-200 font-medium flex items-center gap-1 group/offer">
          More offers available
          <svg className="w-3 h-3 transform group-hover/offer:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <button 
            onClick={(e) => handleAddToCart(product, e)} 
            disabled={isAdding}
            className={`bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4  rounded-xl transition-all duration-300 flex-1 font-semibold text-sm shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 ${
              isAdding ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              'Add To Cart'
            )}
          </button>
          <button 
            onClick={(e) => handleBuyNow(product, e)} 
            disabled={isAdding}
            className={`bg-gray-50 hover:bg-gray-100 text-gray-700 px-1 py-1 rounded-xl transition-all duration-300 font-semibold text-sm border border-gray-200 hover:border-gray-300 active:scale-95 hover:scale-105 ${
              isAdding ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            Buy Now
          </button>
        </div>

        {/* Stock Status */}
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            In stock
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">256 bought</span>
          </div>
        </div>
      </div>
    </div>
  );
}