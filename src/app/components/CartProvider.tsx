'use client'
import { ReactNode } from 'react';
import { CartProvider as CProvider } from 'use-shopping-cart';

interface CartProviderProps {
    children: ReactNode;
  }
  
  const CartProvider = ({ children }: CartProviderProps) => {
    return (
      <CProvider
      mode="payment"
      cartMode="client-only"
      stripe={"" }
      successUrl=""
      cancelUrl=""
      language="en-US"
      currency="USD"
      billingAddressCollection={true}
      shouldPersist={true}
      >
        {children}
      </CProvider>
    );
  };
  
  export default CartProvider;