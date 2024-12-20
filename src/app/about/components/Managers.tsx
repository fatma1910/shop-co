import { Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { personData } from '../../../../constant'


const Managers = () => {
  return (
    <div className='xl:mx-[135px] lg:mx-16 mx-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 '>
        {personData.map((box,index)=>(
            <div className='flex flex-col gap-8' key={index}>
            <div className='w-full bg-[#F5F5F5] items-center rounded-t-md'>
                <Image src={box.image} alt='person' width={236} height={391} className='w-[236px] h-[391px] place-self-center pt-10 '  />
            </div>
            <div className='flex flex-col gap-4 '>
                <h4 className='text-[32px] leading-7 font-medium'>{box.name}</h4>
                <p className='text-[16px] leading-6'>{box.text}</p>
                <div className='flex gap-4 cursor-pointer'>
                    <Twitter strokeWidth={1}/>
                    <Instagram strokeWidth={1}/>
                    <Linkedin strokeWidth={1}/>
                </div>
            </div>
        </div>
        ))}
        
    </div>
  )
}

export default Managers