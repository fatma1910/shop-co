'use client'

import React, { useEffect, useState } from 'react'
import { ProductData } from '../../../types';
import { db } from '../../../pages/api/dpConfig';
import { Category, Product, ProductCategory } from '../../../pages/api/schema';
import { eq } from "drizzle-orm";
import SwiperSection from './SwipperSection';

const TopSelling = () => {
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
                  .where(eq(Category.name,"top selling") );
              
                  setFilteredProducts(result)
              } catch (error) {
                  console.error("Error fetching products:", error);
              }
          
      };
  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 '>
        <SwiperSection title="Top Selling" product={filteredProducts} />
    </div>
  )
}

export default TopSelling