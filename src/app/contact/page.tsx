import { Mail, Phone } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center flex-col md:flex-row gap-7 my-10 md:my-40 mx-6 md:mx-16 xl:mx-[135px] items-center  '>
        <div className='border border-[#0000000D] py-10 px-9 shadow-lg'>
            <div className='flex flex-col gap-6 pb-7 border-b-black border-b '>
                <div className='flex items-center gap-4'>
                    <div className='p-3 bg-[#DB4444] rounded-full'>
                        <Phone strokeWidth={1} className='text-white'/>
                    </div>
                    <h6 className='font-medium text-[16px] leading-6'>Call To Us</h6>
                </div>
                <div className='flex flex-col gap-4 '>
                    <p className='text-sm'>We are available 24/7, 7 days a week.</p>
                    <p className='text-sm'>Phone: +8801611112222</p>
                </div>
            </div>
            <div className='flex flex-col gap-6 pt-7  '>
                <div className='flex items-center gap-4'>
                    <div className='p-3 bg-[#DB4444] rounded-full'>
                        <Mail strokeWidth={1} className='text-white'/>
                    </div>
                    <h6 className='font-medium text-[16px] leading-6'>Write To Us</h6>
                </div>
                <div className='flex flex-col gap-4 '>
                    <p className='text-sm'>Fill out our form and we will contact you within 24 hours.</p>
                    <p className='text-sm'>Emails: customer@shopco.com</p>
                    <p className='text-sm'>Emails: support@shopco.com</p>
                </div>
            </div>
            
        </div>
        <form className='border border-[#0000000D] py-10 px-8 shadow-lg flex flex-col gap-8'>
            <div className='flex flex-wrap gap-4 items-center'>
                <input type="text" placeholder='Your Name *' className='px-4 py-[13px] rounded bg-[#F5F5F5] w-full focus:outline-none' required />
                <input type="email" placeholder='Your Email *' className='px-4 py-[13px] rounded bg-[#F5F5F5] w-full focus:outline-none' required />
                <input type="number" placeholder='Your Phone *' className='px-4 py-[13px] rounded bg-[#F5F5F5] w-full focus:outline-none' required />
            </div>
            <textarea name="message" id="" placeholder='Your Massage' className='px-4 py-[13px] h-[207px] bg-[#F5F5F5] focus:outline-none resize-none'/>
            <button className='text-white bg-[#DB4444] px-[48px] py-[16px] w-[215px] place-self-end rounded-lg 'type='submit' >Send Massage</button>
        </form>
    </div>
  )
}

export default page