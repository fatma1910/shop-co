import { BadgeDollarSign, CircleDollarSign, Luggage, Store } from 'lucide-react'
import React from 'react'

export const boxes = [
    {
        icon: Store,
        number:  "10.5k",
        text:"Sellers active our site"
    },
    {
        icon: Luggage,
        number:  "33k",
        text:"Monthly Product Sale"
    },
    {
        icon: CircleDollarSign,
        number:  "45.5k",
        text:"Customer active in our site"
    },
    {
        icon: BadgeDollarSign,
        number:  "25k",
        text:"Annual gross sale in our site"
    },
]

const Boxes = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:mx-[135px] lg:mx-16 mx-6  gap-8 my-48'>
        {boxes.map((box,index)=>(
            <div key={index} className='py-[30px]   flex flex-col gap-6 items-center justify-center border border-[#0000004D] rounded group hover:bg-[#DB4444] transition-all ease-in-out duration-200 hover:text-white hover:shadow-md cursor-pointer   '>
            <div className='p-2 group-hover:bg-white transition-all duration-200 group-hover:bg-opacity-30 bg-[#2F2E30] bg-opacity-30 rounded-full '>
                <div className='p-2 rounded-full transition-all duration-200 group-hover:bg-white  bg-black'>
            <box.icon strokeWidth={1} className=' group-hover:text-black transition-all duration-200 text-white h-10 w-10 '  />
        </div>
            </div>
            <div className='flex flex-col gap-3 justify-center items-center '>
                <h3 className='font-bold text-[32px] leading-8'>{box.number} </h3>
                <p className='text-[16px] leading-6 font-medium'>{box.text}</p>
            </div>
        </div>
        ))}
        
        
    </div>
  )
}

export default Boxes