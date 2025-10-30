// components/BrandProducts.js
import React from 'react';
import { useProductFilter } from '../MyComponent/hooks/useProductFilter';

export default function BrandProducts({ brandName }) {
  const { filterProducts, getBrandStats } = useProductFilter();
  const brandProducts = filterProducts({ brand: brandName });
  const { totalProducts, averageRating } = getBrandStats(brandProducts);

  return (
    <div>
      <h2>{brandName} ({totalProducts} products)</h2>
      <div>Rating: {averageRating}/5</div>
     <useProductFilter/>
    </div>
  );
}