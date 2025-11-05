import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { last } from './Top';

export default function Feeds() {
  const handleClick = () => {
    window.open('https://www.instagram.com/sarishhma/', '_blank');
  };

  return (
    <div className="mx-auto px-4 sm:px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-16 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text mb-6">
          Social Feed
        </h1>
        <div className="relative inline-block text-center">
          <p className="text-gray-700 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto font-light bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl">
            Welcome to our social feed page, your go-to destination for beauty, skincare, and makeup. 
            Discover product reviews, skincare routines, makeup tutorials, and expert tips for healthy 
            skin and flawless makeup.
          </p>
        </div>
      </div>

      {/* Instagram CTA Section */}
      <div className="flex justify-center mb-16">
        <div
          onClick={handleClick}
          className="cursor-pointer relative bg-gradient-to-br from-pink-500 via-purple-600 to-pink-500 p-6 rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-pink-500/40 group overflow-hidden flex items-center justify-center text-center"
          title="Follow me on Instagram"
        >
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <FontAwesomeIcon 
              icon={faInstagram} 
              size="3x" 
              className="text-white group-hover:text-yellow-300 transition-all duration-500 transform group-hover:rotate-12" 
            />
            <p className='text-white font-black text-2xl group-hover:text-yellow-300 transition-colors duration-300 tracking-wide'>
              #EVERYNG
            </p>
            <p className="text-pink-100 text-sm font-medium mt-1 group-hover:text-yellow-200 transition-colors duration-300">
              Follow for daily beauty tips
            </p>
          </div>
        </div>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20 max-w-7xl mx-auto">
  {last.map((m) => (
    <div 
      key={m.id} 
      className="group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white flex flex-col items-center justify-center"
    >
      {/* Main Image */}
      <div className="w-full flex justify-center items-center p-4">
        <img 
          src={m.image} 
          alt="Social feed" 
          className="max-h-72 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Social Stats */}
      <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 flex justify-center">
        <div className="flex justify-between items-center bg-black/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 w-full max-w-sm mx-auto">
          <div className="flex items-center gap-2 text-white">
            <FontAwesomeIcon icon={faHeart} className="text-pink-400 hover:text-red-500 cursor-pointer transition-colors" />
            <span className="text-sm font-semibold">2.4k</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FontAwesomeIcon icon={faComment} className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
            <span className="text-sm font-semibold">156</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FontAwesomeIcon icon={faShare} className="text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
            <span className="text-sm font-semibold">89</span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* CTA Section */}
      <div className="text-center flex flex-col items-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-100">
        <h1 className='text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text mb-6'>
          Find Your Perfect Match
        </h1>
        
        <p className='text-gray-700 text-base md:text-lg leading-relaxed mb-8 max-w-2xl text-center'>
          Unlock your beauty potential with our free consultations. Our expert team will help you find the perfect beauty and skincare products for your unique needs. Say goodbye to beauty confusion and hello to a personalized routine that's as unique as you are!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="text-white bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25 hover:from-pink-600 hover:to-purple-700">
            Have Enquiries
          </button>
          <button className='text-pink-500 border-2 border-pink-500 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:bg-pink-500 hover:text-white hover:shadow-lg bg-white'>
            Email your Queries
          </button>
        </div>
      </div>
    </div>
  );
}
