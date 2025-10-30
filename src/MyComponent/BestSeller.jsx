import React from 'react';
import { Bestseller } from './Top';
import ProductCard from './common/ProductCard';

export default function BestSeller() {
  return (
    <div>
      <div className='relative cursor-pointer'>
        <h1 className='text-pink-500 p-4 text-lg font-bold'>Best Seller Products</h1>

        <div className='flex overflow-x-auto scrollbar-hide gap-5 py-4 px-4 scroll-smooth no-scrollbar'>
          {Bestseller.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}