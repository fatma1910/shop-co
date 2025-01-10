'use client'

import { CircleUserRound, Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Navdata } from '../../../constant'
import { UserButton, useUser } from '@clerk/nextjs'
import { useShoppingCart } from 'use-shopping-cart'



const Header = () => {
  const {  cartCount } = useShoppingCart();
  const {isSignedIn} = useUser()
  return (
    <header className='lg:px-[100px] sm:py-[32px] py-9  px-6 border-b '>
        <div className='flex  items-center justify-between'>
            <div className='flex items-center sm:gap-6 gap-2 '>
              <button className='lg:hidden block '>
                <div className='duration-300 transition-all ease-in-out group' >
                  <Menu size={30}    />
                  <div className='hidden z-20 flex-col justify-between items-center absolute  w-56  rounded-md group-hover:flex  backdrop-blur-sm bg-black bg-opacity-70 text-white/70  '>
                    {Navdata.map((link,index)=> (
                      <Link key={index} href={link.path} className='text-[16px] leading-5 border-b w-full py-4 hover:text-[20px] duration-200 transition-all ease-in-out hover:text-white'>{link.title}</Link>
                    ))}
                  </div>
                </div>
              
              </button>
              <Link href='/'>
            <Image src='/logo.png' width={160} height={22} alt='logo' className='w-[100px] h-[18px] md:w-[160px] md:h-[22px]'  />
            </Link>
            </div>
            
            <div className='lg:flex items-center gap-6 hidden '>
              {Navdata.map((link,index)=> (
                      <Link key={index} href={link.path} className='text-[16px]   hover:text-black/70 duration-200 transition-all  ease-in-out '>{link.title}</Link>
                    ))}
                
            </div>
            <div className='flex items-center sm:gap-4 gap-2'> <Link href={'/search'}><Search className='cursor-pointer' /></Link>
            <Link href='/favorite'><Heart /></Link>
            <Link href='/cart' className='relative'>
            <div className='absolute -top-2 left-[14px] text-white  text-[12px] font-medium bg-red-500 rounded-full flex justify-center items-center  w-[18px] h-[18px] '>
              {cartCount}
            </div>
            <ShoppingCart /></Link>
            {isSignedIn ? (
              <UserButton/>
            ):(
            <Link href='/sign-in'> <CircleUserRound /> </Link>
            )}
            
            

            
            </div>
        </div>
    </header>
  )
}

export default Header

