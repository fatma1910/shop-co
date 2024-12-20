
import React from 'react'
import { services } from '../../../../constant'



const Services = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-6  items-center gap-10 md:gap-8 lg:gap-12 xl:gap-20 my-12 md:my-20 xl:mx-[135px] lg:my-40 xl:my-40'>
        {services.map((serve,index)=>(
            <div key={index} className='
        flex flex-col gap-6 justify-center items-center '>
            <div className='p-2 group-hover:bg-white transition-all duration-200 group-hover:bg-opacity-30 bg-[#2F2E30] bg-opacity-30 rounded-full '>
                <div className='p-2 rounded-full transition-all duration-200 group-hover:bg-white  bg-black'>
            <serve.icon strokeWidth={1} className=' group-hover:text-black transition-all duration-200 text-white h-10 w-10 '  />
        </div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center place-self-center '>
                <h2 className='font-semibold md:text-[16px] xl:text-[20px] line-clamp-1 '>{serve.title}</h2>
                <p className='text-[16px] line-clamp-1'>{serve.text} </p>
            </div>
        </div>
        ))}
        
    </div>
  )
}

export default Services