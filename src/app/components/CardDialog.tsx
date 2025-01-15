'use client';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import ProductDetails from '../(productId)/[id]/components/ProductDetails';
import { ShoppingCart, X } from 'lucide-react';

const CardDialog = ({ product }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <ShoppingCart size={37} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >

        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full max-h-[90vh] overflow-hidden rounded-md bg-white p-4">
            <div className='flex justify-between items-center'>
                <DialogTitle className="font-bold text-xl">Product Details</DialogTitle>
                <button onClick={() => setIsOpen(false)} >
                    <X/>
                </button>
            </div>
            
            

            <div className="mt-4 max-h-[70vh] overflow-y-auto">
              <ProductDetails product={product} className="md:flex-col" />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CardDialog;
