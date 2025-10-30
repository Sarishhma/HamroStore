import React from 'react';
import { KbeautiSpecial } from './Top';
import { useNavigate } from 'react-router-dom';

export default function Kspecial() {
  const navigate = useNavigate();

  const handleClick = (brandName) => {
    navigate(`/brand/${brandName}`);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text mb-4 p-4">
            K-Beauty Special
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the secrets of Korean skincare with our curated collection of premium K-beauty products. 
            Experience innovative formulas and time-tested ingredients for radiant, glass skin.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {KbeautiSpecial.map((m) => (
            <div
              key={m.id}
              onClick={() => handleClick(m.brand)}
              className="group relative cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 hover:border-pink-400/50"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={m.image}
                  alt={m.brand}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-gray-800 font-semibold text-lg mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  {m.brand}
                </h3>
                {m.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {m.description}
                  </p>
                )}
              </div>

              {/* Hover Arrow Indicator */}
              <div className="absolute bottom-4 right-4 bg-pink-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}