import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import { sale } from './Top';
import { useNavigate } from 'react-router-dom';

export default function HeroBanter() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleSlideClick = () => {
    const currentItem = sale[currentSlide];
    navigate('/product-listing', {
      state: {
        brand: currentItem.brand || 'Featured',
        category: currentItem.category,
        products: currentItem.relatedProducts || [],
      },
    });
  };

  const handleExploreAll = () => {
    navigate('/product-listing', {
      state: {
        brand: 'Flash Sale',
        category: 'flash-sale',
        isFlashSale: true,
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sale.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden pt-32 pb-6 px-6 max-w-7xl mx-auto">
      {/* 🖼️ Hero Banner / Carousel */}
      <div className="relative w-full cursor-pointer mt-8">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg mx-auto max-w-7xl">
          {sale.map((item, index) => (
            <div
              key={item.id}
              className={`transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              onClick={handleSlideClick}
            >
              <img
                src={item.image}
                alt={`Sale item ${item.id}`}
                className="w-full h-auto object-contain bg-black"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-10 text-white">
              </div>
            </div>
          ))}

          {/* 🔘 Navigation Dots */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
            {sale.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ⚡ Flash Sale Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Flash Sale
        </h1>
        <button
          onClick={handleExploreAll}
          className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200 flex items-center gap-1"
        >
          <span className="text-sm sm:text-base">Explore All</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* ⏰ Timer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Timer />
      </div>
    </div>
  );
}