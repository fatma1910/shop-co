import { CircleUserRound, Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='md:px-[100px] sm:py-[62px] py-9  px-6'>
        <div className='flex  items-center justify-between'>
            <div className='flex items-center sm:gap-6 gap-2'>
              <button className='lg:hidden block group text-white'>
                <div >
                  <Menu size={30}    />
                  <div className='hidden flex-col justify-between items-center absolute  w-56  rounded-md group-hover:flex backdrop-blur-sm bg-black bg-opacity-50'>
                  <Link href='/' className='text-[16px] leading-5 border-b w-full py-4'>Home</Link>
                <Link href='/' className='text-[16px] leading-5  border-b w-full py-4 '>Contact</Link>
                <Link href='/' className='text-[16px] leading-5  border-b w-full py-4 '>About</Link>
                <Link href='/' className='text-[16px] leading-5 py-4'>Shop</Link>
                  </div>
                </div>
              
              </button>
              <Link href='/'>
            <Image src='/logo.png' width={160} height={22} alt='logo' className='w-[126px] h-[18px] md:w-[160px] md:h-[22px]'  />
            </Link>
            </div>
            
            <div className='lg:flex items-center gap-6 hidden '>
                <Link href='/' className='text-[16px] leading-5 '>Home</Link>
                <Link href='/' className='text-[16px] leading-5 '>Contact</Link>
                <Link href='/' className='text-[16px] leading-5 '>About</Link>
                <Link href='/' className='text-[16px] leading-5'>Shop</Link>
            </div>
            <div className='flex items-center sm:gap-4 gap-2'>
            <Search className='cursor-pointer' />
            <Link href='/favorite'><Heart /></Link>
            <Link href='/cart'><ShoppingCart /></Link>
            <Link href='/sign-in'> <CircleUserRound /> </Link>
            

            
            </div>
        </div>
    </div>
  )
}

export default Header

