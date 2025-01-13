'use client';

import React from 'react';
import { ProductData } from '../../../types';
import Image from 'next/image';
import { Heart, ShoppingCart, StarHalf, StarIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useShoppingCart } from 'use-shopping-cart';
import { useFavorites } from './UseFav';
import Link from 'next/link';

const Card = ({ product }: ProductData) => {
  const productRate = Number(product?.rate);
  const fullStars = Math.floor(productRate);
  const hasHalfStar = productRate % 1 >= 0.5;
  const salePrice = Number(product?.price);
  const { addItem } = useShoppingCart();
  const { fav, addToFav, removeFromFav } = useFavorites();

  const isFav = fav.some((favItem) => favItem.id === product?.id);

  const handleAddToFavorites = () => {
    addToFav(product);
    toast({
      title: `Item added to favorites`,
      variant: 'success',
    });
  };

  const handleRemoveFavorites = () => {
    removeFromFav(product?.id);
    toast({
      title: `Item removed from favorites`,
      variant: 'destructive',
    });
  };

  const handleAddToCart = () => {
    // @ts-ignore
    addItem(product);
    toast({
      title: `Item added to cart`,
      variant: 'success',
    });
  };

  return (
    <div className="group overflow-hidden r">
  <div className="bg-[#F0EEED] p-4 rounded-3xl">
    {/* Top Section: Cart and Favorite Buttons */}
    <div className="flex justify-between items-center mt-2 mx-2">
      <button
        onClick={handleAddToCart}
        className="md:-ml-20 md:invisible md:group-hover:visible md:group-hover:ml-0 group-hover:transition-all duration-300 ease-in-out"
      >
        <ShoppingCart size={37} />
      </button>
      {isFav ? (
        <button
          onClick={handleRemoveFavorites}
          className="md:-mr-20 md:invisible md:group-hover:visible md:group-hover:mr-0 group-hover:transition-all duration-300 ease-in-out"
        >
          <Heart size={37} className="text-red-500 fill-red-500" />
        </button>
      ) : (
        <button
          onClick={handleAddToFavorites}
          className="md:-mr-20 md:invisible md:group-hover:visible md:group-hover:mr-0 group-hover:transition-all duration-300 ease-in-out"
        >
          <Heart size={37} />
        </button>
      )}
    </div>

    {/* Image Section */}
    <Link
      href={`/${product?.id}`}
      className="flex justify-center items-center h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh]"
    >
      <Image
        src={product?.imageUrl}
        alt={product?.title}
        width={256}
        height={384}
        className="object-contain"
      />
    </Link>
  </div>


  <div className="py-4">
    <h2 className="text-xl font-bold capitalize line-clamp-1">
      {product?.title.toLowerCase()}
    </h2>
    <div className="flex items-center gap-1 my-2">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} className="fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="fill-yellow-400 text-yellow-400" />} {productRate}/
      <span className="text-[#00000099]">5</span>
    </div>
    <h2 className="text-2xl font-bold">
      {product?.price}${' '}
      <span className="text-xl text-gray-400 font-semibold line-through">
        {salePrice + (salePrice * 15) / 100}$
      </span>
    </h2>
  </div>
</div>

  );
};

export default Card;
