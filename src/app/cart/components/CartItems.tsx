'use client'

import React from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useShoppingCart } from 'use-shopping-cart';

const CartItems = ({ product, isLastItem }: { product: any; isLastItem: boolean }) => {
    const { removeItem, incrementItem, decrementItem } = useShoppingCart();
    

    
    return (
      <div
        className={`flex flex-col sm:flex-row justify-between pb-6 ${
          isLastItem ? '' : 'border-b'
        } relative`}
      >
        <div className='flex gap-4'>
          <Image
            src={product.imageUrl}
            width={124}
            height={124}
            alt='image'
            className='h-[124px] rounded-lg bg-[#F0EEED]'
          />
          <div className='flex flex-col justify-between '>
            <div>
              <h2 className='text-xl font-bold capitalize '>
                {product.title.toLowerCase()}
              </h2>
              <p className='text-sm'>
                Size: <span className='text-[#00000099]'>{product.size}</span>
              </p>
            </div>
  
            <div>
              <h2 className='text-2xl font-bold'>${product.price} </h2>
            </div>
          </div>
        </div>
        <div className='flex flex-row sm:flex-col items-center  justify-between mt-8 sm:mt-0 sm:items-end '>
          <button onClick={() => removeItem(product.id)}>
            <Trash2 className='text-red-500' />
          </button>
          <div className='rounded-full flex gap-5 px-5 py-3 bg-[#F0F0F0]'>
            <button
              onClick={() => product.quantity > 1 && decrementItem(product.id)}
              disabled={product.quantity === 1}
              className={`${
                product.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
              } `}
            >
              <Minus />
            </button>
            <p>{product.quantity}</p>
  
            <button onClick={() => incrementItem(product.id)}>
              <Plus />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartItems;
  