import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import { sale } from './Top';
import { useNavigate } from 'react-router-dom';

export default function HeroBanter() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()

  const handleSlideClick = () => {
    const currentItem = sale[currentSlide];
    navigate('/product-listing', { 
      state: { 
        brand: currentItem.brand || 'Featured',
        category: currentItem.category,
        products: currentItem.relatedProducts || []
      } 
    });
  };

  const handleExploreAll = () => {
    navigate('/product-listing', { 
      state: { 
        brand: 'Flash Sale',
        category: 'flash-sale',
        isFlashSale: true
      } 
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sale.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Banner/Carousel Section */}
      <div className='w-full px-4 py-6 m-auto cursor-pointer'>
        {/* Carousel Section */}
        <div className='relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl shadow-xl'>
          {sale.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={handleSlideClick}
            >
              <img
                src={item.image}
                alt={`Sale item ${item.id}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with brand info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.brand || item.title}</h3>
                <p className="text-base opacity-90">Click to explore products</p>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {sale.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className='max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-200'>
        <h1 className='text-2xl font-bold text-gray-800'>Flash Sale</h1>
        <button 
          onClick={handleExploreAll}
          className='text-gray-600 hover:text-gray-800 font-semibold transition-colors duration-200 flex items-center gap-1'
        >
          Explore All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Timer */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Timer />
      </div>
    </div>
  );
}