'use client'

import { Delete, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import CartItems from './components/CartItems';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';


const page = () => {
    const {  cartDetails,  totalPrice ,cartCount } = useShoppingCart();
    const {isSignedIn} = useUser()


  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 '>
        <h1 className='md:text-4xl text-3xl font-bold tracking-tighter uppercase'>Your cart</h1>
        <div className='my-10 flex flex-col lg:flex-row justify-between items-start gap-4'>
            <div className='w-full lg:w-[65%] rounded-3xl border px-6 py-5 flex flex-col gap-6 '>
            {cartCount === 0 ? (
                <div className='h-[400px] flex items-center justify-center'>
                YOUR CART IS EMPTY.
                </div>
            ) : (
                cartDetails &&
                Object.entries(cartDetails).map(([key, item], index)  => (
                <CartItems product={item} key={key} isLastItem={index === Object.entries(cartDetails).length - 1} />
                ))
            )}

            </div>
            <div className='w-full lg:w-[35%] rounded-3xl border px-6 py-5 flex flex-col '>
                <h2 className='text-2xl font-bold mb-5'>Order Summary</h2>
                <div className='border-b pb-5 flex flex-col gap-5  '>
                    <div className='flex justify-between'>
                        <p className='text-[#00000099]'>Subtotal</p>
                        <h4 className='text-xl font-bold'>
                            ${totalPrice}
                        </h4>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#00000099]'>Discount (-20%)</p>
                        <h4 className='text-xl font-bold text-red-500'>
                        -${Math.round(Number(totalPrice) * (20 / 100))}
                        </h4>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-[#00000099]'>Delivery Fee</p>
                        <h4 className='text-xl font-bold'>
                            $15
                        </h4>
                    </div>
                </div>
                <div  className='flex justify-between mt-6'>
                    <p className='text-xl'>Total</p>
                    <h4 className='text-2xl font-bold'>
                        ${Number(totalPrice) - (Number(totalPrice)*(20/100)) + 15}
                    </h4>
                </div>

                <Link href={`${isSignedIn?'/checkout' : '/sign-in'}`}>
                <button className='w-full bg-black text-white rounded-full py-4 mt-8 text-lg'>Go to Checkout</button>
                </Link>
                

            </div>
        </div>
    </div>
  )
}

export default page