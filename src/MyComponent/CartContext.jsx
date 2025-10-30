import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Helper function to parse price from "Rs.99" to number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    // Remove "Rs." and any commas, then convert to number
    const numericString = priceString.replace('Rs.', '').replace(',', '').trim();
    return parseFloat(numericString) || 0;
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        // If product exists, increase quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // If product doesn't exist, add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prev) =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const buyNow = (product) => {
    setCart([{ ...product, quantity: 1 }]);
  };

  const clearCart = () => {
      console.log('🔄 CartContext: buyNow called - REPLACING ENTIRE CART');
    setCart([]);
  };

  // Calculate total price of all items in cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  // Calculate total number of items in cart (considering quantities)
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    buyNow,
    clearCart,
    getCartTotal,
    getTotalItems,
    cartCount: getTotalItems()
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};