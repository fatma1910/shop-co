'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, StarHalf, StarIcon } from 'lucide-react';
import { useShoppingCart } from 'use-shopping-cart';
import { toast } from '@/hooks/use-toast';

const ProductDetails = ({ product }: any) => {
  const productRate = Number(product?.rate) || 0;
  const fullStars = Math.max(Math.floor(productRate), 0);
  const hasHalfStar = productRate % 1 >= 0.5;
  const salePrice = Number(product?.price);
  const { addItem, setItemQuantity } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // @ts-ignore
    addItem(product);
    setItemQuantity(product.id, quantity);
    toast({
      title: `Item added to cart`,
      variant: 'success',
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Product Image */}
      <div className="w-full md:w-[444px] h-[300px] md:h-[530px] bg-[#F0EEED] rounded-3xl flex justify-center items-center">
        <Image
          src={product?.imageUrl}
          width={200}
          height={200}
          alt={product?.title}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="text-2xl md:text-[40px] font-bold uppercase tracking-tighter">
          {product?.title}
        </h2>
        <div className="flex items-center gap-2 mb-2">
          {[...Array(fullStars)].map((_, i) => (
            <StarIcon key={i} className="fill-yellow-400 text-yellow-400" />
          ))}
          {hasHalfStar && <StarHalf className="fill-yellow-400 text-yellow-400" />} {productRate}/
          <span className="text-[#00000099]">5</span>
        </div>
        <h2 className="text-xl md:text-3xl font-bold mt-2 flex flex-row items-center gap-2">
          {product?.price}${' '}
          <span className="text-gray-400 font-semibold   line-through">
            {salePrice + (salePrice * 15) / 100}$
          </span>
          <span className="text-[#FF3333] text-sm md:text-base font-medium py-[6px] px-4 bg-[#FF33331A]  rounded-full">
            -20%
          </span>
        </h2>
        <p className="py-5 text-sm md:text-base font-normal text-[#00000099] border-b">
          {product?.description}
        </p>

        {/* Choose Size */}
        <div className="py-5 border-b">
          <p className="text-[#00000099] mb-3 text-sm md:text-base">Choose Size</p>
          <div className="flex flex-wrap gap-2">
            {product?.size.map((size: string) => (
              <button
                key={size}
                className="py-[10px] px-5 transition-all duration-200 rounded-full bg-[#F0F0F0] text-[#00000099] capitalize"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center my-5">

          <div className="rounded-full flex gap-5 px-5 py-3 bg-[#F0F0F0] w-full md:w-[30%] justify-between">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              disabled={quantity === 1}
              className={`${
                quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Minus />
            </button>
            <p>{quantity}</p>

            <button onClick={() => setQuantity(quantity + 1)}>
              <Plus />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full md:w-[70%] rounded-full text-white bg-black py-[16px]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
