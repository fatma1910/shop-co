'use client'
import Image from 'next/image'
import React from 'react'

import CountUp from 'react-countup';

const Hero = () => {
  return (
    <div className='  relative'>
        <div className='bg-[#F2F0F1]  lg:pt-24 pt-6 flex  flex-col px-6 lg:px-24 justify-between items-center  lg:gap-5 md:flex-row   md:justify-between overflow-hidden '>
        <div className=' flex flex-col '>
            <h1 className='font-bold xl:text-[64px] lg:text-[45px] md:text-[40px] text-[36px] leading-10  xl:leading-[64px] tracking-tighter '>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p className='font-normal text-[16px] leading-5 text-[#00000099] my-7 '>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            <button className='py-4 rounded-[62px] bg-black w-full text-white sm:w-[210px] hover:shadow-lg hover:bg-[#DB4444] duration-200 transition-all ease-in-out  '>Shop Now</button>
            <div className='grid grid-cols-2 sm:grid-cols-3 items-center sm:justify-start justify-center  gap-8   my-12'>
                <div className='border-r-2 border-[#0000001A] pr-4'>
                    <h4 className='xl:text-[40px] lg:text-3xl md:text-2xl sm:text-xl text-[20px] font-bold xl:leading-[54px] '><CountUp end={200} />+</h4>
                    <p className='text-[#00000099] sm:text-[16px] text-[14px] leading-[22px] border-r'>International Brands</p>
                </div>
                <div className='sm:border-r-2 border-[#0000001A] pr-4'>
                    <h4 className='xl:text-[40px] lg:text-3xl md:text-2xl sm:text-xl text-[20px] font-bold xl:leading-[54px] '> <CountUp end={2000} />+</h4>
                    <p className='text-[#00000099] text-[16px] leading-[22px] border-r'>High-Quality Products</p>
                </div>
                <div>
                    <h4 className='xl:text-[40px] lg:text-3xl md:text-2xl sm:text-xl text-[20px] font-bold xl:leading-[54px] '><CountUp end={30000} />+</h4>
                    <p className='text-[#00000099] text-[16px]  border-r'>Happy Customers</p>
                </div>
            </div>
        </div>

        <div className='relative'>
            <Image src='/Vector.png' alt='' width={56} height={56} className='absolute sm:top-[231px] top-36   '/>
            <Image src='/hero.jpg' alt={'hero'} width={390} height={704} className='md:w-[900px] object-contain md:h-[650px] '/>
            <Image src='/Vector.png' alt='' width={104} height={104} className='absolute top-10 sm:left-96 left-[240px] w-16 h-16  '/>
        </div>
    </div>
    <div className='px-6 lg:px-24 bg-black py-8 absolute w-full bottom-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 justify-center items-center  '>
        
        <Image src='/icon1.png' alt='' width={166} height={33.16}/>
        <Image src='/icon2.svg' alt='' width={91} height={38} className='w-[166px] h-8'/>
        <Image src='/icon3.svg' alt='' width={166} height={33.16}/>
        <Image src='/icon4.svg' alt='' width={166} height={33.16}/>
        <Image src='/icon5.svg' alt='' width={166} height={33.16}/>
        </div>
    </div>
    
  )
}

export default Hero