import Image from 'next/image'
import React from 'react'

const AboutHero = () => {
  return (
    <div className='flex flex-col md:flex-row  items-center justify-between md:mt-12 sm:mt-8 mt-4 lg:mt-24 ml-6 md:ml-16 lg:ml-[135px] overflow-hidden gap-14 md:gap-4'>
        <div className='flex flex-col gap-3 md:gap-10 mr-6 md:mr-0'>
            <h1 className='text-[54px] font-semibold '>Our Story</h1>
            <div className='flex flex-col gap-6'>
                <p className='text-[16px] leading-6  '>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>

                <p className='text-[16px] leading-6'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
            </div>
        </div>
        <Image src={'/about.jpg'} alt='about' width={705} height={609} className='-right-20  relative xl:w-[705px] lg:w-[567px] md:w-[430px] rounded-md '/>
    </div>
  )
}

export default AboutHero