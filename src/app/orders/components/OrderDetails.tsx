import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { OrderProps } from '../../../../types';
import Image from 'next/image';

const OrderDetails = ({order}:{order:OrderProps}) => {
    const steps = ['Ordered','in Production', 'Shipped' , 'Delivered']
  return (
    <div className='p-6 shadow-lg rounded-md  flex flex-col gap-6   '>
        <h1 className='text-3xl font-bold '> Order #{ order.id}</h1>
        <div className='my-6'>
            <h2 className='text-xl font-bold '>Order Details:</h2>
            <div className='mx-3 mt-1 '>
                <p className='font-semibold'>Order Date: <span className='font-light'>
                 {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </span></p>
                <p className='font-semibold'>Address: <span className='font-light'>
                 {order.city} | {order.street}
                </span></p>
                <p className='font-semibold'>Phone Number: <span className='font-light'>
                 {order.phone}
                </span></p>
            </div>
            


        </div>
        <Stepper activeStep={order.status==='ordered'? 0
            :order.status==='in production'? 1 
            :order.status==='shipped'? 2
            :4} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                <StepLabel >{label}</StepLabel>
                </Step>
        ))}
    </Stepper>
    <h3 className='text-xl font-bold '>Products in this Order:</h3>
    <div className='space-y-8'>
        {Object.entries(JSON.parse(order.products)).map((([key, product]: [string, any]) => (
            <div key={key} className=' flex flex-col lg:flex-row justify-between pb-6 border-b' >
            <div className='flex gap-4'>
                <Image
                src={product.imageUrl}
                width={124}
                height={124}
                alt='image'
                className='h-[124px] rounded-lg bg-[#F0EEED]'
                />
                <div className='flex flex-col justify-between '>
                <div>
                    <h2 className='text-lg sm:text-xl font-bold capitalize '>
                    {product.title.toLowerCase()}
                    </h2>
                    <p className='text-sm'>
                    Size: <span className='text-[#00000099]'>{product.size}</span>
                    </p>
                </div>
        
                <div>
                    <h2 className='text-2xl font-bold'>${product.price} </h2>
                </div>
                </div>
            </div>

            <div className='flex flex-row lg:flex-col items-center  justify-between mt-8 lg:mt-0 lg:items-end '>
                <h3 className='text-xl font-semibold'>Quantity: {product.quantity}</h3>

                <h3 className='text-xl font-semibold'>Total Price: ${product.quantity*product.price}</h3>

            </div>

            </div>
        )))}
    </div>

    <div className='place-self-center sm:place-self-end'>
        <h2 className='sm:text-2xl text-xl font-semibold '> Total Order Price: <span className='text-red-500'>${order.total}</span>  </h2>
    </div>
    </div>
  )
}

export default OrderDetails