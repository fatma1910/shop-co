'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';
import Image from 'next/image';

const OrderDetailsDialog = ({ order, open, onClose }: { order: any; open: boolean; onClose: () => void }) => {
  const products = JSON.parse(order.products);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-md bg-white p-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="font-bold text-xl">Order Details</DialogTitle>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Order Info */}
          <div className="mt-4 space-y-2 border-b pb-4">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.street}, {order.city}</p>
            <p><strong>Status:</strong> <span className="text-blue-500">{order.status}</span></p>
          </div>

          {/* Product List */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-8">
            {Object.entries(products).map(([key, product]: [string, any]) => (
              <div key={key} className="flex flex-col lg:flex-row justify-between pb-6 border-b">
                <div className="flex gap-4">
                  <Image
                    src={product.imageUrl}
                    width={124}
                    height={124}
                    alt="Product Image"
                    className="h-[124px] rounded-lg bg-[#F0EEED]"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold capitalize">
                        {product.title.toLowerCase()}
                      </h2>
                      <p className="text-sm">
                        Size: <span className="text-[#00000099]">{product.size}</span>
                      </p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">${product.price}</h2>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center justify-between mt-8 lg:mt-0 lg:items-end">
                  <h3 className="text-xl font-semibold">Quantity: {product.quantity}</h3>
                  <h3 className="text-xl font-semibold">Total Price: ${product.quantity * product.price}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-4 text-right">
            <h2 className="text-2xl font-semibold">
              Total Order Price: <span className="text-red-500">${order.total}</span>
            </h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default OrderDetailsDialog;
