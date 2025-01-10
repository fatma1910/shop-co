'use client'

import { Delete, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';

const page = () => {
    const {  cartDetails,  totalPrice ,removeItem, incrementItem , decrementItem } = useShoppingCart();

  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 '>
        <h1 className='md:text-4xl text-3xl font-bold tracking-tighter uppercase'>Your cart</h1>
        <div className='my-10 flex flex-col lg:flex-row justify-between items-start gap-4'>
            <div className='w-full lg:w-[65%] rounded-3xl border px-6 py-5 flex flex-col gap-6 '>
            {cartDetails && Object.entries(cartDetails).map(([key, item]) => (
                <div key={key} className='flex flex-col sm:flex-row justify-between pb-6 border-b relative'>
                    <div className='flex gap-4'>
                    <Image src={item.imageUrl} width={124} height={124} alt='image' className=' h-[124px] rounded-lg bg-[#F0EEED] '/>
                    <div className='flex flex-col justify-between '>
                        <div >
                                <h2 className='text-xl font-bold capitalize '>{item.title.toLowerCase()}</h2>
                            <p className='text-sm'>Size: <span className='text-[#00000099]'>{item.size[0]}</span></p>
                            <p className='text-sm'>Color: <span className='text-[#00000099]'>{item.color}</span></p>
                            </div>
                            
                            <div>
                                <h2 className='text-2xl font-bold'>${item.price} </h2>
                            </div>
                            
                        
                            
                        </div >
                        </div>
                        <div className='flex flex-row sm:flex-col items-center  justify-between mt-8 sm:mt-0 sm:items-end '>
                        <button  onClick={()=> removeItem(item.id)}>
                                <Trash2 className='text-red-500'/>
                            </button>
                            <div className='rounded-full flex gap-5 px-5 py-3 bg-[#F0F0F0]'>
                            <button onClick={()=> item.quantity > 1 &&  decrementItem(item.id)}
                            disabled={item.quantity === 1}
                            className={`${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            } `}
                            >
                            <Minus 
                            />
                        </button>
                            <p>{item.quantity}</p>
                            
                            <button onClick={()=> incrementItem(item.id)}>
                                <Plus />
                            </button>
                            </div>
                        </div>
                   
                </div>
            ))}
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

                <button className='w-full bg-black text-white rounded-full py-4 mt-8 text-lg'>Go to Checkout</button>

            </div>
        </div>
    </div>
  )
}

export default page