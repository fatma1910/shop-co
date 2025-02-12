import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import CartProvider from "./components/CartProvider";
import { FavoritesProvider } from "./components/UseFav";
import ClientWrapper from "./components/ClientWrapper"; // NEW COMPONENT

export const metadata: Metadata = {
  title: "Shop.co",
  description: "FIND CLOTHES THAT MATCHES YOUR STYLE",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistMono.variable}  ${geistSans.variable} ${inter.className} antialiased`}>
          <CartProvider>
            <FavoritesProvider>
              <ClientWrapper>{children}</ClientWrapper> 
              <Toaster />
            </FavoritesProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
