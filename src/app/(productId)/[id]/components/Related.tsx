
import Card from '@/app/components/Card'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Category, Product, ProductCategory } from '../../../../../pages/api/schema';
import { eq, getTableColumns } from "drizzle-orm";
import { db } from '../../../../../pages/api/dpConfig';
import { ProductData, ProductProps } from '../../../../../types';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

const Related = (product : any) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    if (product?.product?.id) {
      getAllProducts();
    }
  }, [product]);
  
      const getAllProducts = async () => {
        if (!product?.product?.id) return;
      
        try {
          const categories = await db
            .select({
              categoryId: ProductCategory.categoryId,
              categoryName: Category.name,
            })
            .from(ProductCategory)
            .innerJoin(Category, eq(ProductCategory.categoryId, Category.id))
            .where(eq(ProductCategory.productId, product?.product?.id));
      
          const relatedProducts = await db
            .select({
              ...getTableColumns(Product),
            })
            .from(Product)
            .innerJoin(ProductCategory, eq(Product.id, ProductCategory.productId))
            .where(
              eq(ProductCategory.categoryId, categories[1].categoryId) 
            )
            .limit(10);
      
          setFilteredProducts(relatedProducts);
        } catch (error) {
          console.error('Error fetching related products:', error);
        }
      };
      
  return (
    <div className='sm:my-16 my-10'>
      <h2 className='text-3xl font-bold text-gray-900 uppercase place-self-center tracking-tighter sm:text-5xl mb-10'>You might also like</h2>
      <Swiper spaceBetween={20}
        autoplay={{ delay: 3000 }}
        breakpoints={{
            320: {slidesPerView: 1},
            480: {slidesPerView: 2 },
            768: {slidesPerView: 3},
            1024: {slidesPerView: 4},
        }}
        pagination={{
          clickable: true,
      }}
      modules={[Pagination]}
        >
            {filteredProducts.map((Product,index)=>{
                return(
                <SwiperSlide className='mb-6' key={index}>
                    <Card product={Product}   />
                </SwiperSlide>
                )
            })}
        </Swiper>

    </div>
  )
}

export default Related