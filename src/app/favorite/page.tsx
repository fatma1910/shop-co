'use client';
import React from 'react';
import { useFavorites } from '../components/UseFav';
import Card from '../components/Card';
import Image from 'next/image';

const FavoritesPage = () => {
  const { fav } = useFavorites();

  return (
    <div className="px-6 md:px-16 py-12">
        <head>
          <title>Favorite Page</title>
        </head>
      {fav.length > 0 ? 
      (
      <><h2 className='md:text-5xl text-3xl font-bold mb-5 md:mb-10 tracking-tighter'>YOUR FAVORITES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fav.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
        </>
      ) : (
        <div className='flex flex-col gap-10  items-center justify-center h-[75%]'>
            <Image src="/empty.webp" width={400} height={400} alt='empty' />
            <p className='text-3xl font-semibold'>Your favorites list is empty.</p>
        </div>
        
      )}
    </div>
  );
};

export default FavoritesPage;
