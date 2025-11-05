import React from 'react';
import { Bestseller } from './Top';
import ProductCard from './common/ProductCard';

export default function BestSeller() {
  return (
    <div>
   <div className="relative cursor-pointer">
  <h1 className="text-pink-500 p-4 text-lg font-bold">Best Seller Products</h1>

  <div className="flex overflow-x-auto gap-5 py-4 px-4 scroll-smooth snap-x snap-mandatory">
    {Bestseller.map((product) => (
      <div
        key={product.id}
        className="flex-shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] snap-start"
      >
        <ProductCard product={product} />
      </div>
    ))}
  </div>
</div>

    </div>
  );
}