import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='bg-[#F2F0F1] mb-64 px-6 lg:px-24 py-6 lg:py-24 flex  flex-col justify-between items-center  lg:gap-5 md:flex-row   md:justify-between overflow-hidden '>
        <div className=' flex flex-col '>
            <h1 className='font-bold xl:text-[64px] lg:text-[45px] md:text-[40px] text-[36px] leading-10  xl:leading-[64px] '>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p className='font-normal text-[16px] leading-5 text-[#00000099] my-7 '>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            <button className='py-4 rounded-[62px] bg-black text-white w-[210px]  '>Shop Now</button>
            <div className='grid grid-cols-2 sm:grid-cols-3 items-center sm:justify-start justify-center  gap-8   my-12'>
                <div className='border-r-2 border-[#0000001A] pr-4'>
                    <h4 className='sm:text-[40px] text-[20px] font-bold sm:leading-[54px] '>200+</h4>
                    <p className='text-[#00000099] sm:text-[16px] text-[14px] leading-[22px] border-r'>International Brands</p>
                </div>
                <div className='sm:border-r-2 border-[#0000001A] pr-4'>
                    <h4 className='sm:text-[40px] text-[20px] font-bold leading-[54px] '>2,000+</h4>
                    <p className='text-[#00000099] text-[16px] leading-[22px] border-r'>High-Quality Products</p>
                </div>
                <div className=' '>
                    <h4 className='sm:text-[40px] text-[20px] font-bold leading-[54px] '>30,000+</h4>
                    <p className='text-[#00000099] text-[16px] leading-[22px] border-r'>Happy Customers</p>
                </div>
            </div>
        </div>

        <div className='relative'>
            <Image src='/Vector.png' alt='' width={56} height={56} className='absolute sm:top-[231px] top-36   '/>
            <Image src='/hero.jpg' alt={'hero'} width={390} height={704} className='md:w-[900px] object-contain md:h-[650px] '/>
            <Image src='/Vector.png' alt='' width={104} height={104} className='absolute -top-1 sm:left-80 left-60 w-16 h-16  '/>
        </div>
    </div>
  )
}

export default Hero