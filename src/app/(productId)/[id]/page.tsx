'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../pages/api/dpConfig';
import { getTableColumns } from 'drizzle-orm';
import { Product } from '../../../../pages/api/schema';
import { eq } from "drizzle-orm";
import { ProductData, ProductProps } from '../../../../types';
import ProductDetails from './components/ProductDetails';
import CustomerReviews from './components/CustomerReviews';
import Related from './components/Related';

const page = ({params}:{params:{id: number}}) => {
    const [productDetails, setProductDetails] = useState<ProductProps>();
    useEffect(() => {
        getProductDetails()
      }, []);
    const getProductDetails = async ()=> {
        const result = await db
      .select({
        ...getTableColumns(Product),
      })
      .from(Product)
      .where(eq(Product.id, params.id))
      setProductDetails(result[0])
    }
  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5'>
        <ProductDetails product={productDetails}/>
        <CustomerReviews productId={params} />
        <Related product={productDetails} />
    </div>
  )
}

export default page