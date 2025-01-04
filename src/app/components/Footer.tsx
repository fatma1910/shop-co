
import Image from 'next/image'
import React from 'react'
import { footerData, iconData } from '../../../constant'
import { Instagram, Mail } from 'lucide-react'


const Footer = () => {
  return (
    <footer className='lg:px-[100px] md:px-14 px-8 bg-[rgb(240,240,240)]  mt-36'>
        
        <div className='py-9 lg:px-16 px-4 bg-black relative  w-full -top-20 rounded-[20px] flex flex-col lg:flex-row justify-between gap-10'>
            <h1 className='lg:text-[40px] text-[22px] leading-10  text-white font-semibold flex-1 tracking-tighter'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
            <div className='flex flex-col gap-4 '>
                <div className='relative flex-1'>
                    <Mail className='absolute text-[#00000066] top-3 left-3'/>
                    <input type="email" placeholder={` Enter your email address`} className='rounded-[62px] py-3 px-4 pl-10  outline-none focus:outline-none text-gray-700 w-full lg:w-[349px] '  />
                   
                </div>
                <button className='rounded-[62px] py-3 px-4  text-black flex justify-center items-center w-full lg:w-[349px] bg-white font-medium hover:bg-[#DB4444] transition-all duration-200 ease-in-out hover:text-white border border-white'>Subscribe to Newsletter</button>
            </div>
        </div>
        <div className=' pt-20 pb-9 border-b-2  '>
            
            <div className='flex flex-wrap  gap-[65px] '>
            <div className='flex flex-col gap-[35px] mb-8 lg:mb-auto  w-[248px]   '>
                <Image src="/logo.png" width={167} height={23} alt='logo' />
                <p className='text-[14px] text-[#00000099] '>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                <div className='flex gap-2 '>
                    {iconData.map((i,index)=>(
                        <div key={index} className='group p-2 cursor-pointer rounded-full border-2 bg-white hover:bg-black transition-all ease-in-out duration-200  '>
                        <i.icon fill={`${i.icon===Instagram? 'none':'black'}`} className={`${i.icon===Instagram? ' group-hover:text-white ':'group-hover:fill-white group-hover:text-white'} text-black transition-all duration-200`} />
                        </div>
                    ))}
                    

                </div>
            </div>

                {footerData.map((link,index)=>(
                    <div key={index} className='flex flex-col gap-6 mb-8 lg:mb-auto flex-1 '>
                        <h2 className='uppercase text-[16px] leading-5 space-x-1 font-semibold tracking-wider'>{link.title}</h2>
                        <div className='flex flex-col gap-6 '>
                            {link.links.map((index)=> (
                                <p key={index} className='text-[16px] leading-5 cursor-pointer hover:text-[#00000099]/40 duration-200 ease-in-out transition-all  text-[#00000099]'>{index}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
        <div className='flex flex-col gap-4 py-6 sm:flex-row justify-between items-center'>
            <p className='text-[#00000099] text-[14px] leading-5'>Shop.co © 2000-2023, All Rights Reserved</p>
            <Image src={'/check.png'} alt='' width={281} height={30} className='cursor-pointer'/>
        </div>
    </footer>
  )
}

export default Footer