'use client'

import React, { useEffect, useState } from 'react'
import { ProductData } from '../../../types';
import { db } from '../../../pages/api/dpConfig';
import { Category, Product, ProductCategory } from '../../../pages/api/schema';
import { eq } from "drizzle-orm";
import SwiperSection from './SwipperSection';

const TopSelling = () => {
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          getAllProducts();
      }, []);
  
      const getAllProducts = async () => {
        setLoading(true)
          try {
              const result = await db
                  .select()
                  .from(Product)
                  .innerJoin(ProductCategory,eq(ProductCategory.productId,Product.id) )
                  .innerJoin(Category,eq(Category.id,ProductCategory.categoryId) )
                  .where(eq(Category.name,"top selling") );
              
                  setFilteredProducts(result)
              } catch (error) {
                  console.error("Error fetching products:", error);
              }
              setLoading(false)
          
      };
  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 '>
         {loading?
        (
            <div>
                 <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold uppercase text-center mb-10 tracking-tighter'>Top Selling</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {[...Array(1)].map((_, index) => (
                        <div key={index} className='w-64 place-self-center h-96 bg-[#F0EEED] animate-pulse rounded-xl sm:hidden'></div>
                    ))}
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className='w-64 h-96 bg-[#F0EEED] animate-pulse rounded-xl hidden sm:block md:hidden'></div>
                    ))}
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className='w-64 h-96 bg-[#F0EEED] animate-pulse rounded-xl hidden md:block'></div>
                    ))}
            </div>
            </div>
        ):(
            
            <SwiperSection title="Top Selling" product={filteredProducts} />
        )
        }
    </div>
  )
}

export default TopSelling