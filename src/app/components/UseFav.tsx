'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FavoritesContextProps, ProductProps } from '../../../types';



const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fav, setFav] = useState<ProductProps[]>([]);

  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem('favorite') || '[]');
    setFav(storedFav);
  }, []);

  const addToFav = (item: ProductProps) => {
    setFav((prev) => {
      const exists = prev.some((favItem) => favItem.id === item.id);
      if (!exists) {
        const updatedFav = [...prev, item];
        localStorage.setItem('favorite', JSON.stringify(updatedFav));
        return updatedFav;
      }
      return prev;
    });
  };

  const removeFromFav = (id: number) => {
    setFav((prev) => {
      const updatedFav = prev.filter((favItem) => favItem.id !== id);
      localStorage.setItem('favorite', JSON.stringify(updatedFav));
      return updatedFav;
    });
  };

  return (
    <FavoritesContext.Provider value={{ fav, addToFav, removeFromFav }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
