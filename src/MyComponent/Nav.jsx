import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  Bestseller, DotProducts, KBeauty} from './Top';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import HeroBanter from './HeroBanter';

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  // Initialize cart from localStorage
  useEffect(() => {
    const initializeCart = () => {
      try {
        const cartData = localStorage.getItem('cart');
        const cartItems = cartData ? JSON.parse(cartData) : [];
        const count = Array.isArray(cartItems) 
          ? cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
          : 0;
        setCartItemCount(count);
      } catch (error) {
        console.log('Error loading cart:', error);
        setCartItemCount(0);
      }
    };

    initializeCart();

    // Listen for cart updates from other components
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        initializeCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Poll for changes every second
    const interval = setInterval(initializeCart, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Combine all products for search
  const allProducts = [...Bestseller, ...DotProducts, ...KBeauty];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate('/product-listing', {
        state: {
          searchQuery: searchQuery.trim(),
          title: `Search Results for "${searchQuery}"`
        }
      });
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Handle clicking on search icon
  const handleSearchIconClick = () => {
    handleSearchSubmit();
  };

  return (
    <div>
      {/* Navigation - Fixed at top */}
      <nav className='bg-white shadow-md border-b border-gray-100 fixed top-0 left-0 right-0 z-50'>
        <div className='flex justify-between items-center h-16 px-4 sm:px-6 max-w-7xl mx-auto'>
          <Link to='/' className='text-gray-800 font-bold text-xl hover:text-gray-600 transition-colors'>
           HamroStore
          </Link>
          
          <div className='flex items-center gap-6'>
            {/* Search Bar for larger screens */}
            <div className="hidden md:block relative w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products and brands..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  className="w-full h-10 bg-gray-50 rounded-lg pr-10 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white border border-gray-200 transition-all duration-200"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={handleSearchIconClick}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                      onClick={() => {
                        navigate('/product-details', { state: product });
                        setSearchQuery('');
                        setSuggestions([]);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.brand} • {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to='/cart' className='text-gray-700 hover:text-gray-900 transition-colors duration-200 relative p-2'>
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              {/* Cart Item Count Badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden border-t border-gray-100">
          <div className="relative px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products and brands..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="w-full h-12 bg-gray-50 rounded-lg pr-12 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white border border-gray-200"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearchIconClick}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
              />
            </div>

            {/* Mobile Search Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      navigate('/product-details', { state: product });
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.brand} • {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

<div className='pt-32 sm:pt-28 md:pt-20 mt-4'>
  <HeroBanter />
</div>

    </div>
  );
}