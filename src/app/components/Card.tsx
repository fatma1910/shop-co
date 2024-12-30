import React from 'react';
import { ProductData } from '../../../types';
import Image from 'next/image';
import { StarHalf, StarIcon } from 'lucide-react';

const Card = ({ product }: ProductData) => {
  const productRate = Number(product.rate);
  const fullStars = Math.floor(productRate); 
  const hasHalfStar = productRate % 1 >= 0.5; 

  return (
    <div className="">
      <div className="bg-[#F0EEED] p-4 flex justify-center items-center rounded-3xl">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={245}
          height={0}
          className="object-contain"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-xl font-bold">{product.title}</h2>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(fullStars)].map((_, i) => (
            <StarIcon key={i} className="fill-yellow-400 text-yellow-400" />
          ))}
          {hasHalfStar && (
            <StarHalf className="fill-yellow-400 text-yellow-400 " />
          )}{" "}
          {productRate}/<span className='text-[#00000099]'>5</span>
        </div>
        <h2 className='text-2xl font-bold' >{product.price}$</h2>
      </div>
    </div>
  );
};

export default Card;
