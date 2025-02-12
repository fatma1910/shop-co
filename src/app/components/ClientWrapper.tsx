'use client';

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()|| "";
  const hideHeaderFooterOn = ['/dashboard/addProduct', '/dashboard'];

  return (
    <>
   
      {!hideHeaderFooterOn.includes(pathname) && <Header />}
      {children}
      {!hideHeaderFooterOn.includes(pathname) && <Footer />}
    </>
  );
}
