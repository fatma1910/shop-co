'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../../../pages/api/dpConfig';
import { Review } from '../../../../../pages/api/schema';
import { eq , desc } from "drizzle-orm";
import { ReviewsProps } from '../../../../../types';
import AddReview from './AddReview';
import { CircleCheck, StarIcon } from 'lucide-react';

const CustomerReviews = (productId:any) => {
    const [reviews, setReview] = useState<ReviewsProps[]>([]);
   
    
    useEffect(() => {

        getAllReviews();
    
    }, [productId.id]);

    const getAllReviews = async () => {
        const result = await db
          .select() 
          .from(Review)
          .where(eq(Review.productId, productId.productId.id))
          .orderBy(desc(Review.id));
        setReview(result);
    };

  return (
    <div className='py-10 mt-10 border-t'>
        <div className='flex justify-between items-center'>
            <h2 className='sm:text-2xl text-xl font-bold'>All Reviews <span className='text-base  text-[#00000099]'>({reviews.length}) </span> </h2>

                <div className='flex gap-2'>
                <button className='bg-[#F0F0F0] py-4 px-5 rounded-full hidden sm:block 
                '>Latest</button>
                <AddReview refreshData={getAllReviews} productId={productId} />
            </div>
            
            
        </div>
        {reviews.length===0? (
                <div className='h-60 flex items-center justify-center text-xl'> No Reviews yet. </div>
            ) :(
        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-6 mt-5'>
            {reviews.map((review)=>(
            <div key={review.id} className='h-full py-7 px-8 border rounded-3xl space-y-2'>
            <div className="flex items-center gap-2 ">
            {[...Array(Number(review.rate))].map((_, i) => (
                <StarIcon key={i} className="fill-yellow-400 text-yellow-400" />
            ))}
            </div>
            <h2 className='text-xl font-semibold capitalize flex gap-1'>{review?.name} <CircleCheck className="text-white fill-[#01AB31]"/></h2>
            <p className='text-base text-[#00000099]'>"{review?.review}"</p>
            </div>
            ))}
        </div>
        ) } 
        
    </div>
  )
}

export default CustomerReviews