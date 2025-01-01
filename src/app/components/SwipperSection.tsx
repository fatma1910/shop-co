import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import { ProductData } from '../../../types'
import Link from 'next/link'
import 'swiper/css';

const SwiperSection = ({product,title}:{product:ProductData[],title:string}) => {
  return (
    <div>
        <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold uppercase text-center mb-10 tracking-tighter'>{title}</h1>
        <Swiper spaceBetween={20}
        autoplay={{ delay: 3000 }}
        breakpoints={{
            320: {slidesPerView: 1},
            480: {slidesPerView: 2 },
            768: {slidesPerView: 3},
            1024: {slidesPerView: 4},
        }}>
            {product.map((Product,index)=>{
                return(
                <SwiperSlide key={index}>
                    <Card product={Product.product}   />
                </SwiperSlide>
                )
            })}
        </Swiper>
        <Link href={'/shop'} className=' flex justify-center mt-11 '>
        <button className='px-[54px] py-[16px] border rounded-full '>View All</button>
        </Link>
    </div>
  )
}

export default SwiperSection