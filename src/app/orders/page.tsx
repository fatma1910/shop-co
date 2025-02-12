'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../pages/api/dpConfig'
import { Order } from '../../../pages/api/schema'
import { OrderProps } from '../../../types'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import OrderDetails from './components/OrderDetails'
import Image from 'next/image'
import { Button } from '@/components/ui/button'



const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [visibleOrders, setVisibleOrders] = useState<OrderProps[]>([]);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4 ;

  useEffect(() => {
    
    getOrders()
  }, [user])

  const getOrders = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;
  try {
    const result = await db.select().from(Order).orderBy(desc(Order.id))
    .where(eq(Order.createdBy, email))
    setOrders(result)
    setVisibleOrders(result.slice(0,ordersPerPage))
  } catch (error) {
    console.error("Error fetching orders:", error)
  }
}

const handleLoadMore = () => {
  const nextPage = currentPage + 1;
  const newVisibleProducts = orders.slice(0, nextPage * ordersPerPage);
  setVisibleOrders(newVisibleProducts);
  setCurrentPage(nextPage);
}

  return (
    <div className='mt-16 xl:mx-[100px] lg:mx-16 mx-5 ' >
    {orders.length === 0 ?
        (
        <div className='flex flex-col gap-10  items-center justify-center h-[75%]'>
            <Image src="/empty.webp" width={400} height={400} alt='empty' />
            <p className='text-3xl font-semibold'>You have no orders yet.</p>
        </div>
        ): (
            <>
        <h1 className='text-3xl font-bold uppercase tracking-tighter'>Orders</h1>
        {visibleOrders.map(order=> {
            return (
            <div className='flex flex-col gap-10 mt-12 '>
            <OrderDetails order={order}/>
            </div>
            )
        })}

        {visibleOrders.length < orders.length && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
              >
                Load More
              </Button>
            </div>
          ) }
    </>
        )
    }
        
        
        
        
    </div>
  )
}

export default OrdersPage
