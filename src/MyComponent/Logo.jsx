import React from 'react'
import { PLogo } from './Top'

export default function Logo() {
  return (
    <div className="bg-gradient-to-br from-white to-pink-50 py-16 border-t border-gray-200 rounded-xl m-auto">
      <div className="mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text mb-4">
            Our Partners
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Trusted by the best in the beauty industry. We collaborate with leading brands 
            to bring you premium quality products and exclusive offers.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {PLogo.map((m) => (
            <div 
              key={m.id} 
              className="group relative flex items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:bg-white hover:border-pink-400/50 hover:shadow-xl hover:shadow-pink-500/20"
            >
              <img
                src={m.image}
                alt={m.id}
                className="mx-auto w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 filter grayscale group-hover:grayscale-0"
              />
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/0 to-purple-600/0 group-hover:from-pink-500/5 group-hover:to-purple-600/5 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}