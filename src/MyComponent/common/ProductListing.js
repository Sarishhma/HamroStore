// components/ProductListing.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useProductFilter } from '../hooks/useProductFilter';
import ProductCard from './ProductCard';

export default function ProductListing() {
  const location = useLocation();
  const { brand, category, products, isFlashSale, collection } = location.state || {};
  const { filterProducts, getBrandStats, allProducts } = useProductFilter();


  // Filter products based on what was passed
  const displayProducts = products?.length > 0 
    ? products 
    : filterProducts({ brand, category, collection });


  const { totalProducts, averageRating, totalReviews } = getBrandStats(displayProducts);

  // Get display title
  const getDisplayTitle = () => {
    if (brand) return `${brand} Products`;
    if (collection) return `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`;
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    return 'All Products';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
   

      {/* Brand Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{getDisplayTitle()}</h1>
            <p className="text-gray-600 mt-1">Total Products: {totalProducts}</p>
          </div>
          
          <div className="text-right flex flex-col items-end gap-2">
            {totalProducts > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {averageRating} / 5 ({totalReviews} reviews)
                </span>
              </div>
            )}
            
            {isFlashSale && (
              <div className="text-sm text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-full">
                ⚡ Flash Sale Active
              </div>
            )}
            
            {brand && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Brand: {brand}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {displayProducts.length > 0 ? (
        <div className="flex overflow-x-auto scrollbar-hide gap-5 py-4 px-2 scroll-smooth no-scrollbar">
          {displayProducts.map((product) => ( // Fixed: using displayProducts instead of sale
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-2">No products found</p>
          <p className="text-gray-400 text-sm">
            {brand ? `No products available for ${brand}` : 'Try adjusting your filters'}
          </p>
        </div>
      )}
    </div>
  );
}