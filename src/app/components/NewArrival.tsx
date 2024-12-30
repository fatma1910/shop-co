'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../pages/api/dpConfig';
import { Category, Product, ProductCategory } from '../../../pages/api/schema';
import { eq } from "drizzle-orm";
import { ProductData } from '../../../types';
import { Swiper, SwiperSlide } from "swiper/react";
import Card from './Card';
import 'swiper/css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NewArrival = () => {
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const result = await db
                .select()
                .from(Product)
                .innerJoin(ProductCategory,eq(ProductCategory.productId,Product.id) )
                .innerJoin(Category,eq(Category.id,ProductCategory.categoryId) )
                .where(eq(Category.name,"new") );
            
                setFilteredProducts(result)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        
    };
  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 pb-16 border-b '>
        <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold uppercase text-center mb-10'>New Arrivals</h1>
        <Swiper spaceBetween={20}
        autoplay={{ delay: 3000 }}
        breakpoints={{
            320: {slidesPerView: 1},
            480: {slidesPerView: 2 },
            768: {slidesPerView: 3},
            1024: {slidesPerView: 4},
        }}>
            {filteredProducts.map((Product,index)=>{
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

export default NewArrival