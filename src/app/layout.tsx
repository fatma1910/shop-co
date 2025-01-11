import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import CartProvider from "./components/CartProvider";
import { FavoritesProvider } from "./components/UseFav";
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shop.co",
  description: "FIND CLOTHES THAT MATCHES YOUR STYLE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistMono.variable}  ${geistSans.variable} ${inter.className} antialiased`}
      >
        <CartProvider>
        <FavoritesProvider>
        <Header/>
        {children}
        <Footer/>
        <Toaster />
          </FavoritesProvider>
        </CartProvider>
      </body>
      
    </html>
    </ClerkProvider>
  );
}
