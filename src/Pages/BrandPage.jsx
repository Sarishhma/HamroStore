// BrandPage.jsx - Temporary debug version
import React from 'react';
import { useParams } from 'react-router-dom';
import { Brand } from '../MyComponent/Top';
import ProductCard from "../MyComponent/common/ProductCard";

export default function BrandPage() {
  const { brandName } = useParams();

  console.log('URL brandName:', brandName);
  console.log('All brands in Brand array:', [...new Set(Brand.map(item => item.brand))]);

  // Flexible filter: ignores case and spaces
  const filteredProducts = Brand.filter(
    (item) =>
      item.brand.toLowerCase().replace(/\s+/g, '') ===
      brandName.toLowerCase().replace(/\s+/g, '')
  );

  console.log('Filtered products:', filteredProducts);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {brandName ? `${brandName} Products` : 'All Products'}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found for "{brandName}".
        </p>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredProducts.length} products for {brandName}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}