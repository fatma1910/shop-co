'use client';
import React from 'react';
import { useFavorites } from '../components/UseFav';
import Card from '../components/Card';

const FavoritesPage = () => {
  const { fav } = useFavorites();

  return (
    <div className="px-16 py-12">
      {fav.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {fav.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <p>Your favorites list is empty.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
