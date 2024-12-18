import { CircleUserRound, Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Navdata } from '../../../constant'



const Header = () => {
  return (
    <div className='lg:px-[100px] sm:py-[32px] py-9  px-6'>
        <div className='flex  items-center justify-between'>
            <div className='flex items-center sm:gap-6 gap-2 '>
              <button className='lg:hidden block '>
                <div className='duration-300 transition-all ease-in-out group' >
                  <Menu size={30}    />
                  <div className='hidden flex-col justify-between items-center absolute  w-56  rounded-md group-hover:flex  backdrop-blur-sm bg-black bg-opacity-50 text-white/60  '>
                    {Navdata.map((index)=> (
                      <Link key={index} href='/' className='text-[16px] leading-5 border-b w-full py-4 hover:text-[20px] duration-200 transition-all ease-in-out hover:text-white'>{index}</Link>
                    ))}
                  </div>
                </div>
              
              </button>
              <Link href='/'>
            <Image src='/logo.png' width={160} height={22} alt='logo' className='w-[100px] h-[18px] md:w-[160px] md:h-[22px]'  />
            </Link>
            </div>
            
            <div className='lg:flex items-center gap-6 hidden '>
              {Navdata.map((index)=> (
                      <Link key={index} href='/' className='text-[16px]   hover:text-black/70 duration-200 transition-all  ease-in-out '>{index}</Link>
                    ))}
                
            </div>
            <div className='flex items-center sm:gap-4 gap-2'> <Link href={'/search'}><Search className='cursor-pointer' /></Link>
            <Link href='/favorite'><Heart /></Link>
            <Link href='/cart'><ShoppingCart /></Link>
            <Link href='/sign-in'> <CircleUserRound /> </Link>
            

            
            </div>
        </div>
    </div>
  )
}

export default Header

