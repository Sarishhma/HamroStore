// hooks/useProductFilter.js - Updated version
import { useMemo } from 'react';
import { Bestseller, DotProducts, KBeauty } from '../Top';

export const useProductFilter = () => {
  const allProducts = useMemo(() => {
    const combined = [...Bestseller, ...DotProducts, ...KBeauty];
    
    return combined.map(product => ({
      reviews: product.reviews || 0,
      rate: product.rate || 0,
      brand: product.brand || 'Unknown',
      category: product.category || 'general',
      ...product
    }));
  }, []);

  const filterProducts = (filters = {}) => {
    const { brand, category, collection, searchQuery } = filters;
    
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (brand && brand !== 'None') {
      filtered = filtered.filter(product => 
        product.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    // Category filter
    if (category && category !== 'None') {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === category.toLowerCase() ||
        product.Name?.toLowerCase() === category.toLowerCase()
      );
    }

    // Collection filter
    if (collection) {
      switch (collection.toLowerCase()) {
        case 'bestseller':
          filtered = Bestseller;
          break;
        case 'dotproducts':
          filtered = DotProducts;
          break;
        case 'kbeauty':
          filtered = KBeauty;
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  const getBrandStats = (products) => {
    const totalProducts = products.length;
    const averageRating = totalProducts > 0 
      ? (products.reduce((sum, product) => sum + (product.rate || 0), 0) / totalProducts).toFixed(1)
      : 0;
    const totalReviews = products.reduce((sum, product) => sum + (product.reviews || 0), 0);

    return { totalProducts, averageRating, totalReviews };
  };

  return {
    allProducts,
    filterProducts,
    getBrandStats,
    collections: {
      Bestseller,
      DotProducts,
      KBeauty
    }
  };
};