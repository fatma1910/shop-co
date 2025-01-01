import Image from 'next/image'
import React from 'react'

const CategorySection = () => {
  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 rounded-[40px] bg-[#F0F0F0] xl:p-16 lg:p-12 md:p-8 p-6  space-y-3'>
        <h1 className='tracking-tighter uppercase md:text-5xl text-3xl text-center font-bold md:mb-14 mb-6'>BROWSE BY dress STYLE</h1>
        <div className='flex flex-col md:flex-row gap-3 '>
            <div className='relative rounded-[20px] md:max-w-[407px] max-h-[289px] overflow-hidden'>
                <p className='sm:text-4xl text-2xl font-semibold absolute z-10 top-6 left-6'>Casual</p>
                <Image src={'/cat1.png'} alt={'category'} width={1000} height={0}  className=' -scale-x-100 rounded-[20px] h-full  ' />
            </div>
            <div className='relative rounded-[20px] max-w-[684px] max-h-[289px] overflow-hidden'>
                <p className='sm:text-4xl text-2xl font-semibold absolute z-10 top-6 left-6'>Formal</p>
                <Image src={'/cat2.png'} alt={'category'} width={1000} height={0}  className=' -scale-x-100 rounded-[20px]  w-full h-full scale-125' />
            </div>

        </div>
        <div className='flex flex-col md:flex-row gap-3'>
            <div className='relative rounded-[20px] md:max-w-[684px] max-h-[289px] overflow-hidden'>
                <p className='sm:text-4xl text-2xl font-semibold absolute z-10 top-6 left-6'>Party</p>
                <Image src={'/cat3.png'} alt={'category'} width={1000} height={0}  className=' rounded-[20px]  w-full h-full scale-125' />
            </div>
            <div className='relative rounded-[20px] md:max-w-[407px] max-h-[289px] overflow-hidden'>
                <p className='sm:text-4xl text-2xl font-semibold absolute z-10 top-6 left-6'>Gym</p>
                <Image src={'/cat4.png'} alt={'category'} width={1000} height={0}  className='  rounded-[20px]  w-full h-full scale-125' />
            </div>

        </div>
    </div>
  )
}

export default CategorySection