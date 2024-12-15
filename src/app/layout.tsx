import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Anton } from 'next/font/google'
import Header from "./components/Header";
import Footer from "./components/Footer";
 
export const inter = Inter({
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
  description: "Everything that you want in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable}  ${geistSans.variable} ${inter.className} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
