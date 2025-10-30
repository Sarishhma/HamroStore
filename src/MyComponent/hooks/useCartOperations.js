import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import toast from 'react-hot-toast';

export const useCartOperations = () => {
  const { addToCart, buyNow } = useCart();
  const [addingToCart, setAddingToCart] = useState({});
  const navigate = useNavigate();

  const handleAddToCart = async (product, e) => {
    if (e) e.stopPropagation();
    
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      addToCart(product);
      
      toast.success(`${product.title} added to cart!`, {
        duration: 3000,
        position: 'top-right',
      });
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleBuyNow = async (product, e) => {
    if (e) e.stopPropagation();
    
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      buyNow(product);
      
      toast.success('Proceeding to checkout!', {
        duration: 2000,
        position: 'top-right'
      });
      
      navigate("/cart");
    } catch (error) {
      toast.error('Failed to process order');
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  return {
    addingToCart,
    handleAddToCart,
    handleBuyNow
  };
};